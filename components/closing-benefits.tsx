import { ChartNoAxesColumnIncreasing, Heart, Phone, UsersRound } from 'lucide-react'

const benefits = [
  { icon: UsersRound, label: ['Spędźcie', 'czas razem'] },
  { icon: Heart, label: ['Nauczcie się', 'podstaw'] },
  { icon: ChartNoAxesColumnIncreasing, label: ['Poprawcie', 'komunikację'] },
]

const CONTACT_NAME = 'Kewin Stempka'
const CONTACT_PHONE = '662 851 911'
const CONTACT_PHONE_HREF = 'tel:+48662851911'

type ClosingBenefitsProps = {
  start: string
  highlight?: string
  end?: string
}

export function ClosingBenefits({ start, highlight, end }: ClosingBenefitsProps) {
  return (
    <div className="relative isolate mt-16 sm:mt-20">
      <div
        className="pointer-events-none absolute inset-x-[-20%] -top-14 -bottom-10 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,color-mix(in_oklab,var(--background)_95%,transparent)_0%,color-mix(in_oklab,var(--background)_75%,transparent)_45%,transparent_80%)] blur-xl"
        aria-hidden="true"
      />

      <p className="text-center font-serif text-lg font-semibold leading-tight text-balance sm:text-xl">
        {start} {highlight && <span className="text-primary">{highlight}</span>} {end}
      </p>
      <span className="mx-auto mt-2 block h-px w-8 bg-primary" aria-hidden="true" />

      <ul className="mx-auto mt-4 grid max-w-md grid-cols-3 divide-x divide-border">
        {benefits.map(({ icon: Icon, label }) => (
          <li key={label.join(' ')} className="flex flex-col items-center px-2 text-center">
            <span className="flex size-9 items-center justify-center rounded-full bg-muted sm:size-10">
              <Icon className="size-4 stroke-[1.5] sm:size-[18px]" aria-hidden="true" />
            </span>
            <p className="mt-2 text-[11px] leading-snug text-foreground/80 sm:text-xs">
              <span className="block">{label[0]}</span>
              {label[1]}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-foreground/80 sm:text-sm">
        <span className="font-semibold text-foreground">{CONTACT_NAME}</span>
        <span className="h-3 w-px bg-border" aria-hidden="true" />
        <a
          href={CONTACT_PHONE_HREF}
          className="inline-flex items-center gap-1.5 font-medium underline-offset-4 transition hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Phone className="size-3.5 text-primary" aria-hidden="true" />
          {CONTACT_PHONE}
        </a>
      </p>
    </div>
  )
}
