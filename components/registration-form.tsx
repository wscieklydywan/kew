'use client'

import { useActionState, type ComponentType } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Loader2, Mail, Phone, UserRound } from 'lucide-react'
import { register, type RegisterState } from '@/app/actions/register'
import { cn } from '@/lib/utils'

const initialState: RegisterState = { status: 'idle' }

type FieldProps = {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  type?: string
  autoComplete?: string
  inputMode?: 'tel' | 'email' | 'text'
  required?: boolean
  error?: string
  defaultValue?: string
  hint?: string
  className?: string
}

function Field({ id, label, icon: Icon, type = 'text', error, hint, className, ...rest }: FieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div
        className={cn(
          'flex h-13 items-center gap-1.5 rounded-xl border bg-card/80 px-2 transition min-[360px]:px-2.5 sm:h-15 sm:gap-2.5 sm:px-3.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
          error && 'border-destructive',
        )}
      >
        <Icon className="size-4 shrink-0 text-muted-foreground sm:size-5" aria-hidden="true" />
        <input
          id={id}
          name={id}
          type={type}
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="h-full w-full min-w-0 bg-transparent text-[12.5px] outline-none min-[360px]:text-[13px] min-[400px]:text-sm placeholder:text-muted-foreground"
          {...rest}
        />
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-center text-[11px] text-muted-foreground sm:text-xs">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function RegistrationForm({ eventSummary }: { eventSummary: string }) {
  const [state, formAction, pending] = useActionState(register, initialState)

  if (state.status === 'success') {
    return (
      <div role="status" className="mt-10 rounded-2xl border bg-card/80 p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden="true" />
        <h2 className="mt-4 font-serif text-2xl font-semibold sm:text-3xl">Dziękujemy!</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Zapisaliśmy Was na kurs. Do zobaczenia!
          <span className="mt-1 block font-semibold text-foreground">{eventSummary}</span>
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold uppercase tracking-wide text-primary">
          Wróć na stronę główną
        </Link>
      </div>
    )
  }

  const v = state.values ?? {}
  const e = state.errors ?? {}

  return (
    <form action={formAction} noValidate className="mt-10 flex flex-col gap-3.5">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        <Field id="name" label="Imię (Ty)" icon={UserRound} autoComplete="given-name" required error={e.name} defaultValue={v.name} />
        <Field id="partnerName" label="Imię partnera/ki" icon={UserRound} autoComplete="off" required error={e.partnerName} defaultValue={v.partnerName} />
      </div>
      <Field
        id="phone"
        label="Numer telefonu"
        icon={Phone}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        error={e.phone}
        defaultValue={v.phone}
        hint="Damy znać tylko w razie ważnych informacji."
      />
      <Field
        id="email"
        label="Adres e-mail (opcjonalnie)"
        icon={Mail}
        type="email"
        inputMode="email"
        autoComplete="email"
        error={e.email}
        defaultValue={v.email}
      />

      {state.message && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 inline-flex h-13 w-full items-center justify-center gap-3 rounded-full bg-primary px-6 text-[13px] font-bold sm:mt-5 sm:h-16 sm:gap-4 uppercase tracking-wide text-primary-foreground shadow-[0_12px_30px_-12px] shadow-primary/70 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:opacity-70 sm:text-base"
      >
        {pending ? (
          <>
            Wysyłanie
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Daj znać, że będziemy
            <ArrowRight className="size-5" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}
