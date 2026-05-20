# Valley Bank — Design System (captured)

A code-first design system mirroring [valley.com](https://www.valley.com) 1:1. Every token traces back to a live `getComputedStyle()` reading — no inferred values.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind v4 with `@theme` block (every token exposed as a utility)
- Lucide React icons
- Framer Motion (motion contracts)
- Cormorant Garamond (substitute for ivypresto-headline) + DM Sans (substitute for Autor) + Roboto, all Google Fonts

## Run

```bash
npm install
npm run dev   # → http://localhost:3011
```

## Provenance

Every value in [`lib/tokens.ts`](./lib/tokens.ts) and [`app/globals.css`](./app/globals.css) is captured live. Full evidence in [`docs/capture/valley-evidence.md`](./docs/capture/valley-evidence.md).

Two extractors:

- [`docs/capture/extractor.js`](./docs/capture/extractor.js) — shallow (CSS vars, typography, CTA variants, color histogram, motion, radius, shadow, fonts, logos)
- [`docs/capture/extractor-v2-deep.js`](./docs/capture/extractor-v2-deep.js) — deep (CSSOM scan for `:hover` / `:focus` / `:active` rules, component archetypes, z-index, container widths, icon library, header/footer structure)

Both scripts are runnable in any Chrome DevTools Console. Output is JSON pasted back into the evidence doc.

## Font substitutions

Valley uses Adobe Fonts (ivypresto-headline + Autor) which require a project license. This clone substitutes:

| Original | Substitute | Why |
|----------|------------|-----|
| ivypresto-headline | Cormorant Garamond | Same high-contrast display serif feel, 300 weight available, Google Fonts |
| Autor | DM Sans | Humanist geometric, same UI tone, Google Fonts |
| Roboto | Roboto | unchanged |

## Captured fingerprint

| Dimension | Value |
|-----------|-------|
| Primary anchor | Navy `#002c4e` |
| Accent | Yellow `#f3d01c` |
| Display font | ivypresto-headline (substituted) — 34px/42 line-height/300 weight/1px tracking |
| UI font | Autor (substituted) |
| CTA font | Roboto 600 16px |
| CTA shape | Pill 100px (navy) + soft 16px card |
| Hero case | Sentence ("Everyone has a 'How?'") |
| Header height | 125px |
| Focus pattern | 1px solid-color box-shadow ring (not CSS outline) |

## Status

- [x] Shallow capture (v1) — tokens, typography, motion, radius, shadow ✅
- [ ] Deep capture (v2) — `:hover` / `:focus` / `:active` rules + component archetypes — **in flight**
- [ ] Build /showcase button matrix + component primitives once v2 lands
- [ ] Push to GitHub `jl3443/valley-design-system` + Vercel deploy
