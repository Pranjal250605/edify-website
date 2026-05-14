import { useRef, useState } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'
import { MapPin, Mail, Send, Copy, Check, Clock, ArrowUpRight } from 'lucide-react'

/* ── Areas of interest — single source of truth for the pill row ── */
const TOPICS = [
  'LLM Reskilling',
  'Drone UTM',
  'Blockchain',
  'Zentej / Hackathon',
  'Partnership',
  'Other',
] as const
type Topic = typeof TOPICS[number]

export default function Contact() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [msg,     setMsg]     = useState('')
  const [topics,  setTopics]  = useState<Set<Topic>>(new Set())
  const [sent,    setSent]    = useState(false)
  const [copied,  setCopied]  = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const kanjiRef   = useRef<HTMLSpanElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)

  const toggleTopic = (t: Topic) => {
    setTopics(prev => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t); else next.add(t)
      return next
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('inquiry@edify.jp')
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — silently fail */
    }
  }

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (headRef.current) {
      gsap.from(headRef.current.querySelectorAll('[data-stagger]'), {
        opacity: 0, y: 28, duration: 0.9, ease: EASE.expo, stagger: 0.08,
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }

    if (leftRef.current) {
      gsap.from(leftRef.current.querySelectorAll('[data-card]'), {
        opacity: 0, y: 24, duration: 0.8, ease: EASE.expo, stagger: 0.1,
        scrollTrigger: { trigger: leftRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })
    }

    if (rightRef.current) {
      gsap.from(rightRef.current, {
        opacity: 0, y: 36, duration: 1, ease: EASE.expo,
        scrollTrigger: { trigger: rightRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }

    if (!reduced && kanjiRef.current) {
      gsap.to(kanjiRef.current, {
        yPercent: -8, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
    }

    if (!reduced && glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.35, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-void py-28 sm:py-36"
    >
      {/* ── Background layers ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
          }}
        />
        {/* Bottom cyan bloom */}
        <div
          ref={glowRef}
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1100px] h-[520px]
                     rounded-[50%] blur-[120px] opacity-25"
          style={{
            background: 'radial-gradient(ellipse, rgba(111,246,253,0.32) 0%, rgba(206,229,255,0.12) 45%, transparent 75%)',
          }}
        />
        {/* Kanji watermark — 結 (connect / bind) */}
        <span
          ref={kanjiRef}
          aria-hidden="true"
          className="absolute -right-[4vw] top-1/2 -translate-y-1/2 font-display font-semibold
                     leading-none select-none pointer-events-none text-primary-container"
          style={{
            fontSize: 'clamp(18rem, 38vw, 36rem)',
            opacity: 0.045,
            letterSpacing: '-0.05em',
          }}
        >
          結
        </span>
        {/* Top hairline */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(111,246,253,0.35), transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* ── Section header ──────────────────────────── */}
        <div ref={headRef} className="mb-16 sm:mb-20 max-w-4xl">
          <div data-stagger className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary-container/80">
              04 — Contact
            </span>
            <div className="flex-1 max-w-[80px] h-px bg-gradient-to-r from-primary-container/40 to-transparent" />
          </div>

          <p
            data-stagger
            className="font-display font-light text-text-muted/40 leading-none select-none mb-3"
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)', letterSpacing: '0.18em' }}
          >
            お問い合わせ
          </p>

          <h2
            data-stagger
            className="font-display font-semibold text-text-primary"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              letterSpacing: '-0.035em',
              lineHeight: 1.02,
            }}
          >
            Let's build the<br />
            <span className="text-primary-container">next decade</span>{' '}
            together.
          </h2>

          <p
            data-stagger
            className="mt-7 font-body font-light text-text-secondary leading-relaxed max-w-xl"
            style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
          >
            Whether you're looking at AI reskilling, UTM infrastructure, or joining the
            Zentej network — start a conversation. We reply within one business day.
          </p>
        </div>

        {/* ── Body: 5/7 asymmetric grid ──────────────── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

          {/* ── Left column (5/12) ───────────────────── */}
          <aside ref={leftRef} className="lg:col-span-5 flex flex-col gap-4">

            {/* Status badge */}
            <div
              data-card
              className="glass rounded-2xl px-5 py-4 flex items-center gap-3"
            >
              <span className="live-dot shrink-0" />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-container/80">
                  Currently online
                </span>
                <span className="font-body font-light text-sm text-text-secondary">
                  Accepting new collaborations
                </span>
              </div>
            </div>

            {/* Email — copy-to-clipboard card */}
            <button
              data-card
              type="button"
              onClick={copyEmail}
              className="glass rounded-2xl p-5 text-left group transition-all duration-300
                         hover:bg-white/[0.05] cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                             bg-primary-container/10 border border-primary-container/30 text-primary-container
                             group-hover:bg-primary-container/15 transition-colors"
                >
                  <Mail size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted mb-1">
                    Email
                  </p>
                  <p className="font-body text-text-primary text-base truncate">
                    inquiry@edify.jp
                  </p>
                </div>
                <span
                  className="shrink-0 self-center w-8 h-8 rounded-lg flex items-center justify-center
                             border border-white/10 text-text-muted
                             group-hover:text-primary-container group-hover:border-primary-container/40
                             transition-colors"
                  aria-hidden="true"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </span>
              </div>
              <span
                className="absolute bottom-3 right-5 font-mono text-[9px] uppercase tracking-[0.2em]
                           text-primary-container transition-opacity duration-300"
                style={{ opacity: copied ? 1 : 0 }}
              >
                Copied
              </span>
            </button>

            {/* Location card */}
            <div
              data-card
              className="glass rounded-2xl p-5 flex items-start gap-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                           bg-white/[0.04] border border-white/10 text-text-secondary"
              >
                <MapPin size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted mb-1">
                  Headquarters
                </p>
                <p className="font-body text-text-primary text-sm leading-relaxed">
                  北海道札幌市中央区<br />北5条西11丁目15-4
                </p>
                <p className="font-mono text-[11px] text-text-muted mt-1.5">
                  Sapporo · Hokkaido · Japan
                </p>
              </div>
            </div>

            {/* Response time + website */}
            <div className="grid grid-cols-2 gap-4">
              <div
                data-card
                className="glass rounded-2xl p-5"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3
                                bg-white/[0.04] border border-white/10 text-text-secondary">
                  <Clock size={14} />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted mb-1">
                  Reply within
                </p>
                <p className="font-display font-semibold text-text-primary text-xl"
                   style={{ letterSpacing: '-0.02em' }}>
                  24h
                </p>
              </div>
              <a
                data-card
                href="https://www.edify.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-5 group transition-all duration-300
                           hover:bg-white/[0.05] cursor-pointer block"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3
                                bg-white/[0.04] border border-white/10 text-text-secondary
                                group-hover:text-primary-container group-hover:border-primary-container/30
                                transition-colors">
                  <ArrowUpRight size={14} />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted mb-1">
                  Visit
                </p>
                <p className="font-display font-semibold text-text-primary text-base
                              group-hover:text-primary-container transition-colors"
                   style={{ letterSpacing: '-0.02em' }}>
                  edify.jp
                </p>
              </a>
            </div>
          </aside>

          {/* ── Right column (7/12) — form ─────────── */}
          <div ref={rightRef} className="lg:col-span-7">
            <div className="glass ambient-shadow rounded-3xl p-7 sm:p-10 relative overflow-hidden">

              {/* Inner accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(111,246,253,0.5), transparent)' }}
                aria-hidden="true"
              />

              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center
                               bg-primary-container/10 border border-primary-container/50
                               text-primary-container"
                    style={{ boxShadow: '0 0 40px rgba(111,246,253,0.25)' }}
                  >
                    <Check size={28} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary text-2xl mb-2"
                        style={{ letterSpacing: '-0.025em' }}>
                      Message received.
                    </h3>
                    <p className="font-body font-light text-text-secondary text-sm max-w-sm">
                      Thanks for reaching out — we'll be in touch within one business day.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">

                  {/* Form header */}
                  <div className="flex items-end justify-between mb-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary-container/80">
                      Send a message
                    </p>
                    <p className="font-mono text-[10px] text-text-muted">
                      * required
                    </p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FloatingField
                      id="name"
                      label="Name *"
                      value={name}
                      onChange={setName}
                      required
                    />
                    <FloatingField
                      id="email"
                      label="Email *"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      required
                    />
                  </div>

                  {/* Topic pills */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted mb-3">
                      Area of interest
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map(t => {
                        const active = topics.has(t)
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleTopic(t)}
                            className="font-mono text-[11px] tracking-wide px-3.5 py-1.5 rounded-full
                                       border transition-all duration-200 cursor-pointer"
                            style={{
                              color: active ? '#6ff6fd' : 'rgb(139,168,200)',
                              borderColor: active
                                ? 'rgba(111,246,253,0.5)'
                                : 'rgba(255,255,255,0.1)',
                              backgroundColor: active
                                ? 'rgba(111,246,253,0.08)'
                                : 'rgba(255,255,255,0.02)',
                              boxShadow: active
                                ? '0 0 18px rgba(111,246,253,0.15)'
                                : 'none',
                            }}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <FloatingField
                    id="msg"
                    label="Tell us about your project *"
                    value={msg}
                    onChange={setMsg}
                    required
                    multiline
                    rows={5}
                  />

                  {/* Submit */}
                  <div className="flex items-center justify-between pt-2 gap-4 flex-wrap">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                      Encrypted in transit · Never shared
                    </p>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                                 border text-primary-container font-display font-semibold text-sm
                                 tracking-tight transition-all duration-300 cursor-pointer
                                 active:scale-[0.98]"
                      style={{
                        backgroundColor: 'rgba(111,246,253,0.06)',
                        borderColor: 'rgba(111,246,253,0.35)',
                        boxShadow: '0 0 14px rgba(111,246,253,0.10)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(111,246,253,0.11)'
                        e.currentTarget.style.borderColor = 'rgba(111,246,253,0.55)'
                        e.currentTarget.style.boxShadow = '0 0 22px rgba(111,246,253,0.18)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(111,246,253,0.06)'
                        e.currentTarget.style.borderColor = 'rgba(111,246,253,0.35)'
                        e.currentTarget.style.boxShadow = '0 0 14px rgba(111,246,253,0.10)'
                      }}
                    >
                      Send message
                      <Send size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────────────
   FloatingField — label-as-placeholder input with a
   smooth focus underline. Handles both <input> and
   <textarea> via the `multiline` flag.
─────────────────────────────────────────────────────── */
interface FloatingFieldProps {
  id:        string
  label:     string
  value:     string
  onChange:  (v: string) => void
  type?:     'text' | 'email'
  required?: boolean
  multiline?: boolean
  rows?:     number
}

function FloatingField({
  id, label, value, onChange,
  type = 'text', required, multiline, rows = 4,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0
  const active = focused || filled

  const baseClasses = `
    peer w-full bg-transparent text-text-primary font-body font-light
    placeholder-transparent focus:outline-none
    border-b transition-colors duration-300
  `
  const inputClasses = `${baseClasses} px-0 pt-6 pb-2.5 text-[15px]`
  const textareaClasses = `${baseClasses} px-0 pt-6 pb-2.5 text-[15px] resize-none leading-relaxed`

  const borderColor = focused
    ? 'border-primary-container'
    : 'border-white/10 hover:border-white/25'

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label}
          className={`${textareaClasses} ${borderColor}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label}
          className={`${inputClasses} ${borderColor}`}
        />
      )}

      {/* Floating label */}
      <label
        htmlFor={id}
        className="absolute left-0 pointer-events-none font-mono uppercase
                   transition-all duration-300 ease-out"
        style={{
          top:        active ? '0px'   : '24px',
          fontSize:   active ? '10px'  : '13px',
          letterSpacing: active ? '0.22em' : '0.05em',
          color:      focused
            ? '#6ff6fd'
            : active ? 'rgb(139,168,200)' : 'rgb(74,104,133)',
        }}
      >
        {label}
      </label>

      {/* Focus underline glow */}
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-px origin-left transition-transform duration-500"
        style={{
          background: 'linear-gradient(90deg, #6ff6fd, transparent)',
          transform: focused ? 'scaleX(1)' : 'scaleX(0)',
          boxShadow: focused ? '0 0 12px rgba(111,246,253,0.4)' : 'none',
        }}
      />
    </div>
  )
}
