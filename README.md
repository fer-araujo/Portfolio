# Portfolio 2026

Personal portfolio built to showcase not just what I can build, but how I think about building it.

Every detail — from the horizontal cinematic film reel to the Aurora animations, from the editorial typography to the GSAP-driven transitions — was designed with intention.

## Highlights

- **Cinematic film reel** — horizontal scroll-driven project showcase powered by GSAP ScrollTrigger
- **Editorial case studies** — fullscreen overlays with problem/solution/impact narratives for each project
- **Aurora animations** — atmospheric background effects built with CSS keyframes
- **Framer Motion** — micro-interactions and scroll-triggered reveals throughout
- **Responsive** — desktop cinematic experience with mobile vertical stack fallback
- **Dark-first design** — custom OKLCH design tokens, dot-grid patterns, film grain overlay

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock)
![Motion](https://img.shields.io/badge/Motion-12-0055FF?logo=framer)
![Lenis](https://img.shields.io/badge/Lenis-1-FF6B6B)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm test` | Run Vitest unit/integration tests |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm type-check` | TypeScript strict mode check |
| `pnpm lint` | ESLint check |

## Architecture

- **Next.js 16 App Router** — server components by default, client where needed
- **GSAP + Lenis bridge** — smooth scroll with scroll-triggered animations
- **Engram persistent memory** — SDD (Spec-Driven Development) artifacts stored across sessions
- **Strict TDD** — tests written first, 247 tests across 24 files
- **OKLCH design tokens** — accessible, perceptually uniform color system

## Author

Built by [Fer Araujo](https://github.com/fer-araujo).
