import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaStrip } from '@/components/page/CtaStrip'
import { IntroText } from '@/components/page/IntroText'
import { PageBanner } from '@/components/page/PageBanner'
import { RichLine } from '@/components/ui/PrimaryButton'
import { Reveal } from '@/components/ui/Reveal'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { enterpriseBrands, enterpriseCategories, enterpriseIntro } from '@/content/pages'

export const metadata: Metadata = {
  title: 'Enterprise Hardware & Software Pakistan',
  description: enterpriseIntro.slice(0, 158),
}

const CatIcon = ({ kind }: { kind: string }) => {
  const paths: Record<string, string> = {
    hardware: 'M4 6h16v10H4zM2 19h20',
    software: 'M5 4h14v16H5zM8 9l-2 3 2 3M16 9l2 3-2 3',
    firewall: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
    security: 'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z',
  }
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" aria-hidden="true">
      <path d={paths[kind]} />
    </svg>
  )
}

export default function EnterprisePage() {
  return (
    <>
      <PageBanner title="Enterprise Solutions" />
      <IntroText>{enterpriseIntro}</IntroText>

      {/* Category / Brands / Focus table */}
      <section className="px-4 pb-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="hidden grid-cols-[1.1fr_2fr_1.5fr] items-center gap-6 rounded-xl bg-black px-6 py-4 font-display font-semibold text-white md:grid">
              <span className="text-primary">Category</span>
              <span className="text-primary">Brands</span>
              <span className="text-primary">Primary Product Focus</span>
            </div>
          </Reveal>
          <div className="mt-3 space-y-3">
            {enterpriseCategories.map((c, i) => (
              <Reveal key={c.no} delay={i}>
                <div className="grid items-center gap-5 rounded-xl border-l-[5px] border-primary bg-panel px-5 py-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[1.1fr_2fr_1.5fr] md:px-6">
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary font-display font-bold">{c.no}</span>
                    <span className="flex items-center gap-2 font-display font-bold">
                      <CatIcon kind={c.icon} /> {c.name}
                    </span>
                  </div>
                  <ul className="flex flex-wrap items-center gap-x-5 gap-y-3" aria-label={`${c.name} brands`}>
                    {c.logos.map((l) => (
                      <li key={l.name} className="relative h-8 w-20 transition-transform duration-300 hover:scale-110">
                        <Image src={l.src} alt={l.name} fill sizes="80px" className="object-contain" unoptimized={l.src.endsWith('.svg')} />
                      </li>
                    ))}
                  </ul>
                  <p className="flex gap-2 text-sm text-black/75">
                    <span className="text-primary-dark" aria-hidden="true">›</span>
                    {c.focus}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand sections */}
      {enterpriseBrands.map((brand, i) => {
        const flip = i % 2 === 1
        return (
          <section key={brand.id} id={brand.id} className="scroll-mt-28 px-4 py-6">
            <div className={`mx-auto grid max-w-7xl items-center gap-8 rounded-[24px] p-6 md:p-10 lg:grid-cols-2 lg:gap-14 ${i % 2 === 1 ? 'bg-panel' : ''}`}>
              <Reveal variant={flip ? 'right' : 'left'} className={`flex justify-center ${flip ? 'lg:order-2' : ''}`}>
                <div className="relative h-48 w-full max-w-md transition-transform duration-700 hover:scale-105 md:h-60">
                  <Image src={brand.logo} alt={`${brand.name} logo`} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-contain" unoptimized={brand.logo.endsWith('.svg')} />
                </div>
              </Reveal>
              <div>
                <SplitHeading text={brand.name} className="font-display text-2xl font-bold md:text-[34px]" />
                {brand.subtitle && (
                  <Reveal delay={1}>
                    <h3 className="mt-4 font-display text-lg font-semibold">{brand.subtitle}</h3>
                  </Reveal>
                )}
                <div className="mt-5 space-y-4 text-[15px] leading-7 text-black/80">
                  {brand.paragraphs.map((p, k) => (
                    <Reveal key={k} delay={k + 1}>
                      <p>
                        <RichLine text={p} />
                      </p>
                    </Reveal>
                  ))}
                </div>
                {brand.bullets && (
                  <Reveal delay={2}>
                    {brand.listTitle && <h4 className="mt-5 font-display font-bold">{brand.listTitle}</h4>}
                    <ul className="mt-3 space-y-2 text-[15px] leading-7 text-black/80">
                      {brand.bullets.map((x) => (
                        <li key={x} className="flex gap-3">
                          <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          <span>
                            <RichLine text={x} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )
      })}
      <div className="h-12" />
      <CtaStrip />
    </>
  )
}
