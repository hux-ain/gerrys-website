import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = { width: 24, height: 24, viewBox: '0 0 24 24', 'aria-hidden': true } as const

export const ArrowRight = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const ChevronLeft = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
)
export const ChevronRight = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)
export const Mail = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
  </svg>
)
export const Phone = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
    <path d="M10.5 18.5h3" />
  </svg>
)
export const CheckBadge = (p: P) => (
  <svg {...base} fill="none" {...p}>
    <circle cx="12" cy="12" r="10" fill="#FCAF17" />
    <path d="M7.5 12.5l3 3 6-6.5" stroke="#000" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const Facebook = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
  </svg>
)
export const Instagram = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.8} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r=".7" fill="currentColor" />
  </svg>
)
export const LinkedIn = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M6.9 8.8H3.8V20h3.1V8.8zM5.4 3.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-1.6-4.9-4.3-4.9-1.4 0-2.4.8-2.8 1.5V8.8H10V20h3.1v-5.6c0-1.5.6-2.6 2-2.6s1.9 1.1 1.9 2.6V20h3.2v-6.4z" />
  </svg>
)
export const WhatsApp = (p: P) => (
  <svg {...base} viewBox="0 0 32 32" fill="currentColor" {...p}>
    <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.1a12.7 12.7 0 0 0 6.1 1.5c7 0 12.7-5.6 12.7-12.7S23 3 16 3zm0 23.2c-2 0-3.9-.5-5.5-1.5l-.4-.2-4.1 1.2 1.2-4-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.3 9.9 10.1 5.2 16 5.2s10.6 4.7 10.6 10.5S21.9 26.2 16 26.2zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7c0 1.6 1.2 3.1 1.3 3.3s2.3 3.5 5.6 4.9c2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5s.3-1.3.2-1.5-.3-.2-.6-.4z" />
  </svg>
)
export const Menu = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)
export const Close = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const Ribbon = (p: P) => (
  <svg {...base} viewBox="0 0 32 32" {...p}>
    <circle cx="16" cy="16" r="15" fill="#fff" />
    <path d="M16 7c-2.6 0-4.3 2-4.3 4.3 0 1.9 1.2 3.7 2.6 5.5L10 24l2.4 1.4 3.6-6 3.6 6L22 24l-4.3-7.2c1.4-1.8 2.6-3.6 2.6-5.5C20.3 9 18.6 7 16 7zm0 2.3c1.1 0 2 .8 2 2 0 1-.8 2.3-2 3.8-1.2-1.5-2-2.8-2-3.8 0-1.2.9-2 2-2z" fill="#E4407B" />
  </svg>
)
export const Search = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4" />
  </svg>
)
export const Mic = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
  </svg>
)
export const AccessibilityIcon = (p: P) => (
  <svg {...base} viewBox="0 0 32 32" fill="currentColor" {...p}>
    <circle cx="16" cy="6.2" r="2.8" />
    <path d="M25.6 10.4c-3.2.9-6.3 1.4-9.6 1.4s-6.4-.5-9.6-1.4a1.2 1.2 0 1 0-.7 2.3c2.6.7 5.2 1.2 7.9 1.4v4.1l-2.4 8.1a1.2 1.2 0 0 0 2.3.7L16 20.1l2.5 6.9a1.2 1.2 0 0 0 2.3-.7l-2.4-8.1v-4.1c2.7-.2 5.3-.7 7.9-1.4a1.2 1.2 0 0 0-.7-2.3z" />
  </svg>
)
export const Speaker = (p: P) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 9v6h4l5 4V5L8 9H4z" />
    <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" />
  </svg>
)
