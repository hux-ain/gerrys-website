import Image from 'next/image'
import { RichLine } from '../ui/PrimaryButton'
import { Reveal } from '../ui/Reveal'
import { SplitHeading } from '../ui/SplitHeading'

export type Feature = {
  id?: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  image?: { src: string; alt: string; width: number; height: number }
}

/**
 * Image + text block used on Internet / Avaya / Enterprise pages.
 * `flip` puts the image on the right. `shaded` adds the light grey card from the live site.
 */
export function FeatureRow({ f, flip = false, shaded = false }: { f: Feature; flip?: boolean; shaded?: boolean }) {
  const textRight = !flip // live site: when the image is on the left, the text is right-aligned
  return (
    <section id={f.id} className="scroll-mt-28 px-4 py-6 lg:py-8">
      <div className={`mx-auto grid max-w-7xl items-center gap-8 rounded-[24px] p-6 md:p-10 lg:grid-cols-2 lg:gap-14 ${shaded ? 'bg-panel' : ''}`}>
        {f.image && (
          <Reveal variant={flip ? 'right' : 'left'} className={`flex justify-center ${flip ? 'lg:order-2' : ''}`}>
            <Image
              src={f.image.src}
              alt={f.image.alt}
              width={f.image.width}
              height={f.image.height}
              sizes="(min-width:1024px) 40vw, 90vw"
              className="h-auto max-h-[420px] w-auto max-w-full transition-transform duration-700 hover:scale-105"
            />
          </Reveal>
        )}
        <div className={textRight ? 'lg:text-right' : ''}>
          <div className={textRight ? 'lg:[&_.divider::after]:left-auto lg:[&_.divider::after]:right-0' : ''}>
            <SplitHeading text={f.title} className="font-display text-2xl font-bold tracking-tight md:text-[34px]" />
          </div>
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-black/80">
            {f.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i + 1}>
                <p>
                  <RichLine text={p} />
                </p>
              </Reveal>
            ))}
          </div>
          {f.bullets && (
            <ul className={`mt-5 space-y-2 font-display font-semibold ${textRight ? 'lg:ml-auto lg:w-fit lg:text-left' : ''}`}>
              {f.bullets.map((b, i) => (
                <Reveal key={b} delay={i + 2}>
                  <li className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {b}
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
