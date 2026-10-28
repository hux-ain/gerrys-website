import type { HomeContent } from '@/content/types'
import { Pic } from '../ui/Pic'
import { Reveal } from '../ui/Reveal'

export function CtaBanner({ cta }: { cta: HomeContent['cta'] }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Pic img={cta.background} sizes="100vw" className="object-cover grayscale" />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="mx-auto max-w-5xl px-6 py-24 text-center text-white">
        <Reveal>
          <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            {cta.lineOne}
            <span className="mt-2 block text-primary">{cta.lineTwo}</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-3xl font-display text-lg md:text-xl">{cta.text}</p>
        </Reveal>
      </div>
    </section>
  )
}
