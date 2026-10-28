'use client'
/**
 * Connectivity ROI Calculator — ported 1:1 from the WordPress version
 * (template-parts/roi-calculator.html). Same formula, same PDF, same GA4 events.
 *
 *   Required Bandwidth = seats × perUserAllocation × concurrencyFactor
 *   perUserAllocation  = sum of checked usage tiles (2 / 3 / 3 / 2 Mbps)
 *   concurrencyFactor  = < 50 → 0.8 | 50–250 → 0.6 | > 250 → 0.4
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { submitLead } from '@/app/(frontend)/actions'
import { Reveal } from '../ui/Reveal'
import './roi-calculator.css'

const COMPANY_EMAIL = 'webmaster@gerrys.net'
const COMPANY_SITE = 'https://gerrys.net/'

const AREA_MAP: Record<string, string[]> = {
  Karachi: ['Landhi Industrial area', 'Korangi', 'I.I.Chundrighar Road', 'Shahre-Faisal', 'Do talwar', 'Asia Pacific', 'Main Rashid Minhas Rd', 'Civil Lines', 'Sohrab Goth', 'SITE 2', 'Manghopir Road', 'SITE Area', 'Korangi Industrial Rd, Sector 27', 'RF coverage in PQ'],
  Lahore: ['Davis Road', 'Queens Road', 'Gulberg III', 'Allama Iqbal Town', 'Mughal pura', 'Bhagwan pura', 'Barkat market'],
  Islamabad: ['Park Road, Chatta Bakhtawar', 'Gulberg Greens', 'Soan Gardens'],
  Faisalabad: ['Ghouri Arcade Satyana road', 'Zia Colony Nasar Ullah Khan Town'],
}

const USAGE = [
  { label: 'Basic Email & Browsing', add: 2, on: true },
  { label: 'Heavy Video Conferencing', add: 3, on: true },
  { label: 'Cloud ERP/CRM Systems', add: 3, on: false },
  { label: 'High-Volume Data Transfers', add: 2, on: false },
]

const INFRA = [
  { val: 'onprem', label: 'Fully On-Premises' },
  { val: 'hybrid', label: 'Hybrid Model' },
  { val: 'cloud', label: '100% Cloud-based' },
] as const

const concurrencyFactor = (s: number) => (s < 50 ? 0.8 : s <= 250 ? 0.6 : 0.4)
const tierLabel = (s: number) => (s < 50 ? '< 50' : s <= 250 ? '50–250' : '> 250')

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
const track = (name: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', name, params)
}

export function RoiCalculator() {
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')
  const [fiber, setFiber] = useState(true)
  const [radio, setRadio] = useState(false)
  const [fiberType, setFiberType] = useState('lit')
  const [routeType, setRouteType] = useState('single')
  const [seats, setSeats] = useState(150)
  const [usage, setUsage] = useState(USAGE.map((u) => u.on))
  const [infra, setInfra] = useState<(typeof INFRA)[number]['val']>('onprem')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const engaged = useRef(false)
  const numRef = useRef<HTMLDivElement>(null)

  const engage = () => {
    if (!engaged.current) {
      engaged.current = true
      track('calculator_engaged', { calculator_name: 'roi_bandwidth_calculator' })
    }
  }

  const result = useMemo(() => {
    const perUserAllocation = USAGE.reduce((sum, u, i) => sum + (usage[i] ? u.add : 0), 0)
    const cFactor = concurrencyFactor(seats)
    const total = Math.round(seats * perUserAllocation * cFactor)
    const sla = total >= 400 ? 'Enterprise-Grade SLA' : total >= 100 ? 'Business-Grade SLA' : 'Standard SLA'
    const cloudLevel = perUserAllocation >= 6 ? 'High' : perUserAllocation >= 4 ? 'Moderate' : 'Standard'
    const usageLabels = USAGE.filter((_, i) => usage[i]).map((u) => u.label)
    return { seats, perUserAllocation, cFactor, total, sla, infra, cloudLevel, usageLabels }
  }, [seats, usage, infra])

  // small "bump" animation whenever the estimate changes
  useEffect(() => {
    const el = numRef.current
    if (!el) return
    el.classList.remove('bump')
    void el.offsetWidth
    el.classList.add('bump')
  }, [result.total])

  const fill = ((seats - 1) / (1000 - 1)) * 100

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setMsg(null)
    if (!city) return setMsg({ kind: 'err', text: '⚠ Please select a city before submitting.' })
    if (!area) return setMsg({ kind: 'err', text: '⚠ Please select a region/area before submitting.' })
    const fd = new FormData(form)
    const lead = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      city,
      area,
    }
    track('calculator_lead_submitted', { bandwidth_mbps: result.total, seats: result.seats, city })
    setBusy(true)

    // 1) Always build + download the PDF in the browser
    try {
      const { buildReport } = await import('./roiReport')
      await buildReport(lead, result, COMPANY_EMAIL, COMPANY_SITE)
    } catch {
      setBusy(false)
      return setMsg({ kind: 'err', text: '⚠ Could not generate the PDF in-browser. Please try again.' })
    }

    // 2) Save the lead in the admin panel
    const r = await submitLead({
      type: 'calculator',
      ...lead,
      website: String(fd.get('website') || ''),
      calculation: { ...result, medium: { fiber, radio }, fiberType, routeType },
    })
    setBusy(false)
    if (r.ok) {
      setMsg({ kind: 'ok', text: '✔ Report downloaded — our team has also been notified.' })
      form.reset()
    } else {
      setMsg({ kind: 'ok', text: '✔ Report downloaded. (We could not notify the team, please call us.)' })
    }
  }

  return (
    <section id="calculator" className="py-6 lg:py-10">
      <div className="rc-scope" id="roi-calc-root">
        <div className="rc-wrap">
          <Reveal className="rc-head">
            <div className="rc-eyebrow">
              <span className="dot" />
              Live Calculator
            </div>
            <h2 className="rc-title">
              Connectivity <span>ROI Calculator</span>
            </h2>
          </Reveal>

          {/* LEFT: inputs */}
          <Reveal variant="left" delay={1} className="rc-card">
            <h3 style={{ color: 'var(--rc-gold)' }}>
              <span className="ic">●</span> Core Metrics
            </h3>
            <div className="rc-row">
              <div className="rc-field">
                <label htmlFor="rc-city">City</label>
                <select
                  id="rc-city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value)
                    setArea('')
                    engage()
                    track('calculator_city_selected', { city: e.target.value })
                  }}
                >
                  <option value="">Select city</option>
                  {Object.keys(AREA_MAP).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="rc-field">
                <label htmlFor="rc-area">Region / Area</label>
                <select id="rc-area" value={area} disabled={!city} onChange={(e) => setArea(e.target.value)}>
                  <option value="">{city ? `Select area in ${city}` : 'Select city first'}</option>
                  {(AREA_MAP[city] || []).map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rc-check-row">
              <label className="rc-check">
                <input type="checkbox" checked={fiber} onChange={(e) => setFiber(e.target.checked)} /> Fiber
              </label>
              <label className="rc-check">
                <input type="checkbox" checked={radio} onChange={(e) => setRadio(e.target.checked)} /> Radio Wireless
              </label>
            </div>

            <div className="rc-row">
              <div className="rc-field">
                <label htmlFor="rc-fiber-type">Type of Fiber</label>
                <select id="rc-fiber-type" value={fiberType} onChange={(e) => setFiberType(e.target.value)}>
                  <option value="lit">Lit Fiber</option>
                  <option value="dark">Dark Fiber</option>
                  <option value="gpon">GPON</option>
                </select>
              </div>
              <div className="rc-field">
                <label htmlFor="rc-route-type">Type of Route</label>
                <select id="rc-route-type" value={routeType} onChange={(e) => setRouteType(e.target.value)}>
                  <option value="single">Single Route</option>
                  <option value="diverse">Diverse Route (Redundant)</option>
                </select>
              </div>
            </div>

            <h4>Total Number of Active Employees / Seats</h4>
            <div className="rc-slider-label">
              <span>1</span>
              <span className="rc-slider-value">
                {seats} {seats === 1 ? 'user' : 'users'}
              </span>
              <span>1000+</span>
            </div>
            <input
              type="range"
              min={1}
              max={1000}
              step={1}
              value={seats}
              className="rc-range"
              aria-label="Total number of active employees or seats"
              style={{ '--fill': `${fill}%` } as CSSProperties}
              onChange={(e) => {
                setSeats(Number(e.target.value))
                engage()
              }}
            />

            <h4 id="rc-usage-heading">Primary Cloud &amp; Software Usage (select all that apply)</h4>
            <div className="rc-tile-grid" role="group" aria-labelledby="rc-usage-heading">
              {USAGE.map((u, i) => (
                <label key={u.label} className={`rc-tile ${usage[i] ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={usage[i]}
                    onChange={() => {
                      setUsage((prev) => prev.map((v, k) => (k === i ? !v : v)))
                      engage()
                      track('calculator_usage_selected', { label: u.label })
                    }}
                  />
                  <span>
                    <b>{u.label}</b>
                  </span>
                </label>
              ))}
            </div>

            <h4 id="rc-infra-heading">Current Infrastructure Setup</h4>
            <div className="rc-infra-row" role="group" aria-labelledby="rc-infra-heading">
              {INFRA.map((b) => (
                <button
                  key={b.val}
                  type="button"
                  className={`rc-infra-btn ${infra === b.val ? 'active' : ''}`}
                  aria-pressed={infra === b.val}
                  onClick={() => {
                    setInfra(b.val)
                    engage()
                    track('calculator_infra_selected', { infra_type: b.val })
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* RIGHT: estimate + lead form */}
          <Reveal variant="right" delay={2} className="rc-card rc-estimate">
            <h3 style={{ color: 'var(--rc-gold)' }}>
              <span className="ic">●</span> Your Real-Time Estimate
            </h3>
            <div className="rc-estimate-hero" aria-live="polite">
              <div>
                <div className="lbl">Estimated Enterprise Requirement</div>
                <div className="rc-estimate-num" ref={numRef}>
                  {result.total}
                  <small> Mbps DIA</small>
                </div>
              </div>
              <div className="rc-sla-badge">{result.sla}</div>
            </div>
            <div className="rc-stat-strip">
              <div className="rc-stat">
                <div className="n">{result.perUserAllocation} Mbps</div>
                <div className="l">Per-User Allocation</div>
              </div>
              <div className="rc-stat">
                <div className="n">{result.cFactor}×</div>
                <div className="l">Concurrency Factor</div>
              </div>
              <div className="rc-stat">
                <div className="n">{tierLabel(seats)}</div>
                <div className="l">Company Scale</div>
              </div>
            </div>
            <div className="rc-summary">
              Based on{' '}
              <b>
                {seats} seat{seats === 1 ? '' : 's'}
              </b>{' '}
              ({result.cloudLevel} Cloud Utilization), we recommend <b>{result.total} Mbps Dedicated Internet Access (DIA)</b> with a 50 Mbps
              failover link and managed 24/7 NOC monitoring.
            </div>

            <div className="rc-lead">
              <h4>Get Your Free Blueprint</h4>
              <form onSubmit={onSubmit}>
                <div className="rc-lead-row">
                  <label htmlFor="rc-name" className="visually-hidden">Full name</label>
                  <input type="text" id="rc-name" name="name" placeholder="Full name" required autoComplete="name" />
                </div>
                <div className="rc-lead-row">
                  <label htmlFor="rc-email" className="visually-hidden">Corporate email address</label>
                  <input type="email" id="rc-email" name="email" placeholder="Enter Corporate Email Address" required autoComplete="email" />
                </div>
                <div className="rc-lead-row">
                  <label htmlFor="rc-phone" className="visually-hidden">Phone number (optional)</label>
                  <input type="text" id="rc-phone" name="phone" placeholder="Phone (optional)" autoComplete="tel" />
                </div>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <button type="submit" className="rc-btn" disabled={busy}>
                  {busy ? 'Generating…' : '⬇ Download Free Infrastructure Blueprint (PDF)'}
                </button>
              </form>
              {msg && <div className={`rc-msg ${msg.kind}`}>{msg.text}</div>}
              <div className="rc-note">Report generates instantly in your browser + a copy is emailed to our team.</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
