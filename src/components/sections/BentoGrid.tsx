import React, { useRef, useCallback } from 'react'
import { gsap, useGSAP, EASE } from '@/lib/gsap'
import {
  Brain, Navigation, ShieldCheck, Globe2,
  GraduationCap, ArrowUpRight, Cpu, Link2,
} from 'lucide-react'
import PhotoFrame from '../ui/PhotoFrame'

/* ════════════════════════════════════════════════════════
   CURSOR SPOTLIGHT HOOK
════════════════════════════════════════════════════════ */
function useCursorSpotlight() {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
  return onMouseMove
}

/* ─── Accent config ──────────────────────────────────── */
type Accent = 'primary' | 'secondary' | 'tertiary'

const ACCENTS: Record<Accent, {
  border: string; hover: string; icon: string; tag: string; glow: string; cursor: string
}> = {
  primary: {
    border: 'border-primary-container/15',
    hover:  'hover:border-primary-container/45',
    icon:   'text-primary-container bg-primary-container/8 ring-1 ring-primary-container/15',
    tag:    'text-primary-container border-primary-container/20 bg-primary-container/5',
    glow:   '0 20px 60px rgba(111,246,253,0.08)',
    cursor: 'cursor-card',
  },
  secondary: {
    border: 'border-secondary-fixed/15',
    hover:  'hover:border-secondary-fixed/45',
    icon:   'text-secondary-fixed bg-secondary-fixed/8 ring-1 ring-secondary-fixed/15',
    tag:    'text-secondary-fixed border-secondary-fixed/20 bg-secondary-fixed/5',
    glow:   '0 20px 60px rgba(206,229,255,0.08)',
    cursor: 'cursor-card',
  },
  tertiary: {
    border: 'border-tertiary-fixed/15',
    hover:  'hover:border-tertiary-fixed/45',
    icon:   'text-tertiary-fixed bg-tertiary-fixed/8 ring-1 ring-tertiary-fixed/15',
    tag:    'text-tertiary-fixed border-tertiary-fixed/20 bg-tertiary-fixed/5',
    glow:   '0 20px 60px rgba(255,255,214,0.08)',
    cursor: 'cursor-card',
  },
}

/* ─── Base card component ────────────────────────────── */
interface CardProps {
  accent:      Accent
  label:       string
  icon:        React.ReactNode
  title:       string
  description: string
  tags:        string[]
  viz?:        React.ReactNode
  photo?:      string
  live?:       boolean
  className?:  string
  delay?:      number
}

function BentoCard({
  accent, label, icon, title, description, tags,
  photo, live = false, className = '',
}: CardProps) {
  const a = ACCENTS[accent]
  const cardRef = useRef<HTMLElement>(null)
  const onMouseMove = useCursorSpotlight()

  return (
    <article
      ref={cardRef}
      onMouseMove={onMouseMove}
      className={`
        bg-surface-container-low ghost-border ambient-shadow ${a.cursor} ${a.hover}
        rounded-[32px] p-8 flex flex-col gap-4
        transition-all duration-500 group overflow-hidden relative
        ${className}
      `}
      style={{ '--glow': a.glow } as React.CSSProperties}
    >
      <ArrowUpRight
        size={15}
        className="absolute top-6 right-6 opacity-0 group-hover:opacity-70
                   -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0
                   transition-all duration-300 text-text-muted"
      />

      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${a.icon}`}>
          {icon}
        </div>
        {live && (
          <div className="flex items-center gap-1.5">
            <span className="live-dot" />
            <span className="font-mono text-[10px] text-primary-container tracking-[0.2em] uppercase">LIVE</span>
          </div>
        )}
      </div>

      <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-60 mt-2"
         style={{ color: a.icon.split('text-')[1]?.split(' ')[0] }}>
        {label}
      </p>

      <h3
        className="font-display italic font-light text-text-primary leading-tight -mt-1"
        style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
          letterSpacing: '-0.025em',
        }}
      >
        {title}
      </h3>

      {photo && (
        <div className="relative h-36 overflow-hidden rounded-2xl -mx-2">
          <PhotoFrame
            src={photo}
            alt={title}
            accent={accent}
            fade="bottom"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}

      <p className="font-body font-light text-text-secondary text-sm leading-relaxed flex-1">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {tags.map(t => (
          <span key={t}
                className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border ${a.tag}`}>
            {t}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100
                      transition-opacity duration-500"
           style={{
             background: `linear-gradient(90deg, transparent, ${
               accent === 'primary' ? '#6ff6fd' : accent === 'secondary' ? '#cee5ff' : '#ffffd6'
             }80, transparent)`,
           }}
      />
    </article>
  )
}

