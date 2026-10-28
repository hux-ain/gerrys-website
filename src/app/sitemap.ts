import type { MetadataRoute } from 'next'
import { pageIndex } from '@/content/pages'
import { getPosts } from '@/lib/getContent'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'https://gerrys.net'
  const posts = await getPosts()
  return [
    ...pageIndex.map((p) => ({ url: `${base}${p.url === '/' ? '' : p.url}`, changeFrequency: 'monthly' as const, priority: p.url === '/' ? 1 : 0.8 })),
    ...posts.map((p) => ({ url: `${base}/${p.slug}`, lastModified: p.date || undefined, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ]
}
