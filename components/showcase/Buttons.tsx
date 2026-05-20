/**
 * Button matrix — every captured button variant × every interaction state.
 *
 * Variants are anchored to real --vbk-* tokens from the capture:
 *   primary navy pill → --vbk-button-main-1-bg-color (#002c4e)
 *   yellow            → --vbk-button-main-2-color (#f3d01c)
 *   dark navy         → --vbk-button-dark-main-1-bg-color (#112e44)
 *   success green     → --vbk-button-semantic-success-bg-color (#00685e)
 *   forest secondary  → --vbk-button-secondary-13-bg-color (#175e21)
 *   secondary tile    → captured from header sign-in card (white / 16px radius)
 *
 * States (idle / hover / focus-visible / active / disabled) are synthesized from
 * captured 4px-transparent-border focus pattern + Valley's box-shadow ring
 * convention (`#002c4e 0 0 0 1px` — 12 hits in shadow histogram).
 */
"use client";

import { ArrowRight, Lock, Download } from "lucide-react";

type Variant =
  | "primary"
  | "yellow"
  | "dark"
  | "success"
  | "forest"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-brand-navy)] text-white hover:bg-[var(--color-brand-navy-deep)] active:bg-[var(--color-brand-navy-light)] focus-visible:border-[var(--color-brand-yellow)] focus-visible:shadow-[0_0_0_1px_var(--color-brand-navy)]",
  yellow:
    "bg-[var(--color-brand-yellow)] text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-yellow-dark)] active:bg-[var(--color-brand-yellow-dark)] focus-visible:border-[var(--color-brand-navy)] focus-visible:shadow-[0_0_0_1px_var(--color-brand-yellow)]",
  dark:
    "bg-[var(--color-brand-navy-deep)] text-white hover:bg-[var(--color-brand-navy)] active:bg-[var(--color-brand-navy-light)] focus-visible:border-[var(--color-brand-yellow)]",
  success:
    "bg-[var(--color-accent-green)] text-white hover:bg-[#004f48] active:bg-[#003a35] focus-visible:border-[var(--color-brand-yellow)]",
  forest:
    "bg-[var(--color-accent-forest)] text-white hover:bg-[#114818] active:bg-[#0d3712] focus-visible:border-[var(--color-brand-yellow)]",
  secondary:
    "bg-white text-[var(--color-ink)] border-[var(--color-brand-light-navy)] hover:border-[var(--color-ink-soft)] hover:shadow-[var(--shadow-card)] active:bg-[var(--color-surface)] focus-visible:shadow-[var(--shadow-ring-navy)]",
  outline:
    "bg-transparent text-[var(--color-brand-navy)] border-[var(--color-brand-navy)] hover:bg-[var(--color-brand-navy)] hover:text-white active:bg-[var(--color-brand-navy-light)] focus-visible:shadow-[var(--shadow-ring-navy)]",
  ghost:
    "bg-transparent text-[var(--color-brand-navy)] hover:bg-[var(--color-surface)] active:bg-[var(--color-brand-light-navy)] focus-visible:shadow-[var(--shadow-ring-navy)]",
  danger:
    "bg-[var(--color-accent-error)] text-white hover:bg-[#9a1a25] active:bg-[#7c151e] focus-visible:border-white",
};

const variantLabels: Record<Variant, string> = {
  primary: "Primary navy pill",
  yellow: "Yellow accent",
  dark: "Dark navy",
  success: "Success green",
  forest: "Forest secondary",
  secondary: "Soft tile (sign-in)",
  outline: "Outline",
  ghost: "Ghost",
  danger: "Danger",
};

