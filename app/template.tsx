'use client'

import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const direction = pathname === '/' ? 'back' : 'forward'

  return (
    <div className="page-transition overflow-x-clip" data-direction={direction}>
      {children}
    </div>
  )
}
