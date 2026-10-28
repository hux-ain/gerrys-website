'use client'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Slide } from '@/content/types'
import { Pic } from '../ui/Pic'
import { PrimaryButton } from '../ui/PrimaryButton'

const DELAY = 8000

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [idx, setIdx] = useState(0)
  const paused = useRef(false)
  const n = slides.length

  const go = useCallback((i: number) => setIdx(((i % n) + n) % n), [n])

  useEffect(() => {
    if (n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      if (!paused.current && !document.hidden && !document.documentElement.classList.contains('a11y-stop-anim')) setIdx((i) => (i + 1) % n)
    }, DELAY)
    return () => clearInterval(t)
  }, [n])

  return (
    <section
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black"
      aria-roledescription="carousel"
      aria-label="Gerry's services"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {slides.map((s, i) => {
        const active = i === idx
        const Heading = i === 0 ? 'h1' : 'h2'
        return (
          <div
            key={i}
            className={`hero-slide absolute inset-0 transition-opacity duration-1000 ${active ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
            data-active={active ? '' : undefined}
            aria-hidden={!active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}`}
          >
            <div className="hero-bg absolute inset-0">
              <Pic img={s.image} sizes="100vw" priority={i === 0} className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
            <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-[14vh]">
              <div className="max-w-2xl text-white">
                <Heading className="hero-h font-display text-[40px] font-extrabold uppercase leading-[1.02] tracking-[-0.06em] md:text-[60px]">
                  {s.heading.split(' ').map((w, k) => (
                    <span key={k} className="inline-block" style={{ '--i': k } as CSSProperties}>
                      {w}&nbsp;
                    </span>
                  ))}
                </Heading>
                {s.text && <p className="hero-p mt-6 max-w-xl font-display text-lg leading-relaxed md:text-xl">{s.text}</p>}
                {s.buttonLink && (
                  <div className="hero-btn mt-8">
                    <PrimaryButton href={s.buttonLink}>{s.buttonText || 'Discover More'}</PrimaryButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {n > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === idx}
              className={`h-2.5 rounded-full transition-all duration-500 ${i === idx ? 'w-10 bg-primary' : 'w-2.5 bg-white/60 hover:bg-white'}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
