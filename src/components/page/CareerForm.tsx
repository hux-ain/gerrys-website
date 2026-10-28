'use client'
import { useState, useTransition } from 'react'
import { submitApplication } from '@/app/(frontend)/actions'

const input = 'w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/25'

export function CareerForm({ positions }: { positions: string[] }) {
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [fileName, setFileName] = useState('')

  if (msg?.ok) return <p className="rounded-xl bg-primary/20 p-6 font-display font-semibold">{msg.text}</p>

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        start(async () => {
          const r = await submitApplication(fd)
          setMsg(r.ok ? { ok: true, text: 'Thank you! Your application has been received. Our HR team will contact you.' } : { ok: false, text: r.error || 'Error' })
        })
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="cr-name" className="mb-1 block text-sm font-semibold">Your Name *</label>
          <input id="cr-name" name="name" required className={input} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="cr-email" className="mb-1 block text-sm font-semibold">Your Email *</label>
          <input id="cr-email" name="email" type="email" required className={input} autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="cr-position" className="mb-1 block text-sm font-semibold">Position</label>
        <input id="cr-position" name="position" list="cr-positions" className={input} placeholder="e.g. Network Engineer" />
        <datalist id="cr-positions">
          {positions.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
      </div>
      <div>
        <span className="mb-1 block text-sm font-semibold">Upload Your CV</span>
        <label htmlFor="cr-cv" className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-black/20 px-4 py-5 transition hover:border-primary hover:bg-primary/5">
          <span className="rounded-md bg-primary px-3 py-1.5 font-display text-sm font-bold">Choose file</span>
          <span className="truncate text-sm text-black/60">{fileName || 'PDF or Word, max 5 MB'}</span>
        </label>
        <input id="cr-cv" name="cv" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
      </div>
      <div>
        <label htmlFor="cr-message" className="mb-1 block text-sm font-semibold">Your Message</label>
        <textarea id="cr-message" name="message" rows={4} className={input} placeholder="Enter your message" />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button type="submit" disabled={pending} className="btn-primary !px-8 !py-3 disabled:opacity-60">
        <span className="relative">{pending ? 'Sending…' : 'Send Application'}</span>
      </button>
      {msg && !msg.ok && <p className="text-sm text-red-600">{msg.text}</p>}
    </form>
  )
}
