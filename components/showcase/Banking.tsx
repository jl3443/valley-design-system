/**
 * Banking demo patterns — account card, transaction row, balance hero,
 * transfer flow card, statement table, branch locator.
 *
 * These are demo-side primitives Valley.com doesn't render but a real
 * banking demo will need. All composed from already-captured tokens
 * (no new colors invented).
 */
"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Coffee,
  Car,
  Home,
  Zap,
  Tv,
  CreditCard,
  Banknote,
  PiggyBank,
  TrendingUp,
  MapPin,
  Clock,
} from "lucide-react";

export function BankingShowcase() {
  return (
    <div className="space-y-12">
      <BalanceHero />
      <AccountCards />
      <TransactionsTable />
      <TransferCard />
      <StatementsRow />
      <BranchLocator />
    </div>
  );
}

/* ───────────────────── Balance hero ─────────────────────────────────── */

function BalanceHero() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-brand-navy)] text-white">
      <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3">
        <div>
          <div className="vb-eyebrow text-[var(--color-brand-yellow)]">
            Personal Checking · ****4421
          </div>
          <div
            className="mt-3 text-[44px] font-light leading-none text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            $48,221.40
          </div>
          <div className="mt-2 text-[13px] text-white/70">
            Available · last updated 2 min ago
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <MiniStat label="Income (Nov)" value="$8,420.00" delta="+12%" />
          <MiniStat label="Spending (Nov)" value="$3,184.22" delta="−17%" />
          <MiniStat label="Pending" value="$240.00" delta="2 items" muted />
          <MiniStat label="APY earned" value="$84.21" delta="YTD" muted />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 border-t border-white/10 bg-[var(--color-brand-navy-deep)] px-8 py-4">
        <PrimaryAction icon={<ArrowUpRight size={16} />} label="Send money" />
        <PrimaryAction icon={<ArrowDownLeft size={16} />} label="Deposit" />
        <PrimaryAction icon={<CreditCard size={16} />} label="Pay loan" />
        <PrimaryAction icon={<PiggyBank size={16} />} label="Transfer" />
        <PrimaryAction icon={<TrendingUp size={16} />} label="Invest" />
      </div>
    </div>
  );
}

function MiniStat({ label, value, delta, muted = false }: { label: string; value: string; delta: string; muted?: boolean }) {
  return (
    <div className="rounded-[var(--radius-surface)] border border-white/10 bg-white/5 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[1.4px] text-white/60">
        {label}
      </div>
      <div className="mt-1 text-[20px] font-semibold text-white">{value}</div>
      <div
        className={`mt-0.5 text-[11px] ${
          muted ? "text-white/50" : "text-[var(--color-brand-yellow)]"
        }`}
      >
        {delta}
      </div>
    </div>
  );
}

function PrimaryAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-white/20 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white transition-all hover:border-[var(--color-brand-yellow)] hover:bg-[var(--color-brand-yellow)] hover:text-[var(--color-brand-navy)]">
      {icon}
      {label}
    </button>
  );
}

/* ───────────────────── Account cards ────────────────────────────────── */

