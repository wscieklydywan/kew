import { Mail, Phone, Trash2, Users } from 'lucide-react'
import { deleteRegistration } from '@/app/actions/admin'

type Row = {
  id: number
  name: string
  partnerName: string
  phone: string
  email: string | null
  createdAt: string
}

const dateFormat = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Warsaw',
})

export function RegistrationsList({ rows }: { rows: Row[] }) {
  return (
    <section aria-labelledby="registrations-heading" className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="registrations-heading" className="text-xl font-bold tracking-tight text-foreground">
            Zapisane pary
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Osoby, które dały znać, że będą.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3.5 py-2 text-sm font-bold text-primary">
          <Users className="size-4" aria-hidden="true" />
          {rows.length} {rows.length === 1 ? 'para' : rows.length % 10 >= 2 && rows.length % 10 <= 4 && (rows.length % 100 < 10 || rows.length % 100 >= 20) ? 'pary' : 'par'}
          <span className="font-normal">({rows.length * 2} os.)</span>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Nikt się jeszcze nie zapisał.
        </p>
      ) : (
        <ul className="mt-6 flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-col gap-3 bg-card p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-semibold">
                  {r.name} <span className="text-primary">&amp;</span> {r.partnerName}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <a href={`tel:${r.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                    <Phone className="size-3.5" aria-hidden="true" />
                    {r.phone}
                  </a>
                  {r.email && (
                    <a href={`mailto:${r.email}`} className="inline-flex min-w-0 items-center gap-1.5 hover:text-foreground">
                      <Mail className="size-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{r.email}</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <time dateTime={r.createdAt} className="text-xs text-muted-foreground">
                  {dateFormat.format(new Date(r.createdAt))}
                </time>
                <form action={deleteRegistration}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    aria-label={`Usuń zapis: ${r.name} i ${r.partnerName}`}
                    className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
