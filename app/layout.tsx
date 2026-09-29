import type { Metadata, Viewport } from 'next'
import { Nunito_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const nunito = Nunito_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-nunito' })
const playfair = Playfair_Display({ subsets: ['latin', 'latin-ext'], variable: '--font-playfair' })

const siteUrl = 'https://www.kewindance.pl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kewin Dance – nauka tańca dla par | Darmowy kurs tańca',
    template: '%s | Kewin Dance',
  },
  description:
    'Kewin Dance – nauka tańca dla par. Zapisz się na darmowy kurs tańca i zrób pierwszy krok razem. Nie musisz umieć tańczyć – wystarczy, że przyjdziecie we dwoje. Zapisy online.',
  applicationName: 'Kewin Dance',
  keywords: [
    'nauka tańca',
    'kurs tańca dla par',
    'darmowy kurs tańca',
    'lekcje tańca',
    'pierwszy taniec',
    'taniec dla par',
    'szkoła tańca',
    'zajęcia taneczne',
    'Kewin Dance',
  ],
  authors: [{ name: 'Kewin Dance', url: siteUrl }],
  creator: 'Kewin Dance',
  publisher: 'Kewin Dance',
  category: 'education',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: siteUrl,
    siteName: 'Kewin Dance',
    title: 'Kewin Dance – nauka tańca dla par',
    description:
      'Darmowy kurs tańca dla par. Nie musisz umieć tańczyć – przyjdźcie razem i zróbcie pierwszy krok. Zapisy online.',
    images: [
      {
        url: '/images/couple.webp',
        width: 1200,
        height: 630,
        alt: 'Para tańcząca podczas kursu Kewin Dance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kewin Dance – nauka tańca dla par',
    description: 'Darmowy kurs tańca dla par. Zróbcie pierwszy krok razem.',
    images: ['/images/couple.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8f5f1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className={`${nunito.variable} ${playfair.variable} light`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
