import { useEffect, useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, EASE, motionSafe } from '@/lib/gsap'
import { ArrowRight, ChevronDown } from 'lucide-react'
import GlowButton  from '../ui/GlowButton'
import PhotoFrame  from '../ui/PhotoFrame'

/* ── Hero image ──────────────────────────────────────────
   Earth from space: global reach · Japan → India → World
   Dark bg matches our void palette perfectly.
─────────────────────────────────────────────────────── */
const HERO_IMG =
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85'

/* ════════════════════════════════════════════════════════
   ROTATING PILLAR
════════════════════════════════════════════════════════ */
const PILLARS = [
  { text: 'AI & LLM',   color: '#6ff6fd' },
  { text: 'Blockchain', color: '#ffffd6' },
  { text: 'Drone Tech', color: '#cee5ff' },
  { text: 'Reskilling', color: '#6ff6fd' },
]

function RotatingPillar({ flexClass = 'justify-center' }: { flexClass?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const idxRef  = useRef(0)
  const tlRef   = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    el.textContent = PILLARS[0].text
    el.style.color  = PILLARS[0].color
    gsap.set(el, { opacity: 1, y: 0 })

    const timer = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % PILLARS.length
      const next = idxRef.current
      const el2  = textRef.current
      if (!el2) return
      tlRef.current?.kill()
      const tl = gsap.timeline()
      tl.to(el2, { y: '-110%', opacity: 0, duration: 0.35, ease: EASE.in })
        .call(() => {
          el2.textContent = PILLARS[next].text
          el2.style.color  = PILLARS[next].color
          gsap.set(el2, { y: '110%' })
        })
        .to(el2, { y: 0, opacity: 1, duration: 0.55, ease: EASE.expo })
      tlRef.current = tl
    }, 2600)

    return () => { clearInterval(timer); tlRef.current?.kill() }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden w-full flex ${flexClass}`}
      style={{ height: 'clamp(2.8rem, 7vw, 5.5rem)' }}
      aria-live="polite"
    >
      <div
        ref={textRef}
        className="absolute font-display italic font-light drop-shadow-md"
        style={{
          fontSize:      'clamp(2.8rem, 7vw, 5.5rem)',
          letterSpacing: '-0.04em',
          lineHeight:    1,
          opacity:       0,
        }}
      />
    </div>
  )
}

/* ════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imgPanelRef = useRef<HTMLDivElement>(null)
  const imgInnerRef = useRef<HTMLDivElement>(null)

  // Left column text refs
  const badgeRef  = useRef<HTMLDivElement>(null)
  const jaRef     = useRef<HTMLParagraphElement>(null)
  const headRef   = useRef<HTMLDivElement>(null)
  const tagRef    = useRef<HTMLParagraphElement>(null)
  const ctaRef    = useRef<HTMLDivElement>(null)
  const proofRef  = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLAnchorElement>(null)

  // Aurora background blobs
  const aurora1Ref = useRef<HTMLDivElement>(null)
  const aurora2Ref = useRef<HTMLDivElement>(null)
  const aurora3Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ── Aurora drift ── */
    if (!reduced) {
      gsap.to(aurora1Ref.current, {
        x: 45, y: -35, scale: 1.07,
        duration: 24, yoyo: true, repeat: -1, ease: 'sine.inOut',
      })
      gsap.to(aurora2Ref.current, {
        x: -40, y: 28, scale: 1.06,
        duration: 20, delay: 5, yoyo: true, repeat: -1, ease: 'sine.inOut',
      })
      gsap.to(aurora3Ref.current, {
        x: 22, y: -18, scale: 1.09,
        duration: 28, delay: 9, yoyo: true, repeat: -1, ease: 'sine.inOut',
      })
    }

    /* ── Entrance timeline ── */
    const chars = headRef.current?.querySelectorAll('.char') ?? []
    const tl = gsap.timeline({ defaults: { ease: EASE.expo } })

    // Image panel slides in from right
    tl.from(imgPanelRef.current,  motionSafe({ opacity: 0, x: 60, duration: 1.1 }), 0.1)

    // Left column text stagger
    tl.from(badgeRef.current,     motionSafe({ opacity: 0, y: 24, duration: 0.7 }), 0.3)
      .from(jaRef.current,        motionSafe({ opacity: 0, y: 16, duration: 0.6 }), 0.48)
      .from(chars,                motionSafe({
        opacity: 0, y: 52, rotateX: -80, stagger: 0.032, duration: 0.65,
        transformOrigin: '50% 100%',
      }), 0.62)
      .from(tagRef.current,       motionSafe({ opacity: 0, y: 20, duration: 0.6 }), 1.12)
      .from(ctaRef.current,       motionSafe({ opacity: 0, y: 20, duration: 0.6 }), 1.27)
      .from(proofRef.current,     motionSafe({ opacity: 0, y: 14, duration: 0.5 }), 1.4)
      .from(scrollRef.current,    motionSafe({ opacity: 0, duration: 0.5 }),         1.9)

    /* ── Image parallax (subtle float on scroll) ── */
    if (!reduced && imgInnerRef.current) {
      gsap.fromTo(
        imgInnerRef.current,
        { y: '-6%' },
        {
          y: '6%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end:   'bottom top',
            scrub: 1.8,
          },
        }
      )
    }

    /* ── Scroll cue bounce ── */
    if (!reduced) {
      const arrow = scrollRef.current?.querySelector('.arrow')
      if (arrow) {
        gsap.to(arrow, {
          y: 7, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.2,
        })
      }
    }

    /* ── Text parallax on scroll (content drifts up) ── */
    if (!reduced) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end:   'bottom top',
        scrub: 1,
        onUpdate: self => {
          gsap.set(contentRef.current, {
            y:         self.progress * (window.innerHeight * 0.22),
            opacity:   1 - self.progress * 1.4,
            overwrite: 'auto',
          })
        },
      })
    }
  }, { scope: sectionRef })

  /* Character-split spans with gradient text fill */
  const charSpans = (text: string) =>
    text.split('').map((c, i) =>
      c === ' ' ? (
        <span key={i} className="char" style={{ display: 'inline' }}>{'\u00A0'}</span>
      ) : (
        <span
          key={i}
          className="char"
          style={{
            display:              'inline-block',
            background:           'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.52) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
          }}
        >
          {c}
        </span>
      )
    )

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-surface"
    >
      {/* ── Aurora mesh ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-60">
        <div ref={aurora1Ref} className="absolute rounded-full"
             style={{ width: 950, height: 750, top: '-20%', left: '-25%',
                      background: 'radial-gradient(ellipse, rgba(0,105,109,0.15) 0%, transparent 68%)',
                      filter: 'blur(52px)' }} />
        <div ref={aurora2Ref} className="absolute rounded-full"
             style={{ width: 850, height: 650, bottom: '-28%', right: '-18%',
                      background: 'radial-gradient(ellipse, rgba(0,99,153,0.1) 0%, transparent 68%)',
                      filter: 'blur(60px)' }} />
        <div ref={aurora3Ref} className="absolute rounded-full"
             style={{ width: 560, height: 480, top: '28%', right: '12%',
                      background: 'radial-gradient(ellipse, rgba(81,100,0,0.08) 0%, transparent 70%)',
                      filter: 'blur(44px)' }} />
      </div>

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize:  '24px 24px',
          maskImage:       'radial-gradient(ellipse 78% 78% at 50% 50%, black 25%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 78% 78% at 50% 50%, black 25%, transparent 100%)',
          opacity: 0.42,
        }}
      />

      {/* ════════════════════════════════════════════════════
          FULL-BLEED IMAGE PANEL — absolutely on the right half.
          Bleeds to the viewport edge; text column is inside
          the max-width container on the left.
      ════════════════════════════════════════════════════ */}
      <div
        ref={imgPanelRef}
        className="hidden lg:block absolute right-0 top-0 bottom-0"
        style={{ width: '50%', zIndex: 1 }}
      >
        {/* Inner wrapper for the subtle parallax y-travel */}
        <div
          ref={imgInnerRef}
          className="absolute"
          style={{ inset: '-8% 0' }}
        >
          <PhotoFrame
            src={HERO_IMG}
            alt="Earth from space — Edify bridges Japan, India and the world through AI, Blockchain and Drone technology"
            accent="primary"
            fade="left"
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* ── Floating stat badges on the image ── */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-10 pointer-events-none">

          {/* Top-right: live dot + label */}
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                             bg-black/40 backdrop-blur-md border border-white/10
                             font-mono text-[9px] tracking-[0.18em] uppercase text-white/55">
              <span className="live-dot shrink-0" />
              Global Operations
            </span>
          </div>

          {/* Bottom-left: partner count + location */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {[
                { value: '4',  label: 'Tech Pillars'  },
                { value: '3',  label: 'IIT Partners'  },
                { value: '50+', label: 'Hackathon Teams' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="px-3.5 py-2.5 rounded-2xl bg-black/45 backdrop-blur-md
                             border border-white/10 flex flex-col gap-0.5"
                >
                  <span
                    className="font-display italic font-light text-white/90 leading-none"
                    style={{ fontSize: '1.5rem', letterSpacing: '-0.03em' }}
                  >
                    {value}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Japan → India arc label */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
                Sapporo
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-white/5 max-w-[3rem]" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
                IIT Mandi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          TEXT COLUMN — inside max-width, left side only on lg+
      ════════════════════════════════════════════════════ */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex items-center"
        style={{ zIndex: 2 }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full py-28">

          {/* On lg+: content occupies ~52% (left side) */}
          <div className="flex flex-col items-center text-center
                          lg:items-start lg:text-left lg:max-w-[52%]">

            {/* Badge */}
            <div ref={badgeRef} className="mb-7">
              <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full
                               bg-white/[0.05] backdrop-blur-md border border-white/10
                               font-mono text-xs tracking-[0.18em] uppercase text-slate-300">
                <span className="live-dot shrink-0" />
                Hiroshima / Sapporo, Japan
              </span>
            </div>

            {/* Japanese kicker */}
            <p
              ref={jaRef}
              className="font-display italic mb-2 text-text-muted"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', letterSpacing: '0.05em' }}
              aria-hidden="true"
            >
              未来を、繋ぐ。
            </p>

            {/* Main headline — char-split gradient */}
            <div
              ref={headRef}
              className="mb-3 font-display italic font-light drop-shadow-sm"
              style={{
                fontSize:      'clamp(2.8rem, 5.5vw, 5rem)',
                letterSpacing: '-0.04em',
                lineHeight:    1.01,
                perspective:   '600px',
              }}
            >
              <span aria-label="Bridging the Future with" style={{ display: 'block' }}>
                {charSpans('Bridging the')}
              </span>
              <span style={{ display: 'block' }}>
                {charSpans('Future with')}
              </span>
            </div>

            {/* Rotating pillar */}
            <div className="mb-7 w-full">
              <RotatingPillar flexClass="justify-center lg:justify-start" />
            </div>

            {/* Tagline */}
            <p
              ref={tagRef}
              className="font-light text-slate-400 max-w-md mb-9 leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)' }}
            >
              Hiroshima-born. Globally ambitious. Edify engineers LLM-powered reskilling
              platforms and blockchain-secured drone UTM systems for the age of intelligent automation.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            >
              <GlowButton variant="white" size="lg" href="#services" icon={<ArrowRight size={18} />}>
                Explore Services
              </GlowButton>
              <GlowButton variant="ghost" size="lg" href="#about">
                Our Story
              </GlowButton>
            </div>

            {/* Social proof */}
            <div
              ref={proofRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <div className="flex items-center gap-2">
                {['IIT Mandi', 'IIT Ropar', 'Air Water'].map(name => (
                  <span
                    key={name}
                    className="font-mono text-[10px] tracking-wide text-text-muted
                               px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07]"
                  >
                    {name}
                  </span>
                ))}
              </div>
              <span className="h-3 w-px bg-white/15 hidden sm:block" aria-hidden="true" />
              <span className="font-mono text-[10px] text-text-muted/55 tracking-wide hidden sm:block">
                Partner institutions · Japan &amp; India
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <a
        ref={scrollRef}
        href="#contact"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                   text-slate-600 hover:text-slate-400 transition-colors duration-300"
        style={{ zIndex: 3 }}
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <div className="arrow">
          <ChevronDown size={16} />
        </div>
      </a>
    </section>
  )
}
