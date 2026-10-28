'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV } from '@/content/defaults'
import type { SiteContent } from '@/content/types'
import { Close, Facebook, Instagram, LinkedIn, Mail, Menu, Mic, Phone, Ribbon, Search } from '../ui/Icons'
import { SearchOverlay } from './SearchOverlay'

export function Header({ site }: { site: SiteContent }) {
  const pathname = usePathname()
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<null | 'text' | 'voice'>(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 140)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open || search ? 'hidden' : ''
  }, [open, search])

  const isActive = (href: string, children?: { href: string }[]) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href) || Boolean(children?.some((c) => pathname.startsWith(c.href)))

  // When the menu sticks to the top it turns fully dark (black pill, white text)
  const linkCls = (active: boolean) =>
    `flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 font-display text-[14px] font-medium transition-colors duration-300 xl:px-4 xl:text-[15px] ${
      active ? 'bg-primary text-black' : stuck ? 'text-white hover:bg-white/15' : 'text-black hover:bg-primary/20'
    }`
  const iconBtn = `grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 ${stuck ? 'text-white hover:bg-white/15' : 'text-black hover:bg-primary/20'}`

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* Top bar */}
      <div className="hidden lg:block" style={{ background: site.topBar.background }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 text-sm">
          <div className="flex items-center gap-4">
            {site.topBar.showRibbon && <Ribbon width={30} height={30} />}
            {site.socials.facebook && (
              <a href={site.socials.facebook} aria-label="Facebook" target="_blank" rel="noopener" className="transition hover:-translate-y-0.5">
                <Facebook width={20} height={20} />
              </a>
            )}
            {site.socials.instagram && (
              <a href={site.socials.instagram} aria-label="Instagram" target="_blank" rel="noopener" className="transition hover:-translate-y-0.5">
                <Instagram width={20} height={20} />
              </a>
            )}
            {site.socials.linkedin && (
              <a href={site.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener" className="transition hover:-translate-y-0.5">
                <LinkedIn width={20} height={20} />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 px-3 hover:underline">
              <Mail width={18} height={18} />
              {site.email}
            </a>
            <span className="h-5 w-px bg-black" />
            <a href={`tel:${site.phoneLink}`} className="flex items-center gap-2 px-3 hover:underline">
              <Phone width={18} height={18} />
              {site.phone}
            </a>
            {site.topBar.showRibbon && <Ribbon width={30} height={30} />}
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl items-start justify-between px-4 pt-3 lg:px-6">
        {/* Gold logo box hanging from the top, like the current site */}
        <Link href="/" aria-label="Gerry's Information Technology, home" className={`transition-opacity duration-300 ${stuck ? 'lg:pointer-events-none lg:opacity-0' : ''}`}>
          <Image src="/brand/gerrys-it-logo.webp" alt="Gerry's Information Technology" width={240} height={376} priority className="h-auto w-[78px] lg:w-[110px]" />
        </Link>

        {/* Desktop menu pill */}
        <nav
          aria-label="Main"
          className={`z-50 hidden rounded-full px-2.5 py-2 transition-all duration-500 lg:block ${
            stuck
              ? 'fixed left-1/2 top-3 -translate-x-1/2 bg-black shadow-[0_18px_40px_-14px_rgba(0,0,0,.7)] ring-1 ring-white/10'
              : 'relative bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,.35)]'
          }`}
        >
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) => (
              <li key={item.label} className="group relative">
                <Link href={item.href} className={linkCls(isActive(item.href, item.children))}>
                  {item.label}
                  {item.children && <span className="ml-1 text-[10px] transition-transform group-hover:rotate-180">▼</span>}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-10 w-60 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className={`overflow-hidden rounded-2xl p-2 shadow-2xl ${stuck ? 'bg-neutral-900 text-white' : 'bg-white'}`}>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={`block whitespace-nowrap rounded-xl px-4 py-3 font-display text-[15px] transition hover:translate-x-1 ${
                              stuck ? 'hover:bg-white/10' : 'hover:bg-primary/20'
                            } ${pathname.startsWith(c.href) ? 'bg-primary/25 font-semibold' : ''}`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            <li className={`mx-1 h-6 w-px ${stuck ? 'bg-white/25' : 'bg-black/15'}`} aria-hidden="true" />
            <li>
              <button type="button" onClick={() => setSearch('text')} aria-label="Search" className={iconBtn}>
                <Search width={20} height={20} />
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setSearch('voice')} aria-label="Search by voice" className={iconBtn}>
                <Mic width={20} height={20} />
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile buttons */}
        <div className={`mt-2 flex gap-2 lg:hidden ${stuck ? 'fixed right-4 top-1' : ''}`}>
          <button type="button" onClick={() => setSearch('voice')} aria-label="Search by voice" className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-lg">
            <Mic />
          </button>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="grid h-12 w-12 place-items-center rounded-2xl bg-black text-white shadow-lg">
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile off-canvas */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-[61] flex h-full w-[86%] max-w-sm flex-col bg-white transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile menu"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b p-4">
          <Image src="/brand/gerrys-it-logo-dark.webp" alt="Gerry's IT" width={240} height={372} className="h-14 w-auto" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-xl border">
            <Close />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen(false)
            setSearch('text')
          }}
          className="mx-4 mt-4 flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-black/60"
        >
          <Search width={20} height={20} /> Search…
        </button>
        <ul className="flex-1 overflow-y-auto p-4">
          {NAV.map((item, i) => (
            <li
              key={item.label}
              className={`border-b transition-all duration-500 ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
              style={{ transitionDelay: open ? `${i * 45}ms` : '0ms' }}
            >
              <Link href={item.href} className={`block py-3.5 font-display font-semibold ${isActive(item.href) ? 'text-primary-dark' : ''}`}>
                {item.label}
              </Link>
              {item.children && (
                <ul className="pb-3 pl-4">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="block py-2 text-gray-600">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="space-y-2 border-t p-4 text-sm">
          <a href={`tel:${site.phoneLink}`} className="flex items-center gap-2">
            <Phone width={18} height={18} /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2">
            <Mail width={18} height={18} /> {site.email}
          </a>
        </div>
      </aside>

      <SearchOverlay open={search !== null} startWithVoice={search === 'voice'} onClose={() => setSearch(null)} />
    </header>
  )
}
