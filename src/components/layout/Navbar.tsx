import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'
import { Menu, X } from 'lucide-react'
import GlowButton from '../ui/GlowButton'

const NAV_LINKS = [
  { label: 'Home',     href: '#home'     },
  { label: 'Pillars',  href: '#pillars'  },
  { label: 'Contact',  href: '#contact'  },
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

  const activeId = useActiveSection(['home', 'pillars', 'contact'])

  /* Instant jump to #contact — bypasses CSS `scroll-behavior: smooth`
     so we don't scrub through the pinned Pillars ScrollTrigger when
     navigating from above it. */
  const jumpToContact = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('contact')
    if (!target) return
    window.scrollTo({ top: target.offsetTop, behavior: 'instant' as ScrollBehavior })
    history.replaceState(null, '', '#contact')
  }, [])

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

  /* Active dot positioning — animate to the correct nav item.
     Important: the dot's containing block is <nav> (which has `relative`
     and is `max-w-7xl mx-auto` — i.e. NOT flush against the viewport edge).
     We must compute targetX against <nav>'s rect, not <header>'s, otherwise
     the dot lands centering-offset to the right and ends up under the
     wrong link. */
  const positionDot = useCallback(() => {
    const dot = dotRef.current
    if (!dot) return
    const navContainer = dot.parentElement      // <nav>
    if (!navContainer) return
    const sectionId = activeId.replace('#', '')
    if (!sectionId) {
      gsap.to(dot, { opacity: 0, duration: 0.2 })
      return
    }
    const anchor = navContainer.querySelector<HTMLAnchorElement>(
      `a[href="#${sectionId}"]`
    )
    if (!anchor) return
    const navRect    = navContainer.getBoundingClientRect()
    const anchorRect = anchor.getBoundingClientRect()
    const targetX = anchorRect.left + anchorRect.width / 2 - navRect.left

    gsap.to(dot, {
      x: targetX - 4,   // -4 = half the dot width (8px)
      opacity: 1,
      duration: 0.4,
      ease: EASE.expo,
    })
  }, [activeId])

  useEffect(() => { positionDot() }, [positionDot])

  /* Recompute on resize — the nav re-centers and links shift */
  useEffect(() => {
    const fn = () => positionDot()
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [positionDot])

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
    const icon = logoRef.current?.querySelector('[data-logo-icon]')
    if (icon) gsap.to(icon, { rotate: 180, duration: 0.6, ease: EASE.expo })
  }, [])
  const onLogoLeave = useCallback(() => {
    const icon = logoRef.current?.querySelector('[data-logo-icon]')
    if (icon) gsap.to(icon, { rotate: 0, duration: 0.5, ease: EASE.spring })
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
            <div data-logo-icon className="w-8 h-8 shrink-0 will-change-transform">
              <img
                src="/edifylogo.png"
                alt="Edify"
                draggable={false}
                className="w-full h-full object-contain"
              />
            </div>
            <span
              className="font-display font-semibold text-2xl text-text-primary
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
                    onClick={href === '#contact' ? jumpToContact : undefined}
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
            <GlowButton
              variant="primary"
              size="sm"
              href="#contact"
              onClick={jumpToContact}
              className="hidden md:inline-flex"
            >
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
                onClick={e => {
                  if (href === '#contact') jumpToContact(e)
                  closeMenu()
                }}
                className="flex items-center px-4 py-3 rounded-xl font-body font-medium
                           text-text-muted hover:text-text-primary hover:bg-surface-container
                           transition-all duration-200"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <GlowButton
              variant="primary"
              size="md"
              href="#contact"
              className="w-full"
              onClick={e => { jumpToContact(e); closeMenu() }}
            >
              Get in Touch
            </GlowButton>
          </li>
        </ul>
      </div>
    </>
  )
}
