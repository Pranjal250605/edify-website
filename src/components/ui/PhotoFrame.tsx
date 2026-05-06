/**
 * PhotoFrame — Branded photo treatment component.
 *
 * Transforms any photograph into a brand-consistent visual by stacking:
 *   1. Grayscale + darkened/contrast filter on the <img>
 *   2. Accent-tinted colour overlay 
 *   3. Directional gradient mask so the image bleeds into the dark page bg
 */

import { useState } from 'react'

export type PhotoAccent = 'primary' | 'secondary' | 'tertiary' | 'none'
export type PhotoFade   = 'bottom' | 'right' | 'left' | 'both' | 'none'

interface PhotoFrameProps {
  src:       string
  alt:       string
  accent?:   PhotoAccent
  /** Direction of the gradient fade into the dark background */
  fade?:     PhotoFade
  /** Extra Tailwind / inline classes applied to the root wrapper */
  className?: string
  /** Content rendered above the photo (e.g. date badge, overlay text) */
  children?: React.ReactNode
}

/* ── Brand tint overlays ─────────────────────────────── */
const TINTS: Record<PhotoAccent, string> = {
  primary:   'rgba(3, 218, 198, 0.12)',   // from primary tone
  secondary: 'rgba(204, 194, 220, 0.12)', // from secondary tone
  tertiary:  'rgba(239, 184, 200, 0.12)', // from tertiary tone
  none:      'transparent',
}

/* ── Fade masks — page bg is surface #1C1B1F ─────────────────── */
const PAGE_BG = '28,27,31'
const FADES: Record<PhotoFade, string> = {
  bottom: `linear-gradient(to bottom, transparent 38%, rgba(${PAGE_BG},1) 100%)`,
  right:  `linear-gradient(to right,  transparent 48%, rgba(${PAGE_BG},1) 100%)`,
  left:   `linear-gradient(to left,   transparent 48%, rgba(${PAGE_BG},1) 100%)`,
  both:   `linear-gradient(to bottom, rgba(${PAGE_BG},0.5) 0%, transparent 20%, transparent 60%, rgba(${PAGE_BG},1) 100%)`,
  none:   'none',
}

/* ── Branded fallback gradient when no image is present ── */
const FALLBACKS: Record<PhotoAccent, string> = {
  primary:    `radial-gradient(ellipse at 35% 40%, rgba(3, 218, 198,0.12) 0%, transparent 65%),
               linear-gradient(135deg, #2B2930 0%, #1C1B1F 100%)`,
  secondary:  `radial-gradient(ellipse at 65% 35%, rgba(204, 194, 220,0.12) 0%, transparent 65%),
               linear-gradient(135deg, #2B2930 0%, #1C1B1F 100%)`,
  tertiary:   `radial-gradient(ellipse at 85% 65%, rgba(239, 184, 200,0.12) 0%, transparent 65%),
               linear-gradient(135deg, #2B2930 0%, #1C1B1F 100%)`,
  none:        `linear-gradient(135deg, #2B2930 0%, #1C1B1F 100%)`,
}

export default function PhotoFrame({
  src,
  alt,
  accent = 'primary',
  fade = 'bottom',
  className = '',
  children,
}: PhotoFrameProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  return (
    <div className={`relative overflow-hidden ${className}`}>

      {/* ── Fallback / loading state ── */}
      {status !== 'loaded' && (
        <div
          className="absolute inset-0"
          style={{ background: FALLBACKS[accent] }}
          aria-hidden="true"
        />
      )}

      {/* ── The photograph — desaturated & darkened ── */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{
          opacity: status === 'loaded' ? 1 : 0,
          filter:  'grayscale(1) brightness(0.65) contrast(1.10) saturate(0)',
        }}
      />

      {/* ── Brand colour tint ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{ background: TINTS[accent] }}
        aria-hidden="true"
      />

      {/* ── Gradient fade into page background ── */}
      {fade !== 'none' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: FADES[fade] }}
          aria-hidden="true"
        />
      )}

      {/* ── Slot for overlaid content (badges, text, etc.) ── */}
      {children && (
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      )}
    </div>
  )
}
