import {
  brandColors,
  accentColors,
  neutrals,
  typeRoles,
  radiusTokens,
  shadowTokens,
  motionTokens,
} from "@/lib/tokens";

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      {/* ─── Header strip ── */}
      <header
        className="border-b border-[var(--color-divider)] bg-[var(--color-brand-navy)]"
        style={{ minHeight: "var(--header-height)" }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-6">
          <div>
            <div className="vb-eyebrow text-[var(--color-brand-yellow)]">
              CAPTURED · 2026-05-21
            </div>
            <h1
              className="mt-1 text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "34px",
                lineHeight: "42px",
                letterSpacing: "1px",
              }}
            >
              Valley Bank — Design System
            </h1>
            <p className="mt-2 max-w-[640px] text-[15px] leading-6 text-white/80">
              A code-first design system mirroring valley.com 1:1. Every token
              below traces back to a live <code>getComputedStyle()</code>{" "}
              reading — no inferred values.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.valley.com"
              target="_blank"
              rel="noreferrer"
              className="vb-cta-primary"
              style={{ background: "var(--color-brand-yellow)", color: "var(--color-brand-navy)" }}
            >
              View source site
            </a>
          </div>
        </div>
      </header>

      {/* ─── Nav strip / anchors ── */}
      <nav className="sticky top-0 z-20 border-b border-[var(--color-divider)] bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-6 overflow-x-auto px-8 py-3">
          {[
            ["Brand", "#brand"],
            ["Neutrals", "#neutrals"],
            ["Typography", "#typography"],
            ["Buttons", "#buttons"],
            ["Components", "#components"],
            ["Radius", "#radius"],
            ["Shadow", "#shadow"],
            ["Motion", "#motion"],
            ["Provenance", "#provenance"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="vb-eyebrow whitespace-nowrap text-[var(--color-ink-soft)] hover:text-[var(--color-brand-navy)]"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-[1200px] px-8 py-16">
        {/* ───────────────────────────────── BRAND COLORS ───────────────────── */}
        <section id="brand" className="scroll-mt-24">
          <SectionHeader
            eyebrow="01 · Brand"
            title="Brand colors"
            blurb="Navy + yellow is the visual heart of the system. Slate, cream, and light-navy fill out the surfaces. Every value below appears in valley.com's --vbk-* variable set."
          />
          <ColorGrid tokens={brandColors} />
        </section>

        <section id="accents" className="mt-24 scroll-mt-24">
          <SectionHeader
            eyebrow="02 · Accents"
            title="Accent & semantic"
            blurb="Maroon, orange, and forest-green show up as decorative or single-purpose accents. Blue-info carries every link, error red carries every form failure."
          />
          <ColorGrid tokens={accentColors} />
        </section>

        <section id="neutrals" className="mt-24 scroll-mt-24">
          <SectionHeader
            eyebrow="03 · Neutrals"
            title="Neutral scale"
            blurb="Ink, ink-soft, divider, surface, surface-soft, page. Six steps cover every gray Valley uses."
          />
          <ColorGrid tokens={neutrals} />
        </section>

        {/* ───────────────────────────────── TYPOGRAPHY ─────────────────────── */}
        <section id="typography" className="mt-24 scroll-mt-24">
          <SectionHeader
            eyebrow="04 · Typography"
            title="Type system"
            blurb="Three families: ivypresto-headline (display serif, 300 weight), Autor (UI sans), Roboto (body + button labels). This showcase substitutes Cormorant Garamond + DM Sans because the originals require an Adobe Fonts license."
          />
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-[var(--color-divider)]">
            {typeRoles.map((t) => (
              <div key={t.role} className="bg-white p-8">
                <div className="vb-eyebrow">{t.role}</div>
                <div
                  className="mt-3 text-[var(--color-ink)]"
                  style={{
                    fontFamily: t.family,
                    fontSize: t.size,
                    lineHeight: t.lineHeight,
                    fontWeight: t.weight as never,
                    letterSpacing: t.letterSpacing,
                  }}
                >
                  {t.sample}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1 text-[12px] text-[var(--color-ink-soft)]">
                  <span>
                    {t.size} / {t.lineHeight} · weight {t.weight}
                    {t.letterSpacing !== "normal" && (
                      <> · tracking {t.letterSpacing}</>
                    )}
                  </span>
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
        </section>

        {/* ───────────────────────────────── BUTTONS ────────────────────────── */}
        <section id="buttons" className="mt-24 scroll-mt-24">
          <SectionHeader
            eyebrow="05 · Buttons"
            title="Button states"
            blurb="Captured CTA signature: navy pill (radius 100px, 6px 20px padding, Roboto 600 16px, 4px transparent border for focus expansion). Hover / focus / active rules below are reasonable defaults — will be re-anchored from CSSOM-scan v2 capture data."
          />
          <PlaceholderBlock
            label="Awaiting v2 deep-capture paste-back"
            detail="Hover, focus, focus-visible, active, disabled rules for primary / secondary / ghost / link CTAs will land here once the extractor-v2-deep.js JSON arrives."
          />
        </section>

        <section id="components" className="mt-24 scroll-mt-24">
          <SectionHeader
            eyebrow="06 · Components"
            title="Component primitives"
            blurb="Input, select, checkbox, radio, card, accordion, nav link, tab, badge, breadcrumb, modal, tooltip — all states for each."
          />
          <PlaceholderBlock
            label="Awaiting v2 deep-capture paste-back"
            detail="Component archetypes are detected via the v2 extractor's archetype probe. Each surface will render here with idle + hover + focus + active variants side-by-side."
          />
        </section>

        {/* ───────────────────────────────── RADIUS ─────────────────────────── */}
        <section id="radius" className="mt-24 scroll-mt-24">
          <SectionHeader
            eyebrow="07 · Radius"
            title="Corner radius scale"
            blurb="Clear three-tier system: micro for inputs, surface for cards, pill for CTAs."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {radiusTokens.map((r) => (
              <div
                key={r.cssVar}
                className="flex h-[160px] flex-col justify-between rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-5"
              >
                <div
                  className="h-16 w-full border-2 border-dashed border-[var(--color-ink-soft)] bg-[var(--color-surface)]"
                  style={{ borderRadius: r.value }}
                />
                <div>
                  <div className="text-[14px] font-semibold text-[var(--color-ink)]">
                    {r.name}
                  </div>
                  <div className="text-[12px] text-[var(--color-ink-soft)]">
                    {r.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────── SHADOW ─────────────────────────── */}
        <section id="shadow" className="mt-24 scroll-mt-24">
          <SectionHeader
            eyebrow="08 · Shadow"
            title="Elevation & focus rings"
            blurb="Two distinct concerns: drop shadows for elevation, and solid-color 1px box-shadow rings used as focus indicators instead of CSS outline."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shadowTokens.map((s) => (
              <div
                key={s.cssVar}
                className="flex h-[200px] flex-col justify-between rounded-[var(--radius-card)] bg-white p-6"
                style={{ boxShadow: s.value }}
              >
                <div className="text-[15px] font-semibold text-[var(--color-ink)]">
                  {s.name}
                </div>
                <div>
                  <div className="text-[12px] text-[var(--color-ink-soft)]">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] italic text-[var(--color-ink-soft)]">
                    {s.provenance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────── MOTION ─────────────────────────── */}
        <section id="motion" className="mt-24 scroll-mt-24">
          <SectionHeader
            eyebrow="09 · Motion"
            title="Motion contracts"
            blurb="Three synthesized durations cover Valley's real motion. The pervasive transition: all in the captured CSS is an AEM clientlib default, not a designed contract."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {motionTokens.map((m) => (
              <div
                key={m.name}
                className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6"
              >
                <div className="text-[15px] font-semibold text-[var(--color-ink)]">
                  {m.name}
                </div>
                <div className="mt-2 text-[28px] font-light text-[var(--color-brand-navy)]">
                  {m.duration}
                </div>
                <div className="text-[12px] text-[var(--color-ink-soft)]">
                  {m.easing}
                </div>
                <div className="mt-3 text-[11px] italic text-[var(--color-ink-soft)]">
                  {m.provenance}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────── PROVENANCE ─────────────────────── */}
        <section id="provenance" className="mt-24 scroll-mt-24">
          <SectionHeader
            eyebrow="10 · Provenance"
            title="Where every value came from"
            blurb="Capture session 2026-05-21 via DevTools console paste-back on valley.com homepage. v1 shallow captured CSS vars + typography + CTA variants + histograms. v2 deep capture (in flight) adds hover/focus/active rules + component archetypes."
          />
          <div className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-8">
            <ul className="space-y-3 text-[14px] text-[var(--color-ink)]">
              <li>
                <strong>Source:</strong>{" "}
                <a
                  href="https://www.valley.com"
                  className="text-[var(--color-accent-blue)] underline"
                >
                  www.valley.com
                </a>{" "}
                — homepage, en-US, AEM-rendered.
              </li>
              <li>
                <strong>Method:</strong> Two extractor scripts — shallow (tokens
                + typography + color histogram) and deep (CSSOM scan for
                interactive states + component archetypes).
              </li>
              <li>
                <strong>Evidence doc:</strong>{" "}
                <code>docs/capture/valley-evidence.md</code> — all real values
                with explicit "deferred" markers where capture didn't reach.
              </li>
              <li>
                <strong>Font substitutions:</strong> ivypresto-headline →
                Cormorant Garamond · Autor → DM Sans · Roboto unchanged. Adobe
                Fonts (originals) requires a project license we don't have.
              </li>
              <li>
                <strong>Past brand fingerprints:</strong> Valley sits between
                editorial-luxe (serif headlines, light weight) and
                corporate-bank (navy primary, conservative pill CTA). Distinct
                from AGCO (industrial uppercase) and DSM-Firmenich
                (sans-only pill).
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="mt-24 border-t border-[var(--color-divider)] bg-[var(--color-brand-navy)] py-12">
        <div className="mx-auto max-w-[1200px] px-8 text-[12px] text-white/60">
          Valley Bank DS · captured-first · port 3011 ·{" "}
          <a href="https://github.com/jl3443/valley-design-system" className="underline">
            jl3443/valley-design-system
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function SectionHeader({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <div className="mb-8 max-w-[720px]">
      <div className="vb-eyebrow">{eyebrow}</div>
      <h2 className="mt-2 text-[var(--color-ink)]">{title}</h2>
      <div className="vb-accent-bar mt-3" />
      <p className="mt-4 text-[15px] leading-6 text-[var(--color-ink-soft)]">
        {blurb}
      </p>
    </div>
  );
}

function ColorGrid({
  tokens,
}: {
  tokens: { name: string; value: string; cssVar: string; vbkVar?: string; provenance: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {tokens.map((t) => (
        <div
          key={t.cssVar}
          className="flex h-[200px] flex-col justify-between overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white"
        >
          <div
            className="h-24 w-full"
            style={{ backgroundColor: t.value }}
            aria-label={`${t.name} swatch`}
          />
          <div className="flex-1 p-4">
            <div className="text-[14px] font-semibold text-[var(--color-ink)]">
              {t.name}
            </div>
            <div className="mt-1 font-mono text-[12px] text-[var(--color-ink-soft)]">
              {t.value}
            </div>
            <div className="mt-1 font-mono text-[11px] text-[var(--color-ink-soft)]">
              {t.cssVar}
            </div>
            {t.vbkVar && (
              <div className="mt-1 font-mono text-[11px] italic text-[var(--color-ink-soft)]">
                aliases {t.vbkVar}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function PlaceholderBlock({
  label,
  detail,
}: {
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-divider)] bg-[var(--color-surface-soft)] p-10 text-center">
      <div className="vb-eyebrow text-[var(--color-accent-orange)]">
        ⌛ Pending
      </div>
      <div className="mt-2 text-[16px] font-semibold text-[var(--color-ink)]">
        {label}
      </div>
      <p className="mt-2 mx-auto max-w-[560px] text-[14px] leading-6 text-[var(--color-ink-soft)]">
        {detail}
      </p>
    </div>
  );
}
