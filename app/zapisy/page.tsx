import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/logo'
import { RegistrationForm } from '@/components/registration-form'
import { Features } from '@/components/features'
import { getContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Zapisy | Kewin Dance',
  description: 'Wypełnijcie krótki formularz i dajcie znać, że będziecie na darmowym kursie tańca dla par.',
}

export default async function SignupPage() {
  const c = await getContent()
  return (
    <div className="relative isolate min-h-dvh bg-background">
      <Image
        src="/images/silk-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-6 pb-10 pt-8 sm:px-8">
        <header className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center">
          <Link
            href="/"
            aria-label="Wróć do strony głównej"
            className="flex size-10 items-center justify-center rounded-full hover:bg-secondary"
          >
            <ArrowLeft className="size-6" aria-hidden="true" />
          </Link>
          <div className="flex justify-center">
            <Logo />
          </div>
        </header>

        <main className="flex-1">
          <h1 className="mt-9 font-serif font-semibold leading-[1.08] sm:mt-12">
            <span className="block text-4xl text-balance sm:text-5xl">
              Spotkajmy się <span className="text-primary">na parkiecie</span>.
            </span>
          </h1>
          <span className="mt-4 block h-0.5 w-10 bg-primary sm:w-11" aria-hidden="true" />
          <p className="mt-5 text-[15px] leading-relaxed sm:mt-6 sm:text-lg">
            Wypełnijcie krótki formularz, żebyśmy mogli lepiej przygotować zajęcia.
          </p>

          <RegistrationForm eventSummary={`${c.dateLabel}, ${c.timeLabel} – ${c.city}, ${c.street}`} />
          <Features />
        </main>

        <footer className="mt-12 flex flex-col items-center sm:mt-14">
          <span className="h-px w-9 bg-muted-foreground/50" aria-hidden="true" />
          <p className="mt-6 text-xs tracking-[0.25em] sm:mt-7 sm:text-sm">KEWIN DANCE</p>
          <p className="mt-1 text-[10px] tracking-[0.25em] text-muted-foreground">NAUKA TAŃCA</p>
        </footer>
      </div>
    </div>
  )
}
