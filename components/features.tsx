import { GraduationCap, Heart, UsersRound } from 'lucide-react'

const features = [
  { icon: UsersRound, title: 'Dla par', text: 'w każdym wieku' },
  { icon: GraduationCap, title: 'Od podstaw', text: 'bez doświadczenia' },
  { icon: Heart, title: 'Na luzie', text: 'bez stresu i presji' },
]

export function Features() {
  return (
    <ul className="mt-11 grid grid-cols-3 divide-x divide-border sm:mt-14">
      {features.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex min-w-0 flex-col items-center justify-start px-1 text-center">
          <Icon className="size-6 stroke-[1.5] sm:size-8" aria-hidden="true" />
          <p className="mt-3 whitespace-nowrap font-serif text-[13px] font-semibold leading-tight sm:mt-4 sm:text-[15px]">
            {title}
          </p>
          <p className="mt-1 whitespace-nowrap text-[10.5px] leading-snug text-muted-foreground sm:text-sm">{text}</p>
        </li>
      ))}
    </ul>
  )
}
