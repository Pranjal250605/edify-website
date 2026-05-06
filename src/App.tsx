import { useEffect, useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, EASE, motionSafe } from '@/lib/gsap'

import Navbar    from './components/layout/Navbar'
import Footer    from './components/layout/Footer'

import Hero           from './components/sections/Hero'
import TechTicker     from './components/sections/TechTicker'
import HowItWorks     from './components/sections/HowItWorks'
import ParallaxBand   from './components/sections/ParallaxBand'
import Stats          from './components/sections/Stats'
import BentoGrid      from './components/sections/BentoGrid'
import Pillars        from './components/sections/Pillars'
import EventsGallery  from './components/sections/EventsGallery'
import Contact        from './components/sections/Contact'

/* ── Unsplash image URLs ──────────────────────────────────
   All fetched at 1920 px wide, 80 % JPEG quality.
   Tinted to dark-navy in ParallaxBand's overlay.
────────────────────────────────────────────────────────── */
const IMG_CIRCUIT =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80'
const IMG_HACKATHON =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80'
const IMG_TOKYO =
  'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1920&q=80'

/* ─── Scroll progress bar ────────────────────────────── */
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!barRef.current) return
    gsap.set(barRef.current, { scaleX: 0 })
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => {
        gsap.set(barRef.current, { scaleX: self.progress, overwrite: 'auto' })
      },
    })
  }, { scope: barRef })

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[200] origin-left"
      style={{
        height: '2px',
        background: 'linear-gradient(90deg, #00d9ff, #3b82f6 50%, #ff2e97)',
        boxShadow: '0 0 8px rgba(0,217,255,0.4)',
      }}
    />
  )
}

