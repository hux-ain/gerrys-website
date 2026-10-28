import type { Metadata } from 'next'
import { CtaStrip } from '@/components/page/CtaStrip'
import { FeatureRow } from '@/components/page/FeatureRow'
import { IntroText } from '@/components/page/IntroText'
import { PageBanner } from '@/components/page/PageBanner'
import { internetFeatures, internetIntro } from '@/content/pages'

export const metadata: Metadata = {
  title: 'Internet Service | CIR, Dark Fiber, Wireless & Cloud',
  description: internetIntro.slice(0, 158),
}

export default function InternetServicePage() {
  return (
    <>
      <PageBanner title="Internet Service" />
      <IntroText>{internetIntro}</IntroText>
      {internetFeatures.map((f, i) => (
        <FeatureRow key={f.title} f={f} flip={i % 2 === 1} shaded={i % 2 === 0} />
      ))}
      <div className="h-12" />
      <CtaStrip />
    </>
  )
}
