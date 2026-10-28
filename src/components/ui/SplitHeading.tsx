'use client'
import { Fragment, type CSSProperties } from 'react'
import { useInView } from './useInView'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  divider?: boolean | 'center'
}

/** Heading whose words slide up one after another, with the gold bar growing under it. */
export function SplitHeading({ text, as = 'h2', className = 'section-heading', divider = true }: Props) {
  const ref = useInView<HTMLHeadingElement>()
  const Tag = as
  const words = text.split(' ')
  const cls = `split ${divider ? 'divider' : ''} ${divider === 'center' ? 'center' : ''} ${className}`
  return (
    <Tag ref={ref} className={cls} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true">
            <span style={{ '--i': i } as CSSProperties}>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
