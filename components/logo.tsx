import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Kewin Dance – strona główna"
      className={cn('inline-flex flex-col items-end font-serif leading-none text-foreground', className)}
    >
      <span className="text-[1.7rem] font-semibold tracking-tight sm:text-[2.15rem]" aria-hidden="true">
        KE<span className="text-primary">W</span>
        <span className="relative">
          I
          <span className="absolute top-[0.1em] left-1/2 size-[0.19em] -translate-x-1/2 rounded-full bg-primary" />
        </span>
        N
      </span>
      <span className="-mt-0.5 text-xs font-semibold tracking-wide sm:text-sm" aria-hidden="true">
        DANCE
      </span>
    </Link>
  )
}
