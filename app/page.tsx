import {
  brandColors,
  accentColors,
  neutrals,
  typeRoles,
  radiusTokens,
  shadowTokens,
  motionTokens,
} from "@/lib/tokens";
import { ButtonsShowcase } from "@/components/showcase/Buttons";
import { FormsShowcase } from "@/components/showcase/Forms";
import { ComponentsShowcase } from "@/components/showcase/Components";
import { ChartsShowcase } from "@/components/showcase/Charts";
import { BankingShowcase } from "@/components/showcase/Banking";

const NAV = [
  ["Brand",       "#brand"],
  ["Accents",     "#accents"],
  ["Neutrals",    "#neutrals"],
  ["Typography",  "#typography"],
  ["Buttons",     "#buttons"],
  ["Forms",       "#forms"],
  ["Components",  "#components"],
  ["Charts",      "#charts"],
  ["Banking",     "#banking"],
  ["Radius",      "#radius"],
  ["Shadow",      "#shadow"],
  ["Motion",      "#motion"],
  ["Provenance",  "#provenance"],
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      {/* ─── Header ── */}
      <header
        className="bg-[var(--color-brand-navy)]"
        style={{ minHeight: "var(--header-height)" }}
      >
        <div className="mx-auto max-w-[1280px] px-8 py-8">
          <div className="vb-eyebrow text-[var(--color-brand-yellow)]">
            CAPTURED · 2026-05-21
          </div>
          <h1
            className="mt-1 text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "44px",
              lineHeight: "52px",
              letterSpacing: "1px",
            }}
          >
            Valley Bank — Design System
          </h1>
          <p className="mt-3 max-w-[720px] text-[15px] leading-6 text-white/80">
            A code-first design system mirroring valley.com 1:1. Every token
            below traces back to a live <code>getComputedStyle()</code> reading.
            Chart + banking primitives are composed from the same tokens — no
            new colors invented.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href="https://www.valley.com" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border-4 border-transparent bg-[var(--color-brand-yellow)] px-5 py-1.5 text-[16px] font-semibold text-[var(--color-brand-navy)]"
              style={{ fontFamily: "var(--font-prose)" }}>
              Source site ↗
            </a>
            <a href="https://github.com/jl3443/valley-design-system" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border-4 border-transparent bg-white/10 px-5 py-1.5 text-[16px] font-semibold text-white hover:bg-white/20"
              style={{ fontFamily: "var(--font-prose)" }}>
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      {/* ─── Sticky nav ── */}
      <nav className="sticky top-0 z-30 border-b border-[var(--color-divider)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center gap-5 overflow-x-auto px-8 py-3">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}
              className="vb-eyebrow whitespace-nowrap text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-brand-navy)]">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-[1280px] px-8 py-16 space-y-24">
        <Section id="brand" eyebrow="01 · Brand" title="Brand colors"
          blurb="Navy + yellow is the visual heart of the system. Slate, cream, and light-navy fill out the surfaces. Every value below appears in valley.com's --vbk-* variable set.">
          <ColorGrid tokens={brandColors} />
        </Section>

        <Section id="accents" eyebrow="02 · Accents" title="Accent & semantic"
          blurb="Maroon, orange, and forest-green show up as decorative or single-purpose accents. Blue-info carries every link, error red carries every form failure.">
          <ColorGrid tokens={accentColors} />
        </Section>

        <Section id="neutrals" eyebrow="03 · Neutrals" title="Neutral scale"
          blurb="Ink, ink-soft, divider, surface, surface-soft, page. Six steps cover every gray Valley uses.">
          <ColorGrid tokens={neutrals} />
        </Section>

        <Section id="typography" eyebrow="04 · Typography" title="Type system"
          blurb="Three families: ivypresto-headline (display serif, 300 weight), Autor (UI sans), Roboto (body + button labels). Substitutes used here — Cormorant Garamond, DM Sans, Roboto — because originals require Adobe Fonts license.">
          <TypographyGrid />
        </Section>

        <Section id="buttons" eyebrow="05 · Buttons" title="Button states & variants"
          blurb="9 variants × 5 states. Primary navy pill is the captured signature — 100px radius, 6px 20px padding, Roboto 600 16px, 4px transparent focus expansion border. Hover/active darken; focus-visible flips border to yellow + adds navy ring.">
          <ButtonsShowcase />
        </Section>

        <Section id="forms" eyebrow="06 · Forms" title="Form controls"
          blurb="Two captured input treatments: default (white bg, blue focus, ink text) and navy variant (cream bg, yellow focus border — unusual and on-brand). Checkbox, radio, select, search, date, password, textarea all wired from real --vbk-input-*/--vbk-checkbox-*/--vbk-radio-* tokens.">
          <FormsShowcase />
        </Section>

        <Section id="components" eyebrow="07 · Components" title="Mid-level primitives"
          blurb="Navigation, breadcrumb, tabs (yellow indicator strip), accordion (blue circle icon trigger), badges, alerts, cards, tooltip, modal, pagination.">
          <ComponentsShowcase />
        </Section>

        <Section id="charts" eyebrow="08 · Charts" title="Data viz primitives"
          blurb="Demo-side: not on valley.com, composed from captured palette only. KPI tiles with sparklines, balance area chart with hover tooltip, spend-by-category bars, allocation donut, savings progress, credit gauge, transaction heatmap.">
          <ChartsShowcase />
        </Section>

        <Section id="banking" eyebrow="09 · Banking" title="Banking demo patterns"
          blurb="Account cards (color-coded by type), transactions table with category icons, transfer flow card, statements row, branch locator. Every element uses already-captured tokens — no new colors.">
          <BankingShowcase />
        </Section>

        <Section id="radius" eyebrow="10 · Radius" title="Corner radius scale"
          blurb="Clear three-tier system: micro (2–3px) for inputs, surface (8/16px) for panels and cards, pill (100px) for CTAs.">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {radiusTokens.map((r) => (
              <div key={r.cssVar} className="flex h-[160px] flex-col justify-between rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-5">
                <div className="h-16 w-full border-2 border-dashed border-[var(--color-ink-soft)] bg-[var(--color-surface)]" style={{ borderRadius: r.value }} />
                <div>
                  <div className="text-[14px] font-semibold text-[var(--color-ink)]">{r.name}</div>
                  <div className="text-[12px] text-[var(--color-ink-soft)]">{r.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="shadow" eyebrow="11 · Shadow" title="Elevation & focus rings"
          blurb="Drop shadows for elevation, and solid-color 1px box-shadow rings used as focus indicators instead of CSS outline.">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shadowTokens.map((s) => (
              <div key={s.cssVar} className="flex h-[200px] flex-col justify-between rounded-[var(--radius-card)] bg-white p-6" style={{ boxShadow: s.value }}>
                <div className="text-[15px] font-semibold text-[var(--color-ink)]">{s.name}</div>
                <div>
                  <div className="font-mono text-[11px] text-[var(--color-ink-soft)] break-all">{s.value}</div>
                  <div className="mt-1 text-[11px] italic text-[var(--color-ink-soft)]">{s.provenance}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="motion" eyebrow="12 · Motion" title="Motion contracts"
          blurb="Three synthesized durations cover Valley's real motion. Pervasive transition:all in captured CSS is an AEM clientlib default, not a designed contract.">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {motionTokens.map((m) => (
              <div key={m.name} className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6">
                <div className="text-[15px] font-semibold text-[var(--color-ink)]">{m.name}</div>
                <div className="mt-2 text-[28px] font-light text-[var(--color-brand-navy)]" style={{ fontFamily: "var(--font-display)" }}>{m.duration}</div>
                <div className="text-[12px] text-[var(--color-ink-soft)]">{m.easing}</div>
                <div className="mt-3 text-[11px] italic text-[var(--color-ink-soft)]">{m.provenance}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="provenance" eyebrow="13 · Provenance" title="Where every value came from"
          blurb="Capture session 2026-05-21 via DevTools console paste-back on valley.com homepage. Two extractors saved alongside this repo: shallow (CSS vars + typography + histograms) and deep (CSSOM scan for hover/focus/active + component archetypes — pending second paste-back).">
          <div className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-8">
            <ul className="space-y-3 text-[14px] text-[var(--color-ink)]">
              <li><strong>Source:</strong> <a href="https://www.valley.com" className="text-[var(--color-accent-blue)] underline">www.valley.com</a> — homepage, en-US, AEM-rendered.</li>
              <li><strong>Method:</strong> DevTools console paste-back. Two extractor scripts saved in <code>docs/capture/</code>.</li>
              <li><strong>Evidence:</strong> <code>docs/capture/valley-evidence.md</code> — all real values with explicit "deferred" markers.</li>
              <li><strong>Font substitutions:</strong> ivypresto-headline → Cormorant Garamond · Autor → DM Sans · Roboto unchanged.</li>
              <li><strong>Chart + banking primitives:</strong> demo-side, not on valley.com. Composed from captured palette only — no new colors invented.</li>
            </ul>
          </div>
        </Section>
      </main>

      <footer className="border-t border-[var(--color-divider)] bg-[var(--color-brand-navy)] py-12">
        <div className="mx-auto max-w-[1280px] px-8 text-[12px] text-white/60">
          Valley Bank DS · captured-first · port 3011 ·{" "}
          <a href="https://github.com/jl3443/valley-design-system" className="underline">jl3443/valley-design-system</a>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function Section({ id, eyebrow, title, blurb, children }: {
  id: string; eyebrow: string; title: string; blurb: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-10 max-w-[760px]">
        <div className="vb-eyebrow">{eyebrow}</div>
        <h2 className="mt-2 text-[var(--color-ink)]">{title}</h2>
        <div className="vb-accent-bar mt-3" />
        <p className="mt-4 text-[15px] leading-6 text-[var(--color-ink-soft)]">{blurb}</p>
      </div>
      {children}
    </section>
  );
}

function ColorGrid({ tokens }: {
  tokens: { name: string; value: string; cssVar: string; vbkVar?: string; provenance: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {tokens.map((t) => (
        <div key={t.cssVar} className="flex h-[200px] flex-col justify-between overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white">
          <div className="h-24 w-full" style={{ backgroundColor: t.value }} aria-label={`${t.name} swatch`} />
          <div className="flex-1 p-4">
            <div className="text-[14px] font-semibold text-[var(--color-ink)]">{t.name}</div>
            <div className="mt-1 font-mono text-[12px] text-[var(--color-ink-soft)]">{t.value}</div>
            <div className="mt-1 font-mono text-[11px] text-[var(--color-ink-soft)]">{t.cssVar}</div>
            {t.vbkVar && <div className="mt-1 font-mono text-[11px] italic text-[var(--color-ink-soft)]">aliases {t.vbkVar}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function TypographyGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-[var(--color-divider)]">
      {typeRoles.map((t) => (
        <div key={t.role} className="bg-white p-8">
          <div className="vb-eyebrow">{t.role}</div>
          <div className="mt-3 text-[var(--color-ink)]" style={{
            fontFamily: t.family,
            fontSize: t.size,
            lineHeight: t.lineHeight,
            fontWeight: t.weight as never,
            letterSpacing: t.letterSpacing,
          }}>{t.sample}</div>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1 text-[12px] text-[var(--color-ink-soft)] md:grid-cols-2">
            <span>{t.size} / {t.lineHeight} · weight {t.weight}{t.letterSpacing !== "normal" && <> · tracking {t.letterSpacing}</>}</span>
            <span>captured from {t.sourceFont}</span>
          </div>
          {t.substitution && (
            <div className="mt-2 text-[12px] italic text-[var(--color-ink-soft)]">
              Substitution: {t.substitution}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
