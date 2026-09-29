import type { Metadata } from 'next'
import { desc } from 'drizzle-orm'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { Logo } from '@/components/logo'
import { AdminLogin } from '@/components/admin/admin-login'
import { ContentEditor } from '@/components/admin/content-editor'
import { RegistrationsList } from '@/components/admin/registrations-list'
import { logout } from '@/app/actions/admin'
import { isAdmin, isAdminConfigured } from '@/lib/admin-auth'
import { getContent } from '@/lib/content'
import { db } from '@/lib/db'
import { registrations } from '@/lib/db/schema'

export const metadata: Metadata = {
  title: 'Panel administracyjny',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <AdminLogin configured={isAdminConfigured()} />
  }

  const [rows, content] = await Promise.all([
    db.select().from(registrations).orderBy(desc(registrations.createdAt)),
    getContent(),
  ])

  return (
    <div className="min-h-dvh bg-muted/40">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-3">
            <Logo className="scale-[0.8] origin-left" />
            <span className="hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
            <span className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:inline-flex">
              <LayoutDashboard className="size-3.5" aria-hidden="true" />
              Panel administracyjny
            </span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Wyloguj</span>
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-8 sm:px-8 sm:py-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Pulpit</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Zarządzaj zapisami par i treścią strony głównej w jednym miejscu.
          </p>
        </div>
        <RegistrationsList
          rows={rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))}
        />
        <ContentEditor content={content} />
      </main>
    </div>
  )
}
