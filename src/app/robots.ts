import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'https://gerrys.net'
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/search'] }],
    sitemap: `${base}/sitemap.xml`,
  }
}
