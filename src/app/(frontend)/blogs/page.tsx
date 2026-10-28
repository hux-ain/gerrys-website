import type { Metadata } from 'next'
import { PageBanner } from '@/components/page/PageBanner'
import { PostCard } from '@/components/page/PostCard'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { getPosts } from '@/lib/getContent'

export const metadata: Metadata = {
  title: 'Blogs',
  description: "Insights on connectivity, data centers, cloud, SLAs and cyber security from Gerry's IT engineers.",
}
export const revalidate = 3600

export default async function BlogsPage() {
  const posts = await getPosts('blog')
  return (
    <>
      <PageBanner title="Blog" />
      <section className="px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl lg:px-8">
          <SplitHeading text="Latest Posts" />
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