/* ─── Section ────────────────────────────────────────── */
export default function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const iitRef     = useRef<HTMLElement>(null)

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

    if (iitRef.current) {
      gsap.from(iitRef.current, {
        opacity: 0, y: 24, duration: 0.7, delay: 0.5, ease: EASE.expo,
        scrollTrigger: {
          trigger: iitRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, { scope: sectionRef })

  const onIITMove = useCursorSpotlight()

  return (
    <section ref={sectionRef} id="services" className="relative py-28 overflow-hidden bg-surface">

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, var(--colors-surface) 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div ref={headerRef} className="mb-16">
          <p className="font-mono text-xs text-primary-container tracking-[0.2em] uppercase mb-3">
            What We Build
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
              Where AI, Blockchain<br/>
              <span className="text-secondary-fixed drop-shadow-md">& Drones Converge</span>
            </h2>
            <p className="font-body font-light text-text-secondary text-base
                          leading-relaxed max-w-sm lg:text-right">
              Hover any card — our surfaces respond to your presence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="lg:row-span-2">
            <BentoCard
              accent="primary"
              label="Core Platform"
              icon={<Brain size={20} />}
              title="AI-Powered Reskilling & LLM Education"
              description={
                `オーダーメイド型の従業員向け教育サービス。
                Edify独自のアルゴリズムがパーソナライズされた学習データを解析し、
                大学シンクタンクが予測する10年後のスキルセットへ導きます。
                LLM-generated curricula, real-time skill-gap analysis, adaptive learning paths.`
              }
              tags={['LLM', 'EdTech', 'パーソナライズ', 'Data Analytics']}
              photo="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=75"
              live
              className="h-full min-h-[420px]"
              delay={0.1}
            />
          </div>

          <BentoCard
            accent="secondary"
            label="Infrastructure"
            icon={<Navigation size={20} />}
            title="UTM Drone Traffic Management"
            description={
              `ブロックチェーン技術を応用したドローン運航管理システム(UTM)を開発し、
              高度なレジリエンスとセキュリティを提供します。
              Real-time airspace coordination with collision avoidance for urban drone fleets.`
            }
            tags={['UTM', 'Drone', 'Airspace', 'Robotics']}
            photo="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=75"
            delay={0.2}
          />

          <BentoCard
            accent="tertiary"
            label="Security Layer"
            icon={<ShieldCheck size={20} />}
            title="Blockchain-Secured Infrastructure"
            description={
              `Distributed ledger technology makes every drone operation immutable and auditable.
              Smart contract flight approvals, tamper-proof logs, decentralised identity —
              full Web3 security stack for aerial systems.`
            }
            tags={['Web3', 'Smart Contracts', 'DLT', 'Security']}
            photo="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=75"
            delay={0.3}
          />

          <BentoCard
            accent="secondary"
            label="Global Initiative"
            icon={<Globe2 size={20} />}
            title="Zentej — AI & Web3 Hackathon Series"
            description={
              `AI・ロボティクス・Web3分野の国際ハッカソン。
              日本・インドと世界へ広がるEdifyのハッカソン。
              IIT Mandi · IIT Ropar · 50+ teams. 48h sprints.`
            }
            tags={['Hackathon', 'AI', 'Web3', 'IIT Mandi', 'グローバル']}
            photo="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=75"
            delay={0.4}
          />

          {/* IIT Partnership — full width */}
          <article
            ref={iitRef}
            onMouseMove={onIITMove}
            className="cursor-card bg-surface-container-low border border-primary-container/15
                       hover:border-primary-container/40 transition-all duration-500 p-8 rounded-[32px]
                       lg:col-span-2 group overflow-hidden relative"
          >
            <ArrowUpRight size={15}
              className="absolute top-6 right-6 opacity-0 group-hover:opacity-70
                         -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0
                         transition-all duration-300 text-text-muted" />

            <div className="relative h-32 overflow-hidden rounded-2xl mb-6">
              <PhotoFrame
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=75"
                alt="IIT partnership team collaboration"
                accent="primary"
                fade="right"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary-container/5 flex items-center justify-center
                              text-primary-container ring-1 ring-primary-container/20 shrink-0">
                <GraduationCap size={24} />
              </div>

              <div className="flex-1">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-container/80 mb-2">
                  Academic Partnership
                </p>
                <h3 className="font-display italic font-light text-text-primary mb-2"
                    style={{ letterSpacing:'-0.025em', fontSize:'1.4rem' }}>
                  IIT Mandi & IIT Ropar — Joint R&D
                </h3>
                <p className="font-body font-light text-text-secondary text-sm leading-relaxed max-w-2xl">
                  MoU締結済み。研究成果の社会実装を中心とした包括的な協定。
                  Joint research on AI, robotics, and drone applications with Simhatel,
                  Deep Algorithms Solution, and Reagvis Labs.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end shrink-0">
                {['IIT Mandi', 'IIT Ropar', 'MoU締結', 'R&D'].map(t => (
                  <span key={t}
                    className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border
                               text-primary-container border-primary-container/25 bg-primary-container/5 whitespace-nowrap">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center">
              <p className="font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase mr-2">
                Tech Stack ―
              </p>
              {[
                { Icon: Cpu,        label: 'LLM'        },
                { Icon: Link2,      label: 'Blockchain'  },
                { Icon: Navigation, label: 'UTM'         },
                { Icon: Brain,      label: 'AI'          },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 group/icon">
                  <div className="w-8 h-8 rounded-[10px] bg-surface-container border border-transparent
                                  group-hover/icon:border-primary-container/30 group-hover/icon:text-primary-container
                                  flex items-center justify-center text-text-muted transition-all">
                    <Icon size={14} />
                  </div>
                  <span className="font-mono text-[10px] text-text-muted
                                   group-hover/icon:text-text-secondary transition-colors">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
