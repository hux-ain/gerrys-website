import type { Metadata } from 'next'
import Link from 'next/link'
import { PageBanner } from '@/components/page/PageBanner'
import { PostCard } from '@/components/page/PostCard'
import { Reveal } from '@/components/ui/Reveal'
import { pageIndex } from '@/content/pages'
import { getFaqs, getPosts } from '@/lib/getContent'

export const metadata: Metadata = { title: 'Search', robots: { index: false } }

type Props = { searchParams: Promise<{ q?: string }> }

const words = (q: string) => q.toLowerCase().split(/\s+/).filter((w) => w.length > 1)
const score = (text: string, ws: string[]) => {
  const t = text.toLowerCase()
  return ws.reduce((n, w) => n + (t.includes(w) ? 1 : 0), 0)
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  const ws = words(q)
  const [posts, faqs] = await Promise.all([getPosts(), getFaqs()])

  const pages = ws.length ? pageIndex.map((p) => ({ ...p, s: score(p.title + ' ' + p.text, ws) })).filter((p) => p.s > 0).sort((a, b) => b.s - a.s) : []
  const postHits = ws.length
    ? posts.map((p) => ({ p, s: score(p.title, ws) * 3 + score(p.excerpt + ' ' + (p.html || ''), ws) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).map((x) => x.p)
    : []
  const faqHits = ws.length ? faqs.filter((f) => score(f.question + ' ' + f.answer, ws) > 0) : []
  const total = pages.length + postHits.length + faqHits.length

  return (
    <>
      <PageBanner title="Search" />
      <section className="px-4 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <form action="/search" className="flex gap-2" role="search">
            <label htmlFor="q" className="sr-only">Search</label>
            <input id="q" name="q" defaultValue={q} placeholder="Search services, blogs, news…" className="min-w-0 flex-1 rounded-xl border border-black/15 px-5 py-3.5 text-lg outline-none focus:border-primary focus:ring-4 focus:ring-primary/25" />
            <button className="rounded-xl bg-primary px-6 font-display font-bold">Search</button>
          </form>
          <p className="mt-4 text-black/60" aria-live="polite">
            {q ? `${total} result${total === 1 ? '' : 's'} for “${q}”` : 'Type something to search the website.'}
          </p>

          {pages.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl font-bold">Pages</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {pages.map((p, i) => (
                  <Reveal key={p.url} delay={i}>
                    <li>
                      <Link href={p.url} className="block rounded-xl border-l-[5px] border-primary bg-panel p-4 font-display font-semibold transition hover:-translate-y-0.5 hover:shadow-md">
                        {p.title} →
                      </Link>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          )}

          {faqHits.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl font-bold">FAQ</h2>
              <ul className="mt-4 space-y-3">
                {faqHits.map((f) => (
                  <li key={f.question} className="rounded-xl bg-panel p-4">
                    <Link href="/faq" className="font-semibold hover:text-primary-dark">{f.question}</Link>
                    <p className="mt-1 text-sm text-black/65">{f.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {postHits.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl font-bold">Blogs &amp; News</h2>
              <div className="mt-5 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {postHits.map((p, i) => (
                  <PostCard key={p.slug} post={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
