import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { homeDefaults, siteDefaults } from '@/content/defaults'
import type { Faq, HomeContent, Img, Job, Post, SiteContent } from '@/content/types'
import legacyPosts from '@/content/posts.json'
import { faqDefaults } from '@/content/faqs'

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Turn a Payload upload value into a simple {url, alt}. */
export const toImg = (v: any, fallback?: Img): Img | undefined =>
  v && typeof v === 'object' && v.url
    ? { url: v.url, alt: v.alt || '', width: v.width ?? undefined, height: v.height ?? undefined }
    : fallback

const list = <T,>(arr: any, map: (x: any) => T, fallback: T[]): T[] =>
  Array.isArray(arr) && arr.length > 0 ? arr.map(map) : fallback

const getPayloadSafe = cache(async () => {
  try {
    return await getPayload({ config })
  } catch (e) {
    console.warn('[content] Database not reachable, using built-in content.', (e as Error).message)
    return null
  }
})

export const getSite = cache(async (): Promise<SiteContent> => {
  const payload = await getPayloadSafe()
  if (!payload) return siteDefaults
  try {
    const s: any = await payload.findGlobal({ slug: 'site-settings' })
    return {
      topBar: {
        background: s?.topBar?.background || siteDefaults.topBar.background,
        showRibbon: Boolean(s?.topBar?.showRibbon),
      },
      email: s?.email || siteDefaults.email,
      phone: s?.phone || siteDefaults.phone,
      phoneLink: s?.phoneLink || siteDefaults.phoneLink,
      whatsapp: s?.whatsapp || siteDefaults.whatsapp,
      socials: {
        facebook: s?.socials?.facebook || siteDefaults.socials.facebook,
        instagram: s?.socials?.instagram || siteDefaults.socials.instagram,
        linkedin: s?.socials?.linkedin || siteDefaults.socials.linkedin,
      },
    }
  } catch {
    return siteDefaults
  }
})

export const getHome = cache(async (): Promise<HomeContent> => {
  const payload = await getPayloadSafe()
  if (!payload) return homeDefaults
  try {
    const h: any = await payload.findGlobal({ slug: 'home', depth: 1 })
    const d = homeDefaults
    return {
      slides: list(
        (h?.slides || []).filter((s: any) => s.active !== false),
        (s) => ({ image: toImg(s.image), heading: s.heading, text: s.text, buttonText: s.buttonText, buttonLink: s.buttonLink }),
        d.slides,
      ),
      about: {
        heading: h?.about?.heading || d.about.heading,
        paragraphs: list(h?.about?.paragraphs, (p) => String(p.text), d.about.paragraphs),
        image: toImg(h?.about?.image, d.about.image),
      },
      stats: list(h?.stats, (s) => ({ value: s.value, label: s.label }), d.stats),
      services: list(
        h?.services,
        (s) => ({
          tabTitle: s.tabTitle,
          image: toImg(s.image),
          logo: toImg(s.logo),
          points: (s.points || []).map((p: any) => p.text),
          link: s.link,
        }),
        d.services,
      ),
      partners: list(h?.partners, (p) => ({ name: p.name || '', logo: toImg(p.logo) }), d.partners),
      clients: list(h?.clients, (p) => ({ name: p.name || '', logo: toImg(p.logo) }), d.clients),
      achievements: list(h?.achievements, (a) => ({ title: a.title || '', image: toImg(a.image) }), d.achievements),
      testimonials: list(
        h?.testimonials,
        (t) => ({ logo: toImg(t.logo), review: t.review, name: t.name, position: t.position }),
        d.testimonials,
      ),
      cta: {
        lineOne: h?.cta?.lineOne || d.cta.lineOne,
        lineTwo: h?.cta?.lineTwo || d.cta.lineTwo,
        text: h?.cta?.text || d.cta.text,
        background: toImg(h?.cta?.background, d.cta.background),
      },
      contact: {
        heading: h?.contact?.heading || d.contact.heading,
        text: h?.contact?.text || d.contact.text,
        mapEmbedUrl: h?.contact?.mapEmbedUrl || d.contact.mapEmbedUrl,
      },
    }
  } catch {
    return homeDefaults
  }
})

/* ------------------------------------------------------------------ */
/* Posts, FAQs, Jobs                                                   */
/* ------------------------------------------------------------------ */

type LegacyPost = (typeof legacyPosts)[number]

const fromLegacy = (p: LegacyPost): Post => ({
  slug: p.slug,
  title: p.title,
  date: p.date,
  category: p.category === 'blog' ? 'blog' : 'news',
  excerpt: p.excerpt,
  image: p.image ? { url: p.image, alt: p.title } : undefined,
  html: p.html,
  seoTitle: p.seoTitle || undefined,
  seoDescription: p.seoDesc || undefined,
})

const fromDoc = (d: any): Post => ({
  slug: d.slug,
  title: d.title,
  date: (d.publishedAt || d.createdAt || '').slice(0, 10),
  category: d.category === 'news' ? 'news' : 'blog',
  excerpt: d.excerpt || '',
  image: toImg(d.featuredImage),
  content: d.content?.root?.children?.length ? d.content : undefined,
  html: d.legacyHtml || undefined,
  seoTitle: d.meta?.title || undefined,
  seoDescription: d.meta?.description || undefined,
})

export const getPosts = cache(async (category?: 'blog' | 'news'): Promise<Post[]> => {
  const payload = await getPayloadSafe()
  if (payload) {
    try {
      const res = await payload.find({
        collection: 'posts',
        where: { and: [{ _status: { equals: 'published' } }, ...(category ? [{ category: { equals: category } }] : [])] },
        sort: '-publishedAt',
        limit: 200,
        depth: 1,
      })
      if (res.docs.length) return res.docs.map(fromDoc)
    } catch {
      /* fall back */
    }
  }
  return legacyPosts.map(fromLegacy).filter((p) => !category || p.category === category)
})

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const payload = await getPayloadSafe()
  if (payload) {
    try {
      const res = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
      if (res.docs[0]) return fromDoc(res.docs[0])
    } catch {
      /* fall back */
    }
  }
  const p = legacyPosts.find((x) => x.slug === slug)
  return p ? fromLegacy(p) : null
})

export const getFaqs = cache(async (): Promise<Faq[]> => {
  const payload = await getPayloadSafe()
  if (payload) {
    try {
      const res = await payload.find({ collection: 'faqs', sort: 'order', limit: 100 })
      if (res.docs.length) return res.docs.map((d: any) => ({ question: d.question, answer: d.answer }))
    } catch {
      /* fall back */
    }
  }
  return faqDefaults
})

export const getJobs = cache(async (): Promise<Job[]> => {
  const payload = await getPayloadSafe()
  if (!payload) return []
  try {
    const res = await payload.find({ collection: 'jobs', where: { open: { equals: true } }, limit: 50 })
    return res.docs.map((d: any) => ({ title: d.title, location: d.location, type: d.type, department: d.department, description: d.description }))
  } catch {
    return []
  }
})
