'use client'
import type { CSSProperties, ReactNode } from 'react'
import { useInView } from './useInView'

type Props = {
  children: ReactNode
  variant?: 'up' | 'left' | 'right' | 'zoom'
  delay?: number
  className?: string
}

/** Fades/slides its children in when they scroll into view. */
export function Reveal({ children, variant = 'up', delay = 0, className = '' }: Props) {
  const ref = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal reveal-${variant} ${className}`} style={{ '--d': delay } as CSSProperties}>
      {children}
    </div>
  )
}

/** Wrapper that only marks itself "in view" (children use [data-in] CSS). */
export function InView({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useInView<HTMLDivElement>(0.1)
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
