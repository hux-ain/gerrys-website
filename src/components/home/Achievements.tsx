'use client'
import { useEffect, useRef, useState } from 'react'
import type { Certificate } from '@/content/types'
import { ChevronLeft, ChevronRight, Close } from '../ui/Icons'
import { Pic } from '../ui/Pic'
import { Reveal } from '../ui/Reveal'
import { SplitHeading } from '../ui/SplitHeading'

/** Certificate carousel: auto-scrolls, arrows, click to view large. */
export function Achievements({ items }: { items: Certificate[] }) {
  const track = useRef<HTMLUListElement>(null)
  const hover = useRef(false)
  const [open, setOpen] = useState<Certificate | null>(null)

  const step = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('li')
    const w = card ? card.getBoundingClientRect().width + 20 : 300
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' })
    else el.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      if (!hover.current && !document.hidden && !document.documentElement.classList.contains('a11y-stop-anim')) step(1)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="achievements" className="px-4 pb-16 lg:pb-24">
      <div className="mx-auto max-w-7xl lg:px-8">
        <SplitHeading text="Our Achievements" />
        <Reveal delay={1} className="relative mt-10">
          <div onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}>
            <ul ref={track} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-width:none]">
              {items.map((c) => (
                <li key={c.title} className="w-[70%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(20%-16px)]">
                  <button
                    type="button"
                    onClick={() => setOpen(c)}
                    className="group block w-full rounded-xl border border-black/10 bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                    aria-label={`View ${c.title}`}
                  >
                    <span className="relative block aspect-[7/5] overflow-hidden rounded-lg">
                      <Pic img={c.image} sizes="(min-width:1024px) 20vw, 70vw" className="object-contain transition-transform duration-500 group-hover:scale-110" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={() => step(-1)} aria-label="Previous" className="absolute -left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg transition hover:bg-primary">
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next" className="absolute -right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg transition hover:bg-primary">
            <ChevronRight />
          </button>
        </Reveal>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 animate-[rise_0.35s_ease_both]" onClick={() => setOpen(null)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute -top-14 right-0 grid h-11 w-11 place-items-center rounded-full bg-white">
              <Close />
            </button>
            <div className="relative aspect-[7/5] w-full overflow-hidden rounded-xl bg-white">
              <Pic img={open.image} sizes="90vw" className="object-contain" />
            </div>
            <p className="mt-3 text-center font-display font-semibold text-white">{open.title}</p>
          </div>
        </div>
      )}
    </section>
  )
}
