# CLAUDE.md — Edify Website

## Project Overview

Corporate website redesign for **株式会社Edify** (`edify.jp`).
Stack: **Vite + React 18 + TypeScript + Tailwind CSS 3 + Framer Motion + Supabase**.
Design reference: gene-sis.jp aesthetic — dark-mode glassmorphism, neon accents, smooth scroll animations.

Edify is a Japanese tech company (registered: Sapporo, Hokkaido — see Address Note below)
focused on four core technology pillars: **LLM · Blockchain · Drone Tech · AI**.

---

## Dev Commands

```bash
npm run dev      # Start dev server (Vite, port 5173)
npm run build    # TypeScript check → production bundle
npm run preview  # Serve the dist/ build locally
npx tsc --noEmit # Type-check only (no build)
```

---

## Address Note ⚠️

The live site (`edify.jp`) shows the registered address as:
**北海道札幌市中央区北5条西11丁目15-4** (Sapporo, Hokkaido).
The redesign brief describes the company as "Hiroshima-based".
**Do not silently change the address** — ask the user to confirm which is correct
before updating `src/data/content.ts → companyInfo.address`.

---

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Sticky glass nav, mobile drawer, scroll-aware
│   │   └── Footer.tsx        # Multi-column footer
│   ├── sections/
│   │   ├── Hero.tsx          # Full-screen hero, canvas wave-dot animation, parallax
│   │   ├── BentoGrid.tsx     # Asymmetric 3-col service grid (lg:row-span-2 on first card)
│   │   └── TechTicker.tsx    # Dual-row infinite CSS marquee
│   └── ui/
│       ├── GlowButton.tsx    # Neon CTA button (cyan | blue | magenta | ghost)
│       └── GlassCard.tsx     # Animated glass-morphism card wrapper
├── data/
│   └── content.ts            # ALL site copy — typed, annotated [VERBATIM]/[SYNTHESIZED]
├── lib/
│   └── supabase.ts           # Supabase client (env-gated)
├── App.tsx                   # Root: ScrollProgress bar + section layout
├── index.css                 # Design tokens, glass/glow utilities, scrollbar
└── vite-env.d.ts             # ImportMeta.env typings
```

---

## Design System

### Palette (Tailwind custom tokens — `tailwind.config.js`)

| Token              | Hex       | Role                         |
|--------------------|-----------|------------------------------|
| `void`             | `#020810` | Page background              |
| `deep`             | `#060d1a` | Section alternating bg       |
| `surface`          | `#0c1626` | Card surface                 |
| `glass`            | `#111f35` | Glass-morphism base          |
| `border`           | `#1a3050` | Default border               |
| `cyan.glow`        | `#00d9ff` | Primary accent (LLM, AI)     |
| `blue.neon`        | `#3b82f6` | Secondary accent (Drone)     |
| `magenta.glow`     | `#ff2e97` | Tertiary accent (Blockchain) |
| `text.primary`     | `#e8f4ff` | Body copy                    |
| `text.secondary`   | `#8ba8c8` | Subdued copy                 |
| `text.muted`       | `#4a6885` | Labels, captions             |

### Typography (loaded via Google Fonts in `index.html`)

| Role    | Font           | Weights used |
|---------|----------------|--------------|
| Display | Space Grotesk  | 700, 900     |
| Body    | Inter          | 200, 300     |
| Mono    | JetBrains Mono | 300, 400     |

**Critical convention**: headings always use `font-family: 'Space Grotesk'` with
`letter-spacing: -0.03em` to -0.04em. Body copy uses Inter at weight 200–300.
Never use font-weight 400–600 for headings — this creates the "AI slop" look.

### Glass Morphism (utility classes in `index.css`)

```css
.glass           /* backdrop-blur-xl + semi-transparent bg + border */
.glass-hover     /* adds hover transition on border-color + shadow */
.glow-text-cyan  /* text-shadow glow in cyan */
.gradient-text   /* cyan → blue → magenta gradient text fill */
.neon-border-cyan / blue / magenta
```

