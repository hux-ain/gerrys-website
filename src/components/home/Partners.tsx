import type { CSSProperties } from 'react'
import type { Logo } from '@/content/types'
import { Pic } from '../ui/Pic'
import { InView } from '../ui/Reveal'
import { SplitHeading } from '../ui/SplitHeading'

const chunk = <T,>(arr: T[], sizes: number[]) => {
  const out: T[][] = []
  let i = 0
  let k = 0
  while (i < arr.length) {
    const size = sizes[k % sizes.length]
    out.push(arr.slice(i, i + size))
    i += size
    k++
  }
  return out
}

/**
 * Honeycomb of diamonds with an equal gap on every side.
 * pitch = (size + space) * √2 ; rows overlap by half a pitch so they interlock.
 */
function Diamonds({ logos, rows, size, space }: { logos: Logo[]; rows: number[]; size: number; space: number }) {
  const pitch = (size + space) * Math.SQRT2
  const gap = Math.round(pitch - size)
  const offset = Math.round(size - pitch / 2)
  let d = 0
  return (
    <div className="flex flex-col items-center">
      {chunk(logos, rows).map((row, r) => (
        <div key={r} className="flex justify-center" style={{ gap, marginTop: r === 0 ? 0 : -offset }}>
          {row.map((p) => (
            <div key={p.name} className="diamond" style={{ '--s': `${size}px`, '--d': d++ } as CSSProperties} title={p.name}>
              <div className="relative h-[62%] w-[62%]">
                <Pic img={p.logo} sizes={`${size}px`} className="object-contain" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/** Diamond logo wall, same layout as the current site, with a pop-in animation. */
export function Partners({ partners }: { partners: Logo[] }) {
  return (
    <section id="partners" className="overflow-hidden px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl lg:px-8">
        <SplitHeading text="Our Partners" />
      </div>
      <InView className="mb-6 mt-20 hidden xl:block">
        <Diamonds logos={partners} rows={[5, 6]} size={128} space={26} />
      </InView>
      <InView className="mb-6 mt-16 hidden md:block xl:hidden">
        <Diamonds logos={partners} rows={[4, 5]} size={100} space={20} />
      </InView>
      <InView className="mb-4 mt-14 md:hidden">
        <Diamonds logos={partners} rows={[2, 3]} size={72} space={14} />
      </InView>
    </section>
  )
}
