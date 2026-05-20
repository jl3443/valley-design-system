# Valley Bank — Live Capture Evidence

> Live capture from `https://www.valley.com/` via Chrome DevTools Console paste-back → `getComputedStyle()` on rendered DOM. Every value below is a real reading, not inferred. Where a value isn't yet captured we say so.

**Capture session:** 2026-05-20T18:55:15Z (user paste-back 2026-05-21)
**Source URL:** https://www.valley.com/ (en-US homepage, AEM-rendered)
**Page title:** "Valley"
**Method:** Channel B — user paste-back from DevTools Console at narrow viewport (w=272).
**⚠️ Caveat:** Capture viewport was 272px wide (narrowed DevTools panel). `firstVisible('header a')` / primary CTA selectors returned null because the desktop header had collapsed to mobile. The full-DOM `ctaVariants` walk captured the navy "Tell me how" pill and white "Personal Sign in" card anyway, so we have token coverage. A second capture at desktop width (≥1280px) is queued in §9 to re-anchor header/nav surfaces.

---

## 0 — Method (reusable)

Run `docs/capture/extractor.js` against any Valley page. Output JSON is filled into the sections below. Same recipe used previously for AGCO (`05_Industrial_DS`) and DSM-Firmenich.

Roles captured:
- `:root` / `<body>` CSS custom properties (Valley uses **`--vbk-*`** prefix, plus a thin `--fg-*` / `--bg-*` semantic layer)
- Typography: h1 / h2 / h3 / p (header CTAs deferred — narrow-viewport miss)
- Color histogram (top backgrounds + foregrounds across full DOM)
- CTA variants (deduped by bg+fg+radius+padding+weight signature)
- Transitions / motion contracts
- Border-radius + shadow histograms
- Font-family histogram
- Logo asset hints

---

## 1 — CSS Custom Properties

Valley exposes a flat, role-scoped variable namespace (~310 vars on `:root`). Pattern: `--vbk-<surface>-<role>-<property>-<state>`. Tailwind v2 `--tw-*` reset vars and Swiper carousel vars coexist in the same `:root`. There's a thin semantic alias layer (`--fg-main-color`, `--fg-accent-color`, `--bg-theme-color`, `--fg-theme-color`) that wraps the verbose `--vbk-*` names.

### 1.1 — Semantic aliases (use these for DS tokens)

| Token | Value | Role |
|-------|-------|------|
| `--fg-main-color` | `#323a3f` | Default body text |
| `--fg-accent-color` | `#00685e` | Accent foreground (green) |
| `--fg-theme-color` | `#323a3f` | Page theme foreground |
| `--bg-theme-color` | `white` | Page theme background |

### 1.2 — Brand color anchors (verbatim from `--vbk-*`)

| Role | Token(s) | Value |
|------|----------|-------|
| Navy (primary brand) | `--vbk-heading-color-main-1`, `--vbk-text-main-1-color`, `--vbk-button-main-1-bg-color`, `--vbk-hero-homepages-navy-bg-color` | `#002c4e` |
| Yellow (signature accent) | `--vbk-heading-color-main-2`, `--vbk-button-main-2-color`, `--vbk-product-card-bg-color`, `--vbk-header-main-2-bg-color`, `--vbk-Header-yellow-color` | `#f3d01c` |
| Slate (tertiary brand) | `--vbk-heading-color-main-3`, `--vbk-hero-imagesplit-slate-color` | `#788995` |
| Blue info (links, focus) | `--vbk-page-blue-info-color`, `--vbk-text-semantic-info-color`, `--vbk-link-text-main-1-color` _(navy alias)_, `--vbk-input-focus-border-color` | `#0042a5` |
| Maroon (secondary 1) | `--vbk-heading-color-secondary-1`, `--vbk-hero-homepages-maroon-bg-color` | `#860c4e` |
| Orange (secondary 2) | `--vbk-heading-color-secondary-2`, `--vbk-hero-homepages-orange-bg-color` | `#f25b3a` |
| Green (success / accent) | `--vbk-heading-color-semantic-success`, `--vbk-button-semantic-success-bg-color`, `--vbk-hero-homepages-green-bg-color`, `--fg-accent-color` | `#00685e` |
| Dark navy (alt button) | `--vbk-button-dark-main-1-bg-color`, `--vbk-button-dark-main-1-color` | `#112e44` |
| Dark gold | `--vbk-button-dark-main-2-bg-color`, `--vbk-button-dark-main-2-color` | `#b69c15` |
| Forest (secondary CTA outline) | `--vbk-button-secondary-13-bg-color`, `--vbk-button-secondary-13-border-color` | `#175e21` |
| Cream (hover/active surface) | `--vbk-input-navy-active-bg-color`, `--vbk-hero-fullbleedtextoverlay-light-main-2-bg-color`, `--vbk-container-root-main-2-default-bg-color` | `#fefae8` |
| Light navy (cool surface) | `--vbk-Header-navy-light-color`, `--vbk-navigation-accordion-light-main-1-bg-color`, `--vbk-checkbox-main-1-checked` | `#e6eaed` |

