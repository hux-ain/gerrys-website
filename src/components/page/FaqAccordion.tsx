'use client'
import { useState } from 'react'
import type { Faq } from '@/content/types'
import { Reveal } from '../ui/Reveal'

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mt-12 space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <Reveal key={f.question} delay={Math.min(i, 5)}>
            <div className={`overflow-hidden rounded-xl border transition-colors duration-300 ${isOpen ? 'border-primary bg-primary/10' : 'border-black/10 bg-white hover:border-black/25'}`}>
              <h3>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold"
                >
                  {f.question}
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? 'rotate-180 bg-primary' : 'bg-black/5'}`} aria-hidden="true">
                    ▾
                  </span>
                </button>
              </h3>
              <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 leading-7 text-black/80">{f.answer}</p>
                </div>
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
