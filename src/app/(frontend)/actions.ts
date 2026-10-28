'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type LeadInput = {
  type: 'calculator' | 'contact' | 'quote' | 'newsletter'
  name?: string
  email: string
  phone?: string
  company?: string
  city?: string
  area?: string
  source?: string
  message?: string
  calculation?: Record<string, unknown>
  /** Honeypot: real visitors never fill this hidden field. */
  website?: string
}

export type LeadResult = { ok: boolean; error?: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const clip = (v: unknown, n = 500) => (typeof v === 'string' ? v.trim().slice(0, n) : undefined)

/** Saves any website form into the "Leads" collection in the admin panel. */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  if (input.website) return { ok: true } // bot filled the honeypot: pretend success, save nothing
  const email = clip(input.email, 200) || ''
  if (!EMAIL.test(email)) return { ok: false, error: 'Please enter a valid email address.' }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        type: input.type,
        status: 'new',
        email,
        name: clip(input.name, 120),
        phone: clip(input.phone, 40),
        company: clip(input.company, 120),
        city: clip(input.city, 80),
        area: clip(input.area, 120),
        source: clip(input.source, 80),
        message: clip(input.message, 4000),
        calculation: input.calculation ?? undefined,
      } as never,
    })
    return { ok: true }
  } catch (e) {
    console.error('[submitLead]', e)
    return { ok: false, error: 'Could not send right now. Please call (021) 111-123-321.' }
  }
}

/* ------------------------------------------------------------------ */
/* Career form (with CV upload)                                        */
/* ------------------------------------------------------------------ */
const CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_CV = 5 * 1024 * 1024 // 5 MB

export async function submitApplication(formData: FormData): Promise<LeadResult> {
  if (formData.get('website')) return { ok: true }
  const name = clip(formData.get('name'), 120) || ''
  const email = clip(formData.get('email'), 200) || ''
  if (!name) return { ok: false, error: 'Please enter your name.' }
  if (!EMAIL.test(email)) return { ok: false, error: 'Please enter a valid email address.' }

  const cv = formData.get('cv')
  const hasCv = cv instanceof File && cv.size > 0
  if (hasCv && !CV_TYPES.includes(cv.type)) return { ok: false, error: 'CV must be a PDF or Word file.' }
  if (hasCv && cv.size > MAX_CV) return { ok: false, error: 'CV must be smaller than 5 MB.' }

  try {
    const payload = await getPayload({ config })
    let resumeId: string | number | undefined
    if (hasCv) {
      const data = Buffer.from(await cv.arrayBuffer())
      const doc = await payload.create({
        collection: 'resumes',
        overrideAccess: true,
        data: {} as never,
        file: { data, mimetype: cv.type, name: cv.name, size: cv.size },
      })
      resumeId = doc.id
    }
    await payload.create({
      collection: 'applications',
      overrideAccess: true,
      data: {
        name,
        email,
        position: clip(formData.get('position'), 120),
        message: clip(formData.get('message'), 4000),
        resume: resumeId,
        status: 'new',
      } as never,
    })
    return { ok: true }
  } catch (e) {
    console.error('[submitApplication]', e)
    return { ok: false, error: 'Could not send right now. Please email your CV to info@gerrys.net.' }
  }
}
