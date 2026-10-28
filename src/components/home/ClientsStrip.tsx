import type { Logo } from '@/content/types'
import { Pic } from '../ui/Pic'
import { Reveal } from '../ui/Reveal'
import { SplitHeading } from '../ui/SplitHeading'

/** "Our Esteemed Clients": logos glide continuously, pause on hover. */
export function ClientsStrip({ clients }: { clients: Logo[] }) {
  const loop = [...clients, ...clients]
  return (
    <section id="clients" className="px-4 pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl lg:px-8">
        <SplitHeading text="Our Esteemed Clients" />
        <Reveal delay={1} className="marquee mt-10 overflow-hidden rounded-[25px] bg-soft py-6 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <ul className="marquee-track flex w-max items-center gap-12 px-6">
            {loop.map((c, i) => (
              <li key={i} aria-hidden={i >= clients.length} className="relative h-16 w-36 shrink-0 transition-transform duration-300 hover:scale-110">
                <Pic img={c.logo} sizes="144px" className="object-contain" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
