import type { Metadata, Viewport } from 'next'
import { Montserrat, Onest } from 'next/font/google'
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { AccessibilityWidget } from '@/components/layout/AccessibilityWidget'
import { getSite } from '@/lib/getContent'
import './globals.css'

// Two font families only, self-hosted as WOFF2 by Next.js (no Google request at runtime)
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' })
const onest = Onest({ subsets: ['latin'], variable: '--font-onest', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://gerrys.net'),
  title: {
    default: "Gerry's Information Technology | Dedicated Internet, Enterprise & Avaya Solutions",
    template: "%s | Gerry's IT",
  },
  description:
    "Gerry's Information Technology (GIT), part of Gerry's Group since 1998: CIR internet (Gerry's Net), enterprise IT solutions and Gerry's Avaya communications across Pakistan.",
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = { themeColor: '#FCAF17' }

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const site = await getSite()
  return (
    <html lang="en" className={`${montserrat.variable} ${onest.variable}`}>
      <body className="bg-white font-sans text-black antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:p-3">
          Skip to content
        </a>
        <Header site={site} />
        <main id="main">{children}</main>
        <Footer site={site} />
        <AccessibilityWidget />
        <WhatsAppButton number={site.whatsapp} />
      </body>
    </html>
  )
}
