// Prosty limiter oparty na pamięci instancji. Chroni logowanie przed atakami
// typu brute-force bez potrzeby zewnętrznej infrastruktury (Redis itp.).
// Uwaga: w środowisku serverless licznik jest per-instancja, co przy logowaniu
// admina jest wystarczające jako podstawowa ochrona. Dla twardych gwarancji
// w skali wielu instancji warto podłączyć współdzielony magazyn (np. Upstash Redis).

type Attempt = { count: number; firstAt: number; blockedUntil?: number }

const attempts = new Map<string, Attempt>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minut
const BLOCK_MS = 15 * 60 * 1000 // blokada na 15 minut po przekroczeniu limitu

function cleanup(now: number) {
  for (const [key, a] of attempts) {
    const expired = now - a.firstAt > WINDOW_MS && (!a.blockedUntil || a.blockedUntil < now)
    if (expired) attempts.delete(key)
  }
}

export type RateLimitResult = { allowed: boolean; retryAfterSeconds?: number }

export function checkLoginRateLimit(key: string): RateLimitResult {
  const now = Date.now()
  cleanup(now)
  const a = attempts.get(key)

  if (a?.blockedUntil && a.blockedUntil > now) {
    return { allowed: false, retryAfterSeconds: Math.ceil((a.blockedUntil - now) / 1000) }
  }
  return { allowed: true }
}

export function registerFailedLogin(key: string): RateLimitResult {
  const now = Date.now()
  const a = attempts.get(key)

  if (!a || now - a.firstAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAt: now })
    return { allowed: true }
  }

  a.count += 1
  if (a.count >= MAX_ATTEMPTS) {
    a.blockedUntil = now + BLOCK_MS
    return { allowed: false, retryAfterSeconds: Math.ceil(BLOCK_MS / 1000) }
  }
  return { allowed: true }
}

export function resetLoginRateLimit(key: string) {
  attempts.delete(key)
}