### 1.3 — Neutral scale

| Step | Hex | Common roles |
|------|-----|--------------|
| Black ink | `#323a3f` | Body text (`--fg-main-color`) |
| Grey 5 / mid | `#5c646c` | Secondary text, placeholders, input borders |
| Grey 4 / divider | `#dee2e6` | Borders, accordion dividers |
| Grey 3 / surface | `#f2f3f4` | Card backgrounds, container fills |
| Grey 2 / hover | `#f8f9fa` | `--vbk-singlearticle-bg-grey` |
| White | `white` | Page background, button-on-dark |

### 1.4 — Semantic feedback

| Role | Token | Value |
|------|-------|-------|
| Error border | `--vbk-input-error-border-color`, `--vbk-singlearticle-error-color` | `#b8232f` |
| Error background tint | `--vbk-input-error-bg-color` | `#feefeb` |
| Error accent (alt) | `--vbk-dropdown-btn-default-border-color-error` | `#f25b3a` |
| Loan/payment red | `--vbk-wizard-pay-a-loan-red-color` | `#c00` |
| Success | `--vbk-button-semantic-success-bg-color` | `#00685e` |
| Info | `--vbk-page-blue-info-color` | `#0042a5` |

### 1.5 — Layout vars

| Token | Value | Note |
|-------|-------|------|
| `--header-height` | `125px` | Sticky header total height |
| `--vh` | `7.25px` | Dynamic viewport-height unit (Valley overrides browser `vh` via JS — this captured value reflects a narrow viewport; will differ at desktop) |
| `--swiper-theme-color` | `#007aff` | Default carousel (likely not surfaced in branded swipers) |
| `--swiper-navigation-size` | `44px` | Carousel nav button hit area |

---

## 2 — Typography Roles

Valley runs a two-family stack: **ivypresto-headline** (Adobe Fonts serif — for hero h1/h2) and **Autor + Roboto** (sans family with Arial fallback — for h3 and below). The serif is reserved for *display* — h3 drops to sans.

| Role | Family | Size / Line | Weight | Tracking | Case | Color |
|------|--------|-------------|--------|----------|------|-------|
| h1 | `ivypresto-headline, "Times New Roman"` | 34 / 42px | **300** (light) | 1px | none | `#323a3f` |
| h2 | `ivypresto-headline, "Times New Roman"` | 34 / 42px | **300** (light) | 1px | none | `#323a3f` |
| h3 | `Autor, Roboto, arial` | 18 / 28px | **700** | normal | none | `#323a3f` |
| p | `Roboto, arial` | 16 / 24px | 400 | normal | none | `#323a3f` |
| body | `Autor, Roboto` | 16 / 16px | 400 | normal | none | `rgb(0,0,0)` |
| header | `Autor, Roboto` | 16 / 16px | 400 | normal | none | inherits |
| footer | `Autor, Roboto` | 16 / 16px | 400 | normal | none | inherits |

### Captured h1 sample

> "Everyone has a \"How?\"" — the hero headline on `/`.

### Honesty notes
- h1 and h2 size/weight are **identical at this viewport** (34/42/300, 1px tracking). At desktop width the cascade may bump h1 — confirm at ≥1280px.
- `transition: all` on every text role is the AEM clientlib default (overrides via component CSS).
- `headerLink`, `primaryCTA`, `secondaryCTA` selectors returned **null** at this viewport — header collapsed to mobile menu. See §3 for what the full-DOM walk caught instead.

