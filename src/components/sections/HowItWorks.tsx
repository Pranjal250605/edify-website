import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'
import { Brain, Navigation, Zap, ArrowRight } from 'lucide-react'
import { services, corePillars } from '@/data/content'
import PhotoFrame from '../ui/PhotoFrame'

const STEP_CONFIG = [
  {
    serviceId: 'reskilling',
    pillarId:  'llm',
    icon:      <Brain size={24} />,
    number:    '01',
    color:     '#6ff6fd',
    border:    'border-primary-container/20',
    hover:     'hover:border-primary-container/45',
    glow:      '0 0 48px rgba(111,246,253,0.1)',
    bg:        'from-primary-container/8 to-transparent',
    photo:     'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=75',
  },
  {
    serviceId: 'utm',
    pillarId:  'drone',
    icon:      <Navigation size={24} />,
    number:    '02',
    color:     '#cee5ff',
    border:    'border-secondary-fixed/20',
    hover:     'hover:border-secondary-fixed/45',
    glow:      '0 0 48px rgba(206,229,255,0.1)',
    bg:        'from-secondary-fixed/8 to-transparent',
    photo:     'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=75',
  },
  {
    serviceId: 'zentej',
    pillarId:  'ai',
    icon:      <Zap size={24} />,
    number:    '03',
    color:     '#ffffd6',
    border:    'border-tertiary-fixed/20',
    hover:     'hover:border-tertiary-fixed/45',
    glow:      '0 0 48px rgba(255,255,214,0.1)',
    bg:        'from-tertiary-fixed/8 to-transparent',
    photo:     'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=75',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const stepsRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        opacity: 0, y: 24, duration: 0.7, ease: EASE.expo,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }

    if (stepsRef.current) {
      gsap.from(stepsRef.current.querySelectorAll('.step-card'), {
        opacity: 0, y: 36, duration: 0.75, stagger: 0.13, ease: EASE.expo,
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from(stepsRef.current.querySelectorAll('.step-arrow'), {
        opacity: 0, x: -12, duration: 0.5, stagger: 0.13, delay: 0.3, ease: EASE.expo,
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-28 overflow-hidden bg-surface-container-lowest"
    >
      {/* Grid texture */}
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

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 20% 50%, rgba(111,246,253,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 80% 50%, rgba(206,229,255,0.05) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="font-mono text-xs text-secondary-fixed tracking-[0.2em] uppercase mb-3">
            How It Works
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="font-display italic font-light text-text-primary"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              Three Steps to<br />
              <span className="text-primary-container drop-shadow-md">Intelligent Future</span>
            </h2>
            <p className="font-body font-light text-text-secondary text-base leading-relaxed max-w-sm lg:text-right">
              From reskilling your workforce to securing drone airspace — every engagement follows a clear path.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 items-stretch"
        >
          {STEP_CONFIG.map((cfg, i) => {
            const service = services.find(s => s.id === cfg.serviceId)!
            const pillar  = corePillars.find(p => p.id === cfg.pillarId)!

            return (
              <div key={cfg.serviceId} className="flex flex-col md:flex-row items-stretch">
                {/* Card */}
                <article
                  className={`
                    step-card flex-1 relative group
                    bg-surface-container-low border ${cfg.border} ${cfg.hover}
                    rounded-[28px] p-8 overflow-hidden
                    transition-all duration-500
                    hover:scale-[1.02] hover:-translate-y-1
                  `}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = cfg.glow }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '' }}
                >
                  {/* Number watermark */}
                  <span
                    className="absolute -right-3 -bottom-5 font-display italic font-light leading-none
                               select-none pointer-events-none"
                    style={{ fontSize: '8rem', color: cfg.color, opacity: 0.07, letterSpacing: '-0.05em' }}
                    aria-hidden="true"
                  >
                    {cfg.number}
                  </span>

                  {/* Gradient hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cfg.bg}
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  <div className="relative h-36 overflow-hidden rounded-t-[20px] -mx-8 -mt-8 mb-2">
                    <PhotoFrame
                      src={cfg.photo}
                      alt={service.titleEn}
                      accent={i === 0 ? 'primary' : i === 1 ? 'secondary' : 'tertiary'}
                      fade="bottom"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>

                  <div className="relative z-10">
                    {/* Step number + icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="font-mono font-light leading-none"
                        style={{
                          fontSize: '3.5rem',
                          color: cfg.color,
                          opacity: 0.5,
                          letterSpacing: '-0.04em',
                        }}
                        aria-hidden="true"
                      >
                        {cfg.number}
                      </span>
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center
                                   bg-surface-container border border-white/5 shrink-0"
                        style={{ color: cfg.color }}
                      >
                        {cfg.icon}
                      </div>
                    </div>

                    {/* Step label */}
                    <p
                      className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2"
                      style={{ color: cfg.color, opacity: 0.75 }}
                    >
                      Step {cfg.number}
                    </p>

                    {/* Title */}
                    <h3
                      className="font-display italic font-light text-text-primary mb-3 leading-tight"
                      style={{
                        fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {service.titleEn}
                    </h3>

                    {/* Description — first sentence from pillar */}
                    <p className="font-body font-light text-text-secondary text-sm leading-relaxed">
                      {pillar.description.split('。')[0]}。
                    </p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {pillar.keywords.slice(0, 3).map(kw => (
                        <span
                          key={kw}
                          className="font-mono text-[9px] px-2 py-[3px] rounded-full border"
                          style={{
                            color:           cfg.color,
                            borderColor:     `${cfg.color}28`,
                            backgroundColor: `${cfg.color}07`,
                          }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100
                               transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cfg.color}70, transparent)`,
                    }}
                  />
                </article>

                {/* Arrow connector — desktop only, not after last card */}
                {i < STEP_CONFIG.length - 1 && (
                  <div
                    className="step-arrow hidden md:flex items-center justify-center px-3 shrink-0"
                    aria-hidden="true"
                  >
                    <ArrowRight
                      size={20}
                      className="text-text-muted opacity-30"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
