import type { HomeContent } from '@/content/types'
import { Counter } from '../ui/Counter'
import { Pic } from '../ui/Pic'
import { RichLine } from '../ui/PrimaryButton'
import { Reveal } from '../ui/Reveal'
import { SplitHeading } from '../ui/SplitHeading'

export function AboutSection({ about, stats }: { about: HomeContent['about']; stats: HomeContent['stats'] }) {
  return (
    <section id="about" className="px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl rounded-[30px] bg-panel px-6 py-10 lg:px-12 lg:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitHeading text={about.heading} />
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-black/85">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i + 1}>
                  <p>
                    <RichLine text={p} />
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal variant="right" delay={1} className="lg:col-span-5">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[30px] shadow-xl">
              <Pic img={about.image} sizes="(min-width:1024px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 lg:gap-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} variant="zoom" delay={i}>
              <Counter value={s.value} className="block font-display text-4xl font-extrabold tracking-tight md:text-6xl" />
              <p className="mt-1 text-sm font-medium text-black/70 md:text-base">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
