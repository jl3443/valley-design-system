/**
 * Valley Bank — Design Token Registry
 *
 * Single source of truth for every token rendered in the showcase page.
 * Each entry includes a `provenance` field pointing back to the live capture
 * source (docs/capture/valley-evidence.md). Per the captured-asset-honesty
 * rule: if a token wasn't captured, the value is null and `provenance` says so.
 */

export type Token<T = string> = {
  name: string;        // human label (sentence case)
  value: T;            // computed value
  cssVar: string;      // --color-brand-navy
  vbkVar?: string;     // --vbk-* alias verbatim from valley.com
  provenance: string;  // "Captured 2026-05-21 from valley.com" | "Substituted (Adobe Fonts license)"
};

// ── Brand colors ────────────────────────────────────────────────────────
export const brandColors: Token[] = [
  { name: "Brand navy",        value: "#002c4e", cssVar: "--color-brand-navy",       vbkVar: "--vbk-heading-color-main-1",     provenance: "captured" },
  { name: "Brand yellow",      value: "#f3d01c", cssVar: "--color-brand-yellow",     vbkVar: "--vbk-heading-color-main-2",     provenance: "captured" },
  { name: "Brand slate",       value: "#788995", cssVar: "--color-brand-slate",      vbkVar: "--vbk-heading-color-main-3",     provenance: "captured" },
  { name: "Navy deep",         value: "#112e44", cssVar: "--color-brand-navy-deep",  vbkVar: "--vbk-button-dark-main-1-bg-color", provenance: "captured" },
  { name: "Navy light",        value: "#163d5c", cssVar: "--color-brand-navy-light", provenance: "captured (in colorHistogram, not in --vbk-* registry)" },
  { name: "Yellow dark",       value: "#b69c15", cssVar: "--color-brand-yellow-dark", vbkVar: "--vbk-button-dark-main-2-bg-color", provenance: "captured" },
  { name: "Cream surface",     value: "#fefae8", cssVar: "--color-brand-cream",      vbkVar: "--vbk-container-root-main-2-default-bg-color", provenance: "captured" },
  { name: "Light navy",        value: "#e6eaed", cssVar: "--color-brand-light-navy", vbkVar: "--vbk-Header-navy-light-color",  provenance: "captured" },
];

// ── Accent / semantic ───────────────────────────────────────────────────
export const accentColors: Token[] = [
  { name: "Accent maroon",     value: "#860c4e", cssVar: "--color-accent-maroon",  vbkVar: "--vbk-heading-color-secondary-1",   provenance: "captured" },
  { name: "Accent orange",     value: "#f25b3a", cssVar: "--color-accent-orange",  vbkVar: "--vbk-heading-color-secondary-2",   provenance: "captured" },
  { name: "Accent green",      value: "#00685e", cssVar: "--color-accent-green",   vbkVar: "--vbk-heading-color-semantic-success", provenance: "captured" },
  { name: "Accent forest",     value: "#175e21", cssVar: "--color-accent-forest",  vbkVar: "--vbk-button-secondary-13-bg-color", provenance: "captured" },
  { name: "Accent blue (info)",value: "#0042a5", cssVar: "--color-accent-blue",    vbkVar: "--vbk-page-blue-info-color",        provenance: "captured" },
  { name: "Error border",      value: "#b8232f", cssVar: "--color-accent-error",   vbkVar: "--vbk-input-error-border-color",    provenance: "captured" },
  { name: "Error tint",        value: "#feefeb", cssVar: "--color-accent-error-tint", vbkVar: "--vbk-input-error-bg-color",     provenance: "captured" },
];

// ── Neutrals ────────────────────────────────────────────────────────────
export const neutrals: Token[] = [
  { name: "Ink",               value: "#323a3f", cssVar: "--color-ink",          vbkVar: "--fg-main-color",                provenance: "captured" },
  { name: "Ink soft",          value: "#5c646c", cssVar: "--color-ink-soft",     vbkVar: "--vbk-Header-dark-grey-color",   provenance: "captured" },
  { name: "Divider",           value: "#dee2e6", cssVar: "--color-divider",      vbkVar: "--vbk-newsroom-grey-4-color",    provenance: "captured" },
  { name: "Surface",           value: "#f2f3f4", cssVar: "--color-surface",      vbkVar: "--vbk-container-root-main-3-default-bg-color", provenance: "captured" },
  { name: "Surface soft",      value: "#f8f9fa", cssVar: "--color-surface-soft", vbkVar: "--vbk-singlearticle-bg-grey",    provenance: "captured" },
  { name: "Page",              value: "#ffffff", cssVar: "--color-page",         provenance: "captured (top bg, count=61)" },
];

