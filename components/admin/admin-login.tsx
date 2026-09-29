'use client'

import { useActionState } from 'react'
import { Loader2, Lock, ShieldCheck } from 'lucide-react'
import { login, type LoginState } from '@/app/actions/admin'

export function AdminLogin({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {})

  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted/40 px-6 py-10">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="size-5" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-xl font-bold tracking-tight text-foreground">Panel administracyjny</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kewin Dance — nauka tańca</p>

          {configured ? (
            <form action={formAction} className="mt-7 flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Hasło dostępu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                autoFocus
                aria-invalid={Boolean(state.error)}
                aria-describedby={state.error ? 'password-error' : undefined}
                className="h-11 rounded-lg border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {state.error && (
                <p id="password-error" role="alert" className="text-sm font-medium text-destructive">
                  {state.error}
                </p>
              )}
              <button
                type="submit"
                disabled={pending}
                className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70"
              >
                {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                Zaloguj się
              </button>
            </form>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
              Panel nie jest jeszcze skonfigurowany. Dodaj zmienną{' '}
              <code className="rounded bg-background px-1 py-0.5 font-mono text-xs text-foreground">ADMIN_PASSWORD</code>{' '}
              (min. 8 znaków) w ustawieniach projektu.
            </div>
          )}
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Dostęp wyłącznie dla administratora
        </p>
      </div>
    </main>
  )
}
