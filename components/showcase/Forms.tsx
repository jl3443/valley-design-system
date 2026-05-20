/**
 * Forms — input / select / checkbox / radio / textarea / search
 *
 * Two captured form treatments:
 *   default: white bg, ink-soft border, blue focus, ink text
 *   navy:    cream bg on active, slate border, YELLOW focus border (interesting)
 *
 * Token anchors (all from captured --vbk-input-* and --vbk-checkbox-* and --vbk-radio-*):
 *   input border:     #5c646c
 *   input focus:      #0042a5 border, #f2f3f4 bg
 *   input error:      #b8232f border, #feefeb bg
 *   input navy active: #fefae8 (cream)
 *   input navy focus:  #f3d01c (yellow!) border
 *   checkbox bg:      #e6eaed
 *   checkbox border:  #0042a5
 *   radio bg:         #e6eaed, slate rb border #788995
 */
"use client";

import { useState } from "react";
import { Search, Eye, Calendar, ChevronDown } from "lucide-react";

export function FormsShowcase() {
  const [navyValue, setNavyValue] = useState("Maya Chen");
  const [errorValue, setErrorValue] = useState("not-an-email");
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("checking");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* DEFAULT INPUT — all states */}
      <Card title="Text input · default treatment">
        <Field label="Idle">
          <input
            type="text"
            placeholder="First name"
            className="vb-input vb-input-default"
          />
        </Field>
        <Field label="Focused (captured: #0042a5 border, #f2f3f4 bg)">
          <input
            type="text"
            defaultValue="David Nakamura"
            autoFocus
            className="vb-input vb-input-default"
          />
        </Field>
        <Field label="Error (#b8232f border, #feefeb bg)" error="Enter a valid email">
          <input
            type="email"
            value={errorValue}
            onChange={(e) => setErrorValue(e.target.value)}
            className="vb-input vb-input-default vb-input-error"
          />
        </Field>
        <Field label="Read-only">
          <input
            type="text"
            value="Account ****4421"
            readOnly
            className="vb-input vb-input-default vb-input-ro"
          />
        </Field>
        <Field label="Disabled">
          <input
            type="text"
            value="Not editable"
            disabled
            className="vb-input vb-input-default"
          />
        </Field>
      </Card>

      {/* NAVY INPUT — captured second treatment */}
      <Card title="Text input · navy treatment">
        <p className="mb-4 text-[12px] italic text-[var(--color-ink-soft)]">
          Captured second variant — focus border flips to yellow on cream
          background (--vbk-input-navy-focus-border-color = #f3d01c).
        </p>
        <Field label="Idle (navy variant)">
          <input
            type="text"
            placeholder="Account holder name"
            className="vb-input vb-input-navy"
          />
        </Field>
        <Field label="Active / typed (cream bg)">
          <input
            type="text"
            value={navyValue}
            onChange={(e) => setNavyValue(e.target.value)}
            className="vb-input vb-input-navy is-active"
          />
        </Field>
        <Field label="Focus (yellow border)">
          <input
            type="text"
            defaultValue="Secure transfer notes"
            className="vb-input vb-input-navy is-focus"
          />
        </Field>
      </Card>

      {/* SELECTS + DROPDOWN */}
      <Card title="Select / Dropdown">
        <Field label="Idle">
          <div className="vb-select">
            <span>Choose an account type</span>
            <ChevronDown size={16} />
          </div>
        </Field>
        <Field label="Selected">
          <div className="vb-select is-selected">
            <span>Personal Checking ****4421</span>
            <ChevronDown size={16} />
          </div>
        </Field>
        <Field label="Open (options panel)">
          <div className="vb-select is-open">
            <span>Personal Checking ****4421</span>
            <ChevronDown size={16} className="rotate-180" />
          </div>
          <div className="mt-1 overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-ink-soft)] bg-white shadow-[var(--shadow-elevated)]">
            {[
              "Personal Checking ****4421",
              "High-Yield Savings ****8812",
              "Premium Credit ****9914",
              "Loan ****3320",
            ].map((opt, i) => (
              <div
                key={opt}
                className={`px-4 py-2.5 text-[14px] ${
                  i === 0
                    ? "bg-[var(--color-surface)] text-[var(--color-brand-navy)]"
                    : "text-[var(--color-ink)]"
                } hover:bg-[var(--color-surface)] cursor-pointer`}
              >
                {opt}
              </div>
            ))}
          </div>
        </Field>
      </Card>

      {/* CHECKBOXES + RADIOS */}
      <Card title="Checkbox · Radio">
        <Field label="Checkboxes (captured: bg=#e6eaed, border=#0042a5)">
          <div className="space-y-2">
            <ValleyCheckbox
              checked={checked}
              onChange={setChecked}
              label="I agree to the terms of service"
            />
            <ValleyCheckbox
              checked={false}
              onChange={() => {}}
              label="Send me promotional emails"
            />
            <ValleyCheckbox
              checked={false}
              onChange={() => {}}
              label="Disabled option"
              disabled
            />
          </div>
        </Field>
        <Field label="Radios (captured: bg=#e6eaed, rb-border=#788995)">
          <div className="space-y-2">
            {[
              { v: "checking", label: "Personal Checking · 0.10% APY" },
              { v: "savings", label: "High-Yield Savings · 4.25% APY" },
              { v: "money-market", label: "Money Market · 4.50% APY" },
            ].map((r) => (
              <ValleyRadio
                key={r.v}
                name="account-pick"
                value={r.v}
                selected={radio === r.v}
                onChange={setRadio}
                label={r.label}
              />
            ))}
          </div>
        </Field>
      </Card>

      {/* SEARCH + TEXTAREA + DATE */}
      <Card title="Specialized inputs" className="lg:col-span-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Field label="Search">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
              />
              <input
                type="search"
                placeholder="Search Valley.com"
                className="vb-input vb-input-default pl-9"
              />
            </div>
          </Field>
          <Field label="Date">
            <div className="relative">
              <Calendar
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
              />
              <input
                type="date"
                defaultValue="2026-05-21"
                className="vb-input vb-input-default pr-9"
              />
            </div>
          </Field>
          <Field label="Password (captured eye icon)">
            <div className="relative">
              <Eye
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)] cursor-pointer hover:text-[var(--color-brand-navy)]"
              />
              <input
                type="password"
                defaultValue="••••••••••"
                className="vb-input vb-input-default pr-9"
              />
            </div>
          </Field>
        </div>
        <Field label="Textarea" className="mt-6">
          <textarea
            rows={4}
            placeholder="Add a note for your transfer"
            className="vb-input vb-input-default resize-none"
          />
        </Field>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function Card({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6 ${className}`}
    >
      <h3 className="mb-4 text-[var(--color-ink)]">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="mb-1.5 block text-[12px] font-medium text-[var(--color-ink-soft)]">
        {label}
      </label>
      {children}
      {error && (
        <div className="mt-1 text-[12px] text-[var(--color-accent-error)]">
          {error}
        </div>
      )}
    </div>
  );
}

function ValleyCheckbox({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2.5 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-[var(--radius-input)] border ${
          checked
            ? "bg-[var(--color-accent-blue)] border-[var(--color-accent-blue)]"
            : "bg-[var(--color-brand-light-navy)] border-[var(--color-accent-blue)]"
        }`}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6.5l2.5 2.5L10 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-[14px] text-[var(--color-ink)]">{label}</span>
    </label>
  );
}

function ValleyRadio({
  name,
  value,
  selected,
  onChange,
  label,
}: {
  name: string;
  value: string;
  selected: boolean;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          selected
            ? "bg-[var(--color-brand-light-navy)] border-[var(--color-accent-blue)]"
            : "bg-[var(--color-brand-light-navy)] border-[var(--color-brand-slate)]"
        }`}
      >
        {selected && (
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-blue)]" />
        )}
      </span>
      <input
        type="radio"
        className="sr-only"
        name={name}
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
      />
      <span className="text-[14px] text-[var(--color-ink)]">{label}</span>
    </label>
  );
}
