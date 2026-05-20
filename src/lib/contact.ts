import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string({
      required_error: 'Le nom est requis.',
      invalid_type_error: 'Le nom est requis.',
    })
    .trim()
    .min(1, 'Le nom est requis.')
    .max(100, 'Le nom ne doit pas dépasser 100 caractères.'),
  email: z
    .string({
      required_error: "L'email est requis.",
      invalid_type_error: "L'email est requis.",
    })
    .trim()
    .email('Adresse email invalide.')
    .max(254, 'Adresse email trop longue.'),
  message: z
    .string({
      required_error: 'Le message est requis.',
      invalid_type_error: 'Le message est requis.',
    })
    .trim()
    .min(1, 'Le message est requis.')
    .max(5000, 'Le message ne doit pas dépasser 5000 caractères.'),
  website: z.string().optional(),
})

export type ContactRequest = z.infer<typeof contactSchema>

export type ContactFieldErrors = Partial<Record<keyof ContactRequest, string>>

export type ContactResponse =
  | {
      ok: true
      message: string
    }
  | {
      ok: false
      message: string
      fieldErrors?: ContactFieldErrors
    }
