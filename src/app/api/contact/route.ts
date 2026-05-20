import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodError } from 'zod'

import {
  contactSchema,
  type ContactFieldErrors,
  type ContactResponse,
} from '@/lib/contact'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

type RateLimitEntry = {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

function jsonResponse(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status })
}

function sanitize(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const appHostingIp = request.headers.get('fastly-client-ip')

  return forwardedFor?.split(',')[0]?.trim() || realIp || appHostingIp || 'unknown'
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const current = rateLimitStore.get(ip)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return false
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  current.count += 1
  return false
}

function formatZodErrors(error: ZodError): ContactFieldErrors {
  return error.issues.reduce<ContactFieldErrors>((acc, issue) => {
    const field = issue.path[0]

    if (field === 'name' || field === 'email' || field === 'message' || field === 'website') {
      acc[field] = issue.message
    }

    return acc
  }, {})
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    return jsonResponse(
      {
        ok: false,
        message: 'Trop de tentatives. Merci de réessayer dans quelques minutes.',
      },
      429
    )
  }

  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: 'Requête invalide.',
      },
      400
    )
  }

  const parsed = contactSchema.safeParse(payload)

  if (!parsed.success) {
    const fieldErrors = formatZodErrors(parsed.error)
    console.error('Contact form validation failed', {
      fields: Object.keys(fieldErrors),
    })

    return jsonResponse(
      {
        ok: false,
        message: 'Merci de corriger les champs indiqués.',
        fieldErrors,
      },
      422
    )
  }

  if (parsed.data.website) {
    return jsonResponse(
      {
        ok: true,
        message: 'Message envoyé.',
      },
      200
    )
  }

  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    console.error('RESEND_API_KEY is missing')
    return jsonResponse(
      {
        ok: false,
        message: "Le service d'envoi est indisponible pour le moment.",
      },
      500
    )
  }

  const resend = new Resend(resendApiKey)

  const name = sanitize(parsed.data.name)
  const email = parsed.data.email.trim().toLowerCase()
  const message = parsed.data.message.trim()
  const sentAt = new Date()
  const sentAtLabel = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  }).format(sentAt)

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">Nouveau message depuis anavastudio.fr</h1>
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Date :</strong> ${escapeHtml(sentAtLabel)}</p>
      <p><strong>IP :</strong> ${escapeHtml(ip)}</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `

  try {
    const { error } = await resend.emails.send({
      from: 'Anava Studio <hello@anavastudio.fr>',
      to: 'contact@anavastudio.fr',
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      html,
      text: [
        'Nouveau message depuis anavastudio.fr',
        '',
        `Nom : ${name}`,
        `Email : ${email}`,
        `Date : ${sentAtLabel}`,
        `IP : ${ip}`,
        '',
        message,
      ].join('\n'),
    })

    if (error) {
      console.error('Resend contact email failed', error)
      return jsonResponse(
        {
          ok: false,
          message: "Impossible d'envoyer le message pour le moment.",
        },
        502
      )
    }
  } catch (error) {
    console.error('Unexpected Resend contact email error', error)
    return jsonResponse(
      {
        ok: false,
        message: "Impossible d'envoyer le message pour le moment.",
      },
      502
    )
  }

  return jsonResponse(
    {
      ok: true,
      message: 'Message envoyé. Nous reviendrons vers vous dans les plus brefs délais.',
    },
    200
  )
}
