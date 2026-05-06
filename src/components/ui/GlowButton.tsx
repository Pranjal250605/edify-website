import React, { useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

type Variant = 'primary' | 'ghost' | 'white'
type Size    = 'sm' | 'md' | 'lg'

interface GlowButtonProps {
  children:  React.ReactNode
  variant?:  Variant
  size?:     Size
  href?:     string
  onClick?:  () => void
  className?: string
  icon?:     React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary-container text-text-onPrimary hover:bg-primary-fixed-dim',
  ghost:   'bg-transparent ghost-border text-primary-DEFAULT hover:text-primary-container',
  white:   'bg-text-primary text-surface font-bold hover:bg-white',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
}

export default function GlowButton({
  children, variant = 'primary', size = 'md',
  href, onClick, className = '', icon,
}: GlowButtonProps) {
  const elRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  /* Magnetic hover */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = elRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.12
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.12
    gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
  }, [])

  const onMouseLeave = useCallback(() => {
    gsap.to(elRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)', overwrite: 'auto' })
  }, [])

  const onMouseDown = useCallback(() => {
    gsap.to(elRef.current, { scale: 0.95, duration: 0.1, ease: 'power2.out', overwrite: 'auto' })
  }, [])

  const onMouseUp = useCallback(() => {
    gsap.to(elRef.current, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)', overwrite: 'auto' })
  }, [])

  const base = `
    inline-flex items-center justify-center font-body font-semibold rounded-full
    transition-colors duration-300 cursor-pointer select-none tracking-tight
  `
  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  const events = { onMouseMove, onMouseLeave, onMouseDown, onMouseUp }

  if (href) {
    return (
      <a ref={elRef as React.RefObject<HTMLAnchorElement>} href={href} className={classes} {...events}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </a>
    )
  }

  return (
    <button ref={elRef as React.RefObject<HTMLButtonElement>} onClick={onClick} className={classes} {...events}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
