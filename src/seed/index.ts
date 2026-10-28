/**
 * Fills a fresh database with the current gerrys.net content.
 *   npm run seed
 *
 * - Creates the first Super Admin (from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env)
 * - Downloads every image from the live site, converts it to WebP and stores it in Media
 * - Fills "Site Settings" and "Home Page" in the admin panel
 * Safe to run again: images already uploaded are reused.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { homeDefaults, siteDefaults } from '../content/defaults'
import { faqDefaults } from '../content/faqs'
import legacyPosts from '../content/posts.json'
import type { Img } from '../content/types'

const payload = await getPayload({ config })
const log = (m: string) => payload.logger.info(`[seed] ${m}`)

/* ---------- 1. Super Admin ---------- */
const { totalDocs: users } = await payload.count({ collection: 'users', overrideAccess: true })
if (users === 0) {
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (email && password) {
    await payload.create({
      collection: 'users',
      overrideAccess: true,
      data: { email, password, name: 'Super Admin', role: 'superadmin' } as never,
    })
    log(`Super Admin created: ${email}`)
  } else {
    log('No SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env, create the first user at /admin instead.')
  }
}

/* ---------- 2. Images ---------- */
const cache = new Map<string, string | number>()

async function upload(img?: Img): Promise<string | number | undefined> {
  if (!img?.url) return undefined
  if (cache.has(img.url)) return cache.get(img.url)
  const name = decodeURIComponent(img.url.split('/').pop()!.split('?')[0])

  // already uploaded in an earlier run?
  const base = name.replace(/\.[^.]+$/, '')
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { like: base } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    cache.set(img.url, existing.docs[0].id)
    return existing.docs[0].id
  }

  try {
    const res = await fetch(img.url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = Buffer.from(await res.arrayBuffer())
    const mimetype = res.headers.get('content-type')?.split(';')[0] || 'image/png'
    const doc = await payload.create({
      collection: 'media',
      overrideAccess: true,
      data: { alt: img.alt || base.replace(/[-_]/g, ' ') } as never,
      file: { data, mimetype, name, size: data.length },
    })
    cache.set(img.url, doc.id)
    log(`image ✓ ${name}`)
    return doc.id
  } catch (e) {
    payload.logger.warn(`[seed] image ✗ ${img.url} (${(e as Error).message})`)
    return undefined
  }
}

/* ---------- 3. Site settings ---------- */
await payload.updateGlobal({
  slug: 'site-settings',
  overrideAccess: true,
  data: siteDefaults as never,
})
log('Site Settings filled')

/* ---------- 4. Home page ---------- */
const h = homeDefaults
const home = {
  slides: await Promise.all(
    h.slides.map(async (s) => ({ active: true, image: await upload(s.image), heading: s.heading, text: s.text, buttonText: s.buttonText, buttonLink: s.buttonLink })),
  ),
  about: { heading: h.about.heading, paragraphs: h.about.paragraphs.map((text) => ({ text })), image: await upload(h.about.image) },
  stats: h.stats,
  services: [] as unknown[],
  partners: [] as unknown[],
  clients: [] as unknown[],
  achievements: [] as unknown[],
  testimonials: [] as unknown[],
  cta: { lineOne: h.cta.lineOne, lineTwo: h.cta.lineTwo, text: h.cta.text, background: await upload(h.cta.background) },
  contact: h.contact,
}
// sequential uploads for the lists keep the order stable and avoid overloading the old server
for (const s of h.services)
  home.services.push({ tabTitle: s.tabTitle, image: await upload(s.image), logo: await upload(s.logo), points: s.points.map((text) => ({ text })), link: s.link })
for (const p of h.partners) home.partners.push({ name: p.name, logo: await upload(p.logo) })
for (const c of h.clients) home.clients.push({ name: c.name, logo: await upload(c.logo) })
for (const a of h.achievements) home.achievements.push({ title: a.title, image: await upload(a.image) })
for (const t of h.testimonials) home.testimonials.push({ logo: await upload(t.logo), review: t.review, name: t.name, position: t.position })

await payload.updateGlobal({ slug: 'home', overrideAccess: true, data: home as never })
log('Home Page filled')

/* ---------- 5. FAQs ---------- */
const { totalDocs: faqCount } = await payload.count({ collection: 'faqs', overrideAccess: true })
if (faqCount === 0) {
  for (const [i, f] of faqDefaults.entries()) {
    await payload.create({ collection: 'faqs', overrideAccess: true, data: { ...f, order: i } as never })
  }
  log(`${faqDefaults.length} FAQs added`)
}

/* ---------- 6. Blogs & News from WordPress ---------- */
const mediaUrl = async (url: string, alt: string) => {
  const id = await upload({ url, alt })
  if (!id) return url
  const m = await payload.findByID({ collection: 'media', id, overrideAccess: true })
  return (m as { url?: string }).url || url
}
for (const p of legacyPosts) {
  const exists = await payload.find({ collection: 'posts', where: { slug: { equals: p.slug } }, limit: 1, overrideAccess: true, draft: true })
  if (exists.docs[0]) continue
  // move images that are inside the article into Media, and point the HTML at the new copies
  let html = p.html
  const srcs = [...new Set([...html.matchAll(/src="(https:\/\/gerrys\.net\/wp-content\/uploads\/[^"]+)"/g)].map((m) => m[1]))]
  for (const src of srcs) html = html.split(src).join(await mediaUrl(src, p.title))
  await payload.create({
    collection: 'posts',
    overrideAccess: true,
    data: {
      title: p.title,
      slug: p.slug,
      category: p.category === 'blog' ? 'blog' : 'news',
      publishedAt: new Date(p.date + 'T09:00:00').toISOString(),
      excerpt: p.excerpt,
      featuredImage: p.image ? await upload({ url: p.image, alt: p.title }) : undefined,
      legacyHtml: html,
      meta: { title: p.seoTitle || undefined, description: p.seoDesc || undefined },
      _status: 'published',
    } as never,
  })
  log(`post ✓ ${p.slug}`)
}

log('Done ✔  Open http://localhost:3000/admin')
process.exit(0)
