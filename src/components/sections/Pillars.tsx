import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Brain, Link2, Navigation, Sparkles } from 'lucide-react'
import { corePillars, type PillarId } from '@/data/content'

/* ─── Per-pillar visual config ──────────────────────────── */
type Cfg = {
  id:    PillarId
  icon:  React.ReactNode
  kanji: string
  color: string                /* accent — used in glow + text */
  rgb:   string                /* same colour as r,g,b for rgba() blends */
  photo: string                /* full-bleed background still */
}

const PILLAR_CFG: Cfg[] = [
  {
    id: 'llm',
    icon: <Brain size={26} />,
    kanji: '知',
    color: '#6ff6fd',
    rgb:   '111,246,253',
    photo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'blockchain',
    icon: <Link2 size={26} />,
    kanji: '鎖',
    color: '#ffffd6',
    rgb:   '255,255,214',
    photo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'drone',
    icon: <Navigation size={26} />,
    kanji: '飛',
    color: '#cee5ff',
    rgb:   '206,229,255',
    photo: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'ai',
    icon: <Sparkles size={26} />,
    kanji: '創',
    color: '#6ff6fd',
    rgb:   '111,246,253',
    photo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1800&q=80',
  },
]

export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const panelCount = PILLAR_CFG.length

    if (reduced) {
      /* Reduced motion → stack vertically; nothing to scrub */
      track.style.flexDirection = 'column'
      track.style.width = '100%'
      track.style.transform = 'none'
      return
    }

    /* Animate each panel individually (canonical GSAP horizontal-scroll
       pattern). Each panel is 100vw wide, so xPercent: -100*(n-1) shifts
       every panel left by (n-1)*100vw — which lands panel n at viewport-left.
       Animating the track itself with xPercent is brittle because xPercent
       is relative to the element's own width (400vw here), so the math
       does not match the per-panel intuition. */
    const panels = track.querySelectorAll<HTMLElement>('[data-panel]')

    /* Pinned horizontal scroll. The section is 100vh tall in document flow;
       ScrollTrigger pins it and inserts a (panelCount-1)*100vh pinSpacer so
       the user has scroll runway to scrub through all panels horizontally. */
    const tween = gsap.to(panels, {
      xPercent: -100 * (panelCount - 1),
      ease: 'none',
      scrollTrigger: {
        trigger:  section,
        start:    'top top',
        end:      () => `+=${(panelCount - 1) * window.innerHeight * 1.2}`,
        pin:      true,
        scrub:    1.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => {
          /* progress bar — tweened so it eases between scroll samples
             instead of stepping in lockstep with scrub. */
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              scaleX: self.progress,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
          /* active dot — animated via GSAP so the size/opacity change eases
             smoothly rather than fighting the CSS transition on every tick. */
          if (dotsRef.current) {
            const active = Math.min(panelCount - 1, Math.floor(self.progress * panelCount + 0.0001))
            const dots = dotsRef.current.querySelectorAll<HTMLElement>('[data-dot]')
            dots.forEach((d, i) => {
              gsap.to(d, {
                scaleX: i === active ? 2.4 : 1,
                opacity: i === active ? 1 : 0.35,
                duration: 0.6,
                ease: 'power3.out',
                overwrite: 'auto',
              })
            })
          }
        },
      },
    })

    /* Reset kanji + photo to visible final state — they were previously
       initialised hidden (opacity: 0) for a containerAnimation reveal that
       turned out to be brittle. Showing them statically is more reliable. */
    track.querySelectorAll<HTMLElement>('[data-kanji]').forEach(el => {
      gsap.set(el, { opacity: 0.09, x: 0 })
    })
    track.querySelectorAll<HTMLElement>('[data-photo]').forEach(el => {
      gsap.set(el, { scale: 1.05 })
    })

    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="pillars"
      className="relative bg-void overflow-hidden h-screen w-full"
    >
        {/* Header — sits above the panels, always visible while the section is pinned.
            Has a vertical gradient scrim so it stays legible no matter
            what panel content scrolls under it. */}
        <header
          className="absolute top-0 left-0 right-0 z-30 px-6 lg:px-12 pt-24 pb-6
                     flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4
                     pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(2,8,16,0.85) 0%, rgba(2,8,16,0.6) 60%, rgba(2,8,16,0) 100%)',
          }}
        >
          <div>
            <p className="font-mono text-[10px] text-primary-container tracking-[0.24em] uppercase mb-2">
              Core Technology Pillars
            </p>
            <h2
              className="font-display font-semibold tracking-tight leading-[1.15] text-text-primary"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              Four Technologies. <span className="text-secondary-fixed">One Vision.</span>
            </h2>
          </div>

          {/* Dot indicator — one tick per panel */}
          <div ref={dotsRef} className="flex items-center gap-2 self-end pb-1">
            {PILLAR_CFG.map((c, i) => (
              <span
                key={c.id}
                data-dot
                aria-label={`Panel ${i + 1}`}
                className="block h-[2px] w-6 rounded-full origin-left will-change-transform"
                style={{
                  background: c.color,
                  opacity: i === 0 ? 1 : 0.35,
                  transform: i === 0 ? 'scaleX(2.4)' : 'scaleX(1)',
                }}
              />
            ))}
          </div>
        </header>

        {/* Horizontal track — panels laid side by side */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${PILLAR_CFG.length * 100}vw` }}
        >
          {PILLAR_CFG.map((cfg, i) => {
            const pillar = corePillars.find(p => p.id === cfg.id)
            if (!pillar) return null
            return (
              <article
                key={cfg.id}
                data-panel
                className="relative h-full shrink-0 overflow-hidden"
                style={{ width: '100vw' }}
              >
                {/* Background photo — ken-burns */}
                <div
                  data-photo
                  className="absolute inset-0 will-change-transform"
                  style={{ transform: 'scale(1.1)' }}
                >
                  <img
                    src={cfg.photo}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover"
                    style={{ filter: 'grayscale(0.7) brightness(0.45) contrast(1.15)' }}
                  />
                </div>

                {/* Permanent dark gradient + accent bloom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      linear-gradient(120deg, rgba(2,8,16,0.92) 0%, rgba(2,8,16,0.55) 55%, rgba(2,8,16,0.25) 100%),
                      radial-gradient(ellipse 60% 50% at 90% 100%, rgba(${cfg.rgb},0.18) 0%, transparent 70%)
                    `,
                  }}
                />

                {/* Massive kanji watermark */}
                <span
                  data-kanji
                  className="absolute right-[6vw] top-1/2 -translate-y-1/2 font-display font-semibold
                             leading-none select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(12rem, 30vw, 26rem)',
                    color: cfg.color,
                    opacity: 0.09,
                    letterSpacing: '-0.05em',
                  }}
                  aria-hidden="true"
                >
                  {cfg.kanji}
                </span>

                {/* Content — anchored to top with consistent spacing below the
                    fixed header on every panel, so spacing feels uniform
                    regardless of how long each pillar's title/description is.
                    Sizing is tuned so all four panels fit a single viewport
                    without scrolling, and visually align at the same baseline. */}
                <div
                  data-panel-inner
                  className="relative z-10 h-full flex items-start
                             px-8 sm:px-14 lg:px-24
                             pt-48 sm:pt-52 lg:pt-56 pb-12 will-change-transform"
                >
                  <div className="max-w-2xl w-full">
                    {/* Number + icon row */}
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className="font-mono font-light leading-none"
                        style={{
                          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                          color: cfg.color,
                          opacity: 0.85,
                          letterSpacing: '-0.05em',
                        }}
                      >
                        0{i + 1}
                      </span>
                      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${cfg.color}80, transparent)` }} />
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                                   bg-white/[0.04] backdrop-blur-sm border border-white/15"
                        style={{ color: cfg.color }}
                      >
                        {cfg.icon}
                      </div>
                    </div>

                    {/* Label */}
                    <p
                      className="font-mono tracking-[0.24em] uppercase mb-2"
                      style={{ fontSize: '0.68rem', color: cfg.color, opacity: 0.85 }}
                    >
                      {pillar.labelEn}
                    </p>

                    {/* Title */}
                    <h3
                      className="font-display font-semibold tracking-tight leading-[1.12] text-text-primary mb-3"
                      style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)' }}
                    >
                      {pillar.titleEn}
                    </h3>

                    {/* Description */}
                    <p
                      className="font-body font-light text-text-secondary leading-snug mb-5 max-w-xl"
                      style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
                    >
                      {pillar.descriptionEn}
                    </p>

                    {/* Detail bullets — first 2, kept short so all panels match */}
                    <ul className="space-y-2 mb-5">
                      {pillar.detailsEn.slice(0, 2).map((d, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span
                            className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
                          />
                          <p
                            className="font-body font-light text-text-muted leading-snug max-w-md"
                            style={{ fontSize: 'clamp(0.78rem, 0.95vw, 0.85rem)' }}
                          >
                            {d}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* Keyword pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.keywordsEn.slice(0, 4).map(kw => (
                        <span
                          key={kw}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-full border"
                          style={{
                            color: cfg.color,
                            borderColor: `rgba(${cfg.rgb},0.28)`,
                            backgroundColor: `rgba(${cfg.rgb},0.06)`,
                          }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom progress bar — scaleX driven by ScrollTrigger */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-white/5"
          aria-hidden="true"
        >
          <div
            ref={progressRef}
            className="h-full origin-left"
            style={{
              background: 'linear-gradient(90deg, #6ff6fd, #cee5ff 50%, #ffffd6)',
              transform: 'scaleX(0)',
              boxShadow: '0 0 10px rgba(111,246,253,0.5)',
            }}
          />
        </div>
    </section>
  )
}
