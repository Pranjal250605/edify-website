import { useEffect, useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Hero    from './components/sections/Hero'
import Pillars from './components/sections/Pillars'
import Contact from './components/sections/Contact'

/* ─── Scroll progress bar ────────────────────────────── */
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!barRef.current) return
    gsap.set(barRef.current, { scaleX: 0 })
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => {
        gsap.set(barRef.current, { scaleX: self.progress, overwrite: 'auto' })
      },
    })
  }, { scope: barRef })

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[200] origin-left"
      style={{
        height: '2px',
        background: 'linear-gradient(90deg, #00d9ff, #3b82f6 50%, #ff2e97)',
        boxShadow: '0 0 8px rgba(0,217,255,0.4)',
      }}
    />
  )
}

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('lang', 'ja')
  }, [])

  return (
    <div className="min-h-screen bg-void text-text-primary font-body antialiased">
      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <Hero />
        <Pillars />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
