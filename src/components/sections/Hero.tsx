import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, ScrollTrigger, EASE, motionSafe } from '@/lib/gsap'
import { ArrowRight, ChevronDown } from 'lucide-react'
import GlowButton from '../ui/GlowButton'

/* ────────────────────────────────────────────────────────────
   Hero background video sources — Pexels CDN, royalty-free.
   All true 4K (3840×2160) unless noted. Resolution is encoded
   in the filename: "_3840_2160_" = UHD, "_2560_1440_" = QHD.
   To swap, change the right-hand side of `HERO_VIDEO` below.
──────────────────────────────────────────────────────────── */
const HERO_VIDEOS = {
  cloudscape4K:
    'https://videos.pexels.com/video-files/36295077/15391252_3840_2160_30fps.mp4',
  mountainClouds:
    'https://videos.pexels.com/video-files/35218559/14919829_2560_1440_30fps.mp4',
  cloudsOnly:
    'https://videos.pexels.com/video-files/33785467/14340558_1440_2560_60fps.mp4',
} as const

const HERO_VIDEO: string = HERO_VIDEOS.cloudscape4K

/* Words that cycle through the heading's middle line — keep these
   the same length-of-line as the static lines so the heading box
   doesn't visibly resize as the word swaps. */
const ROTATING_PILLARS = ['LLMs.', 'Blockchain.', 'Drone Tech.', 'AI.'] as const

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)
  const cueRef     = useRef<HTMLAnchorElement>(null)
  const badgeRef   = useRef<HTMLDivElement>(null)
  const rotatorRef = useRef<HTMLSpanElement>(null)

  const [videoReady, setVideoReady] = useState(false)

  /* Mount: gentle fade-up of the video once metadata loads */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onReady = () => setVideoReady(true)
    if (v.readyState >= 2) onReady()
    else v.addEventListener('loadeddata', onReady, { once: true })
    return () => v.removeEventListener('loadeddata', onReady)
  }, [])

  /* Cycle the rotating word inside the heading. The element is a
     single absolutely-positioned span whose textContent we swap;
     GSAP slides it up & out, swaps the text, slides it back in. */
  useEffect(() => {
    const el = rotatorRef.current
    if (!el) return
    el.textContent = ROTATING_PILLARS[0]

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let idx = 0
    let active: gsap.core.Timeline | null = null

    const interval = setInterval(() => {
      idx = (idx + 1) % ROTATING_PILLARS.length
      const next = ROTATING_PILLARS[idx]
      const node = rotatorRef.current
      if (!node) return
      active?.kill()

      const tl = gsap.timeline()
      tl.to(node, { yPercent: -110, opacity: 0, duration: 0.32, ease: EASE.in })
        .call(() => {
          node.textContent = next
          gsap.set(node, { yPercent: 110 })
        })
        .to(node, { yPercent: 0, opacity: 1, duration: 0.55, ease: EASE.expo })

      active = tl
    }, 2400)

    return () => { clearInterval(interval); active?.kill() }
  }, [])

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Entrance — stagger the heading lines (matches simhatel's
       "fade up + slight slide" pattern), then sub, then CTA. */
    const lines = headRef.current?.querySelectorAll('.hero-line') ?? []
    const tl = gsap.timeline({ defaults: { ease: EASE.expo } })

    tl.from(badgeRef.current, motionSafe({ opacity: 0, y: 14, duration: 0.6 }), 0.3)
      .from(lines,             motionSafe({ opacity: 0, y: 28, stagger: 0.12, duration: 0.85 }), 0.5)
      .from(subRef.current,    motionSafe({ opacity: 0, y: 16, duration: 0.6 }), 1.05)
      .from(ctaRef.current,    motionSafe({ opacity: 0, y: 16, duration: 0.55 }), 1.2)
      .from(cueRef.current,    motionSafe({ opacity: 0, duration: 0.5 }), 1.55)

    /* Parallax — video drifts slower than text */
    if (!reduced && sectionRef.current) {
      gsap.fromTo(
        videoRef.current,
        { yPercent: 0, scale: 1.05 },
        {
          yPercent: 12,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
          },
        }
      )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: self => {
          gsap.set(contentRef.current, {
            y: self.progress * (window.innerHeight * 0.18),
            opacity: 1 - self.progress * 1.3,
            overwrite: 'auto',
          })
        },
      })
    }

    /* Looping bounce on the scroll cue */
    if (!reduced) {
      const arrow = cueRef.current?.querySelector('.arrow')
      if (arrow) {
        gsap.to(arrow, {
          y: 6, duration: 1.6, repeat: -1, yoyo: true,
          ease: 'sine.inOut', delay: 1.9,
        })
      }
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden
                 flex items-end justify-center px-6 pb-28 sm:pb-32
                 bg-surface-container-lowest"
    >
      {/* ── Video layer ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
          aria-hidden="true"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Solid fallback while video loads */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, #0e1828 0%, #060d1a 70%, #020810 100%)',
            opacity: videoReady ? 0 : 1,
          }}
        />
      </div>

      {/* ── Subtle overlay (matches simhatel: light gradient, no heavy
            vignette so the video stays vivid). ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(2,8,16,0.35) 0%,
              rgba(2,8,16,0.10) 30%,
              rgba(2,8,16,0.50) 100%),
            rgba(0,0,0,0.10)
          `,
        }}
      />

      {/* ════════════════════════════════════════════════════
          CONTENT — bottom-centred, max-w-6xl
          (mirrors simhatel.com's hero layout)
      ════════════════════════════════════════════════════ */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-6xl mx-auto text-center"
      >
        <div className="flex flex-col gap-5 items-center">

          {/* Badge */}
          <div ref={badgeRef}>
            <span
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full
                         bg-white/[0.06] backdrop-blur-md border border-white/15
                         font-mono text-[11px] tracking-[0.22em] uppercase text-white/80"
            >
              <span className="live-dot shrink-0" />
              株式会社Edify · Japan
            </span>
          </div>

          {/* Headline — three-line stacked structure (simhatel pattern):
              Line 1 static, Line 2 rotating gradient pillar, Line 3 static.
              Outfit, font-semibold (600), tracking-tight, NOT italic. */}
          <h1
            ref={headRef}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                       font-semibold tracking-tight leading-[1.15]
                       drop-shadow-lg text-white"
          >
            <span className="hero-line block mb-2">Engineered for</span>

            <span
              className="hero-line relative flex w-full justify-center
                         overflow-hidden text-center pb-2 sm:pb-3 md:pb-4
                         pt-1 min-h-[1.4em] leading-[1.2]"
            >
              <span
                ref={rotatorRef}
                className="absolute inset-0 flex items-center justify-center
                           font-semibold leading-[1.2]
                           bg-gradient-to-r from-white via-cyan-200 to-white
                           bg-clip-text text-transparent drop-shadow-lg"
                aria-live="polite"
              />
            </span>

            <span className="hero-line block">Built from Japan.</span>
          </h1>

          {/* Subhead — Inter, light weight, drop-shadow for legibility */}
          <p
            ref={subRef}
            className="font-body text-base sm:text-lg md:text-xl text-white/85
                       max-w-2xl mx-auto leading-relaxed drop-shadow-md font-light"
          >
            Four technologies. One platform. Built from Japan for the world.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap justify-center gap-3 pt-2">
            <GlowButton variant="white" size="lg" href="#pillars" icon={<ArrowRight size={18} />}>
              Explore Pillars
            </GlowButton>
            <GlowButton
              variant="ghost"
              size="lg"
              href="#contact"
              onClick={e => {
                e.preventDefault()
                const target = document.getElementById('contact')
                if (!target) return
                window.scrollTo({ top: target.offsetTop, behavior: 'instant' as ScrollBehavior })
                history.replaceState(null, '', '#contact')
              }}
            >
              Get in Touch
            </GlowButton>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        ref={cueRef}
        href="#pillars"
        aria-label="Scroll to pillars"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-2
                   text-white/50 hover:text-white/80 transition-colors duration-300"
      >
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase">Scroll</span>
        <div className="arrow">
          <ChevronDown size={16} />
        </div>
      </a>
    </section>
  )
}
