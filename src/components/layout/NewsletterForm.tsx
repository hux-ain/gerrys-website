'use client'
import { useState, useTransition } from 'react'
import { submitLead } from '@/app/(frontend)/actions'

export function NewsletterForm() {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, start] = useTransition()

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        start(async () => {
          const r = await submitLead({
            type: 'newsletter',
            email: String(fd.get('email') || ''),
            website: String(fd.get('website') || ''),
          })
          setMsg(r.ok ? { ok: true, text: 'Thank you for subscribing!' } : { ok: false, text: r.error || 'Error' })
        })
      }}
    >
      <label htmlFor="nl-email" className="sr-only">
        Enter your email
      </label>
      <input
        id="nl-email"
        name="email"
        type="email"
        required
        placeholder="Enter Your Email"
        className="w-full border-0 border-b border-white/60 bg-transparent py-2 text-white placeholder:text-white/70 focus:border-primary focus:outline-none"
      />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={pending}
        className="mt-4 rounded-md bg-primary px-5 py-2 font-display text-sm font-bold text-black transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
      >
        {pending ? 'Sending…' : 'Subscribe'}
      </button>
      {msg && <p className={`mt-2 text-sm ${msg.ok ? 'text-green-400' : 'text-red-400'}`}>{msg.text}</p>}
    </form>
  )
}
