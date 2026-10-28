export type Img = { url: string; alt: string; width?: number; height?: number }

export type Slide = { image?: Img; heading: string; text?: string; buttonText?: string; buttonLink?: string }
export type Service = { tabTitle: string; image?: Img; logo?: Img; points: string[]; link?: string }
export type Logo = { name: string; logo?: Img }
export type Certificate = { title: string; image?: Img }
export type Testimonial = { logo?: Img; review: string; name: string; position?: string }

export type HomeContent = {
  slides: Slide[]
  about: { heading: string; paragraphs: string[]; image?: Img }
  stats: { value: string; label: string }[]
  services: Service[]
  partners: Logo[]
  clients: Logo[]
  achievements: Certificate[]
  testimonials: Testimonial[]
  cta: { lineOne: string; lineTwo: string; text: string; background?: Img }
  contact: { heading: string; text: string; mapEmbedUrl: string }
}

export type SiteContent = {
  topBar: { background: string; showRibbon: boolean }
  email: string
  phone: string
  phoneLink: string
  whatsapp: string
  socials: { facebook?: string; instagram?: string; linkedin?: string }
}

export type Post = {
  slug: string
  title: string
  date: string
  category: 'blog' | 'news'
  excerpt: string
  image?: Img
  /** Lexical rich text from the admin panel (new posts) */
  content?: unknown
  /** HTML imported from WordPress */
  html?: string
  seoTitle?: string
  seoDescription?: string
}
export type Faq = { question: string; answer: string }
export type Job = { title: string; location?: string; type?: string; department?: string; description?: string }