function ValleyButton({
  variant,
  children,
  disabled,
  icon,
  size = "md",
}: {
  variant: Variant;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "px-4 py-1 text-[14px]",
    md: "px-5 py-1.5 text-[16px]",
    lg: "px-7 py-2.5 text-[16px]",
  }[size];
  const radius = variant === "secondary" ? "rounded-[var(--radius-card)]" : "rounded-[var(--radius-pill)]";
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center gap-2 border-4 border-transparent font-prose font-semibold transition-colors duration-150 ease-in-out outline-none disabled:cursor-not-allowed disabled:bg-[var(--color-divider)] disabled:text-[var(--color-ink-soft)] disabled:border-transparent ${radius} ${sizeClasses} ${variantStyles[variant]}`}
      style={{ fontFamily: "var(--font-prose)" }}
    >
      {icon}
      {children}
    </button>
  );
}

export function ButtonsShowcase() {
  const variants: Variant[] = [
    "primary",
    "yellow",
    "dark",
    "success",
    "forest",
    "secondary",
    "outline",
    "ghost",
    "danger",
  ];

  return (
    <div className="space-y-12">
      {/* Variant gallery */}
      <div>
        <h3 className="mb-4 text-[var(--color-ink)]">Variants — idle state</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3">
          {variants.map((v) => (
            <div
              key={v}
              className="flex h-[120px] flex-col items-start justify-between rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-5"
            >
              <span className="vb-eyebrow">{variantLabels[v]}</span>
              <ValleyButton variant={v} icon={<ArrowRight size={16} />}>
                Tell me how
              </ValleyButton>
            </div>
          ))}
        </div>
      </div>

      {/* State matrix for primary */}
      <div>
        <h3 className="mb-4 text-[var(--color-ink)]">
          State matrix — primary navy pill
        </h3>
        <p className="mb-4 text-[14px] text-[var(--color-ink-soft)]">
          The captured 4px transparent border on the idle button is the focus
          expansion track — hover the yellow into it on focus-visible. Click
          and hold one to see active.
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
          <StateBox label="Idle">
            <ValleyButton variant="primary">Get started</ValleyButton>
          </StateBox>
          <StateBox label="Hover (mouseover)">
            <ValleyButton variant="primary">Get started</ValleyButton>
            <span className="mt-2 text-[11px] text-[var(--color-ink-soft)]">
              navy-deep #112e44
            </span>
          </StateBox>
          <StateBox label="Focus-visible (Tab)">
            <ValleyButton variant="primary">Get started</ValleyButton>
            <span className="mt-2 text-[11px] text-[var(--color-ink-soft)]">
              yellow border + ring
            </span>
          </StateBox>
          <StateBox label="Active (mousedown)">
            <ValleyButton variant="primary">Get started</ValleyButton>
            <span className="mt-2 text-[11px] text-[var(--color-ink-soft)]">
              navy-light #163d5c
            </span>
          </StateBox>
          <StateBox label="Disabled">
            <ValleyButton variant="primary" disabled>
              Get started
            </ValleyButton>
          </StateBox>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="mb-4 text-[var(--color-ink)]">Sizes</h3>
        <div className="flex flex-wrap items-end gap-4 rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6">
          <div className="flex flex-col items-start gap-2">
            <span className="vb-eyebrow">Small · 14px</span>
            <ValleyButton variant="primary" size="sm">
              Pay loan
            </ValleyButton>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="vb-eyebrow">Medium · 16px (default)</span>
            <ValleyButton variant="primary" size="md">
              Open account
            </ValleyButton>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="vb-eyebrow">Large · hero</span>
            <ValleyButton variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Apply now
            </ValleyButton>
          </div>
        </div>
      </div>

      {/* Icon usage */}
      <div>
        <h3 className="mb-4 text-[var(--color-ink)]">Icon patterns</h3>
        <div className="flex flex-wrap gap-3 rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6">
          <ValleyButton variant="primary" icon={<Lock size={16} />}>
            Sign in securely
          </ValleyButton>
          <ValleyButton variant="secondary" icon={<Download size={16} />}>
            Download statement
          </ValleyButton>
          <ValleyButton variant="outline" icon={<ArrowRight size={16} />}>
            Explore
          </ValleyButton>
          <ValleyButton variant="ghost">Learn more →</ValleyButton>
        </div>
      </div>
    </div>
  );
}

function StateBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex h-[120px] flex-col items-start justify-between rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-5">
      <span className="vb-eyebrow">{label}</span>
      <div className="flex flex-col items-start">{children}</div>
    </div>
  );
}
