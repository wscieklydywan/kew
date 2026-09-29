import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.kewindance.pl'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/zapisy`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
