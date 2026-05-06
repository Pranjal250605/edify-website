/**
 * src/lib/gsap.ts
 *
 * Central GSAP setup. Import from here, not from 'gsap' directly,
 * so plugins are always registered before first use.
 *
 * Plugins used:
 *  - ScrollTrigger  — viewport-based triggers, scrub parallax
 *  - useGSAP        — React hook for context-safe animations
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP }       from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Project-wide easing constants */
export const EASE = {
  out:    'power3.out',
  in:     'power3.in',
  inOut:  'power3.inOut',
  expo:   'expo.out',
  spring: 'elastic.out(1, 0.5)',
  linear: 'none',
} as const

/** Respects prefers-reduced-motion. Pass as `gsap.to(el, { ...motionSafe({ ... }) })` */
export function motionSafe<T extends gsap.TweenVars>(vars: T): T {
  if (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { ...vars, duration: 0, delay: 0 } as T
  }
  return vars
}

export { gsap, ScrollTrigger, useGSAP }
