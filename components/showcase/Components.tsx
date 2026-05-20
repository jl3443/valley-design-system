/**
 * Mid-level components — accordion, tabs, card, badge, breadcrumb, nav, modal,
 * tooltip, alert, pagination, dropdown menu.
 *
 * Token anchors:
 *   accordion border: --vbk-acc-item-border-color (#dee2e6)
 *   accordion icon bg: --vbk-acc-item-icon-bg-color (#0042a5)
 *   tab text: --vbk-tab-text-color (#5c646c) → hover #0042a5
 *   tab business-acc: #0042a5, commercial-acc: #0042a5 (business uses navy)
 *   tab navy-hover: --vbk-tab-navy-hover-color #f3d01c (yellow)
 *   badge / alert: derived from --vbk-Banner-*
 *   modal grey: --vbk-modal-grey-* (#f2f3f4 / #dee2e6)
 *   tooltip: white bg, #323a3f border + color (captured)
 *   product-card heading: #323a3f
 *   product-card bg: #f3d01c (yellow!)
 *   single-article-cta-bg: #f3d01c, hover-bg: #002c4e
 */
"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Home,
  Briefcase,
  Building2,
  TrendingUp,
} from "lucide-react";

export function ComponentsShowcase() {
  return (
    <div className="space-y-12">
      <NavRow />
      <BreadcrumbRow />
      <TabsBlock />
      <AccordionBlock />
      <BadgesBlock />
      <AlertsBlock />
      <CardsBlock />
      <TooltipModalBlock />
      <PaginationBlock />
    </div>
  );
}

/* ─── 1. Top nav strip (captured header tone) ───────────────────────── */

function NavRow() {
  const [active, setActive] = useState("Personal");
  const items = ["Personal", "Business", "Commercial", "Wealth", "About"];
  return (
    <Card title="Navigation · primary header links">
      <div className="flex items-center gap-1 rounded-[var(--radius-pill)] border border-[var(--color-divider)] bg-white p-1">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`rounded-[var(--radius-pill)] px-4 py-1.5 text-[14px] font-medium transition-colors duration-150 ${
              active === item
                ? "bg-[var(--color-brand-navy)] text-white"
                : "text-[var(--color-ink-soft)] hover:text-[var(--color-brand-navy)] hover:bg-[var(--color-surface)]"
            }`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-3 text-[12px] italic text-[var(--color-ink-soft)]">
        Hover token: <code>--vbk-tab-text-hover-color</code> = #0042a5 · selected
        pill matches primary CTA shape (100px radius)
      </p>
    </Card>
  );
}

/* ─── 2. Breadcrumb (captured: --vbk-breadcrumb-main-1-color = #002c4e) ─ */

function BreadcrumbRow() {
  return (
    <Card title="Breadcrumb">
      <nav className="flex items-center gap-2 text-[14px]" aria-label="Breadcrumb">
        <a
          href="#"
          className="flex items-center gap-1 text-[var(--color-brand-navy)] hover:underline"
        >
          <Home size={14} /> Home
        </a>
        <ChevronRight size={14} className="text-[var(--color-ink-soft)]" />
        <a href="#" className="text-[var(--color-brand-navy)] hover:underline">
          Personal Banking
        </a>
        <ChevronRight size={14} className="text-[var(--color-ink-soft)]" />
        <a href="#" className="text-[var(--color-brand-navy)] hover:underline">
          Checking Accounts
        </a>
        <ChevronRight size={14} className="text-[var(--color-ink-soft)]" />
        <span className="text-[var(--color-ink-soft)]">Premier Checking</span>
      </nav>
    </Card>
  );
}

/* ─── 3. Tabs (captured commercial / business tabs use #0042a5 accent) ─ */

