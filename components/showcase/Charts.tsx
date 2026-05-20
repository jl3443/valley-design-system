/**
 * Charts — hand-rolled SVG in Valley aesthetic (navy primary, yellow accent).
 *
 * Banking demo needs: balance line, spend bar, allocation donut, KPI sparkline,
 * transactions area, savings progress, heatmap, gauge.
 *
 * All charts use captured tokens — no rebranded D3 defaults. Hover affordances:
 * fill change on bar, point glow on line, segment expansion on donut.
 */
"use client";

import { useState } from "react";

export function ChartsShowcase() {
  return (
    <div className="space-y-12">
      {/* KPI tiles row */}
      <div>
        <h3 className="mb-4 text-[var(--color-ink)]">KPI tiles with sparklines</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiTile
            label="Total balance"
            value="$48,221.40"
            delta="+$1,820 · 3.9%"
            tone="up"
            data={[42, 43, 41, 44, 46, 45, 47, 48]}
          />
          <KpiTile
            label="This month's spend"
            value="$3,184.22"
            delta="−$642 · −16.8%"
            tone="down-good"
            data={[3500, 3800, 4100, 3900, 3700, 3500, 3400, 3184]}
          />
          <KpiTile
            label="Savings rate"
            value="22.4%"
            delta="+2.1pp"
            tone="up"
            data={[18, 19, 20, 19, 20, 21, 22, 22]}
          />
          <KpiTile
            label="Credit utilization"
            value="14%"
            delta="−6pp"
            tone="down-good"
            data={[28, 25, 22, 20, 18, 16, 15, 14]}
          />
        </div>
      </div>

      {/* Line / Area chart */}
      <Card title="Balance over time · area chart">
        <BalanceChart />
      </Card>

      {/* Bar chart */}
      <Card title="Spend by category · bar chart">
        <SpendByCategory />
      </Card>

      {/* Donut + legend */}
      <Card title="Portfolio allocation · donut">
        <AllocationDonut />
      </Card>

      {/* Progress + gauge */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Savings goal · progress bars">
          <GoalProgress />
        </Card>
        <Card title="Credit health · gauge">
          <CreditGauge />
        </Card>
      </div>

      {/* Heatmap */}
      <Card title="Transaction density · heatmap">
        <TransactionHeatmap />
      </Card>
    </div>
  );
}

/* ───────────────────── KPI Tile with sparkline ─────────────────────── */

function KpiTile({
  label,
  value,
  delta,
  tone,
  data,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "up" | "down-good" | "down-bad";
  data: number[];
}) {
  const deltaColor = {
    up: "text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10",
    "down-good": "text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10",
    "down-bad": "text-[var(--color-accent-error)] bg-[var(--color-accent-error-tint)]",
  }[tone];
  return (
    <div className="flex h-[180px] flex-col justify-between rounded-[var(--radius-card)] border border-[var(--color-divider)] bg-white p-5">
      <div>
        <div className="vb-eyebrow">{label}</div>
        <div
          className="mt-2 text-[28px] font-light leading-none text-[var(--color-brand-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {value}
        </div>
        <div
          className={`mt-2 inline-flex rounded-[var(--radius-pill)] px-2 py-0.5 text-[11px] font-semibold ${deltaColor}`}
        >
          {delta}
        </div>
      </div>
      <Sparkline data={data} />
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 200;
  const h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`
    )
    .join(" ");
  const lastX = w;
  const lastY = h - ((data[data.length - 1] - min) / range) * (h - 4) - 2;
  const areaPath = `M0,${h} L${points} L${w},${h} Z`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} className="text-[var(--color-brand-navy)]">
      <defs>
        <linearGradient id="spark-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-fade)" />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx={lastX} cy={lastY} r="3" fill="var(--color-brand-yellow)" stroke="var(--color-brand-navy)" strokeWidth="1.5" />
    </svg>
  );
}

/* ───────────────────── Balance over time · area chart ───────────────── */

function BalanceChart() {
  const data = [
    { m: "Jan", v: 32400 },
    { m: "Feb", v: 34100 },
    { m: "Mar", v: 35200 },
    { m: "Apr", v: 33800 },
    { m: "May", v: 38600 },
    { m: "Jun", v: 41200 },
    { m: "Jul", v: 42800 },
    { m: "Aug", v: 44100 },
    { m: "Sep", v: 45900 },
    { m: "Oct", v: 46300 },
    { m: "Nov", v: 47800 },
    { m: "Dec", v: 48221 },
  ];
  const [hover, setHover] = useState<number | null>(null);
  const w = 720, h = 240, pad = { l: 50, r: 16, t: 16, b: 30 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const min = 28000;
  const max = 52000;
  const range = max - min;
  const x = (i: number) => pad.l + (i / (data.length - 1)) * innerW;
  const y = (v: number) => pad.t + (1 - (v - min) / range) * innerH;
  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.v)}`).join(" ");
  const areaPath = `${linePath} L ${x(data.length - 1)} ${pad.t + innerH} L ${x(0)} ${pad.t + innerH} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id="area-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-navy)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-brand-navy)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* y-axis grid */}
      {[30000, 35000, 40000, 45000, 50000].map((v) => (
        <g key={v}>
          <line
            x1={pad.l}
            x2={w - pad.r}
            y1={y(v)}
            y2={y(v)}
            stroke="var(--color-divider)"
            strokeDasharray="2 3"
          />
          <text
            x={pad.l - 8}
            y={y(v) + 3}
            textAnchor="end"
            className="fill-[var(--color-ink-soft)]"
            style={{ fontSize: "10px", fontFamily: "var(--font-prose)" }}
          >
            ${(v / 1000).toFixed(0)}k
          </text>
        </g>
      ))}
      {/* x labels */}
      {data.map((d, i) => (
        <text
          key={d.m}
          x={x(i)}
          y={h - 10}
          textAnchor="middle"
          className="fill-[var(--color-ink-soft)]"
          style={{ fontSize: "10px", fontFamily: "var(--font-prose)" }}
        >
          {d.m}
        </text>
      ))}
      {/* area */}
      <path d={areaPath} fill="url(#area-fade)" />
      <path d={linePath} fill="none" stroke="var(--color-brand-navy)" strokeWidth="2" />
      {/* points */}
      {data.map((d, i) => (
        <g
          key={i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          style={{ cursor: "pointer" }}
        >
          <rect
            x={x(i) - 20}
            y={pad.t}
            width="40"
            height={innerH}
            fill="transparent"
          />
          <circle
            cx={x(i)}
            cy={y(d.v)}
            r={hover === i ? 5 : 3}
            fill={hover === i ? "var(--color-brand-yellow)" : "white"}
            stroke="var(--color-brand-navy)"
            strokeWidth="2"
          />
        </g>
      ))}
      {hover !== null && (
        <g>
          <line
            x1={x(hover)}
            x2={x(hover)}
            y1={pad.t}
            y2={pad.t + innerH}
            stroke="var(--color-brand-navy)"
            strokeOpacity="0.2"
          />
          <g transform={`translate(${x(hover) + 8}, ${y(data[hover].v) - 18})`}>
            <rect
              width="92"
              height="36"
              rx="3"
              fill="var(--color-brand-navy)"
            />
            <text
              x="46"
              y="14"
              textAnchor="middle"
              fill="var(--color-brand-yellow)"
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1px", fontFamily: "var(--font-sans)" }}
            >
              {data[hover].m.toUpperCase()}
            </text>
            <text
              x="46"
              y="28"
              textAnchor="middle"
              fill="white"
              style={{ fontSize: "12px", fontWeight: 600, fontFamily: "var(--font-prose)" }}
            >
              ${data[hover].v.toLocaleString()}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}

/* ───────────────────── Spend by category · bar chart ────────────────── */

function SpendByCategory() {
  const data = [
    { cat: "Housing", v: 1450, color: "var(--color-brand-navy)" },
    { cat: "Food", v: 612, color: "var(--color-accent-blue)" },
    { cat: "Transport", v: 388, color: "var(--color-accent-green)" },
    { cat: "Entertainment", v: 245, color: "var(--color-brand-yellow-dark)" },
    { cat: "Utilities", v: 220, color: "var(--color-accent-maroon)" },
    { cat: "Shopping", v: 178, color: "var(--color-accent-orange)" },
    { cat: "Health", v: 92, color: "var(--color-brand-slate)" },
  ];
  const max = Math.max(...data.map((d) => d.v));
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div
          key={d.cat}
          className="grid grid-cols-[120px_1fr_90px] items-center gap-3 group cursor-pointer"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
        >
          <span
            className={`text-[13px] font-medium transition-colors ${
              hover === i ? "text-[var(--color-brand-navy)]" : "text-[var(--color-ink-soft)]"
            }`}
          >
            {d.cat}
          </span>
          <div className="h-6 rounded-[var(--radius-input)] bg-[var(--color-surface)]">
            <div
              className="h-full rounded-[var(--radius-input)] transition-all duration-200"
              style={{
                width: `${(d.v / max) * 100}%`,
                background: d.color,
                opacity: hover === null || hover === i ? 1 : 0.4,
              }}
            />
          </div>
          <span
            className={`text-right font-mono text-[13px] tabular-nums transition-colors ${
              hover === i ? "text-[var(--color-brand-navy)] font-semibold" : "text-[var(--color-ink)]"
            }`}
          >
            ${d.v.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────── Portfolio allocation · donut ─────────────────── */

function AllocationDonut() {
  const segments = [
    { label: "US Equity",   v: 42, color: "var(--color-brand-navy)" },
    { label: "International", v: 22, color: "var(--color-accent-blue)" },
    { label: "Bonds",        v: 18, color: "var(--color-accent-green)" },
    { label: "Real Estate",  v: 10, color: "var(--color-brand-yellow-dark)" },
    { label: "Cash",         v:  8, color: "var(--color-brand-slate)" },
  ];
  const total = segments.reduce((a, b) => a + b.v, 0);
  const cx = 100, cy = 100, r = 80, strokeW = 24;
  const circ = 2 * Math.PI * r;
  let cumPct = 0;
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
      <svg viewBox="0 0 200 200" className="mx-auto h-[240px] w-[240px]">
        {segments.map((seg, i) => {
          const pct = seg.v / total;
          const dash = pct * circ;
          const offset = -cumPct * circ;
          const elem = (
            <circle
              key={seg.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={hover === i ? strokeW + 6 : strokeW}
              strokeDasharray={`${dash} ${circ}`}
              strokeDashoffset={offset}
              transform="rotate(-90 100 100)"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer", transition: "stroke-width 150ms ease" }}
              opacity={hover === null || hover === i ? 1 : 0.4}
            />
          );
          cumPct += pct;
          return elem;
        })}
        <text
          x="100"
          y="92"
          textAnchor="middle"
          style={{ fontSize: "10px", fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "1px" }}
          fill="var(--color-ink-soft)"
        >
          {hover !== null ? segments[hover].label.toUpperCase() : "TOTAL"}
        </text>
        <text
          x="100"
          y="116"
          textAnchor="middle"
          style={{ fontSize: "24px", fontFamily: "var(--font-display)", fontWeight: 300 }}
          fill="var(--color-brand-navy)"
        >
          {hover !== null ? `${segments[hover].v}%` : `$248K`}
        </text>
      </svg>
      <div className="space-y-2">
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`flex cursor-pointer items-center justify-between rounded-[var(--radius-input)] px-3 py-2 transition-colors ${
              hover === i ? "bg-[var(--color-surface)]" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: seg.color }}
              />
              <span className="text-[13px] text-[var(--color-ink)]">{seg.label}</span>
            </div>
            <span className="font-mono text-[13px] tabular-nums text-[var(--color-ink-soft)]">
              {seg.v}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── Savings goals · progress bars ────────────────── */

function GoalProgress() {
  const goals = [
    { name: "Emergency fund · $20K", current: 16400, target: 20000, color: "var(--color-accent-green)" },
    { name: "Vacation · $5K",         current:  3200, target:  5000, color: "var(--color-brand-yellow-dark)" },
    { name: "Home down payment",      current: 48500, target: 90000, color: "var(--color-brand-navy)" },
  ];
  return (
    <div className="space-y-5">
      {goals.map((g) => {
        const pct = (g.current / g.target) * 100;
        return (
          <div key={g.name}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-[13px] font-medium text-[var(--color-ink)]">
                {g.name}
              </span>
              <span className="font-mono text-[12px] text-[var(--color-ink-soft)]">
                ${g.current.toLocaleString()} / ${g.target.toLocaleString()} · {pct.toFixed(0)}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-[var(--radius-pill)] bg-[var(--color-surface)]">
              <div
                className="h-full rounded-[var(--radius-pill)] transition-all duration-500"
                style={{ width: `${pct}%`, background: g.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ───────────────────── Credit health gauge ─────────────────────────── */

function CreditGauge() {
  const score = 782;
  const min = 300, max = 850;
  const pct = (score - min) / (max - min);
  const angle = -90 + pct * 180; // semicircle
  const r = 80;
  const cx = 100, cy = 100;
  const endX = cx + r * Math.cos((angle * Math.PI) / 180);
  const endY = cy + r * Math.sin((angle * Math.PI) / 180);
  const arc = pct > 0.5 ? 1 : 0;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 130" className="w-[280px]">
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="var(--color-surface)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 ${arc} 1 ${endX} ${endY}`}
          fill="none"
          stroke="var(--color-accent-green)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {[300, 580, 670, 740, 800, 850].map((v, i) => {
          const p = (v - min) / (max - min);
          const a = -90 + p * 180;
          const tx = cx + (r + 12) * Math.cos((a * Math.PI) / 180);
          const ty = cy + (r + 12) * Math.sin((a * Math.PI) / 180);
          return (
            <text
              key={i}
              x={tx}
              y={ty + 3}
              textAnchor="middle"
              style={{ fontSize: "9px", fontFamily: "var(--font-prose)" }}
              fill="var(--color-ink-soft)"
            >
              {v}
            </text>
          );
        })}
        <text
          x="100"
          y="80"
          textAnchor="middle"
          style={{ fontSize: "36px", fontFamily: "var(--font-display)", fontWeight: 300 }}
          fill="var(--color-brand-navy)"
        >
          {score}
        </text>
        <text
          x="100"
          y="100"
          textAnchor="middle"
          style={{ fontSize: "10px", fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "1.4px" }}
          fill="var(--color-ink-soft)"
        >
          EXCELLENT
        </text>
      </svg>
      <p className="mt-3 max-w-[260px] text-center text-[12px] leading-5 text-[var(--color-ink-soft)]">
        Updated 2 days ago · TransUnion VantageScore 4.0
      </p>
    </div>
  );
}

/* ───────────────────── Transaction heatmap ─────────────────────────── */

function TransactionHeatmap() {
  // 7 days × 24 hours, value = transactions per hour
  const seed = (d: number, h: number) => {
    // emulate banking hours: more 9-5 weekdays, less weekends
    const weekday = d < 5;
    const businessHours = h >= 9 && h <= 17;
    if (weekday && businessHours) return Math.floor(8 + Math.random() * 10);
    if (weekday) return Math.floor(2 + Math.random() * 4);
    if (businessHours) return Math.floor(3 + Math.random() * 5);
    return Math.floor(Math.random() * 2);
  };
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const grid = days.map((_, d) => Array.from({ length: 24 }, (_, h) => seed(d, h)));
  const max = Math.max(...grid.flat());
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-[2px]">
          <thead>
            <tr>
              <th className="w-12"></th>
              {Array.from({ length: 24 }, (_, h) => (
                <th
                  key={h}
                  className="text-[9px] font-normal text-[var(--color-ink-soft)]"
                  style={{ fontFamily: "var(--font-prose)" }}
                >
                  {h % 6 === 0 ? `${h}:00` : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, d) => (
              <tr key={day}>
                <td
                  className="pr-3 text-right text-[11px] text-[var(--color-ink-soft)]"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}
                >
                  {day}
                </td>
                {grid[d].map((v, h) => {
                  const intensity = v / max;
                  return (
                    <td
                      key={h}
                      className="aspect-square min-w-[18px] rounded-[2px]"
                      style={{
                        background:
                          intensity === 0
                            ? "var(--color-surface)"
                            : `rgba(0, 44, 78, ${0.15 + intensity * 0.85})`,
                      }}
                      title={`${day} ${h}:00 — ${v} transactions`}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11px] text-[var(--color-ink-soft)]">
        <span>Less</span>
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-[2px]"
            style={{ background: `rgba(0, 44, 78, ${i})` }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

/* ───────────────────── Card wrapper ─────────────────────────────────── */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-surface)] border border-[var(--color-divider)] bg-white p-6">
      <h3 className="mb-5 text-[var(--color-ink)]">{title}</h3>
      {children}
    </div>
  );
}
