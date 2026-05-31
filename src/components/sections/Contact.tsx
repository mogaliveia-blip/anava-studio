
"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { Send, Mail, MapPin, Phone } from 'lucide-react'
import {
  contactSchema,
  type ContactFieldErrors,
  type ContactRequest,
  type ContactResponse,
} from '@/lib/contact'
import {
  trackContactSubmit,
  trackEmailClick,
  trackPhoneClick,
} from '@/lib/analytics'
import { seoConfig } from '@/lib/seo'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({})
  const [formMessage, setFormMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload: ContactRequest = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
      website: String(formData.get('website') || ''),
    }
    const parsed = contactSchema.safeParse(payload)

    setFieldErrors({})
    setFormMessage(null)

    if (!parsed.success) {
      const nextFieldErrors = parsed.error.issues.reduce<ContactFieldErrors>((acc, issue) => {
        const field = issue.path[0]

        if (field === 'name' || field === 'email' || field === 'message') {
          acc[field] = issue.message
        }

        return acc
      }, {})

      setFieldErrors(nextFieldErrors)
      toast({
        variant: "destructive",
        title: "Formulaire incomplet",
        description: "Merci de corriger les champs indiqués.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed.data),
      })
      const result = (await response.json()) as ContactResponse

      if (!response.ok || !result.ok) {
        setFieldErrors(result.ok ? {} : result.fieldErrors || {})
        setFormMessage(result.message)
        trackContactSubmit('error')
        toast({
          variant: "destructive",
          title: "Erreur d'envoi",
          description: result.message,
        })
        return
      }

      setFormMessage(result.message)
      form.reset()
      trackContactSubmit('success')
      toast({
        title: "Message envoyé !",
        description: result.message,
      })
    } catch {
      setFormMessage("Impossible d'envoyer le message pour le moment.")
      trackContactSubmit('error')
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: "Impossible d'envoyer le message pour le moment.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-28 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Contact</p>
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-6">
                Parlons de votre <span className="text-primary">projet</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Vous avez un besoin spécifique ou une idée en tête ? Nous vous aidons à cadrer, développer et déployer une application web ou un outil métier adapté à vos processus.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary shrink-0 group-hover:border-primary/30 transition-colors duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg text-white">Contact par Email</h4>
                    <a
                      href={`mailto:${seoConfig.contactEmail}`}
                      onClick={() => trackEmailClick('contact_section')}
                      className="text-muted-foreground group-hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                    >
                      {seoConfig.contactEmail}
                    </a>
                  </div>
                </div>
                <a
                  href={seoConfig.phoneHref}
                  aria-label={`Appeler ANAVA STUDIO au ${seoConfig.phone}`}
                  onClick={() => trackPhoneClick('contact_section')}
                  className="flex items-start space-x-4 group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary shrink-0 group-hover:border-primary/30 transition-colors duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg text-white">Téléphone</h4>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">{seoConfig.phone}</p>
                  </div>
                </a>
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary shrink-0 group-hover:border-primary/30 transition-colors duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg text-white">Localisation</h4>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">France - Travail à distance & Déplacements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 md:p-10 rounded-2xl border border-border shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nom</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Votre nom complet" 
                    required
                    maxLength={100}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    disabled={isSubmitting}
                    className="bg-background border-border text-white placeholder:text-muted-foreground focus:border-primary/50 transition-colors" 
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="text-sm text-destructive" role="alert">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    required
                    maxLength={254}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                    className="bg-background border-border text-white placeholder:text-muted-foreground focus:border-primary/50 transition-colors" 
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="text-sm text-destructive" role="alert">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Parlez-nous de votre projet..." 
                    required
                    maxLength={5000}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                    disabled={isSubmitting}
                    className="min-h-[150px] bg-background border-border text-white placeholder:text-muted-foreground focus:border-primary/50 transition-colors" 
                  />
                  {fieldErrors.message && (
                    <p id="message-error" className="text-sm text-destructive" role="alert">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>
                <div className="hidden" aria-hidden="true">
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    disabled={isSubmitting}
                  />
                </div>
                {formMessage && (
                  <p
                    className="text-sm text-muted-foreground"
                    role="status"
                    aria-live="polite"
                  >
                    {formMessage}
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-full" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : (
                    <>
                      Envoyer le message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
