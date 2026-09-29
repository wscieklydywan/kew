import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'kd_admin'
const SESSION_MAX_AGE = 60 * 60 * 12

function getPassword() {
  return process.env.ADMIN_PASSWORD ?? ''
}

function sign(value: string) {
  return createHmac('sha256', getPassword()).update(value).digest('hex')
}

function safeEqual(a: string, b: string) {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}

export function isAdminConfigured() {
  return getPassword().length >= 8
}

export function checkPassword(input: string) {
  return isAdminConfigured() && safeEqual(input, getPassword())
}

export function createSessionToken() {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000)
  return `${expires}.${sign(expires)}`
}

export async function isAdmin() {
  if (!isAdminConfigured()) return false
  const token = (await cookies()).get(ADMIN_COOKIE)?.value
  if (!token) return false
  const [expires, signature] = token.split('.')
  if (!expires || !signature || Number(expires) < Date.now()) return false
  return safeEqual(signature, sign(expires))
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: process.env.NODE_ENV === 'development' ? ('none' as const) : ('lax' as const),
  path: '/',
  maxAge: SESSION_MAX_AGE,
}
