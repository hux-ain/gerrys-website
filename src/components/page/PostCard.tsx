import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/content/types'
import { ArrowRight } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'

export const formatDate = (d: string) =>
  d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <Reveal delay={index % 3}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,.25)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_40px_-18px_rgba(0,0,0,.4)]">
        <Link href={`/${post.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-soft" tabIndex={-1} aria-hidden="true">
          {post.image && (
            <Image
              src={post.image.url}
              alt=""
              fill
              sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-bold leading-snug">
            <Link href={`/${post.slug}`} className="hover:text-primary-dark">
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-black/65">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between pt-5">
            <time dateTime={post.date} className="text-xs text-black/55">
              {formatDate(post.date)}
            </time>
            <Link
              href={`/${post.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 font-display text-xs font-bold transition group-hover:gap-2.5"
              aria-label={`Read more: ${post.title}`}
            >
              Read More <ArrowRight width={14} height={14} />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
