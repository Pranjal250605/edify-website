import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'

/* ─── Animated counter ───────────────────────────────── */
interface StatItem {
  prefix?: string
  target:  number
  suffix:  string
  label:   string
  sub:     string
  accent:  string
  delay:   number
}

const STATS: StatItem[] = [
  {
    prefix: '', target: 2020, suffix: '',
    label: '設立',
    sub:   'Founded in Sapporo',
    accent: '#6ff6fd', // primary container
    delay: 0,
  },
  {
    prefix: '', target: 4, suffix: '+',
    label: 'コア技術領域',
    sub:   'Core Tech Pillars',
    accent: '#cee5ff', // secondary container
    delay: 0.1,
  },
  {
    prefix: '', target: 50, suffix: '+',
    label: 'ハッカソン応募チーム',
    sub:   'Hackathon Teams Applied',
    accent: '#ffffd6', // tertiary container
    delay: 0.2,
  },
  {
    prefix: '', target: 3, suffix: '',
    label: 'IITパートナー機関',
    sub:   'Indian Institute Partnerships',
    accent: '#6ff6fd', // primary container
    delay: 0.3,
  },
]

/* ─── Single stat card ───────────────────────────────── */
function StatCard({ item }: { item: StatItem }) {
  const cardRef   = useRef<HTMLDivElement>(null)
  const numRef    = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const card = cardRef.current
    const num  = numRef.current
    if (!card || !num) return

    /* Card reveal */
    gsap.from(card, {
      opacity: 0, y: 32, duration: 0.8, delay: item.delay, ease: EASE.expo,
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    })

    /* Counter */
    const obj = { value: 0 }
    gsap.to(obj, {
      value: item.target,
      duration: 1.6,
      ease: 'power2.out',
      delay: item.delay + 0.1,
      onUpdate: () => {
        num.textContent = `${item.prefix}${Math.round(obj.value)}${item.suffix}`
      },
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: cardRef, dependencies: [item.target] })

  return (
    <div
      ref={cardRef}
      className="relative group flex flex-col items-center text-center px-6 py-10
                 bg-surface-container-low ghost-border rounded-[32px]
                 hover:bg-surface-container transition-colors duration-500 overflow-hidden"
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-50" />

      {/* Kanji decoration */}
      <span
        className="absolute -bottom-4 -right-2 text-[7rem] leading-none select-none font-display pointer-events-none"
        style={{ color: item.accent, opacity: 0.05 }}
        aria-hidden="true"
      >
        {item.label.charAt(0)}
      </span>

      {/* Number */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <p
          ref={numRef}
          className="font-display font-semibold leading-none mb-4 tabular-nums"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            letterSpacing: '-0.03em',
            color: item.accent,
            textShadow: `0 0 40px ${item.accent}33`,
          }}
        >
          {item.prefix}0{item.suffix}
        </p>

        {/* Japanese label */}
        <p className="font-body font-semibold text-text-primary text-base mb-1 tracking-tight">
          {item.label}
        </p>

        {/* English sub-label */}
        <p className="font-body text-xs text-text-muted font-medium uppercase tracking-wider">
          {item.sub}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4
                   transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
      />
    </div>
  )
}

/* ─── Stats section ──────────────────────────────────── */
export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLParagraphElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!labelRef.current) return
    gsap.from(labelRef.current, {
      opacity: 0, y: 12, duration: 0.5, ease: EASE.out,
      scrollTrigger: {
        trigger: labelRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    if (imgRef.current && sectionRef.current) {
      gsap.fromTo(imgRef.current,
        { y: '-12%' },
        {
          y: '12%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-surface">

      {/* Parallax photo background */}
      <div
        ref={imgRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: '-16%', bottom: '-16%', zIndex: 0 }}
      >
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=75"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ opacity: 0.08, filter: 'grayscale(1) brightness(0.4) contrast(1.1)' }}
        />
      </div>

      {/* Subtle background texture/grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          zIndex: 1,
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[200px] rounded-full blur-[80px] pointer-events-none opacity-10"
           style={{ background: 'radial-gradient(ellipse, var(--colors-primary) 0%, transparent 70%)', zIndex: 1 }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Section label */}
        <p
          ref={labelRef}
          className="font-display font-semibold text-text-muted text-xl text-center mb-10"
        >
          By the Numbers
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(item => <StatCard key={item.label} item={item} />)}
        </div>
      </div>
    </section>
  )
}
