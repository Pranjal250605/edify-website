import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'
import { Menu, X } from 'lucide-react'
import GlowButton from '../ui/GlowButton'

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services',     href: '#services'     },
  { label: 'Zentej',       href: '#zentej'       },
  { label: 'About',        href: '#about'        },
  { label: 'Contact',      href: '#contact'      },
]

/* Active-section detection via IntersectionObserver */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [ids])
  return active
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navRef     = useRef<HTMLElement>(null)
  const dotRef     = useRef<HTMLSpanElement>(null)
  const mobileRef  = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const iconRef    = useRef<HTMLDivElement>(null)
  const logoRef    = useRef<HTMLAnchorElement>(null)

  const activeId = useActiveSection(
    ['home', 'contact', 'how-it-works', 'reskilling', 'services', 'zentej', 'about']
  )

  /* Entrance animation */
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80, opacity: 0, duration: 0.9, ease: EASE.expo,
    })
  }, { scope: navRef })

  /* Scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* Active dot positioning — animate to the correct nav item */
  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    const sectionId = activeId.replace('#', '')
    const anchor = document.querySelector<HTMLAnchorElement>(
      `nav a[href="#${sectionId}"]`
    )
    if (!anchor) return
    const navEl = navRef.current
    if (!navEl) return
    const navRect  = navEl.getBoundingClientRect()
    const anchorRect = anchor.getBoundingClientRect()
    const targetX = anchorRect.left + anchorRect.width / 2 - navRect.left

    gsap.to(dot, {
      x: targetX - 4,   // -4 = half the dot width (8px)
      opacity: activeId ? 1 : 0,
      duration: 0.4,
      ease: EASE.expo,
    })
  }, [activeId])

  /* Mobile menu open/close */
  const openMenu = useCallback(() => {
    setMobileOpen(true)
    // Animate in
    const menu = mobileRef.current
    const bg   = backdropRef.current
    if (!menu || !bg) return
    gsap.set(menu, { display: 'block', opacity: 0, y: -16, scale: 0.97 })
    gsap.set(bg,   { display: 'block', opacity: 0 })
    gsap.to(bg,   { opacity: 1, duration: 0.2 })
    gsap.to(menu, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: EASE.expo })
    gsap.from(menu.querySelectorAll('li'), {
      opacity: 0, x: -12, stagger: 0.04, delay: 0.1, duration: 0.4, ease: EASE.out,
    })
  }, [])

  const closeMenu = useCallback(() => {
    const menu = mobileRef.current
    const bg   = backdropRef.current
    if (!menu || !bg) return
    gsap.to(menu, {
      opacity: 0, y: -12, scale: 0.97, duration: 0.2, ease: EASE.in,
      onComplete: () => { gsap.set(menu, { display: 'none' }); setMobileOpen(false) },
    })
    gsap.to(bg, { opacity: 0, duration: 0.2, onComplete: () => gsap.set(bg, { display: 'none' }) })
  }, [])

  /* Logo icon spin on hover */
  const onLogoEnter = useCallback(() => {
    const svg = logoRef.current?.querySelector('svg')
    if (svg) gsap.to(svg, { rotate: 180, duration: 0.6, ease: EASE.expo })
  }, [])
  const onLogoLeave = useCallback(() => {
    const svg = logoRef.current?.querySelector('svg')
    if (svg) gsap.to(svg, { rotate: 0, duration: 0.5, ease: EASE.spring })
  }, [])

  /* Menu icon morph */
  const toggleMenu = useCallback(() => {
    mobileOpen ? closeMenu() : openMenu()
    gsap.to(iconRef.current, { rotate: mobileOpen ? 0 : 90, duration: 0.25 })
  }, [mobileOpen, openMenu, closeMenu])

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? {
          background:     'rgba(28, 27, 28, 0.88)', // surface-container-low
          backdropFilter: 'blur(24px)',
          boxShadow:      '0 4px 24px rgba(14, 14, 15, 0.4)',
        } : { background: 'transparent' }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

          {/* Active section dot — absolute, GSAP-positioned */}
          <span
            ref={dotRef}
            className="absolute bottom-2 left-0 w-2 h-2 rounded-full bg-primary-container"
            style={{
              boxShadow: '0 0 8px var(--colors-primary-container)',
              opacity: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Logo */}
          <a
            ref={logoRef}
            href="/"
            aria-label="Edify home"
            className="flex items-center gap-2.5 group"
            onMouseEnter={onLogoEnter}
            onMouseLeave={onLogoLeave}
          >
            <div className="w-8 h-8 shrink-0">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <circle cx="16" cy="16" r="3" fill="#e9feff"/>
                <line x1="16" y1="13" x2="16" y2="6"  stroke="#e9feff" strokeWidth="1.5"/>
                <line x1="16" y1="19" x2="16" y2="26" stroke="#e9feff" strokeWidth="1.5"/>
                <line x1="13" y1="16" x2="6"  y2="16" stroke="#00f5ff" strokeWidth="1.5"/>
                <line x1="19" y1="16" x2="26" y2="16" stroke="#00f5ff" strokeWidth="1.5"/>
                <circle cx="6"  cy="16" r="3" fill="none" stroke="#233143" strokeWidth="1.2"/>
                <circle cx="26" cy="16" r="3" fill="none" stroke="#233143" strokeWidth="1.2"/>
                <circle cx="16" cy="6"  r="3" fill="none" stroke="#233143" strokeWidth="1.2"/>
                <circle cx="16" cy="26" r="3" fill="none" stroke="#233143" strokeWidth="1.2"/>
              </svg>
            </div>
            <span
              className="font-display italic text-2xl text-text-primary
                         group-hover:text-primary-DEFAULT transition-colors duration-300"
            >
              Edify
            </span>
            <span className="font-body text-[11px] text-text-muted uppercase tracking-widest hidden sm:block mt-2">
              / Japan
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const id       = href.replace('#', '')
              const isActive = activeId === id
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={`
                      relative px-3.5 py-2 rounded-full font-body font-medium text-sm
                      transition-all duration-200 tracking-wide
                      ${isActive
                        ? 'text-primary-DEFAULT'
                        : 'text-text-muted hover:text-text-primary hover:bg-surface-container'
                      }
                    `}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <GlowButton variant="primary" size="sm" href="#contact" className="hidden md:inline-flex">
              Get in Touch
            </GlowButton>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-text-muted hover:text-primary-DEFAULT
                         hover:bg-surface-container transition-all duration-200"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <div ref={iconRef}>
                {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 bg-surface/60 backdrop-blur-sm md:hidden"
        style={{ display: 'none' }}
        onClick={closeMenu}
      />

      {/* Mobile drawer */}
      <div
        ref={mobileRef}
        className="fixed top-16 inset-x-4 z-50 glass-strong rounded-2xl
                   ghost-border p-4 md:hidden bg-surface-container-high"
        style={{ display: 'none' }}
      >
        <ul className="flex flex-col gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={closeMenu}
                className="flex items-center px-4 py-3 rounded-xl font-body font-medium
                           text-text-muted hover:text-text-primary hover:bg-surface-container
                           transition-all duration-200"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <GlowButton variant="primary" size="md" href="#contact"
                        className="w-full" onClick={closeMenu}>
              Get in Touch
            </GlowButton>
          </li>
        </ul>
      </div>
    </>
  )
}