/* ─── About section ──────────────────────────────────── */
function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    /* Parallax background image */
    if (imgRef.current && sectionRef.current) {
      gsap.fromTo(
        imgRef.current,
        motionSafe({ y: '-13%' }),
        {
          y: '13%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end:   'bottom top',
            scrub: 1.5,
          },
        }
      )
    }

    if (leftRef.current) {
      gsap.from(leftRef.current, motionSafe({
        opacity: 0, x: -32, duration: 0.8, ease: EASE.expo,
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }))
    }

    if (rightRef.current) {
      gsap.from(rightRef.current.querySelectorAll('.value-card'), motionSafe({
        opacity: 0, y: 20, duration: 0.6, stagger: 0.08, delay: 0.15, ease: EASE.expo,
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }))
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="about" className="relative py-28 overflow-hidden bg-surface-container-lowest">

      {/* ── Parallax photo background ── */}
      <div
        ref={imgRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: '-18%', bottom: '-18%', zIndex: 0 }}
      >
        <img
          src={IMG_TOKYO}
          alt="Tokyo city at night — global technology reach"
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
          style={{ opacity: 0.18 }}
        />
      </div>

      {/* Overlay that restores dark glassmorphism look */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `
            radial-gradient(ellipse 50% 60% at 80% 50%, rgba(206,229,255,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 50%, rgba(111,246,253,0.06) 0%, transparent 70%),
            linear-gradient(to bottom, rgba(6,13,26,0.55) 0%, rgba(6,13,26,0.3) 50%, rgba(6,13,26,0.55) 100%)
          `,
        }}
      />

      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          zIndex: 1,
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div ref={leftRef}>
            <p className="font-mono text-xs text-primary-container tracking-[0.2em] uppercase mb-4">
              Our Mission
            </p>

            <p className="font-display italic font-light text-text-muted leading-none mb-3 select-none"
               style={{ fontSize:'clamp(1rem,3vw,1.5rem)', letterSpacing:'0.05em', opacity: 0.2 }}
               aria-hidden="true">
              技術で世界を変える。
            </p>

            <h2
              className="font-display italic font-light text-text-primary mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              Technology for a{' '}
              <span className="text-secondary-fixed drop-shadow-md">Borderless Future</span>
            </h2>

            <p className="font-body font-light text-text-secondary text-lg leading-relaxed mb-8">
              Edify bridges cutting-edge technology with human potential.
              We believe LLM-powered education and autonomous drone infrastructure
              are the twin engines of the next industrial revolution — and we're engineering both
              from Sapporo to the world.
            </p>

            <ul className="space-y-3">
              {[
                { label: '代表取締役', value: '吉田　宏平' },
                { label: 'CEO', value: 'Yoshida Kohei' },
                { label: 'Founded', value: '2020 — Sapporo, Hokkaido' },
                { label: 'Global reach', value: 'Japan · India · Web3 communities' },
              ].map(({ label, value }) => (
                <li key={label} className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-text-muted tracking-wide w-28 shrink-0">{label}</span>
                  <span className="h-px flex-1 bg-white/8" />
                  <span className="font-body font-light text-text-secondary">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div ref={rightRef} className="grid grid-cols-2 gap-4">
            {[
              { ja: '革新', en: 'Innovation',  color: '#6ff6fd', sub: 'We build the new.' },
              { ja: '精度', en: 'Precision',   color: '#cee5ff', sub: 'Every detail matters.' },
              { ja: '信頼', en: 'Trust',       color: '#ffffd6', sub: 'Blockchain guaranteed.' },
              { ja: '教育', en: 'Education',   color: '#6ff6fd', sub: 'LLMs unlock potential.' },
            ].map(({ ja, en, color, sub }) => (
              <div
                key={en}
                className="value-card bg-surface-container-low/80 ghost-border ambient-shadow rounded-2xl p-6
                           backdrop-blur-sm transition-colors duration-400 group"
              >
                <p
                  className="font-display italic font-light leading-none mb-3 transition-all duration-400 opacity-20"
                  style={{ fontSize: '3.5rem', color, letterSpacing: '-0.04em' }}
                  aria-hidden="true"
                >
                  {ja}
                </p>
                <p className="font-display italic font-light text-text-primary text-xl mb-1"
                   style={{ letterSpacing:'-0.02em' }}>
                  {en}
                </p>
                <p className="font-body font-light text-text-muted text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Slide-over wrapper ───────────────────────────────────
   Gives sections a rounded top and negative margin so they
   visually "slide over" the ParallaxBand beneath them.
────────────────────────────────────────────────────────── */
function SlideOver({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative z-10 bg-void"
      style={{
        marginTop: '-3.5rem',
        borderRadius: '2.5rem 2.5rem 0 0',
        overflow: 'clip',
      }}
    >
      {children}
    </div>
  )
}

/* ─── App root ───────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('lang', 'ja')
  }, [])

  return (
    <div className="min-h-screen bg-void text-text-primary font-body antialiased">
      <ScrollProgress />
      <Navbar />

      <main id="main-content">

        {/* ── 1. Hero ── */}
        <Hero />

        {/* ── 2. Contact form — prominent, near the top (macrevive: appointment form) ── */}
        <Contact />

        {/* ── 3. How It Works — 3-step Edify process ── */}
        <HowItWorks />

        {/* ── Parallax Band 1: circuit board / tech ── */}
        <ParallaxBand
          src={IMG_CIRCUIT}
          alt="Circuit board representing blockchain and AI infrastructure"
          tags={['LLM', 'Blockchain', 'Drone Tech', 'AI']}
          height="58vh"
        />

        {/* ── 4–7. Core sections slide over the image ── */}
        <SlideOver>
          <TechTicker />
          <Pillars />
          <BentoGrid />
          <EventsGallery />
        </SlideOver>

        {/* ── Parallax Band 2: hackathon / people ── */}
        <ParallaxBand
          src={IMG_HACKATHON}
          alt="International hackathon — Zentej at IIT campuses"
          tags={['Zentej', 'IIT Mandi', 'IIT Ropar', 'Japan × India']}
          height="58vh"
        />

        {/* ── 8–9. Stats + About slide over the image ── */}
        <SlideOver>
          <Stats />
          <About />
        </SlideOver>

      </main>

      <Footer />
    </div>
  )
}
