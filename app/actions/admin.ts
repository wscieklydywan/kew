'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { registrations, siteContent } from '@/lib/db/schema'
import { CONTENT_ROW_ID, contentSchema, type SiteContent } from '@/lib/content'
import {
  ADMIN_COOKIE,
  checkPassword,
  createSessionToken,
  isAdmin,
  sessionCookieOptions,
} from '@/lib/admin-auth'
import {
  checkLoginRateLimit,
  registerFailedLogin,
  resetLoginRateLimit,
} from '@/lib/rate-limit'

export type LoginState = { error?: string }

async function getClientKey() {
  const { headers } = await import('next/headers')
  const h = await headers()
  const forwarded = h.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  return `login:${ip}`
}

function blockedMessage(seconds?: number) {
  const minutes = Math.max(1, Math.ceil((seconds ?? 0) / 60))
  return `Zbyt wiele prób logowania. Spróbuj ponownie za ${minutes} min.`
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const key = await getClientKey()

  const limit = checkLoginRateLimit(key)
  if (!limit.allowed) {
    return { error: blockedMessage(limit.retryAfterSeconds) }
  }

  const password = String(formData.get('password') ?? '')
  if (!checkPassword(password)) {
    const result = registerFailedLogin(key)
    await new Promise((resolve) => setTimeout(resolve, 600))
    if (!result.allowed) {
      return { error: blockedMessage(result.retryAfterSeconds) }
    }
    return { error: 'Nieprawidłowe hasło.' }
  }

  resetLoginRateLimit(key)
  ;(await cookies()).set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions)
  revalidatePath('/warsztat')
  return {}
}

export async function logout() {
  ;(await cookies()).delete(ADMIN_COOKIE)
  revalidatePath('/warsztat')
}

export type ContentState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<keyof SiteContent, string>>
}

export async function saveContent(_prev: ContentState, formData: FormData): Promise<ContentState> {
  if (!(await isAdmin())) return { status: 'error', message: 'Sesja wygasła. Zaloguj się ponownie.' }

  const raw = Object.fromEntries(
    Object.keys(contentSchema.shape).map((key) => [key, String(formData.get(key) ?? '')]),
  )
  const parsed = contentSchema.safeParse(raw)
  if (!parsed.success) {
    const errors: ContentState['errors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof SiteContent
      if (!errors[key]) errors[key] = issue.message
    }
    return { status: 'error', message: 'Popraw zaznaczone pola.', errors }
  }

  await db
    .insert(siteContent)
    .values({ id: CONTENT_ROW_ID, data: parsed.data })
    .onConflictDoUpdate({
      target: siteContent.id,
      set: { data: parsed.data, updatedAt: new Date() },
    })

  revalidatePath('/', 'layout')
  return { status: 'success', message: 'Zapisano zmiany na stronie.' }
}

export async function deleteRegistration(formData: FormData) {
  if (!(await isAdmin())) throw new Error('Unauthorized')
  const id = Number(formData.get('id'))
  if (!Number.isInteger(id) || id <= 0) return
  await db.delete(registrations).where(eq(registrations.id, id))
  revalidatePath('/warsztat')
}
