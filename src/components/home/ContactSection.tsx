'use client'
import { useState, useTransition } from 'react'
import { submitLead } from '@/app/(frontend)/actions'
import type { HomeContent, SiteContent } from '@/content/types'
import { Mail, Phone } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'
import { SplitHeading } from '../ui/SplitHeading'

const input =
  'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/25'

export function ContactSection({ contact, site }: { contact: HomeContent['contact']; site: SiteContent }) {
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  return (
    <section id="contact" className="px-4 py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:px-8">
        <div>
          <SplitHeading text={contact.heading} />
          <Reveal delay={1}>
            <p className="mt-5 text-black/70">{contact.text}</p>
          </Reveal>
          <Reveal delay={2}>
            {msg?.ok ? (
              <p className="mt-8 rounded-xl bg-primary/20 p-5 font-display font-semibold">{msg.text}</p>
            ) : (
              <form
                className="mt-8 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  const fd = new FormData(e.currentTarget)
                  start(async () => {
                    const r = await submitLead({
                      type: 'contact',
                      name: String(fd.get('name') || ''),
                      email: String(fd.get('email') || ''),
                      phone: String(fd.get('phone') || ''),
                      source: String(fd.get('source') || ''),
                      website: String(fd.get('website') || ''),
                    })
                    setMsg(r.ok ? { ok: true, text: 'Thank you! Our team will contact you shortly.' } : { ok: false, text: r.error || 'Error' })
                  })
                }}
              >
                <label className="sr-only" htmlFor="c-name">Name</label>
                <input id="c-name" name="name" required placeholder="Name *" className={input} autoComplete="name" />
                <label className="sr-only" htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" required placeholder="Email *" className={input} autoComplete="email" />
                <label className="sr-only" htmlFor="c-phone">Phone Number</label>
                <input id="c-phone" name="phone" type="tel" placeholder="Phone Number" className={input} autoComplete="tel" />
                <label className="sr-only" htmlFor="c-source">How did you find us?</label>
                <select id="c-source" name="source" defaultValue="" className={input}>
                  <option value="" disabled>
                    How did you find us?
                  </option>
                  <option>Search engine</option>
                  <option>Social media</option>
                  <option>Word of mouth</option>
                </select>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full rounded-lg bg-primary py-3 font-display font-bold uppercase tracking-wide transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(252,175,23,.9)] disabled:opacity-60"
                >
                  {pending ? 'Sending…' : 'Send'}
                </button>
                {msg && !msg.ok && <p className="text-sm text-red-600">{msg.text}</p>}
              </form>
            )}
          </Reveal>
          <Reveal delay={3} className="mt-8 flex flex-wrap gap-10">
            <a href={`tel:${site.phoneLink}`} className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/20"><Phone /></span>
              <span><b className="block text-xs uppercase tracking-wider">Phone</b>{site.phone}</span>
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/20"><Mail /></span>
              <span><b className="block text-xs uppercase tracking-wider">Email</b>{site.email}</span>
            </a>
          </Reveal>
        </div>
        <Reveal variant="right" delay={1}>
          <div className="h-full min-h-[380px] overflow-hidden rounded-[30px] shadow-xl">
            <iframe
              src={contact.mapEmbedUrl}
              title="Gerry's Information Technology on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[380px] w-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
