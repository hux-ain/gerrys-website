import { AboutSection } from '@/components/home/AboutSection'
import { Achievements } from '@/components/home/Achievements'
import { ClientsStrip } from '@/components/home/ClientsStrip'
import { ContactSection } from '@/components/home/ContactSection'
import { CtaBanner } from '@/components/home/CtaBanner'
import { HeroSlider } from '@/components/home/HeroSlider'
import { Partners } from '@/components/home/Partners'
import { RoiCalculator } from '@/components/home/RoiCalculator'
import { ServicesTabs } from '@/components/home/ServicesTabs'
import { Testimonials } from '@/components/home/Testimonials'
import { getHome, getSite } from '@/lib/getContent'

// Page is built once and cached; editing Home in the admin panel rebuilds it instantly.
export const revalidate = 3600

export default async function HomePage() {
  const [home, site] = await Promise.all([getHome(), getSite()])
  return (
    <>
      <HeroSlider slides={home.slides} />
      <AboutSection about={home.about} stats={home.stats} />
      <ServicesTabs services={home.services} />
      <RoiCalculator />
      <Partners partners={home.partners} />
      <ClientsStrip clients={home.clients} />
      <Achievements items={home.achievements} />
      <Testimonials items={home.testimonials} />
      <CtaBanner cta={home.cta} />
      <ContactSection contact={home.contact} site={site} />
    </>
  )
}
