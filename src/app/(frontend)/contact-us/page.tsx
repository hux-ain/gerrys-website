import type { Metadata } from 'next'
import Image from 'next/image'
import { ContactSection } from '@/components/home/ContactSection'
import { PageBanner } from '@/components/page/PageBanner'
import { Mail, Phone } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { branches, contactDepartments } from '@/content/pages'
import { getHome, getSite } from '@/lib/getContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Contact Gerry's Information Technology. Offices in Karachi, Lahore, Islamabad, Hyderabad and Peshawar. 24/7 support.",
}
export const revalidate = 3600

const tel = (p: string) => p.split(',')[0].replace(/[^\d+]/g, '')

export default async function ContactPage() {
  const [home, site] = await Promise.all([getHome(), getSite()])
  return (
    <>
      <PageBanner title="Contact US" image="https://gerrys.net/wp-content/uploads/2026/07/about-banner-image.png" />

      <section className="bg-panel px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SplitHeading text="We're Here to Help You!" divider="center" />
            <Reveal delay={1}>
              <p className="mx-auto mt-6 max-w-2xl text-black/75">
                Are you experiencing any issues with our services? Please feel free to contact us. Our Expert Customer &amp; Technical Service Center is available 24/7 to assist you.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {contactDepartments.map((d, i) => (
              <Reveal key={d.email} delay={i} variant="zoom">
                <a href={`mailto:${d.email}`} className="group flex h-full flex-col items-center gap-4 rounded-2xl border-t-4 border-primary bg-white p-6 text-center shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <span className="relative h-10 w-44">
                    <Image src={d.logo} alt={d.name} fill sizes="176px" className="object-contain" />
                  </span>
                  <span className="flex items-center gap-2 text-sm font-semibold group-hover:text-primary-dark">
                    <Mail width={16} height={16} /> {d.email}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {branches.map((b, i) => (
              <Reveal key={b.city} delay={i % 2}>
                <div className="h-full rounded-2xl border-l-[5px] border-primary bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <h3 className="border-b-2 border-primary/40 pb-3 font-display text-lg font-bold">{b.city}</h3>
                  <address className="mt-4 not-italic leading-7 text-black/75">
                    {b.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <ul className="mt-4 space-y-2">
                    {b.phones.map((p) => (
                      <li key={p}>
                        <a href={`tel:${tel(p)}`} className="flex items-center gap-2 font-medium hover:text-primary-dark">
                          <Phone width={16} height={16} /> {p}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection contact={home.contact} site={site} />
    </>
  )
}
