'use client'
import { useEffect, useRef, useState } from 'react'

/** "500+" counts 1 → 500 and then shows the "+" once it reaches the end. */
export function Counter({ value, className = '' }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/)
  const prefix = match?.[1] ?? ''
  const target = match ? Number(match[2].replace(/,/g, '')) : 0
  const suffix = match?.[3] ?? ''
  const [n, setN] = useState(1)
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target)
      setDone(true)
      return
    }
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const dur = Math.min(2600, 1200 + target * 3)
        const t0 = performance.now()
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / dur)
          setN(1 + Math.round((target - 1) * (1 - Math.pow(1 - k, 3))))
          if (k < 1) raf = requestAnimationFrame(tick)
          else setDone(true)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  if (!match) return <span className={className}>{value}</span>
  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      {prefix}
      {n.toLocaleString()}
      {done ? suffix : ''}
    </span>
  )
}
