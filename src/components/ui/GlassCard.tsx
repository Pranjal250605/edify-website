import React, { useRef } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'

type Shape = 'default' | 'leaf' | 'pill'
type Glow  = 'primary' | 'secondary' | 'none'

interface GlassCardProps {
  children:   React.ReactNode
  shape?:     Shape
  glow?:      Glow
  className?: string
  hover?:     boolean
  animate?:   boolean
  delay?:     number
}

const shapeClasses: Record<Shape, string> = {
  default: 'rounded-[32px]',
  leaf:    'rounded-leaf',
  pill:    'rounded-full',
}

export default function GlassCard({
  children, shape = 'default', glow = 'none', className = '',
  hover = true, animate = true, delay = 0,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!animate || !ref.current) return

    gsap.from(ref.current, {
      opacity: 0,
      y: 32,
      duration: 0.9,
      delay,
      ease: EASE.expo,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  const hoverEffect = hover ? 'group-hover/card:bg-surface-container-high transition-colors duration-500' : ''
  const glowShadow  = glow !== 'none' ? 'ambient-shadow' : ''

  const base = `bg-surface-container-low ghost-border overflow-hidden relative group/card ${shapeClasses[shape]} ${glowShadow}`

  return (
    <div ref={ref} className={`${base} ${className}`}>
      <div className={`absolute inset-0 z-0 ${hoverEffect} pointer-events-none`} />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  )
}