### Shadows (`tailwind.config.js → boxShadow`)

- `shadow-glow-cyan` — cyan halo
- `shadow-glow-blue` — blue halo
- `shadow-glow-magenta` — magenta halo
- `shadow-glass` — standard glass card shadow
- `shadow-glass-hover` — elevated glass hover shadow

---

## Animation Conventions

- All scroll-reveal animations use **Framer Motion** `whileInView` with
  `viewport={{ once: true, margin: '-60px' }}`.
- Stagger delay increments: `0.1s` per element.
- Standard ease: `[0.16, 1, 0.3, 1]` (expo-out — matches `--ease-out-expo` in CSS).
- Page-load animations use `initial/animate` (not `whileInView`).
- CSS-only animations (marquee, float, pulse-glow) are declared as Tailwind
  `keyframes` in `tailwind.config.js` and applied via `animate-*` classes.
- Always add `@media (prefers-reduced-motion: reduce)` guards for looping animations.

---

## Data Layer (`src/data/content.ts`)

Single source of truth for all site copy. **Do not hardcode strings in components.**
Import from here instead:

```typescript
import { corePillars, companyInfo, events, partners, techTickerItems } from '@/data/content'
```

Exports:
- `companyInfo: CompanyInfo` — name, CEO, address, email
- `corePillars: CorePillar[]` — 4 objects (llm | blockchain | drone | ai) with
  `title`, `description`, `details[]`, `keywords[]`, `accent`
- `services: Service[]` — 3 service objects with Japanese verbatim headings
- `events: Event[]` — Zentej S3 (IIT Mandi), Zentej S2 (IIT Ropar), Air Water contest
- `partners: Partner[]` — IIT Mandi, IIT Ropar, Simhatel, Deep Algorithms, Reagvis Labs
- `techTickerItems[]` — 16 ticker items with accent colors (feeds `TechTicker.tsx`)

**Annotation rule**: every string in `content.ts` is marked `[VERBATIM]`,
`[SYNTHESIZED]`, or `[TRANSLATED]` in an adjacent comment. Preserve this.

---

## Supabase

Client is at `src/lib/supabase.ts`. Credentials go in `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The client gracefully no-ops with placeholder values if env vars are missing
(console.warn only — no crashes). See `.env.local.example` for the template.

---

## Component Conventions

1. **Every new section** gets its own file in `src/components/sections/`.
2. **Reusable primitives** (buttons, cards, inputs) go in `src/components/ui/`.
3. Use `GlassCard` as the wrapper for all glass-morphism cards.
   Pass `accent="cyan" | "blue" | "magenta"` to control the glow color.
4. Use `GlowButton` for all CTAs. Never write inline button styles.
5. All text copy is imported from `src/data/content.ts`.
6. Section IDs match the nav href targets:
   `#services`, `#drone-utm`, `#reskilling`, `#zentej`, `#about`, `#contact`.

---

## Skills Available for This Project

Run these slash commands to invoke specialised workflows:

| Command                   | When to use                                                  |
|---------------------------|--------------------------------------------------------------|
| `/distinctive-frontend`   | Designing new sections — enforces bold, non-generic choices  |
| `/accessibility-audit`    | After building a component — checks ARIA, contrast, focus    |
| `/motion-performance`     | Before merging animation changes — audits Framer Motion perf |
| `/design-review`          | Full UI review pass — spacing, hierarchy, consistency        |

---

## What NOT to do

- Do not use `font-weight: 400, 500, 600` on headings.
- Do not use generic purple/violet gradients.
- Do not hardcode Japanese copy in components — use `content.ts`.
- Do not add Supabase RLS policies or schema changes without user confirmation.
- Do not silently change the company address (see Address Note above).
- Do not add `console.log` statements; use `console.warn` or `console.error` only.
- Do not create new CSS files — extend `index.css` or `tailwind.config.js`.
- Do not use `any` in TypeScript without a `// eslint-disable` comment explaining why.