---

## 3 — CTA Variants

Full-DOM walk caught 2 distinct CTA signatures (more on desktop re-capture).

### 3.1 — Primary pill (navy)

> Text: "Tell me how" — the hero CTA on `/`

| Property | Value | DS token suggestion |
|----------|-------|---------------------|
| Background | `rgb(0, 44, 78)` | `--cta-primary-bg` → maps to `--vbk-button-main-1-bg-color` |
| Foreground | `rgb(255, 255, 255)` | white |
| Border-radius | **`100px`** (pill) | `--radius-pill` |
| Padding | `6px 20px` | tight |
| Font | Roboto 16px / 600 | not Autor — Valley uses Roboto for buttons |
| Letter-spacing | normal | sentence case |
| Border | `4px solid transparent` | reserved for focus-ring expansion |

### 3.2 — Sign-in card (white, soft-rounded)

> Text: "Personal Sign in" — header sign-in dropdown trigger

| Property | Value | DS token suggestion |
|----------|-------|---------------------|
| Background | `white` | |
| Foreground | `rgb(50, 58, 63)` | `--fg-main-color` |
| Border-radius | **`16px`** | `--radius-card` |
| Padding | `16px` | square |
| Font | Autor 16px / 400 | normal weight (not a true CTA — closer to a tile) |
| Letter-spacing | normal | |
| Border | `1px solid rgb(230, 234, 237)` | `--vbk-Header-navy-light-color` (1.2) |

### Honesty notes
- No yellow CTA captured at this viewport — Valley uses yellow as a *brand accent* (header yellow icon, product card bg, h2 yellow alias `--vbk-heading-main-2-text-color`) but the live homepage CTAs are navy-on-white. The yellow button surface (`--vbk-button-main-2-color: #f3d01c`) exists in the token system but no hero-level instance was captured here.
- "Secondary 13" forest-green CTA (`--vbk-button-secondary-13-bg-color: #175e21`) is a niche component — likely the green CTA in the loan/sectors module. Capture deferred.
- Outline / ghost CTA variants not captured at this viewport.

---

## 4 — Color Palette

Frequency over the full DOM (`.querySelectorAll('*')`).

### 4.1 — Top backgrounds

| Rank | Color | Count | Role |
|------|-------|-------|------|
| 1 | `#FFFFFF` | 61 | Default surface |
| 2 | `#f2f3f4` | 20 | Section dividers, cards (grey-3) |
| 3 | `#002c4e` | 16 | **Navy hero / overlay** — the brand workhorse |
| 4 | `#163d5c` | 5 | Lighter navy (hover or interior) — *not in the named `--vbk-*` vars* |
| 5 | `#f3d01c` | 4 | Yellow accent block |
| 6 | `#323a3f` | 3 | Dark surface (banner / footer panel) |
| 7 | `#f4f4f4` | 2 | Off-white (likely a non-token surface) |
| 8 | `#f8f9fa` | 1 | Grey 2 (article bg) |
| 9 | `rgba(0,0,0,0.5)` | 1 | Modal overlay |
| 10 | `#f9fffa` | 1 | Mint tint (one-off success surface) |
| 11 | `#788995` | 1 | Slate panel |
| 12 | `#3860be` | 1 | One-off blue (likely social or wizard) |

### 4.2 — Top foregrounds

| Rank | Color | Count | Role |
|------|-------|-------|------|
| 1 | `#323a3f` | 907 | Default body text (`--fg-main-color`) |
| 2 | `#000000` | 764 | Browser default / unstyled — note Valley doesn't strictly override every text node |
| 3 | `#FFFFFF` | 199 | On-navy text |
| 4 | `#0042a5` | 148 | Links, info accent (`--vbk-page-blue-info-color`) |
| 5 | `#5c646c` | 144 | Secondary text (`--vbk-Header-dark-grey-color`) |
| 6 | `#f3d01c` | 85 | Yellow icon glyph fills (footer icons, header) |
| 7 | `#163d5c` | 33 | Lighter navy text (mid-tone) |
| 8 | `#00685e` | 27 | Green accent text |

