import type { Metadata } from 'next'
import Image from 'next/image'
import { Achievements } from '@/components/home/Achievements'
import { ClientsStrip } from '@/components/home/ClientsStrip'
import { CtaStrip } from '@/components/page/CtaStrip'
import { PageBanner } from '@/components/page/PageBanner'
import { Reveal } from '@/components/ui/Reveal'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { aboutContent as A } from '@/content/pages'
import { getHome } from '@/lib/getContent'

export const metadata: Metadata = {
  title: "About Us | Gerry's Information Technology Pakistan",
  description: A.who.paragraphs[0],
}
export const revalidate = 3600

export default async function AboutPage() {
  const home = await getHome()
  return (
    <>
      <PageBanner title="About US" />

      {/* Group introduction */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <Reveal variant="left" className="flex justify-center">
            <Image src="/images/pages/gerrys-group-logo.webp" alt="Gerry's Group logo" width={377} height={471} className="h-auto w-56 lg:w-72" />
          </Reveal>
          <div>
            <SplitHeading text={A.group.title} />
            <Reveal delay={1}>
              <p className="mt-6 text-[15px] leading-8 text-black/80">{A.group.text}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Director */}
      <section className="bg-panel px-4 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:px-8">
          <div className="lg:order-2">
            <Reveal variant="right">
              <div className="relative overflow-hidden rounded-[30px] shadow-xl">
                <Image src="/images/pages/director.webp" alt={`${A.director.name}, ${A.director.role}`} width={633} height={475} className="h-auto w-full transition-transform duration-700 hover:scale-105" />
              </div>
            </Reveal>
          </div>
          <div>
            <SplitHeading text={A.director.title} />
            <Reveal delay={1}>
              <blockquote className="mt-6 border-l-[5px] border-primary pl-5 text-[16px] leading-8 text-black/80">“{A.director.text}”</blockquote>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 font-display text-lg font-bold">{A.director.name}</p>
              <p className="text-black/60">{A.director.role}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:px-8">
          <Reveal variant="left" className="flex justify-center">
            <Image src="/images/pages/git-logo.webp" alt="Gerry's IT logo" width={500} height={741} className="h-auto w-40 lg:w-52" />
          </Reveal>
          <div>
            <SplitHeading text={A.who.title} />
            {A.who.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i + 1}>
                <p className="mt-5 text-[15px] leading-8 text-black/80">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClientsStrip clients={home.clients} />

      <section className="px-4 pb-16">
        <Reveal variant="zoom" className="mx-auto max-w-7xl">
          <Image src={A.missionImage} alt="Gerry's IT mission and vision" width={2560} height={900} sizes="(min-width:1280px) 1280px, 100vw" className="h-auto w-full rounded-[24px]" />
        </Reveal>
      </section>

      <CtaStrip />
      <div className="h-16" />
      <Achievements items={home.achievements} />
    </>
  )
}
