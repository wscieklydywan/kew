'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ExternalLink, Loader2 } from 'lucide-react'
import { saveContent, type ContentState } from '@/app/actions/admin'
import type { SiteContent } from '@/lib/content'
import { cn } from '@/lib/utils'

type FieldDef = { name: keyof SiteContent; label: string; multiline?: boolean; optional?: boolean; wide?: boolean }

const groups: { title: string; fields: FieldDef[] }[] = [
  {
    title: 'Tytuł',
    fields: [
      { name: 'eyebrow', label: 'Nadtytuł (mały napis nad tytułem)', wide: true },
      { name: 'titleTop', label: 'Tytuł – 1. linia' },
      { name: 'titleHighlight', label: 'Tytuł – 2. linia (czerwona)' },
      { name: 'titleBottom', label: 'Tytuł – 3. linia' },
    ],
  },
  {
    title: 'Termin i miejsce',
    fields: [
      { name: 'dateLabel', label: 'Data (np. 30 września)' },
      { name: 'timeLabel', label: 'Godzina (np. godz. 20:00)' },
      { name: 'city', label: 'Miejscowość' },
      { name: 'street', label: 'Adres' },
      { name: 'venue', label: 'Miejsce (np. sala gimnastyczna)', optional: true },
    ],
  },
  {
    title: 'Pozostałe teksty',
    fields: [
      { name: 'description', label: 'Opis pod terminem', multiline: true, wide: true },
      { name: 'ctaLabel', label: 'Tekst przycisku', wide: true },
      { name: 'closingStart', label: 'Hasło na dole – początek' },
      { name: 'closingHighlight', label: 'Hasło – środek (czerwony)', optional: true },
      { name: 'closingEnd', label: 'Hasło – końcówka', optional: true },
    ],
  },
]

const inputClass =
  'w-full rounded-lg border border-input bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'

export function ContentEditor({ content }: { content: SiteContent }) {
  const [state, formAction, pending] = useActionState<ContentState, FormData>(saveContent, { status: 'idle' })
  const errors = state.errors ?? {}

  return (
    <section aria-labelledby="content-heading" className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="content-heading" className="text-xl font-bold tracking-tight text-foreground">
            Treść strony głównej
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Zmiany pojawią się na stronie od razu po zapisaniu.</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Podgląd strony
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      <form action={formAction} noValidate className="mt-6 flex flex-col gap-8">
        {groups.map((group) => (
          <fieldset key={group.title} className="flex flex-col gap-4">
            <legend className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              {group.title}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.fields.map((f) => {
                const id = `content-${f.name}`
                const error = errors[f.name]
                return (
                  <div key={f.name} className={cn('flex flex-col gap-1.5', f.wide && 'sm:col-span-2')}>
                    <label htmlFor={id} className="text-sm font-semibold">
                      {f.label}
                      {f.optional && <span className="font-normal text-muted-foreground"> (opcjonalnie)</span>}
                    </label>
                    {f.multiline ? (
                      <textarea
                        id={id}
                        name={f.name}
                        rows={3}
                        defaultValue={content[f.name]}
                        aria-invalid={Boolean(error)}
                        className={cn(inputClass, 'py-3', error && 'border-destructive')}
                      />
                    ) : (
                      <input
                        id={id}
                        name={f.name}
                        defaultValue={content[f.name]}
                        aria-invalid={Boolean(error)}
                        className={cn(inputClass, 'h-11', error && 'border-destructive')}
                      />
                    )}
                    {error && <p className="text-xs font-medium text-destructive">{error}</p>}
                  </div>
                )
              })}
            </div>
          </fieldset>
        ))}

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p
            role="status"
            className={cn(
              'flex items-center gap-2 text-sm font-medium',
              state.status === 'success' ? 'text-emerald-700' : 'text-destructive',
            )}
          >
            {state.status === 'success' && <CheckCircle2 className="size-4" aria-hidden="true" />}
            {state.message}
          </p>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70"
          >
            {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            Zapisz zmiany
          </button>
        </div>
      </form>
    </section>
  )
}
