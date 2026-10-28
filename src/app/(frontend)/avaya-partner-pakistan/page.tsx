import type { Metadata } from 'next'
import { CtaStrip } from '@/components/page/CtaStrip'
import { FeatureRow } from '@/components/page/FeatureRow'
import { IntroText } from '@/components/page/IntroText'
import { PageBanner } from '@/components/page/PageBanner'
import { avayaFeatures, avayaIntro } from '@/content/pages'

export const metadata: Metadata = {
  title: "Gerry's Avaya | Avaya Diamond Partner in Pakistan",
  description: avayaIntro.slice(0, 158),
}

export default function AvayaPage() {
  return (
    <>
      <PageBanner title="Gerry’s Avaya" />
      <IntroText>{avayaIntro}</IntroText>
      {avayaFeatures.map((f, i) => (
        <FeatureRow key={f.title} f={f} flip={i % 2 === 1} shaded={i % 2 === 0} />
      ))}
      <div className="h-12" />
      <CtaStrip />
    </>
  )
}
