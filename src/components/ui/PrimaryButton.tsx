import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight } from './Icons'

export function PrimaryButton({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`btn-primary ${className}`}>
      <span className="relative">{children}</span>
      <span className="arrow relative">
        <ArrowRight width={26} height={26} />
      </span>
    </Link>
  )
}

/** Renders **bold** markers from the CMS as <b>. */
export function RichLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : <span key={i}>{p}</span>,
      )}
    </>
  )
}
