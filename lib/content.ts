import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/lib/db'
import { siteContent } from '@/lib/db/schema'

const field = (max: number) => z.string().trim().min(1, 'To pole nie może być puste.').max(max)

export const contentSchema = z.object({
  eyebrow: field(40),
  titleTop: field(40),
  titleHighlight: field(40),
  titleBottom: field(40),
  dateLabel: field(40),
  timeLabel: field(40),
  city: field(60),
  street: field(80),
  venue: z.string().trim().max(80),
  description: field(240),
  ctaLabel: field(40),
  closingStart: field(40),
  closingHighlight: z.string().trim().max(40),
  closingEnd: z.string().trim().max(40),
})

export type SiteContent = z.infer<typeof contentSchema>

export const defaultContent: SiteContent = {
  eyebrow: 'Nauka tańca',
  titleTop: 'Darmowy',
  titleHighlight: 'kurs tańca',
  titleBottom: 'dla par',
  dateLabel: '30 września',
  timeLabel: 'godz. 20:00',
  city: 'Jejkowice',
  street: 'ul. Główna 42',
  venue: 'sala gimnastyczna',
  description: 'Nie musisz umieć tańczyć. Przyjdźcie razem i spróbujcie czegoś nowego.',
  ctaLabel: 'Daj znać, że będziecie',
  closingStart: 'Taniec',
  closingHighlight: 'łączy',
  closingEnd: 'ludzi',
}

export const CONTENT_ROW_ID = 1

export async function getContent(): Promise<SiteContent> {
  try {
    const [row] = await db.select().from(siteContent).where(eq(siteContent.id, CONTENT_ROW_ID))
    if (!row) return defaultContent
    const parsed = contentSchema.partial().safeParse(row.data)
    return parsed.success ? { ...defaultContent, ...parsed.data } : defaultContent
  } catch (error) {
    console.error('Failed to load site content', error)
    return defaultContent
  }
}
