import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Cpu, Zap, Globe, Navigation, Brain, Link2, Layers, Bot, Rocket, Database } from 'lucide-react'

interface TickerItem {
  label:  string
  accent: 'primary' | 'secondary' | 'tertiary'
  icon:   React.ReactNode
}

const ROW_A: TickerItem[] = [
  { label: 'LLM',              icon: <Brain      size={12}/>, accent: 'primary'    },
  { label: '大規模言語モデル',   icon: <Cpu        size={12}/>, accent: 'primary'    },
  { label: 'Blockchain',       icon: <Link2      size={12}/>, accent: 'tertiary' },
  { label: 'ブロックチェーン',   icon: <Link2      size={12}/>, accent: 'tertiary' },
  { label: 'Drone Tech',       icon: <Navigation size={12}/>, accent: 'secondary'    },
  { label: 'ドローン技術',      icon: <Navigation size={12}/>, accent: 'secondary'    },
  { label: 'Web3',             icon: <Globe      size={12}/>, accent: 'primary'    },
  { label: 'UTM Systems',      icon: <Zap        size={12}/>, accent: 'secondary'    },
  { label: 'AI',               icon: <Layers     size={12}/>, accent: 'tertiary' },
  { label: '人工知能',          icon: <Layers     size={12}/>, accent: 'primary'    },
  { label: 'Robotics',         icon: <Bot        size={12}/>, accent: 'secondary'    },
  { label: 'ロボティクス',       icon: <Bot        size={12}/>, accent: 'tertiary' },
]

const ROW_B: TickerItem[] = [
  { label: 'EdTech',           icon: <Brain      size={12}/>, accent: 'primary'    },
  { label: 'スマートコントラクト', icon: <Link2    size={12}/>, accent: 'tertiary' },
  { label: 'Deep Learning',    icon: <Cpu        size={12}/>, accent: 'secondary'    },
  { label: '深層学習',          icon: <Cpu        size={12}/>, accent: 'primary'    },
  { label: 'Zentej',           icon: <Rocket     size={12}/>, accent: 'tertiary' },
  { label: '産学連携',          icon: <Globe      size={12}/>, accent: 'secondary'    },
  { label: 'IIT Mandi',        icon: <Navigation size={12}/>, accent: 'primary'    },
  { label: 'Computer Vision',  icon: <Zap        size={12}/>, accent: 'secondary'    },
  { label: 'リスキリング',       icon: <Brain      size={12}/>, accent: 'tertiary' },
  { label: 'Smart Contracts',  icon: <Link2      size={12}/>, accent: 'primary'    },
  { label: 'Digital Twins',    icon: <Database   size={12}/>, accent: 'secondary'    },
  { label: 'デジタルツイン',     icon: <Database   size={12}/>, accent: 'tertiary' },
]

const ROW_C: TickerItem[] = [
  { label: 'Neural Networks',  icon: <Cpu        size={12}/>, accent: 'secondary'    },
  { label: 'ニューラルネット',   icon: <Cpu        size={12}/>, accent: 'primary'    },
  { label: 'Autonomous Drones', icon: <Navigation size={12}/>, accent: 'tertiary' },
  { label: 'Decentralisation', icon: <Globe      size={12}/>, accent: 'secondary'    },
  { label: '社会実装',          icon: <Rocket     size={12}/>, accent: 'primary'    },
  { label: 'Zero-Knowledge',   icon: <Link2      size={12}/>, accent: 'tertiary' },
  { label: 'Japan × India',    icon: <Globe      size={12}/>, accent: 'secondary'    },
  { label: 'Prompt Engineering', icon: <Brain    size={12}/>, accent: 'primary'    },
  { label: '教育データ解析',     icon: <Database   size={12}/>, accent: 'tertiary' },
  { label: 'Generative AI',    icon: <Zap        size={12}/>, accent: 'secondary'    },
  { label: 'Hackathon',        icon: <Rocket     size={12}/>, accent: 'primary'    },
  { label: 'IoT × Blockchain', icon: <Link2      size={12}/>, accent: 'tertiary' },
]

const COLOR: Record<TickerItem['accent'], {text:string;border:string;bg:string}> = {
  primary:   { text:'text-primary-container',    border:'border-primary-container/20',    bg:'bg-primary-container/5'    },
  secondary: { text:'text-secondary-fixed',      border:'border-secondary-fixed/20',      bg:'bg-secondary-fixed/5'    },
  tertiary:  { text:'text-tertiary-fixed',       border:'border-tertiary-fixed/20',       bg:'bg-tertiary-fixed/5' },
}

function Sep() {
  return <span className="text-text-muted opacity-30 text-base select-none shrink-0 mx-1">◆</span>
}

function Pill({ item }: { item: TickerItem }) {
  const c = COLOR[item.accent]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                  ghost-border bg-surface-container ${c.border} ${c.text}
                  font-body text-[11px] font-medium tracking-wide
                  whitespace-nowrap select-none shrink-0`}
    >
      {item.icon}
      {item.label}
    </span>
  )
}

/* ── GSAP infinite marquee row ── */
function TickerRow({
  items, direction, duration,
}: { items: TickerItem[]; direction: 'left' | 'right'; duration: number }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const doubled = [...items, ...items]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    /* Animate from 0 to -50% (seamless because content is doubled) */
    const tween = gsap.fromTo(
      track,
      { x: direction === 'left' ? '0%' : '-50%' },
      {
        x: direction === 'left' ? '-50%' : '0%',
        duration,
        ease: 'none',
        repeat: -1,
      }
    )
    return () => { tween.kill() }
  }, [direction, duration])

  return (
    <div className="flex overflow-hidden">
      <div ref={trackRef} style={{ display: 'flex', gap: '10px', willChange: 'transform' }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2.5 shrink-0">
            <Pill item={item} />
            {i % 5 === 4 && <Sep />}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechTicker() {
  return (
    <div
      className="relative py-5 overflow-hidden ghost-border border-l-0 border-r-0 bg-surface-container-low"
    >
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
           style={{ background: 'linear-gradient(to right, var(--colors-surface-container-low), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
           style={{ background: 'linear-gradient(to left, var(--colors-surface-container-low), transparent)' }} />

      <div className="flex flex-col gap-3">
        <TickerRow items={ROW_A} direction="left"  duration={32} />
        <TickerRow items={ROW_B} direction="right" duration={40} />
        <TickerRow items={ROW_C} direction="left"  duration={26} />
      </div>
    </div>
  )
}
