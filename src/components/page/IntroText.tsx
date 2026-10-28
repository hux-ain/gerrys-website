import type { ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'

export function IntroText({ children }: { children: ReactNode }) {
  return (
    <Reveal className="mx-auto max-w-5xl px-6 py-12 text-center text-[16px] leading-8 text-black/80 lg:py-16">{children}</Reveal>
  )
}
