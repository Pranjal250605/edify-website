import { useState, useRef } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'
import { MapPin, Mail, ArrowRight, Send, ExternalLink } from 'lucide-react'
import GlowButton from '../ui/GlowButton'
import PhotoFrame from '../ui/PhotoFrame'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [msg,   setMsg]   = useState('')
  const [sent,  setSent]  = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const scanRef    = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  useGSAP(() => {
    /* Left column slide in */
    if (leftRef.current) {
      gsap.from(leftRef.current, {
        opacity: 0, x: -32, duration: 0.8, ease: EASE.expo,
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }

    /* Right column slide in */
    if (rightRef.current) {
      gsap.from(rightRef.current, {
        opacity: 0, x: 32, duration: 0.8, delay: 0.15, ease: EASE.expo,
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }

    /* Scan line */
    if (scanRef.current) {
      gsap.fromTo(scanRef.current,
        { top: '0%' },
        { top: '100%', duration: 8, repeat: -1, repeatDelay: 5, ease: 'none' }
      )
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden bg-surface">

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]
                        rounded-[50%] blur-3xl opacity-20"
             style={{ background: 'radial-gradient(ellipse, rgba(111,246,253,0.25) 0%, rgba(206,229,255,0.1) 50%, transparent 70%)' }} />
        {/* GSAP scan line */}
        <div
          ref={scanRef}
          className="absolute left-0 right-0 h-px opacity-20"
          style={{ background: 'linear-gradient(90deg, transparent, #6ff6fd, transparent)', top: '0%' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div ref={leftRef}>
            <div className="relative h-48 rounded-2xl overflow-hidden mb-8">
              <PhotoFrame
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=75"
                alt="Digital collaboration and technology communication"
                accent="primary"
                fade="both"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 flex items-end p-5 z-10">
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-primary-container/60">
                  inquiry@edify.jp
                </span>
              </div>
            </div>

            <p className="font-mono text-xs text-primary-container tracking-[0.2em] uppercase mb-6">
              Get in Touch
            </p>

            <div className="mb-4">
              <p className="font-display italic font-light text-text-muted leading-none select-none opacity-30"
                 style={{
                   fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                   letterSpacing: '0.05em',
                 }}>
                お問い合わせ
              </p>
              <h2
                className="font-display italic font-light text-text-primary"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                }}
              >
                一緒に<span className="text-secondary-fixed drop-shadow-md">未来</span>を<br/>
                作りましょう。
              </h2>
            </div>

            <p className="font-body font-light text-text-secondary text-lg leading-relaxed mb-10 max-w-md">
              Whether you're interested in AI reskilling, drone UTM systems, or joining
              the Zentej global innovation network — we'd love to hear from you.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center
                                text-primary-container border border-primary-container/20
                                group-hover:border-primary-container/50 transition-colors shrink-0">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="font-body font-light text-text-secondary text-sm">
                    北海道札幌市中央区北5条西11丁目15-4
                  </p>
                  <p className="font-mono text-xs text-text-muted">Sapporo, Hokkaido, Japan</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center
                                text-primary-container border border-primary-container/20
                                group-hover:border-primary-container/50 transition-colors shrink-0">
                  <Mail size={14} />
                </div>
                <a href="mailto:inquiry@edify.jp"
                   className="font-body font-light text-text-secondary text-sm
                              hover:text-primary-container transition-colors duration-200 flex items-center gap-1">
                  inquiry@edify.jp
                  <ExternalLink size={11} className="opacity-50" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <GlowButton variant="primary" size="md" href="mailto:inquiry@edify.jp"
                          icon={<ArrowRight size={16} />}>
                Email Us
              </GlowButton>
              <GlowButton variant="ghost" size="md" href="https://www.edify.jp">
                edify.jp ↗
              </GlowButton>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div ref={rightRef}>
            <div className="bg-surface-container-low ghost-border ambient-shadow rounded-[32px] p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                  <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center
                                  border border-primary-container/40 text-primary-container text-2xl">
                    ✓
                  </div>
                  <h3 className="font-display italic font-light text-text-primary text-xl"
                      style={{ letterSpacing: '-0.03em' }}>
                    Message sent!
                  </h3>
                  <p className="font-body font-light text-text-secondary text-sm">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="font-mono text-xs text-text-muted tracking-wider uppercase block mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-surface-container border border-white/5 rounded-xl px-4 py-3
                                 font-body font-light text-text-primary text-sm placeholder:text-text-muted
                                 focus:outline-none focus:border-primary-container/50 focus:bg-white/5
                                 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-text-muted tracking-wider uppercase block mb-2">
                      How Can We Help?
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={msg}
                      onChange={e => setMsg(e.target.value)}
                      placeholder="Tell us about your interest in AI reskilling, drone UTM, or Zentej..."
                      className="w-full bg-surface-container border border-white/5 rounded-xl px-4 py-3
                                 font-body font-light text-text-primary text-sm placeholder:text-text-muted
                                 focus:outline-none focus:border-primary-container/50 focus:bg-white/5
                                 transition-all duration-200 resize-none"
                    />
                  </div>

                  <div>
                    <p className="font-mono text-xs text-text-muted tracking-wider uppercase mb-3">
                      Area of Interest
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {['AI Reskilling', 'Drone UTM', 'Blockchain', 'Zentej / Hackathon'].map(topic => (
                        <label key={topic} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" className="sr-only peer" />
                          <span className="w-4 h-4 rounded border border-white/20
                                           peer-checked:bg-primary-container/20 peer-checked:border-primary-container/50
                                           flex items-center justify-center shrink-0
                                           transition-all duration-200 group-hover:border-white/40" />
                          <span className="font-body font-light text-text-secondary text-xs
                                           group-hover:text-text-primary transition-colors">
                            {topic}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl
                               bg-primary-container/10 border border-primary-container/40 text-primary-container
                               font-display italic font-light text-[1.1rem] tracking-tight
                               hover:bg-primary-container/20 hover:border-primary-container transition-all duration-300
                               shadow-[0_0_20px_rgba(111,246,253,0.15)] cursor-pointer"
                  >
                    <Send size={15} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
