import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { getContent } from '@/lib/content'

const siteUrl = 'https://www.kewindance.pl'

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent()
  const title = `${c.titleTop} ${c.titleHighlight} ${c.titleBottom}`
  const niceTitle = `${title.charAt(0).toUpperCase()}${title.slice(1).toLowerCase()}`
  const description = `${title} – ${c.dateLabel}, ${c.timeLabel}, ${c.city}, ${c.street}. ${c.description}`
  return {
    title: `${niceTitle} | Kewin Dance`,
    description,
    alternates: { canonical: '/' },
    openGraph: {
      title: `${niceTitle} | Kewin Dance`,
      description,
      url: siteUrl,
    },
  }
}

export default async function Page() {
  const c = await getContent()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DanceSchool',
        '@id': `${siteUrl}/#organization`,
        name: 'Kewin Dance',
        alternateName: 'Kewin Dance – nauka tańca',
        url: siteUrl,
        description:
          'Kewin Dance – nauka tańca dla par. Darmowy kurs tańca dla początkujących.',
        areaServed: c.city,
        address: {
          '@type': 'PostalAddress',
          streetAddress: c.street,
          addressLocality: c.city,
          addressCountry: 'PL',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Kewin Dance',
        inLanguage: 'pl-PL',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Course',
        name: `${c.titleTop} ${c.titleHighlight} ${c.titleBottom}`,
        description: c.description,
        inLanguage: 'pl-PL',
        provider: { '@id': `${siteUrl}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'PLN',
          availability: 'https://schema.org/InStock',
          url: `${siteUrl}/zapisy`,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero content={c} />
    </>
  )
}
