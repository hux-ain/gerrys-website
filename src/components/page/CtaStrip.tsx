import { PrimaryButton } from '../ui/PrimaryButton'
import { Reveal } from '../ui/Reveal'

/** "Check out Our Comprehensive Services → Contact Now" dark strip from the live site. */
export function CtaStrip() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#2b2925] to-[#4a4234] px-4 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center lg:px-8">
        <Reveal variant="left">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            Check out Our <span className="text-primary">Comprehensive Services</span>
          </h2>
        </Reveal>
        <Reveal variant="right" delay={1}>
          <PrimaryButton href="/contact-us">Contact Now</PrimaryButton>
        </Reveal>
      </div>
    </section>
  )
}
