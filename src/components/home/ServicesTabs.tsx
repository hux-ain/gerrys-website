'use client'
import { useState } from 'react'
import type { Service } from '@/content/types'
import { CheckBadge } from '../ui/Icons'
import { Pic } from '../ui/Pic'
import { PrimaryButton } from '../ui/PrimaryButton'
import { Reveal } from '../ui/Reveal'
import { SplitHeading } from '../ui/SplitHeading'

export function ServicesTabs({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0)
  const s = services[active]

  return (
    <section id="services" className="px-4 pb-16 lg:pb-24">
      <div className="mx-auto max-w-7xl lg:px-8">
        <SplitHeading text="Services" />

        <Reveal delay={1} className="mt-8 flex justify-center">
          <div role="tablist" aria-label="Services" className="relative flex flex-wrap justify-center gap-1 rounded-full bg-[#F1F1F1] p-1.5">
            {services.map((t, i) => (
              <button
                key={t.tabTitle}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls="service-panel"
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 font-display text-sm font-medium transition-all duration-300 md:px-8 md:text-base ${
                  i === active ? 'bg-primary text-black shadow-md' : 'text-black hover:bg-black/5'
                }`}
              >
                {t.tabTitle}
              </button>
            ))}
          </div>
        </Reveal>

        {s && (
          <div
            key={active}
            id="service-panel"
            role="tabpanel"
            className="mt-10 grid items-center gap-8 animate-[rise_0.7s_cubic-bezier(.2,.7,.2,1)_both] lg:grid-cols-2"
          >
            <div className="group relative aspect-[776/618] overflow-hidden rounded-[35px] shadow-lg">
              <Pic img={s.image} sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="lg:p-10">
              {s.logo && (
                <div className="relative h-16 w-64 max-w-full">
                  <Pic img={s.logo} sizes="260px" className="object-contain object-left" />
                </div>
              )}
              <ul className="my-6 space-y-3">
                {s.points.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 font-display font-medium animate-[rise_0.6s_ease_both]"
                    style={{ animationDelay: `${150 + i * 80}ms` }}
                  >
                    <CheckBadge width={22} height={22} />
                    {p}
                  </li>
                ))}
              </ul>
              {s.link && <PrimaryButton href={s.link}>Discover</PrimaryButton>}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
