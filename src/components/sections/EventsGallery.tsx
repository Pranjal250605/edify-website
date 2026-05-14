/**
 * EventsGallery — Horizontal-scroll photo strip for Zentej hackathon events.
 *
 * ─ Photo placement ────────────────────────────────────────────────
 *   Put your photos in /public/images/ with these exact filenames:
 *
 *   zentej-s3-iit-mandi.jpg   →  IIT Mandi Drone Lab, Season 3 teams/venue
 *   zentej-s2-iit-ropar.jpg   →  IIT Ropar, Season 2 opening / teams
 *   airwater-contest.jpg      →  Sapporo forest venue, Air Water × Edify
 *
 *   Recommended: 900 × 600 px, JPEG 80 % quality, landscape.
 *   Treatment (grayscale + tint + fade) is applied automatically by <PhotoFrame>.
 *
 * ─ Without photos ────────────────────────────────────────────────
 *   Cards show a branded radial-gradient placeholder automatically
 *   until a real image file is placed at the path above.
 */

import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { events } from '@/data/content'
import GlowButton from '../ui/GlowButton'
import PhotoFrame, { type PhotoAccent } from '../ui/PhotoFrame'

/* ─── Photo & accent mapping ─────────────────────────── */
const EVENT_CONFIG: Record<string, { photo: string; accent: PhotoAccent }> = {
  'zentej-s3':        { photo: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=75',  accent: 'secondary' },
  'zentej-s2':        { photo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=75',  accent: 'tertiary'  },
  'airwater-contest': { photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=75', accent: 'primary'   },
}

const ACCENT_STYLES: Record<PhotoAccent | 'none', { tag: string; dot: string }> = {
  primary:   { tag: 'text-primary-container border-primary-container/20 bg-primary-container/5', dot: '#6ff6fd' },
  secondary: { tag: 'text-secondary-fixed border-secondary-fixed/20 bg-secondary-fixed/5',       dot: '#cee5ff' },
  tertiary:  { tag: 'text-tertiary-fixed border-tertiary-fixed/20 bg-tertiary-fixed/5',          dot: '#ffffd6' },
  none:      { tag: 'text-white/60 border-white/20 bg-white/5',                                  dot: '#ffffff' },
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

/* ─── Section ────────────────────────────────────────── */
export default function EventsGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const stripRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    /* Section header — fade up */
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        opacity: 0, y: 28, duration: 0.8, ease: EASE.expo,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }

    /* Cards — stagger from right */
    if (stripRef.current) {
      gsap.from(stripRef.current.querySelectorAll('.event-card'), {
        opacity: 0, x: 36, duration: 0.7, stagger: 0.12, ease: EASE.expo,
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="zentej"
      className="relative py-28 overflow-hidden bg-surface"
    >
      {/* Ambient bg — faint magenta left / blue right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 70% at 5%  50%, rgba(255,255,214,0.055) 0%, transparent 65%),
            radial-gradient(ellipse 50% 60% at 95% 50%, rgba(206,229,255,0.055) 0%, transparent 65%)
          `,
        }}
      />

      {/* ── Dot grid — inherits pattern established in Hero ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="px-6 mb-12">
          <p className="font-mono text-xs text-tertiary-fixed tracking-[0.2em] uppercase mb-3">
            Global Events
          </p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <h2
              className="font-display font-semibold text-text-primary text-balance"
              style={{
                fontSize:      'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '-0.02em',
                lineHeight:    1.05,
              }}
            >
              Zentej ハッカソン
            </h2>
            <p className="font-body font-light text-text-secondary text-base leading-relaxed max-w-sm">
              AI · Robotics · Web3 — Japan meets India in 48-hour sprints across IIT campuses.
            </p>
          </div>
        </div>

        {/* ── Horizontal photo strip ────────────────────────
            Bleeds past the section container on the right
            to imply there's more to scroll — a grid-breaking
            element that feels editorial, not templated.
        ─────────────────────────────────────────────────── */}
        <div className="overflow-hidden">
          <div
            ref={stripRef}
            className="flex gap-5 overflow-x-auto pl-6
                       snap-x snap-mandatory pb-1
                       [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
          >
            {events.map((event) => {
              const cfg    = EVENT_CONFIG[event.id] ?? { photo: '', accent: 'primary' as PhotoAccent }
              const styles = ACCENT_STYLES[cfg.accent]

              return (
                <article
                  key={event.id}
                  className="event-card flex-shrink-0 w-[300px] sm:w-[348px]
                             snap-start bg-surface-container-low ghost-border ambient-shadow
                             rounded-[24px] hover:border-primary-container/45 transition-all duration-500
                             overflow-hidden group"
                >
                  {/* ── Photo ── */}
                  <div className="relative h-48">
                    <PhotoFrame
                      src={cfg.photo}
                      alt={event.titleEn}
                      accent={cfg.accent}
                      fade="bottom"
                      className="absolute inset-0 w-full h-full
                                 group-hover:scale-[1.03] transition-transform duration-700"
                    />

                    {/* Date badge */}
                    <span
                      className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5
                                 font-mono text-[9px] tracking-[0.14em] uppercase
                                 bg-black/50 backdrop-blur-sm border border-white/10
                                 text-white/60 px-2.5 py-[5px] rounded-full"
                    >
                      <Calendar size={8} strokeWidth={2.5} />
                      {formatDate(event.date)}
                    </span>
                  </div>

                  {/* ── Content ── */}
                  <div className="p-6">
                    <h3
                      className="font-display font-semibold text-text-primary mb-2 leading-tight"
                      style={{
                        fontSize:      '1.3rem',
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {event.titleEn}
                    </h3>

                    <p className="inline-flex items-center gap-1.5 font-mono text-[10px]
                                  text-text-muted tracking-[0.1em] mb-3 uppercase">
                      <MapPin size={9} strokeWidth={2} />
                      {event.location}
                    </p>

                    <p className="font-body font-light text-text-secondary text-sm leading-relaxed mb-5"
                       style={{
                         display:            '-webkit-box',
                         WebkitLineClamp:    2,
                         WebkitBoxOrient:    'vertical',
                         overflow:           'hidden',
                       }}>
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {event.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className={`font-mono text-[9px] px-2 py-[3px] rounded-full border ${styles.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent line — appears on hover */}
                  <div
                    className="h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${styles.dot}55, transparent)`,
                    }}
                  />
                </article>
              )
            })}

            {/* Right breathing room */}
            <div className="flex-shrink-0 w-6" aria-hidden="true" />
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div className="px-6 mt-3 flex items-center gap-2">
          <div className="h-[2px] w-16 rounded-full bg-white/10" />
          <span className="font-mono text-[10px] text-text-muted tracking-[0.18em] uppercase">
            Scroll
          </span>
        </div>

        {/* ── CTA ── */}
        <div className="px-6 mt-10 flex justify-center">
          <GlowButton variant="ghost" size="md" href="#contact" icon={<ArrowRight size={16} />}>
            Partner with us on the next event
          </GlowButton>
        </div>
      </div>
    </section>
  )
}
