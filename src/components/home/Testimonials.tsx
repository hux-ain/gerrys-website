'use client'
import { useEffect, useRef, useState } from 'react'
import { backgroundAbout } from '@/content/defaults'
import type { Testimonial } from '@/content/types'
import { ChevronLeft, ChevronRight } from '../ui/Icons'
import { Pic } from '../ui/Pic'
import { Reveal } from '../ui/Reveal'
import { SplitHeading } from '../ui/SplitHeading'

/** Two reviews at a time on desktop, one on mobile. Auto-plays, pauses on hover. */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [perView, setPerView] = useState(1)
  const [idx, setIdx] = useState(0)
  const hover = useRef(false)
  const max = Math.max(0, items.length - perView)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const set = () => setPerView(mq.matches ? 2 : 1)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      if (!hover.current && !document.hidden && !document.documentElement.classList.contains('a11y-stop-anim')) setIdx((i) => (i >= max ? 0 : i + 1))
    }, 8000)
    return () => clearInterval(t)
  }, [max])

  const go = (i: number) => setIdx(i < 0 ? max : i > max ? 0 : i)

  return (
    <section id="testimonials" className="px-4 pb-16 lg:pb-24">
      <div className="mx-auto max-w-7xl lg:px-8">
        <SplitHeading text="Testimonials" />
        <Reveal delay={1} className="relative mt-10">
          <div
            className="overflow-hidden rounded-[30px] bg-[#F4F4F496] bg-cover bg-no-repeat px-6 py-10 shadow-[0_4px_30px_0_#00000040] lg:px-14"
            style={{ backgroundImage: `url(${backgroundAbout})` }}
            onMouseEnter={() => (hover.current = true)}
            onMouseLeave={() => (hover.current = false)}
          >
            <div className="overflow-hidden">
              <ul
                className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
                style={{ transform: `translateX(-${(idx * 100) / perView}%)` }}
              >
                {items.map((t, i) => (
                  <li
                    key={`${t.name}-${i}`}
                    className="shrink-0 px-2 md:px-4"
                    style={{ width: `${100 / perView}%` }}
                    aria-hidden={i < idx || i >= idx + perView}
                  >
                    <figure className="h-full border-l-[5px] border-primary bg-white/40 p-5 transition duration-500 hover:bg-white/70">
                      <div className="relative mb-4 h-[90px] w-40">
                        <Pic img={t.logo} sizes="160px" className="object-contain object-left" />
                      </div>
                      <blockquote className="my-3 text-[15px] leading-7 text-black/85">{t.review}</blockquote>
                      <figcaption>
                        <p className="font-display text-lg font-bold">{t.name}</p>
                        {t.position && <p className="text-sm text-black/60">{t.position}</p>}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: max + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show review ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 ${i === idx ? 'w-8 bg-primary' : 'w-2.5 bg-black/20'}`}
                />
              ))}
            </div>
          </div>
          <button type="button" onClick={() => go(idx - 1)} aria-label="Previous review" className="absolute left-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg transition hover:bg-primary">
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => go(idx + 1)} aria-label="Next review" className="absolute right-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg transition hover:bg-primary">
            <ChevronRight />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
