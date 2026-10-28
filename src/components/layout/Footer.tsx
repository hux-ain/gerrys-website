import Image from 'next/image'
import Link from 'next/link'
import type { SiteContent } from '@/content/types'
import { Facebook, Instagram, LinkedIn, Mail, Phone } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'
import { NewsletterForm } from './NewsletterForm'

const COMPANY = [
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'About Us', href: '/about-us-gerrys-information-technology-pakistan' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

export function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <Image src="/brand/gerrys-it-logo.webp" alt="Gerry's Information Technology" width={240} height={376} className="h-auto w-[130px]" />
        </Reveal>
        <Reveal delay={1}>
          <h3 className="font-display text-lg font-bold uppercase text-primary">Company</h3>
          <ul className="mt-4 space-y-2">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block text-white/85 transition hover:translate-x-1 hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={2}>
          <h3 className="font-display text-lg font-bold uppercase text-primary">Contact Us</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-white/85 hover:text-primary">
                <Mail width={20} height={20} className="text-primary" /> {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneLink}`} className="flex items-center gap-3 text-white/85 hover:text-primary">
                <Phone width={20} height={20} className="text-primary" /> {site.phone}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[
              { href: site.socials.facebook, label: 'Facebook', Icon: Facebook },
              { href: site.socials.instagram, label: 'Instagram', Icon: Instagram },
              { href: site.socials.linkedin, label: 'LinkedIn', Icon: LinkedIn },
            ]
              .filter((s) => s.href)
              .map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/30 transition hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-black"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
          </div>
        </Reveal>
        <Reveal delay={3}>
          <h3 className="font-display text-lg font-bold uppercase text-primary">Subscribe Now</h3>
          <NewsletterForm />
        </Reveal>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-6 py-5 text-sm text-white/60">
          © {new Date().getFullYear()} Gerry&apos;s Information Technology. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
