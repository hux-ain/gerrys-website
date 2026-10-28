import type { Metadata } from 'next'
import { FaqAccordion } from '@/components/page/FaqAccordion'
import { PageBanner } from '@/components/page/PageBanner'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { getFaqs } from '@/lib/getContent'

export const metadata: Metadata = {
  title: 'FAQ | CIR Internet, Enterprise IT & Avaya',
  description: 'Answers about CIR dedicated internet, SLAs, symmetrical speeds, Avaya migration, voice quality and managed hardware.',
}
export const revalidate = 3600

export default async function FaqPage() {
  const faqs = await getFaqs()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  }
  return (
    <>
      <PageBanner title="FAQ" />
      <section className="px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <SplitHeading text="Frequently Asked Questions" divider="center" />
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
