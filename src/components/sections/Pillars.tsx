import { useState, useRef, useCallback } from 'react'
import { gsap, useGSAP, EASE, motionSafe } from '@/lib/gsap'
import { Brain, Link2, Navigation, Zap, ChevronRight } from 'lucide-react'
import { corePillars } from '@/data/content'

/* ─── Per-pillar config ──────────────────────────────── */
const PILLAR_CONFIG = [
  {
    id:    'llm',
    icon:  <Brain size={28} />,
    kanji: '知',
    color: '#6ff6fd',
    photo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    grad:  'rgba(111,246,253,0.18)',
  },
  {
    id:    'blockchain',
    icon:  <Link2 size={28} />,
    kanji: '鎖',
    color: '#ffffd6',
    photo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    grad:  'rgba(255,255,214,0.14)',
  },
  {
    id:    'drone',
    icon:  <Navigation size={28} />,
    kanji: '飛',
    color: '#cee5ff',
    photo: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80',
    grad:  'rgba(206,229,255,0.16)',
  },
  {
    id:    'ai',
    icon:  <Zap size={28} />,
    kanji: '創',
    color: '#6ff6fd',
    photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    grad:  'rgba(111,246,253,0.15)',
  },
]

/* ─── Single full-bleed block ────────────────────────── */
function PillarBlock({
  pillar, config, index,
}: {
  pillar: typeof corePillars[number]
  config: typeof PILLAR_CONFIG[number]
  index:  number
}) {
  const [open, setOpen]     = useState(false)
  const blockRef  = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const barRef    = useRef<HTMLDivElement>(null)

  /* Entrance: stagger in from bottom */
  useGSAP(() => {
    if (!blockRef.current) return
    gsap.from(blockRef.current, motionSafe({
      opacity: 0, y: 48, duration: 0.85, delay: index * 0.12, ease: EASE.expo,
      scrollTrigger: {
        trigger: blockRef.current,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
    }))
  }, { scope: blockRef })

  /* Click: expand / collapse detail */
  const toggle = useCallback(() => {
    const detail = detailRef.current
    if (!detail) return
    if (!open) {
      gsap.set(detail, { display: 'block', height: 0, opacity: 0 })
      gsap.to(detail, {
        height: detail.scrollHeight, opacity: 1,
        duration: 0.4, ease: EASE.expo,
        onComplete: () => { detail.style.height = 'auto' },
      })
    } else {
      gsap.to(detail, {
        height: 0, opacity: 0,
        duration: 0.28, ease: EASE.in,
        onComplete: () => { gsap.set(detail, { display: 'none' }) },
      })
    }
    setOpen(o => !o)
  }, [open])

  /* Hover: animate left accent bar */
  const handleEnter = useCallback(() => {
    if (barRef.current) gsap.to(barRef.current, { scaleY: 1, duration: 0.45, ease: EASE.expo })
  }, [])
  const handleLeave = useCallback(() => {
    if (barRef.current && !open) gsap.to(barRef.current, { scaleY: 0, duration: 0.3, ease: EASE.in })
  }, [open])

  return (
    <div
      ref={blockRef}
      className="relative overflow-hidden cursor-pointer group"
      style={{ minHeight: '48vh' }}
      onClick={toggle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ── Full-bleed photo ── */}
      <img
        src={config.photo}
        alt={pillar.labelEn}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ filter: 'grayscale(1) brightness(0.45) contrast(1.15)' }}
      />

      {/* ── Permanent dark gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            rgba(2,8,16,0.96) 0%,
            rgba(2,8,16,0.65) 45%,
            rgba(2,8,16,0.25) 100%
          )`,
        }}
      />

      {/* ── Accent colour bloom on hover ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${config.grad} 0%, transparent 70%)`,
        }}
      />

      {/* ── Left accent bar (scale from bottom on hover) ── */}
      <div
        ref={barRef}
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom pointer-events-none"
        style={{ background: config.color, transform: 'scaleY(0)' }}
      />

      {/* ── Index number — top-left faint watermark ── */}
      <span
        className="absolute top-7 left-8 font-mono font-light leading-none select-none pointer-events-none"
        style={{ fontSize: '3.5rem', color: config.color, opacity: 0.1, letterSpacing: '-0.05em' }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* ── Kanji — large center-right watermark ── */}
      <span
        className="absolute top-1/2 right-6 -translate-y-1/2 font-display italic font-light
                   leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(7rem,14vw,12rem)', color: config.color, opacity: 0.07, letterSpacing: '-0.04em' }}
        aria-hidden="true"
      >
        {config.kanji}
      </span>

      {/* ── Content pinned to bottom ── */}
      <div className="relative z-10 flex flex-col justify-end h-full p-8 lg:p-10" style={{ minHeight: '48vh' }}>

        {/* Icon */}
        <div
          className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center mb-5
                     bg-black/40 backdrop-blur-sm border border-white/10
                     group-hover:border-white/20 transition-colors duration-400"
          style={{ color: config.color }}
        >
          {config.icon}
        </div>

        {/* Label */}
        <p
          className="font-mono tracking-[0.24em] uppercase mb-2"
          style={{ fontSize: '0.65rem', color: config.color, opacity: 0.7 }}
        >
          {pillar.labelEn}
        </p>

        {/* Title */}
        <h3
          className="font-display italic font-light text-text-primary leading-tight mb-3"
          style={{
            fontSize:      'clamp(1.4rem, 2.2vw, 2rem)',
            letterSpacing: '-0.03em',
          }}
        >
          {pillar.title}
        </h3>

        {/* Description — always 2 lines, more on open */}
        <p
          className="font-body font-light text-text-secondary text-sm leading-relaxed max-w-sm mb-4"
          style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: open ? 'unset' : 2, overflow: 'hidden' }}
        >
          {pillar.description}
        </p>

        {/* Expandable detail bullets */}
        <div ref={detailRef} style={{ display: 'none', overflow: 'hidden' }}>
          <ul className="space-y-2 mb-4 pt-2 border-t border-white/8">
            {pillar.details.slice(0, 3).map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 flex-shrink-0"
                      style={{ background: config.color }} />
                <p className="font-body font-light text-text-secondary text-xs leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Keyword tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pillar.keywords.slice(0, 3).map(kw => (
            <span
              key={kw}
              className="font-mono text-[9px] px-2 py-[3px] rounded-full border"
              style={{ color: config.color, borderColor: `${config.color}28`, backgroundColor: `${config.color}0a` }}
            >
              {kw}
            </span>
          ))}
        </div>

        {/* Click hint */}
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-muted">
            {open ? 'Collapse' : 'Expand details'}
          </span>
          <div style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.25s' }}>
            <ChevronRight size={11} className="text-text-muted" />
          </div>
        </div>
      </div>

      {/* ── Bottom accent line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${config.color}80, ${config.color}20, transparent)` }}
      />
    </div>
  )
}

/* ─── Section ────────────────────────────────────────── */
export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, motionSafe({
        opacity: 0, y: 20, duration: 0.65, ease: EASE.expo,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }))
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="reskilling"
      className="relative bg-void overflow-hidden"
    >
      {/* ── Thin section header ── */}
      <div
        ref={headerRef}
        className="relative z-10 px-6 lg:px-12 py-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div>
          <p className="font-mono text-[10px] text-primary-container tracking-[0.22em] uppercase mb-2">
            Core Technology Pillars
          </p>
          <h2
            className="font-display italic font-light text-text-primary"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.025em', lineHeight: 1.05 }}
          >
            Four Technologies.{' '}
            <span className="text-secondary-fixed">One Vision.</span>
          </h2>
        </div>
        <p className="font-body font-light text-text-muted text-sm max-w-xs sm:text-right hidden sm:block">
          Click any block to expand details.
        </p>
      </div>

      {/* ── 2 × 2 block grid ── */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        {corePillars.map((pillar, i) => {
          const config = PILLAR_CONFIG.find(c => c.id === pillar.id) ?? PILLAR_CONFIG[0]
          return (
            <div
              key={pillar.id}
              style={{
                borderRight:  i % 2 === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                borderBottom: i < 2       ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <PillarBlock pillar={pillar} config={config} index={i} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
