import type { Metadata } from 'next'
import { PageBanner } from '@/components/page/PageBanner'
import { Reveal } from '@/components/ui/Reveal'
import privacy from '@/content/privacy-policy.json'

export const metadata: Metadata = { title: 'Privacy Policy', description: "How Gerry's Information Technology collects, uses, stores and protects your personal data." }

export default function PrivacyPage() {
  return (
    <>
      <PageBanner title="Privacy Policy" />
      <section className="px-4 py-16 lg:py-20">
        <Reveal className="prose-gerrys mx-auto max-w-4xl">
          <div dangerouslySetInnerHTML={{ __html: privacy.html }} />
        </Reveal>
      </section>
    </>
  )
}