function TabsBlock() {
  const [tab, setTab] = useState("Checking");
  const tabs = ["Checking", "Savings", "Credit", "Loans", "Investments"];
  return (
    <Card title="Tabs · personal banking nav">
      <div className="border-b border-[var(--color-divider)]">
        <div className="flex gap-6">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-3 text-[14px] font-medium transition-colors duration-150 ${
                tab === t
                  ? "text-[var(--color-brand-navy)]"
                  : "text-[var(--color-ink-soft)] hover:text-[var(--color-accent-blue)]"
              }`}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {t}
              {tab === t && (
                <span className="absolute -bottom-px left-0 right-0 h-[3px] bg-[var(--color-brand-yellow)]" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 text-[14px] leading-6 text-[var(--color-ink-soft)]">
        Active tab content for: <strong className="text-[var(--color-ink)]">{tab}</strong>.
        Yellow indicator stripe = brand accent. Hover color = blue info #0042a5.
      </div>
    </Card>
  );
}

/* ─── 4. Accordion (captured icon bg = #0042a5, border = #dee2e6) ────── */

function AccordionBlock() {
  const items = [
    { q: "How do I open a checking account?", a: "Visit any Valley branch with two forms of ID, or apply online in under 5 minutes. Initial deposit: $50 minimum." },
    { q: "What's Valley's overdraft policy?", a: "Standard overdraft fee is $35 per item. Sign up for Overdraft Protection to link your savings or credit card as a fallback." },
    { q: "Can I deposit checks remotely?", a: "Yes — through the Valley Mobile Banking app. Daily mobile-deposit limit: $5,000." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <Card title="Accordion · FAQ pattern">
      <div className="overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-divider)]">
        {items.map((it, i) => (
          <div
            key={i}
            className={`border-b border-[var(--color-divider)] last:border-b-0 ${
              open === i ? "bg-[var(--color-surface)]" : "bg-white"
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
            >
              <span>{it.q}</span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-blue)] text-white transition-transform duration-200 ${
                  open === i ? "rotate-180" : ""
                }`}
              >
                <ChevronDown size={14} />
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-[14px] leading-6 text-[var(--color-ink-soft)]">
                {it.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── 5. Badges / chips / status pills ─────────────────────────────── */

function BadgesBlock() {
  return (
    <Card title="Badges · chips · status pills">
      <div className="flex flex-wrap gap-2">
        <Badge tone="navy">Premium</Badge>
        <Badge tone="yellow">New</Badge>
        <Badge tone="green">Cleared</Badge>
        <Badge tone="blue">Info</Badge>
        <Badge tone="maroon">Wealth</Badge>
        <Badge tone="orange">Pending</Badge>
        <Badge tone="error">Failed</Badge>
        <Badge tone="ghost">Draft</Badge>
        <Badge tone="navy" dot>FDIC Insured</Badge>
        <Badge tone="green" dot>On track</Badge>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {[
          "Personal",
          "Business",
          "Commercial",
          "Wealth",
          "International",
        ].map((c) => (
          <span
            key={c}
            className="inline-flex cursor-pointer rounded-[var(--radius-pill)] border border-[var(--color-divider)] bg-white px-3 py-1 text-[12px] font-medium text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-brand-navy)] hover:text-[var(--color-brand-navy)]"
          >
            {c}
          </span>
        ))}
      </div>
    </Card>
  );
}

function Badge({
  tone,
  children,
  dot,
}: {
  tone: "navy" | "yellow" | "green" | "blue" | "maroon" | "orange" | "error" | "ghost";
  children: React.ReactNode;
  dot?: boolean;
}) {
  const styles: Record<string, string> = {
    navy: "bg-[var(--color-brand-navy)] text-white",
    yellow: "bg-[var(--color-brand-yellow)] text-[var(--color-brand-navy)]",
    green: "bg-[var(--color-accent-green)]/15 text-[var(--color-accent-green)] border border-[var(--color-accent-green)]/30",
    blue: "bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] border border-[var(--color-accent-blue)]/30",
    maroon: "bg-[var(--color-accent-maroon)]/10 text-[var(--color-accent-maroon)] border border-[var(--color-accent-maroon)]/30",
    orange: "bg-[var(--color-accent-orange)]/10 text-[var(--color-accent-orange)] border border-[var(--color-accent-orange)]/30",
    error: "bg-[var(--color-accent-error-tint)] text-[var(--color-accent-error)] border border-[var(--color-accent-error)]/30",
    ghost: "bg-[var(--color-surface)] text-[var(--color-ink-soft)] border border-[var(--color-divider)]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-3 py-1 text-[12px] font-semibold ${styles[tone]}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/* ─── 6. Alerts / banners ───────────────────────────────────────────── */

function AlertsBlock() {
  return (
    <Card title="Alerts · banner messages">
      <div className="space-y-3">
        <Alert
          tone="info"
          icon={<Info size={18} />}
          title="Scheduled maintenance"
          body="Valley Mobile Banking will be down for ~10 min on Sunday at 2 AM ET for system upgrades."
        />
        <Alert
          tone="success"
          icon={<CheckCircle size={18} />}
          title="Transfer complete"
          body="$1,250.00 sent to Maya Chen — Personal Checking ****8812. Confirmation #VL-2026-44218."
        />
        <Alert
          tone="warning"
          icon={<AlertTriangle size={18} />}
          title="Low balance"
          body="Your Personal Checking is below $250. Consider transferring from Savings to avoid overdraft fees."
        />
        <Alert
          tone="error"
          icon={<X size={18} />}
          title="Transaction failed"
          body="Your wire transfer to David Nakamura couldn't be processed. Routing number doesn't match an active bank. Try again or contact support."
        />
      </div>
    </Card>
  );
}

function Alert({
  tone,
  icon,
  title,
  body,
}: {
  tone: "info" | "success" | "warning" | "error";
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  const styles: Record<string, string> = {
    info: "border-l-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/5",
    success: "border-l-[var(--color-accent-green)] bg-[var(--color-accent-green)]/5",
    warning: "border-l-[var(--color-brand-yellow)] bg-[#fefae8]",
    error: "border-l-[var(--color-accent-error)] bg-[var(--color-accent-error-tint)]",
  };
  const iconColor: Record<string, string> = {
    info: "text-[var(--color-accent-blue)]",
    success: "text-[var(--color-accent-green)]",
    warning: "text-[var(--color-brand-yellow-dark)]",
    error: "text-[var(--color-accent-error)]",
  };
  return (
    <div
      className={`flex gap-3 rounded-[var(--radius-surface)] border border-[var(--color-divider)] border-l-4 p-4 ${styles[tone]}`}
    >
      <span className={`mt-0.5 ${iconColor[tone]}`}>{icon}</span>
      <div>
        <div className="text-[14px] font-semibold text-[var(--color-ink)]">
          {title}
        </div>
        <div className="mt-0.5 text-[13px] leading-5 text-[var(--color-ink-soft)]">
          {body}
        </div>
      </div>
    </div>
  );
}

/* ─── 7. Cards — product card (yellow signature) + article teaser ───── */

function CardsBlock() {
  return (
    <Card title="Cards · product · article · sign-in tile">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Product card — captured bg = yellow */}
        <div className="flex flex-col rounded-[var(--radius-card)] bg-[var(--color-brand-yellow)] p-6">
          <div className="vb-eyebrow text-[var(--color-brand-navy)]/70">
            Personal · Checking
          </div>
          <h4 className="mt-2 font-display text-[24px] font-light leading-[28px] text-[var(--color-brand-navy)]"
              style={{ fontFamily: "var(--font-display)" }}>
            Premier Checking
          </h4>
          <p className="mt-2 text-[13px] leading-5 text-[var(--color-brand-navy)]/80">
            Earn 0.10% APY on balances over $10K. No monthly fees with direct deposit.
          </p>
          <button className="mt-auto vb-cta-primary !mt-6">
            Open account
          </button>
        </div>

        {/* Article / teaser */}
        <article className="flex flex-col rounded-[var(--radius-card)] border border-[var(--color-divider)] bg-white p-6 shadow-[var(--shadow-article)]">
          <div className="vb-eyebrow text-[var(--color-accent-blue)]">
            Insight · 3 min read
          </div>
          <h4 className="mt-2 font-display text-[22px] font-light leading-[28px] text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}>
            What to look for in a savings account
          </h4>
          <p className="mt-2 text-[13px] leading-5 text-[var(--color-ink-soft)]">
            Yield is just one signal. We walk through liquidity, FDIC coverage, and fee structures.
          </p>
          <a
            href="#"
            className="mt-auto inline-flex items-center gap-1 pt-4 text-[14px] font-semibold text-[var(--color-brand-navy)] hover:underline"
          >
            Read article →
          </a>
        </article>

        {/* Sign-in tile (captured signature) */}
        <div className="vb-tile flex flex-col">
          <div className="vb-eyebrow">Quick access</div>
          <div className="mt-2 text-[16px] font-semibold text-[var(--color-ink)]">
            Personal Sign in
          </div>
          <p className="mt-1 text-[12px] text-[var(--color-ink-soft)]">
            Online and Mobile Banking
          </p>
          <button className="mt-auto flex items-center justify-between gap-2 pt-6 text-[14px] font-semibold text-[var(--color-brand-navy)] hover:underline">
            Continue
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ─── 8. Tooltip + modal mocks ─────────────────────────────────────── */

function TooltipModalBlock() {
  return (
    <Card title="Tooltip · Modal">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Tooltip */}
        <div className="flex flex-col items-start gap-3">
          <span className="vb-eyebrow">Tooltip (captured: white bg, ink border)</span>
          <div className="relative">
            <button className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--color-divider)] bg-white px-3 py-1.5 text-[14px] font-medium text-[var(--color-ink)]">
              APY <Info size={13} className="text-[var(--color-ink-soft)]" />
            </button>
            <div className="absolute left-1/2 top-full mt-2 w-[260px] -translate-x-1/2 rounded-[var(--radius-control)] border border-[var(--color-ink)] bg-white p-3 text-[12px] leading-5 text-[var(--color-ink)] shadow-[var(--shadow-card)]">
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-[var(--color-ink)] bg-white" />
              Annual Percentage Yield — what your savings actually earn over a year, including compounding.
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="flex flex-col gap-3">
          <span className="vb-eyebrow">Modal · confirm dialog</span>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-divider)] bg-white shadow-[var(--shadow-elevated)]">
            <div className="flex items-center justify-between border-b border-[var(--color-divider)] px-5 py-4">
              <h4 className="text-[16px] font-semibold text-[var(--color-ink)]">
                Confirm transfer
              </h4>
              <button className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                <X size={16} />
              </button>
            </div>
            <div className="px-5 py-4 text-[13px] leading-5 text-[var(--color-ink-soft)]">
              You're transferring{" "}
              <strong className="text-[var(--color-ink)]">$1,250.00</strong> from
              Personal Checking ****4421 to Maya Chen's account at Wells Fargo.
            </div>
            <div className="flex justify-end gap-2 border-t border-[var(--color-divider)] bg-[var(--color-surface-soft)] px-5 py-3">
              <button className="rounded-[var(--radius-pill)] px-4 py-1.5 text-[14px] font-semibold text-[var(--color-ink-soft)] hover:text-[var(--color-brand-navy)]">
                Cancel
              </button>
              <button className="vb-cta-primary">Confirm transfer</button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ─── 9. Pagination ─────────────────────────────────────────────────── */

function PaginationBlock() {
  const [page, setPage] = useState(3);
  const pages = [1, 2, 3, 4, 5];
  return (
    <Card title="Pagination">
      <div className="flex items-center gap-1">
        <PageButton onClick={() => setPage(Math.max(1, page - 1))}>
          ‹ Prev
        </PageButton>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`h-9 w-9 rounded-[var(--radius-surface)] text-[14px] font-semibold transition-colors ${
              p === page
                ? "bg-[var(--color-brand-navy)] text-white"
                : "text-[var(--color-ink-soft)] hover:bg-[var(--color-surface)] hover:text-[var(--color-brand-navy)]"
            }`}
          >
            {p}
          </button>
        ))}
        <span className="px-2 text-[var(--color-ink-soft)]">…</span>
        <PageButton onClick={() => setPage(p => p + 1)}>Next ›</PageButton>
      </div>
      <p className="mt-3 text-[12px] text-[var(--color-ink-soft)]">
        Showing transactions {(page - 1) * 25 + 1}–{page * 25} of 312
      </p>
    </Card>
  );
}

function PageButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-[var(--radius-surface)] px-3 py-1.5 text-[13px] font-medium text-[var(--color-brand-navy)] hover:bg-[var(--color-surface)]"
    >
      {children}
    </button>
  );
}

/* ─── Card wrapper ──────────────────────────────────────────────────── */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6">
      <h3 className="mb-5 text-[var(--color-ink)]">{title}</h3>
      {children}
    </div>
  );
}
