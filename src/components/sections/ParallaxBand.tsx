import { useRef } from 'react'
import { gsap, useGSAP, motionSafe } from '@/lib/gsap'

interface ParallaxBandProps {
  src:      string
  alt:      string
  caption?: string
  height?:  string
  /** Accent dots shown in the caption row */
  tags?:    string[]
}

export default function ParallaxBand({
  src,
  alt,
  caption,
  height = '56vh',
  tags = [],
}: ParallaxBandProps) {
  const bandRef = useRef<HTMLDivElement>(null)
  const imgRef  = useRef<HTMLDivElement>(null)
  const capRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    /* Parallax — image travels ±14% vertically as band scrolls */
    if (imgRef.current && bandRef.current) {
      gsap.fromTo(
        imgRef.current,
        motionSafe({ y: '-14%' }),
        {
          y: '14%',
          ease: 'none',
          scrollTrigger: {
            trigger: bandRef.current,
            start: 'top bottom',
            end:   'bottom top',
            scrub: 1.5,
          },
        }
      )
    }

    /* Caption fade-in */
    if (capRef.current) {
      gsap.from(capRef.current, motionSafe({
        opacity: 0, y: 12, duration: 0.7, ease: 'power2.out',
        scrollTrigger: {
          trigger: capRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }))
    }
  }, { scope: bandRef })

  return (
    <div
      ref={bandRef}
      className="relative overflow-hidden"
      style={{ height }}
      aria-hidden="true"
    >
      {/* ── Parallax image layer ─────────────────────── */}
      <div
        ref={imgRef}
        className="absolute left-0 right-0"
        style={{ top: '-18%', bottom: '-18%' }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* ── Dark vignette overlay ─────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(2,8,16,0.72) 0%,
              rgba(2,8,16,0.48) 35%,
              rgba(2,8,16,0.48) 65%,
              rgba(2,8,16,0.72) 100%
            )
          `,
        }}
      />

      {/* ── Colour tint — reinforces brand palette ────── */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-color"
        style={{ background: 'rgba(0,25,50,0.45)' }}
      />

      {/* ── Scan-line noise texture ───────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.6) 2px,
            rgba(255,255,255,0.6) 3px
          )`,
        }}
      />

      {/* ── Caption bar ──────────────────────────────── */}
      {(caption || tags.length > 0) && (
        <div
          ref={capRef}
          className="absolute bottom-7 left-1/2 -translate-x-1/2
                     flex items-center gap-3 whitespace-nowrap"
        >
          <div className="h-px w-10 bg-white/20" />
          {tags.map((tag, i) => (
            <span
              key={i}
              className="font-mono text-[9px] tracking-[0.28em] uppercase text-white/35"
            >
              {i > 0 && <span className="mr-3 text-white/15">·</span>}
              {tag}
            </span>
          ))}
          {caption && (
            <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-white/35">
              {caption}
            </span>
          )}
          <div className="h-px w-10 bg-white/20" />
        </div>
      )}
    </div>
  )
}
