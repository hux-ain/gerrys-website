import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { PageBanner } from '@/components/page/PageBanner'
import { formatDate, PostCard } from '@/components/page/PostCard'
import { Facebook, LinkedIn, WhatsApp } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { getPost, getPosts } from '@/lib/getContent'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: 'article', images: post.image ? [post.image.url] : undefined },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = (await getPosts(post.category)).filter((p) => p.slug !== post.slug).slice(0, 3)
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'https://gerrys.net'
  const url = encodeURIComponent(`${base}/${post.slug}`)
  const listHref = post.category === 'blog' ? '/blogs' : '/news-updates'

  return (
    <>
      <PageBanner title={post.category === 'blog' ? 'Blog' : 'News and Updates'} />
      <article className="px-4 py-14 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm text-black/55">
              <Link href="/" className="hover:text-black">Home</Link> /{' '}
              <Link href={listHref} className="hover:text-black">{post.category === 'blog' ? 'Blogs' : 'News & Updates'}</Link>
            </nav>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-[42px]">{post.title}</h1>
            <time dateTime={post.date} className="mt-3 block text-sm text-black/55">
              {formatDate(post.date)}
            </time>
          </Reveal>

          {post.image && !post.html?.includes(post.image.url.split('/').pop() || '§') && (
            <Reveal variant="zoom" className="mt-8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-soft">
                <Image src={post.image.url} alt={post.image.alt || post.title} fill priority sizes="(min-width:1024px) 896px, 100vw" className="object-cover" />
              </div>
            </Reveal>
          )}

          <Reveal delay={1} className="prose-gerrys mt-10">
            {post.content ? <RichText data={post.content as never} /> : <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />}
          </Reveal>

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t pt-6">
            <span className="font-display font-semibold">Share:</span>
            {[
              { href: `https://www.facebook.com/sharer/sharer.php?u=${url}`, label: 'Share on Facebook', Icon: Facebook },
              { href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`, label: 'Share on LinkedIn', Icon: LinkedIn },
              { href: `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20${url}`, label: 'Share on WhatsApp', Icon: WhatsApp },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-black text-white transition hover:-translate-y-1 hover:bg-primary hover:text-black">
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-panel px-4 py-16">
          <div className="mx-auto max-w-7xl lg:px-8">
            <h2 className="section-heading divider" data-in="">
              More {post.category === 'blog' ? 'Blogs' : 'News'}
            </h2>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
