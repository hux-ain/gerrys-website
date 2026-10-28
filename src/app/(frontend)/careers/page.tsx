import type { Metadata } from 'next'
import { CareerForm } from '@/components/page/CareerForm'
import { PageBanner } from '@/components/page/PageBanner'
import { Reveal } from '@/components/ui/Reveal'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { getJobs } from '@/lib/getContent'

export const metadata: Metadata = { title: 'Careers', description: "Join Gerry's Information Technology. Send your CV for current and future openings." }
export const revalidate = 600

export default async function CareersPage() {
  const jobs = await getJobs()
  return (
    <>
      <PageBanner title="Career" image="https://gerrys.net/wp-content/uploads/2026/07/about-banner-image.png" />
      <section className="px-4 py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SplitHeading text="Join Our Team" />
            {jobs.length === 0 ? (
              <Reveal delay={1} className="mt-8 rounded-2xl border-l-[5px] border-primary bg-panel p-6">
                <h3 className="font-display text-xl font-bold">No Positions Available Right Now</h3>
                <p className="mt-2 text-black/70">We don&apos;t have any open positions at the moment, please submit your CV for future reference</p>
              </Reveal>
            ) : (
              <ul className="mt-8 space-y-4">
                {jobs.map((j, i) => (
                  <Reveal key={j.title} delay={i}>
                    <li className="rounded-2xl border-l-[5px] border-primary bg-panel p-5 transition hover:-translate-y-1 hover:shadow-lg">
                      <h3 className="font-display text-lg font-bold">{j.title}</h3>
                      <p className="mt-1 text-sm text-black/60">{[j.department, j.location, j.type?.replace('-', ' ')].filter(Boolean).join(' · ')}</p>
                      {j.description && <p className="mt-3 text-[15px] leading-7 text-black/75">{j.description}</p>}
                    </li>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
          <Reveal variant="right" delay={1} className="rounded-[24px] bg-white p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,.3)] md:p-8">
            <CareerForm positions={jobs.map((j) => j.title)} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