function AccountCards() {
  const accounts = [
    {
      name: "Personal Checking",
      mask: "****4421",
      balance: "48,221.40",
      type: "checking",
      apy: "0.10%",
      tone: "navy",
    },
    {
      name: "High-Yield Savings",
      mask: "****8812",
      balance: "84,500.00",
      type: "savings",
      apy: "4.25%",
      tone: "green",
    },
    {
      name: "Premium Rewards Card",
      mask: "****9914",
      balance: "1,240.55",
      type: "credit",
      apy: "16.99% APR",
      tone: "maroon",
    },
    {
      name: "Auto Loan",
      mask: "****3320",
      balance: "12,840.00",
      type: "loan",
      apy: "5.49% APR",
      tone: "slate",
    },
  ];
  const toneStyles: Record<string, { border: string; eyebrow: string }> = {
    navy: { border: "border-l-[var(--color-brand-navy)]", eyebrow: "text-[var(--color-brand-navy)]" },
    green: { border: "border-l-[var(--color-accent-green)]", eyebrow: "text-[var(--color-accent-green)]" },
    maroon: { border: "border-l-[var(--color-accent-maroon)]", eyebrow: "text-[var(--color-accent-maroon)]" },
    slate: { border: "border-l-[var(--color-brand-slate)]", eyebrow: "text-[var(--color-brand-slate)]" },
  };
  return (
    <div>
      <h3 className="mb-4 text-[var(--color-ink)]">Your accounts</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {accounts.map((a) => (
          <div
            key={a.mask}
            className={`group flex h-[200px] cursor-pointer flex-col justify-between rounded-[var(--radius-card)] border border-[var(--color-divider)] border-l-[6px] bg-white p-5 transition-all hover:shadow-[var(--shadow-card)] ${toneStyles[a.tone].border}`}
          >
            <div>
              <div className={`vb-eyebrow ${toneStyles[a.tone].eyebrow}`}>
                {a.type.toUpperCase()}
              </div>
              <div className="mt-1.5 text-[15px] font-semibold text-[var(--color-ink)]">
                {a.name}
              </div>
              <div className="text-[12px] text-[var(--color-ink-soft)]">{a.mask}</div>
            </div>
            <div>
              <div
                className="text-[28px] font-light leading-none text-[var(--color-brand-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ${a.balance}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-[var(--color-ink-soft)]">
                  {a.apy}
                </span>
                <span className="text-[12px] font-semibold text-[var(--color-brand-navy)] opacity-0 transition-opacity group-hover:opacity-100">
                  View →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── Transactions table ───────────────────────────── */

function TransactionsTable() {
  const txns = [
    { date: "Nov 18", merchant: "Whole Foods Market", category: "Food", amount: -84.22, icon: ShoppingBag, status: "Posted" },
    { date: "Nov 17", merchant: "Maya Chen", category: "Transfer", amount: -1250.00, icon: ArrowUpRight, status: "Posted" },
    { date: "Nov 17", merchant: "Bluebottle Coffee", category: "Food", amount: -8.40, icon: Coffee, status: "Posted" },
    { date: "Nov 16", merchant: "Direct deposit · ACME Corp", category: "Income", amount: 4210.00, icon: ArrowDownLeft, status: "Posted" },
    { date: "Nov 16", merchant: "Shell · Pump 4", category: "Transport", amount: -64.10, icon: Car, status: "Posted" },
    { date: "Nov 15", merchant: "Con Edison", category: "Utilities", amount: -184.20, icon: Zap, status: "Pending" },
    { date: "Nov 14", merchant: "Netflix", category: "Entertainment", amount: -22.99, icon: Tv, status: "Posted" },
    { date: "Nov 12", merchant: "Mortgage payment", category: "Housing", amount: -2840.00, icon: Home, status: "Posted" },
  ];
  return (
    <div className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white">
      <div className="flex items-center justify-between border-b border-[var(--color-divider)] px-6 py-4">
        <h3 className="text-[var(--color-ink)]">Recent activity</h3>
        <div className="flex items-center gap-2">
          <select className="vb-input vb-input-default !w-auto !py-1.5 text-[13px]">
            <option>Last 30 days</option>
            <option>This month</option>
            <option>Last 90 days</option>
            <option>Year to date</option>
          </select>
          <button className="rounded-[var(--radius-pill)] border border-[var(--color-divider)] bg-white px-3 py-1.5 text-[13px] font-semibold text-[var(--color-brand-navy)] hover:border-[var(--color-brand-navy)]">
            Export
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead className="border-b border-[var(--color-divider)] bg-[var(--color-surface-soft)]">
          <tr className="text-left text-[11px] uppercase tracking-[1.4px] text-[var(--color-ink-soft)]">
            <th className="px-6 py-3 font-semibold">Date</th>
            <th className="px-6 py-3 font-semibold">Merchant</th>
            <th className="px-6 py-3 font-semibold">Category</th>
            <th className="px-6 py-3 font-semibold">Status</th>
            <th className="px-6 py-3 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {txns.map((t, i) => {
            const Icon = t.icon;
            const isPos = t.amount > 0;
            return (
              <tr
                key={i}
                className="border-b border-[var(--color-divider)] last:border-b-0 hover:bg-[var(--color-surface-soft)]"
              >
                <td className="px-6 py-3 text-[13px] text-[var(--color-ink-soft)]">{t.date}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-brand-navy)]">
                      <Icon size={14} />
                    </span>
                    <span className="text-[14px] font-medium text-[var(--color-ink)]">{t.merchant}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-[13px] text-[var(--color-ink-soft)]">{t.category}</td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex rounded-[var(--radius-pill)] px-2.5 py-0.5 text-[11px] font-semibold ${
                      t.status === "Posted"
                        ? "bg-[var(--color-accent-green)]/15 text-[var(--color-accent-green)]"
                        : "bg-[var(--color-brand-yellow)]/30 text-[var(--color-brand-yellow-dark)]"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td
                  className={`px-6 py-3 text-right font-mono text-[14px] font-semibold tabular-nums ${
                    isPos ? "text-[var(--color-accent-green)]" : "text-[var(--color-ink)]"
                  }`}
                >
                  {isPos ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ───────────────────── Transfer card flow ───────────────────────────── */

function TransferCard() {
  const [from, setFrom] = useState("Personal Checking ****4421");
  const [to, setTo] = useState("Maya Chen");
  const [amount, setAmount] = useState("1,250.00");
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6">
        <div className="vb-eyebrow">Quick action</div>
        <h3 className="mt-1 text-[var(--color-ink)]">Send money</h3>
        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[var(--color-ink-soft)]">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="vb-input vb-input-default"
            >
              <option>Personal Checking ****4421</option>
              <option>High-Yield Savings ****8812</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[var(--color-ink-soft)]">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="vb-input vb-input-default"
            >
              <option>Maya Chen</option>
              <option>David Nakamura</option>
              <option>Add new recipient…</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[var(--color-ink-soft)]">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-semibold text-[var(--color-ink-soft)]">$</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="vb-input vb-input-navy is-active !pl-9 text-[22px] font-light"
                style={{ fontFamily: "var(--font-display)" }}
              />
            </div>
          </div>
          <button className="vb-cta-primary w-full justify-center">
            Review transfer
          </button>
        </div>
      </div>

      {/* Quick-pick row */}
      <div className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6">
        <div className="vb-eyebrow">Recent recipients</div>
        <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-4">
          {["Maya Chen", "David Nakamura", "Sarah Lee", "Mortgage", "Brian S.", "Mom", "Jenna R.", "Add"].map((n, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-1.5 rounded-[var(--radius-card)] p-3 transition-colors hover:bg-[var(--color-surface)]"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-semibold ${
                  n === "Add"
                    ? "border border-dashed border-[var(--color-brand-navy)] text-[var(--color-brand-navy)]"
                    : "bg-[var(--color-brand-navy)] text-white"
                }`}
              >
                {n === "Add" ? "+" : n.split(" ").map(s => s[0]).slice(0, 2).join("")}
              </span>
              <span className="truncate text-[11px] text-[var(--color-ink-soft)] w-full text-center">
                {n}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── Statements row ───────────────────────────────── */

function StatementsRow() {
  const months = ["November 2026", "October 2026", "September 2026", "August 2026", "July 2026", "June 2026"];
  return (
    <div className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[var(--color-ink)]">Statements</h3>
        <button className="text-[13px] font-semibold text-[var(--color-brand-navy)] hover:underline">
          View all →
        </button>
      </div>
      <div className="mt-4 divide-y divide-[var(--color-divider)]">
        {months.map((m) => (
          <div key={m} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-input)] bg-[var(--color-surface)] text-[var(--color-brand-navy)]">
                <Banknote size={16} />
              </span>
              <div>
                <div className="text-[14px] font-semibold text-[var(--color-ink)]">{m}</div>
                <div className="text-[12px] text-[var(--color-ink-soft)]">
                  Personal Checking · 1.2 MB · PDF
                </div>
              </div>
            </div>
            <button className="rounded-[var(--radius-pill)] border border-[var(--color-divider)] bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--color-brand-navy)] hover:border-[var(--color-brand-navy)]">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── Branch locator card ─────────────────────────── */

function BranchLocator() {
  const branches = [
    { name: "Wayne Hills", address: "1455 Valley Rd, Wayne NJ", distance: "0.8 mi", hours: "Open · until 5 PM" },
    { name: "Paterson Main", address: "1 Madison Ave, Paterson NJ", distance: "2.4 mi", hours: "Open · until 6 PM" },
    { name: "Garfield", address: "260 Belmont Ave, Garfield NJ", distance: "3.1 mi", hours: "Closed · opens 9 AM Mon" },
  ];
  return (
    <div className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[var(--color-ink)]">Nearby Branches & ATMs</h3>
        <a href="#" className="text-[13px] font-semibold text-[var(--color-brand-navy)] hover:underline">
          Open map →
        </a>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {branches.map((b) => (
          <div
            key={b.name}
            className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-divider)] bg-white p-4 transition-colors hover:border-[var(--color-brand-navy)]"
          >
            <div className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--color-brand-navy)]" />
              <div>
                <div className="text-[14px] font-semibold text-[var(--color-ink)]">{b.name}</div>
                <div className="text-[12px] text-[var(--color-ink-soft)]">{b.address}</div>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-[var(--color-divider)] pt-2 text-[11px]">
              <span className="font-semibold text-[var(--color-brand-navy)]">{b.distance}</span>
              <span className="flex items-center gap-1 text-[var(--color-ink-soft)]">
                <Clock size={11} /> {b.hours}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
