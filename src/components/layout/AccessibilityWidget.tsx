'use client'
/**
 * Accessibility Adjustments panel (replaces the OneTap WordPress plugin).
 * Settings are saved in the visitor's browser and applied as classes on <html>.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { AccessibilityIcon, Close, Speaker } from '../ui/Icons'

type Settings = {
  fontScale: number // 100 – 160 (%)
  lineHeight: number // 0 – 3
  letterSpacing: number // 0 – 3
  readableFont: boolean
  highlightLinks: boolean
  highlightHeadings: boolean
  bigCursor: boolean
  textAlign: 'none' | 'left' | 'center'
  contrast: 'none' | 'light' | 'dark' | 'high'
  monochrome: boolean
  lowSaturation: boolean
  readingLine: boolean
  readingMask: boolean
  hideImages: boolean
  stopAnimations: boolean
}

const DEFAULTS: Settings = {
  fontScale: 100,
  lineHeight: 0,
  letterSpacing: 0,
  readableFont: false,
  highlightLinks: false,
  highlightHeadings: false,
  bigCursor: false,
  textAlign: 'none',
  contrast: 'none',
  monochrome: false,
  lowSaturation: false,
  readingLine: false,
  readingMask: false,
  hideImages: false,
  stopAnimations: false,
}

const KEY = 'gerrys-a11y'

const PROFILES: { id: string; title: string; desc: string; apply: Partial<Settings> }[] = [
  { id: 'vision', title: 'Vision Impaired', desc: 'Bigger text and stronger contrast', apply: { fontScale: 130, contrast: 'high', highlightHeadings: true } },
  { id: 'seizure', title: 'Seizure Safe', desc: 'Stops animations, softer colours', apply: { stopAnimations: true, lowSaturation: true } },
  { id: 'adhd', title: 'ADHD Friendly', desc: 'Reading mask and no motion', apply: { readingMask: true, stopAnimations: true } },
  { id: 'cognitive', title: 'Cognitive Disability', desc: 'Readable font, highlighted links', apply: { readableFont: true, highlightLinks: true, highlightHeadings: true } },
  { id: 'dyslexia', title: 'Dyslexia Friendly', desc: 'Readable font with more spacing', apply: { readableFont: true, letterSpacing: 2, lineHeight: 2 } },
]

function applyToDocument(s: Settings) {
  const root = document.documentElement
  const set = (cls: string, on: boolean) => root.classList.toggle(cls, on)
  root.style.setProperty('--a11y-scale', String(s.fontScale / 100))
  set('a11y-scaled', s.fontScale !== 100)
  root.style.setProperty('--a11y-lh', String(1.6 + s.lineHeight * 0.3))
  set('a11y-lh', s.lineHeight > 0)
  root.style.setProperty('--a11y-ls', `${s.letterSpacing * 0.05}em`)
  set('a11y-ls', s.letterSpacing > 0)
  set('a11y-readable', s.readableFont)
  set('a11y-links', s.highlightLinks)
  set('a11y-headings', s.highlightHeadings)
  set('a11y-cursor', s.bigCursor)
  set('a11y-align-left', s.textAlign === 'left')
  set('a11y-align-center', s.textAlign === 'center')
  set('a11y-contrast-light', s.contrast === 'light')
  set('a11y-contrast-dark', s.contrast === 'dark')
  set('a11y-contrast-high', s.contrast === 'high')
  set('a11y-mono', s.monochrome)
  set('a11y-lowsat', s.lowSaturation)
  set('a11y-hide-img', s.hideImages)
  set('a11y-stop-anim', s.stopAnimations)
}

function Toggle({ label, on, onClick, hint }: { label: string; on: boolean; onClick: () => void; hint?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`flex min-h-[74px] flex-col items-start justify-center rounded-xl border-2 p-3 text-left text-sm transition ${
        on ? 'border-primary bg-primary/15 font-semibold' : 'border-transparent bg-black/[.04] hover:border-black/15'
      }`}
    >
      <span>{label}</span>
      {hint && <span className="mt-0.5 text-xs font-normal text-black/55">{hint}</span>}
    </button>
  )
}

function Stepper({ label, value, display, onDec, onInc }: { label: string; value: number; display: string; onDec: () => void; onInc: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-black/[.04] p-3 text-sm">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        <button type="button" onClick={onDec} aria-label={`Decrease ${label}`} className="grid h-9 w-9 place-items-center rounded-lg bg-white text-lg font-bold shadow-sm hover:bg-primary">
          −
        </button>
        <span className="w-16 text-center font-semibold" aria-live="polite" data-value={value}>
          {display}
        </span>
        <button type="button" onClick={onInc} aria-label={`Increase ${label}`} className="grid h-9 w-9 place-items-center rounded-lg bg-white text-lg font-bold shadow-sm hover:bg-primary">
          +
        </button>
      </div>
    </div>
  )
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [s, setS] = useState<Settings>(DEFAULTS)
  const [speaking, setSpeaking] = useState(false)
  const lineRef = useRef<HTMLDivElement>(null)
  const maskTop = useRef<HTMLDivElement>(null)
  const maskBottom = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // load saved settings
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) setS({ ...DEFAULTS, ...JSON.parse(saved) })
    } catch {
      /* ignore */
    }
  }, [])

  // apply + save
  useEffect(() => {
    applyToDocument(s)
    try {
      localStorage.setItem(KEY, JSON.stringify(s))
    } catch {
      /* ignore */
    }
  }, [s])

  // reading line / reading mask follow the pointer
  useEffect(() => {
    if (!s.readingLine && !s.readingMask) return
    const move = (e: PointerEvent) => {
      if (lineRef.current) lineRef.current.style.top = `${e.clientY}px`
      if (maskTop.current) maskTop.current.style.height = `${Math.max(0, e.clientY - 60)}px`
      if (maskBottom.current) maskBottom.current.style.top = `${e.clientY + 60}px`
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [s.readingLine, s.readingMask])

  // close with Escape, keep focus inside panel
  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('button')?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const update = useCallback((p: Partial<Settings>) => setS((prev) => ({ ...prev, ...p })), [])
  const flip = (k: keyof Settings) => setS((prev) => ({ ...prev, [k]: !prev[k] }))

  // Text-to-speech: reads the selected text, or the whole page
  const read = () => {
    if (!('speechSynthesis' in window)) return
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const selected = window.getSelection()?.toString().trim()
    const text = selected || document.getElementById('main')?.innerText || ''
    const u = new SpeechSynthesisUtterance(text.slice(0, 6000))
    u.lang = 'en-US'
    u.rate = 0.95
    u.onend = () => setSpeaking(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(u)
    setSpeaking(true)
  }

  const changed = JSON.stringify(s) !== JSON.stringify(DEFAULTS)

  return (
    <>
      {/* Floating button, sits above the WhatsApp button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open accessibility adjustments"
        aria-expanded={open}
        className="fixed bottom-[92px] right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-black text-white shadow-xl ring-4 ring-white transition hover:scale-110 hover:bg-primary hover:text-black"
      >
        <AccessibilityIcon width={30} height={30} />
        {changed && <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full bg-primary ring-2 ring-white" aria-hidden="true" />}
      </button>

      {s.readingLine && <div ref={lineRef} className="pointer-events-none fixed inset-x-0 z-[90] h-1 bg-primary shadow-[0_0_0_2px_#000]" style={{ top: -10 }} aria-hidden="true" />}
      {s.readingMask && (
        <>
          <div ref={maskTop} className="pointer-events-none fixed inset-x-0 top-0 z-[90] bg-black/65" style={{ height: 0 }} aria-hidden="true" />
          <div ref={maskBottom} className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] bg-black/65" style={{ top: '100vh' }} aria-hidden="true" />
        </>
      )}

      {open && <div className="fixed inset-0 z-[84] bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility adjustments"
        className={`a11y-panel fixed bottom-0 right-0 top-0 z-[85] flex w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between bg-black px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <AccessibilityIcon width={28} height={28} className="text-primary" />
            <h2 className="font-display text-lg font-bold">Accessibility Adjustments</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close accessibility adjustments" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
            <Close />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-5">
          <button
            type="button"
            onClick={read}
            className={`flex w-full items-center justify-center gap-3 rounded-xl p-4 font-display font-bold transition ${speaking ? 'bg-red-500 text-white' : 'bg-primary hover:brightness-95'}`}
          >
            <Speaker /> {speaking ? 'Stop reading' : 'Read page aloud (or selected text)'}
          </button>

          <section>
            <h3 className="mb-3 font-display font-bold">Accessibility profiles</h3>
            <div className="grid grid-cols-2 gap-2">
              {PROFILES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => update({ ...DEFAULTS, ...p.apply })}
                  className="rounded-xl bg-black/[.04] p-3 text-left text-sm transition hover:bg-primary/20"
                >
                  <span className="block font-semibold">{p.title}</span>
                  <span className="text-xs text-black/55">{p.desc}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-display font-bold">Content</h3>
            <div className="space-y-2">
              <Stepper
                label="Text size"
                value={s.fontScale}
                display={`${s.fontScale}%`}
                onDec={() => update({ fontScale: Math.max(80, s.fontScale - 10) })}
                onInc={() => update({ fontScale: Math.min(160, s.fontScale + 10) })}
              />
              <Stepper
                label="Line height"
                value={s.lineHeight}
                display={s.lineHeight ? `+${s.lineHeight}` : 'Default'}
                onDec={() => update({ lineHeight: Math.max(0, s.lineHeight - 1) })}
                onInc={() => update({ lineHeight: Math.min(3, s.lineHeight + 1) })}
              />
              <Stepper
                label="Letter spacing"
                value={s.letterSpacing}
                display={s.letterSpacing ? `+${s.letterSpacing}` : 'Default'}
                onDec={() => update({ letterSpacing: Math.max(0, s.letterSpacing - 1) })}
                onInc={() => update({ letterSpacing: Math.min(3, s.letterSpacing + 1) })}
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Toggle label="Readable font" on={s.readableFont} onClick={() => flip('readableFont')} />
              <Toggle label="Highlight links" on={s.highlightLinks} onClick={() => flip('highlightLinks')} />
              <Toggle label="Highlight headings" on={s.highlightHeadings} onClick={() => flip('highlightHeadings')} />
              <Toggle label="Big cursor" on={s.bigCursor} onClick={() => flip('bigCursor')} />
              <Toggle label="Align left" on={s.textAlign === 'left'} onClick={() => update({ textAlign: s.textAlign === 'left' ? 'none' : 'left' })} />
              <Toggle label="Align center" on={s.textAlign === 'center'} onClick={() => update({ textAlign: s.textAlign === 'center' ? 'none' : 'center' })} />
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-display font-bold">Colour</h3>
            <div className="grid grid-cols-2 gap-2">
              <Toggle label="Light contrast" on={s.contrast === 'light'} onClick={() => update({ contrast: s.contrast === 'light' ? 'none' : 'light' })} />
              <Toggle label="Dark contrast" on={s.contrast === 'dark'} onClick={() => update({ contrast: s.contrast === 'dark' ? 'none' : 'dark' })} />
              <Toggle label="High contrast" on={s.contrast === 'high'} onClick={() => update({ contrast: s.contrast === 'high' ? 'none' : 'high' })} />
              <Toggle label="Monochrome" on={s.monochrome} onClick={() => flip('monochrome')} />
              <Toggle label="Low saturation" on={s.lowSaturation} onClick={() => flip('lowSaturation')} />
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-display font-bold">Orientation</h3>
            <div className="grid grid-cols-2 gap-2">
              <Toggle label="Reading line" hint="A guide line follows the mouse" on={s.readingLine} onClick={() => flip('readingLine')} />
              <Toggle label="Reading mask" hint="Focus on one strip of text" on={s.readingMask} onClick={() => flip('readingMask')} />
              <Toggle label="Hide images" on={s.hideImages} onClick={() => flip('hideImages')} />
              <Toggle label="Stop animations" on={s.stopAnimations} onClick={() => flip('stopAnimations')} />
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-display font-bold">Skip to</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {[
                ['Main content', '#main'],
                ['Menu', 'nav[aria-label="Main"]'],
                ['Footer', 'footer'],
              ].map(([label, sel]) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-xl bg-black/[.04] p-3 hover:bg-primary/20"
                  onClick={() => {
                    setOpen(false)
                    const el = document.querySelector<HTMLElement>(sel)
                    el?.scrollIntoView({ behavior: 'smooth' })
                    el?.setAttribute('tabindex', '-1')
                    el?.focus()
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="border-t p-4">
          <button type="button" onClick={() => setS(DEFAULTS)} className="w-full rounded-xl bg-black py-3 font-display font-bold text-white hover:bg-neutral-800">
            Reset all settings
          </button>
        </div>
      </div>
    </>
  )
}