### Visual fingerprint
**Navy (`#002c4e`) + yellow (`#f3d01c`) + white + grey 3 (`#f2f3f4`)** is the 4-color heart of the system. Maroon and orange are decorative accents (~4 uses each at this viewport). The system is *blue-yellow* before anything else — different from AGCO (red-black industrial) and DSM-F (mint-green-deep).

---

## 5 — Motion Contracts

Valley does **not** define strict motion contracts — most elements inherit `transition: all` from the AEM clientlib reset. Real contracts emerge in a long tail.

| Contract | Frequency | Where |
|----------|-----------|-------|
| `all` (default — no duration set) | 2,291 | AEM clientlib default; effectively no animation |
| `0.15s ease-in-out` | 18 | Quick hover transitions (links, button states) |
| `transform 0.3s ease-out, visibility 0.3s` | 14 | Drawer / slide-out menus |
| `color 0.25s ease-in-out` | 8 | Text color transitions on hover |
| `transform` (no duration) | 4 | One-off transforms |
| `0.1s` | 2 | Fastest UI tick |
| `visibility 0s linear 0.3s, opacity 0.3s linear` | 2 | Fade-with-delay (modal pattern) |
| `transform 0.3s ease-in-out` | 1 | Single component |
| `transform 0.25s ease-out` | 1 | Single component |
| `opacity 0.25s ease-in-out 0.2s` | 1 | Staggered fade-in |

### Recommended motion tokens (synthesized)

```
--motion-fast: 150ms ease-in-out;      // hover, color, focus
--motion-base: 250ms ease-in-out;      // color, opacity
--motion-slide: 300ms ease-out;        // drawer transform + visibility
--motion-instant: 100ms;               // tick
```

Don't ship `transition: all` as a token — it's an AEM accident, not intent.

---

## 6 — Radius & Shadow

### 6.1 — Radius

| Radius | Count | DS role |
|--------|-------|---------|
| **`100px`** | 18 | Pill (primary CTA) — `--radius-pill` |
| `2px` | 10 | Inputs, micro-elements |
| `8px` | 8 | Standard rounded surfaces |
| `16px` | 4 | Card / dropdown panel — `--radius-card` |
| `3px` | 4 | Micro-detail |
| `50%` | 3 | Circles (avatars, icon buttons) |
| `20px` | 1 | One-off |
| `50px` | 1 | One-off |
| `17px` | 1 | One-off |
| `0px 0px 2px 2px` | 1 | Asymmetric (border-only bottom) |

**Radius scale:** `[2, 3, 8, 16, 100, 50%]` — clear three-tier system: micro (2–3px inputs), card (8/16px panels), pill (100px CTAs), circle (50%).

### 6.2 — Shadow

| Shadow | Count | DS role |
|--------|-------|---------|
| `rgba(0,0,0,0.2) 0px 4px 10px 0px` | 14 | Standard drop (cards, dropdowns) — `--shadow-card` |
| `#002c4e 0px 0px 0px 1px` | 12 | Navy focus ring | — `--ring-focus-navy` |
| `#112e44 0px 0px 0px 1px` | 6 | Dark-navy focus ring (alt) |
| `rgba(0,0,0,0.05) 0px 16px 40px 0px` | 4 | Large soft (modal / hero panel) — `--shadow-elevated` |
| `rgba(0,0,0,0.08) 0px 0px 12px 0px` | 3 | Even glow (no offset) |
| `gray 0px 0px 5px 0px` | 1 | One-off |
| `rgba(0,0,0,0) 0px 2px 4px, rgba(50,50,93,0.1) 0px 7px 14px` | 1 | Layered (third-party widget) |
| `#c7c5c7 -3px -3px 5px -2px` | 1 | Inset / inverted (skeuomorphic — one-off) |

**Shadow scale:** card-drop, focus-ring, elevated-modal. The 1px box-shadow ring pattern (12+6 hits) is the **focus-indicator convention** — Valley uses solid-color 1px ring shadows instead of CSS outlines.

---

## 7 — Fonts

| Family | Count | Role |
|--------|-------|------|
| `Autor, Roboto` | 1,573 | UI sans (default body, header, footer) — **primary** |
| `Roboto, arial` | 737 | Paragraphs and CTAs — note button font is Roboto, not Autor |
| `Autor, Roboto, arial` | 29 | Subheadings (h3) |
| `ivypresto-headline, "Times New Roman"` | 7 | Display serif (h1, h2 only) |