// ── Typography roles ────────────────────────────────────────────────────
export type TypeRole = {
  role: string;
  family: string;
  size: string;
  lineHeight: string;
  weight: string;
  letterSpacing: string;
  sourceFont: string; // original captured font name
  substitution?: string;
  sample: string;
};

export const typeRoles: TypeRole[] = [
  {
    role: "Display (h1 / h2)",
    family: "var(--font-display)",
    size: "34px",
    lineHeight: "42px",
    weight: "300",
    letterSpacing: "1px",
    sourceFont: "ivypresto-headline (Adobe Fonts)",
    substitution: "Cormorant Garamond (Google Fonts) — same high-contrast serif feel; original requires Adobe Fonts license",
    sample: "Everyone has a \"How?\"",
  },
  {
    role: "Subhead (h3)",
    family: "var(--font-sans)",
    size: "18px",
    lineHeight: "28px",
    weight: "700",
    letterSpacing: "normal",
    sourceFont: "Autor (Adobe Fonts)",
    substitution: "DM Sans (Google Fonts) — humanist geometric, same UI weight",
    sample: "Valley is here to help you confidently achieve your ambition",
  },
  {
    role: "Body / paragraph",
    family: "var(--font-prose)",
    size: "16px",
    lineHeight: "24px",
    weight: "400",
    letterSpacing: "normal",
    sourceFont: "Roboto",
    sample: "Manage your finances your way.",
  },
  {
    role: "Eyebrow / caps label",
    family: "var(--font-sans)",
    size: "11px",
    lineHeight: "16px",
    weight: "700",
    letterSpacing: "1.4px",
    sourceFont: "Autor (Adobe Fonts)",
    substitution: "DM Sans (Google Fonts)",
    sample: "PERSONAL BANKING",
  },
];

// ── Radius scale ────────────────────────────────────────────────────────
export const radiusTokens: Token<string>[] = [
  { name: "Input / micro",   value: "2px",     cssVar: "--radius-input",   provenance: "captured (10 hits)" },
  { name: "Control",         value: "3px",     cssVar: "--radius-control", provenance: "captured (4 hits)" },
  { name: "Surface",         value: "8px",     cssVar: "--radius-surface", provenance: "captured (8 hits)" },
  { name: "Card",            value: "16px",    cssVar: "--radius-card",    provenance: "captured (4 hits — sign-in tile)" },
  { name: "Pill (CTA)",      value: "100px",   cssVar: "--radius-pill",    provenance: "captured (18 hits — primary CTA signature)" },
  { name: "Circle",          value: "9999px",  cssVar: "--radius-circle",  provenance: "captured (50% — avatars/icon buttons)" },
];

// ── Shadow scale ────────────────────────────────────────────────────────
export const shadowTokens: Token<string>[] = [
  { name: "Card drop",       value: "0 4px 10px rgb(0 0 0 / 0.2)",    cssVar: "--shadow-card",      provenance: "captured (14 hits)" },
  { name: "Ring focus navy", value: "0 0 0 1px #002c4e",              cssVar: "--shadow-ring-navy", provenance: "captured (12 hits — focus indicator pattern)" },
  { name: "Ring focus deep", value: "0 0 0 1px #112e44",              cssVar: "--shadow-ring-navy-deep", provenance: "captured (6 hits)" },
  { name: "Elevated modal",  value: "0 16px 40px rgb(0 0 0 / 0.05)",  cssVar: "--shadow-elevated",  provenance: "captured (4 hits)" },
  { name: "Soft glow",       value: "0 0 12px rgb(0 0 0 / 0.08)",     cssVar: "--shadow-glow",      provenance: "captured (3 hits)" },
  { name: "Article shadow",  value: "0 2px 8px rgb(0 44 78 / 0.1)",   cssVar: "--shadow-article",   provenance: "captured from --vbk-singlearticle-shadow" },
];

// ── Motion ──────────────────────────────────────────────────────────────
export const motionTokens = [
  { name: "Fast (hover, color)", duration: "150ms", easing: "ease-in-out", provenance: "captured (18 hits — 0.15s ease-in-out)" },
  { name: "Base (color, opacity)", duration: "250ms", easing: "ease-in-out", provenance: "captured (8 hits — 0.25s)" },
  { name: "Slide (drawer)", duration: "300ms", easing: "ease-out", provenance: "captured (14 hits — drawer transform+visibility)" },
];
