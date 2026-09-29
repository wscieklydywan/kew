import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.kewindance.pl'

// Explicitly welcome general, search and AI crawlers so the site can be
// discovered and cited by Google, Bing and AI assistants. Only the private
// admin panel (/warsztat) is kept out of the index.
const allowedBots = [
  '*',
  'Googlebot',
  'Googlebot-Image',
  'Google-Extended',
  'Bingbot',
  'DuckDuckBot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Applebot',
  'Applebot-Extended',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedBots.map((userAgent) => ({
      userAgent,
      allow: '/',
      disallow: '/warsztat',
    })),
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