### Font sourcing
- **Autor** — Adobe Fonts (proprietary). Geometric humanist sans. Used for body UI.
- **ivypresto-headline** — Adobe Fonts (proprietary serif by DSType). Light-weight (300) high-contrast display serif. Used only for display headlines.
- **Roboto** — Google Fonts. Used for paragraph copy and CTA labels (interesting split — Valley uses Roboto for buttons, not Autor).

### DS implication
Valley's split-stack pattern is unusual: **Autor for UI chrome, Roboto for prose + CTAs, ivypresto for display**. A faithful clone needs all three. For a sandbox clone where Adobe Fonts aren't licensed, substitute:
- ivypresto-headline → **Cormorant Garamond** or **Tinos** (high-contrast serif, Google Fonts)
- Autor → **DM Sans** or **Inter** (humanist geometric)
- Roboto → unchanged (Google Fonts)

---

## 8 — Brand Assets

| Asset | URL | Use |
|-------|-----|-----|
| **Valley logo (blue)** | `https://www.valley.com/content/dam/valley/logos/valley-core/valley-logo-blue.png` | Primary header logo |
| FDIC desktop badge | `https://www.valley.com/content/dam/valley/logos/fdic-logos/FDIC-Desktop.svg` | Trust badge (header / footer) |
| Best Bank 2026 | `https://www.valley.com/content/dam/valley/logos/third-party-logos/bestbank2026.png` | Award logo |
| Best Banks 2025 | `https://www.valley.com/content/dam/valley/logos/third-party-logos/BestBanks2025.png` | Award logo |
| ADP AEM | `https://www.valley.com/content/dam/valley/logos/third-party-logos/ADPAEM.png` | Award logo |

### Notes
- Logo at narrow viewport reported `w=0, h=0` — it's lazy-loaded or hidden in this collapsed-header state. The src URL is correct.
- Logo is PNG, not SVG — likely intentional for the bank logo. A clone could pull this directly or vector-trace at desktop width.

---

## 9 — Open questions / deferred

- [ ] **Desktop re-capture at ≥1280px** to fill `headerLink`, `primaryCTA`, `secondaryCTA`, mobile-vs-desktop nav. Current capture viewport was 272px — header collapsed.
- [ ] Capture interior pages: `/personal`, `/business`, `/commercial`, `/wealth`, `/about`, `/customer-care`
- [ ] Capture sign-in flow `/personal/personal-sign-in` — distinct DS surface (forms, dropdown, error states)
- [ ] Capture mobile breakpoint tokens (`--vh` was `7.25px` at narrow viewport — confirm at full mobile sim)
- [ ] Capture **yellow CTA variant** (`--vbk-button-main-2-color: #f3d01c`) — exists in token system, not seen in hero
- [ ] Capture **forest-green secondary CTA** (`--vbk-button-secondary-13-bg-color: #175e21`)
- [ ] Capture iframe content (signalintent, YouTube embed, pxcelframe — DS-relevant?)
- [ ] Capture footer DS surface separately — distinct color (`--vbk-footer-yellow-icon-color: #f3d01c`, white-on-dark)
- [ ] Locate Autor + ivypresto-headline license terms (Adobe Fonts) or pick substitutes for sandbox clone

---

## 10 — Brand fingerprint summary

| Dimension | Valley |
|-----------|--------|
| **Primary anchor** | Navy `#002c4e` |
| **Accent** | Yellow `#f3d01c` |
| **Display font** | ivypresto-headline (serif, 300 weight, 1px tracking) |
| **UI font** | Autor (sans) |
| **CTA font** | Roboto (split — interesting) |
| **CTA shape** | Pill 100px (navy) + soft-rounded card 16px |
| **Hero case** | Sentence case ("Everyone has a \"How?\"") — no uppercase tracking |
| **Header height** | 125px |
| **Focus pattern** | 1px solid-color box-shadow ring (not CSS outline) |
| **Vibe vs peers** | Editorial-serif headline + humanist sans body + brand-yellow accent — closer to a *consumer lifestyle* feel than corporate/industrial. Distinct from AGCO (industrial uppercase) and DSM-F (sans-only sentence-case pill). |
