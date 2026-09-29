'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { registrations } from '@/lib/db/schema'

const schema = z.object({
  name: z.string().trim().min(2, 'Podaj swoje imię.').max(60),
  partnerName: z.string().trim().min(2, 'Podaj imię partnera/partnerki.').max(60),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{9,16}$/, 'Podaj poprawny numer telefonu.'),
  email: z
    .union([z.literal(''), z.string().trim().email('Podaj poprawny adres e-mail.').max(120)])
    .optional(),
})

export type RegisterState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'partnerName' | 'phone' | 'email', string>>
  values?: Record<string, string>
}

export async function register(_prev: RegisterState, formData: FormData): Promise<RegisterState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    partnerName: String(formData.get('partnerName') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    email: String(formData.get('email') ?? ''),
  }

  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    const errors: RegisterState['errors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<RegisterState['errors']>
      if (!errors[key]) errors[key] = issue.message
    }
    return { status: 'error', errors, values: raw }
  }

  try {
    await db.insert(registrations).values({
      name: parsed.data.name,
      partnerName: parsed.data.partnerName,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
    })
    return { status: 'success' }
  } catch (error) {
    console.error('Registration failed', error)
    return {
      status: 'error',
      message: 'Coś poszło nie tak. Spróbujcie ponownie za chwilę.',
      values: raw,
    }
  }
}
