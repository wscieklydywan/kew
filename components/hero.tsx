import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { ClosingBenefits } from '@/components/closing-benefits'
import { Logo } from '@/components/logo'
import type { SiteContent } from '@/lib/content'

export function Hero({ content: c }: { content: SiteContent }) {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-background">
      <div className="absolute inset-y-0 right-0 -z-10 w-[78%] sm:w-[60%] lg:w-[52%]">
        <Image
          src="/images/couple.webp"
          alt="Para tańcząca w jasnej sali – kobieta w czarnej sukience i mężczyzna w czarnej koszuli"
          fill
          priority
          sizes="(min-width: 1024px) 52vw, (min-width: 640px) 60vw, 78vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent" />
      </div>

      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 pb-10 pt-8 sm:px-10">
        <header className="flex items-start">
          <Logo />
        </header>

        <section id="szczegoly" className="mt-9 flex max-w-md flex-1 flex-col sm:mt-12 lg:mt-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground sm:text-xs">{c.eyebrow}</p>
          <span className="mt-4 h-0.5 w-10 bg-primary sm:mt-5 sm:w-11" aria-hidden="true" />

          <h1 className="mt-6 font-serif text-[2rem] font-semibold uppercase leading-[1.08] text-balance sm:mt-7 sm:text-6xl">
            {c.titleTop} <span className="block text-primary">{c.titleHighlight}</span> {c.titleBottom}
          </h1>

          <dl className="mt-7 flex flex-col gap-5 sm:mt-9 sm:gap-6">
            <div className="flex gap-3 sm:gap-4">
              <dt>
                <CalendarDays className="size-6 text-primary sm:size-7" aria-hidden="true" />
                <span className="sr-only">Termin</span>
              </dt>
              <dd className="text-[15px] leading-snug sm:text-lg">
                <span className="block font-bold">{c.dateLabel}</span>
                {c.timeLabel}
              </dd>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <dt>
                <MapPin className="size-6 text-primary sm:size-7" aria-hidden="true" />
                <span className="sr-only">Miejsce</span>
              </dt>
              <dd className="text-[15px] leading-snug sm:text-lg">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    [c.venue, c.street, c.city].filter(Boolean).join(', '),
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block underline-offset-4 transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="block font-bold">{c.city}</span>
                  <span className="block group-hover:underline">{c.street}</span>
                  {c.venue && <span className="block group-hover:underline">{c.venue}</span>}
                  <span className="sr-only"> (otwórz w Mapach Google)</span>
                </a>
              </dd>
            </div>
          </dl>

          <span className="mt-7 h-0.5 w-10 bg-primary sm:mt-8 sm:w-11" aria-hidden="true" />

          <div className="relative mt-6 w-fit sm:mt-7">
            <div
              className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--background)_35%,transparent_72%)] opacity-95 blur-xl"
              aria-hidden="true"
            />
            <p className="max-w-[14rem] text-sm leading-relaxed text-foreground/80 sm:max-w-xs sm:text-base">
              {c.description}
            </p>
          </div>

          <Link
            href="/zapisy"
            className="mt-7 inline-flex h-13 w-fit items-center gap-3 rounded-full bg-primary px-6 text-[13px] font-bold sm:mt-9 sm:h-16 sm:gap-4 sm:px-8 uppercase tracking-wide text-primary-foreground shadow-[0_12px_30px_-12px] shadow-primary/70 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-base"
          >
            {c.ctaLabel}
            <ArrowRight className="size-4 sm:size-5" aria-hidden="true" />
          </Link>
        </section>

        <ClosingBenefits start={c.closingStart} highlight={c.closingHighlight} end={c.closingEnd} />
      </div>
    </main>
  )
}
