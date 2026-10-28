import Image from 'next/image'
import type { CSSProperties } from 'react'

type Props = { title: string; image?: string; subtitle?: string }

/** Inner-page banner: dark network background with the gold title in a dark pill, like the live site. */
export function PageBanner({ title, image = '/images/pages/banner-network.webp', subtitle }: Props) {
  const words = title.split(' ')
  return (
    <section className="relative isolate flex min-h-[340px] items-end justify-center overflow-hidden bg-black pb-12 pt-44 lg:min-h-[400px] lg:pt-52">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-80 animate-[kenburns_10s_ease-out_both]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
      <div className="px-4 text-center">
        <h1
          className="inline-block rounded-full bg-gradient-to-br from-[#454036] to-[#302E2A] px-8 py-3.5 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-primary shadow-2xl md:text-5xl"
          aria-label={title}
        >
          {words.map((w, i) => (
            <span key={i} aria-hidden="true" className="inline-block animate-[rise_0.8s_cubic-bezier(.2,.7,.2,1)_both]" style={{ animationDelay: `${150 + i * 90}ms` } as CSSProperties}>
              {w}
              {i < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>
        <span className="mx-auto mt-5 block h-2 w-0 rounded-full bg-white animate-[grow-wide_1s_0.6s_cubic-bezier(.2,.7,.2,1)_both]" aria-hidden="true" />
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-white/85 animate-[rise_0.8s_0.5s_ease_both]">{subtitle}</p>}
      </div>
    </section>
  )
}
