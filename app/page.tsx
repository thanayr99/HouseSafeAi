'use client';

import { startTransition, useState } from 'react';

type RiskLevel = 'Low' | 'High';

type DashboardState = {
  currentHours: number;
  risk: RiskLevel;
};

const defaultProfile = {
  name: 'Ravi',
  platform: 'Swiggy',
  normalHours: 10,
  hourlyIncome: 100,
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-panel backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        {label}
      </p>
      <p className={`mt-3 text-3xl font-semibold text-slate-950 ${accent ?? ''}`}>
        {value}
      </p>
    </div>
  );
}

export default function Home() {
  const [dashboard, setDashboard] = useState<DashboardState>({
    currentHours: defaultProfile.normalHours,
    risk: 'Low',
  });

  const lostHours = Math.max(defaultProfile.normalHours - dashboard.currentHours, 0);
  const loss = lostHours * defaultProfile.hourlyIncome;
  const payout = loss * 0.7;
  const hasEventBeenSimulated = dashboard.currentHours !== defaultProfile.normalHours;
  const riskStyles =
    dashboard.risk === 'High'
      ? 'border-red-200 bg-red-50 text-red-700'
      : 'border-emerald-200 bg-emerald-50 text-emerald-700';

  const simulateRainEvent = () => {
    startTransition(() => {
      setDashboard({
        currentHours: 3,
        risk: 'High',
      });
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#dbeafe_45%,_#f8fafc_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="relative overflow-hidden rounded-[32px] border border-white/60 bg-slate-950 px-6 py-8 text-white shadow-panel sm:px-8">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(125,211,252,0.28),_transparent_60%)] lg:block" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
                Income Protection
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                HourSafe AI - Income Protection Dashboard
              </h1>
              <p className="mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
                A clean operating view for gig workers to estimate lost hours,
                forecast compensation, and understand disruption risk quickly.
              </p>
            </div>

            <div
              className={`inline-flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-semibold ${riskStyles}`}
            >
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-current" />
              Risk Indicator: {dashboard.risk}
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-slate-200/80 bg-white/85 p-6 shadow-panel backdrop-blur sm:p-8">
            <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  User Card
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  {defaultProfile.name}
                </h2>
                <p className="mt-1 text-base text-slate-600">
                  Platform: {defaultProfile.platform}
                </p>
              </div>

              <button
                type="button"
                onClick={simulateRainEvent}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                Simulate Rain Event 🌧️
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <MetricCard
                label="Normal Working Hours"
                value={`${defaultProfile.normalHours} hrs`}
              />
              <MetricCard
                label="Current Working Hours"
                value={`${dashboard.currentHours} hrs`}
              />
              <MetricCard
                label="Hourly Income"
                value={formatCurrency(defaultProfile.hourlyIncome)}
              />
              <MetricCard
                label="Lost Hours"
                value={`${lostHours} hrs`}
                accent={lostHours > 0 ? 'text-red-600' : 'text-slate-950'}
              />
              <MetricCard
                label="Estimated Income Loss"
                value={formatCurrency(loss)}
                accent={loss > 0 ? 'text-amber-600' : 'text-slate-950'}
              />
              <MetricCard
                label="Estimated Payout"
                value={formatCurrency(payout)}
                accent={payout > 0 ? 'text-emerald-600' : 'text-slate-950'}
              />
            </div>
          </div>

          <aside className="rounded-[32px] border border-slate-200/80 bg-white/85 p-6 shadow-panel backdrop-blur sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Coverage Snapshot
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Income protection estimate
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              When working time drops because of weather disruption, HourSafe AI
              estimates income loss and applies a 70% payout ratio.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-sky-50 p-5">
                <p className="text-sm font-medium text-slate-500">Formula</p>
                <p className="mt-2 text-base font-semibold text-slate-950">
                  Payout = (Normal Hours - Current Hours) x Hourly Income x 0.7
                </p>
              </div>

              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-sm font-medium text-slate-300">
                  Current estimate
                </p>
                <p className="mt-3 text-4xl font-semibold">
                  {formatCurrency(payout)}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Based on {lostHours} lost hours at{' '}
                  {formatCurrency(defaultProfile.hourlyIncome)} per hour.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">
                  Event status
                </p>
                <p className="mt-2 text-base font-semibold text-slate-950">
                  {hasEventBeenSimulated
                    ? 'Rain disruption simulated. Protective payout updated.'
                    : 'Normal operating day. Simulate disruption to preview protection.'}
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
