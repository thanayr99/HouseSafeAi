"use client";

import { AppShell } from "@/components/app-shell";
import { AuthGuard } from "@/components/auth-guard";
import { Card } from "@/components/card";
import { PageTransition } from "@/components/page-transition";
import { useAppContext } from "@/context/app-context";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PolicyPage() {
  const { user, metrics, session } = useAppContext();

  return (
    <PageTransition>
      <AuthGuard allow={session.role === "admin" ? "admin" : "worker"}>
        <AppShell
          eyebrow="Policy"
          title="Coverage and Pricing"
          description="Clear protection terms for lost-hour insurance with transparent formulas, premium logic, and weekly cap guidance."
        >
          <section className="grid gap-4 md:grid-cols-3">
            <Card>
              <p className="text-sm text-slate-400">Weekly Premium</p>
              <p className="mt-4 text-3xl font-semibold text-white">{formatCurrency(metrics.premium)}</p>
            </Card>
            <Card>
              <p className="text-sm text-slate-400">Coverage %</p>
              <p className="mt-4 text-3xl font-semibold text-cyan-200">{metrics.coveragePercent}%</p>
            </Card>
            <Card>
              <p className="text-sm text-slate-400">Max Weekly Cap</p>
              <p className="mt-4 text-3xl font-semibold text-emerald-300">{formatCurrency(metrics.maxWeeklyCap)}</p>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <Card>
              <p className="text-sm text-slate-400">Policy formulas</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-200">
                  Lost Hours = Normal - Actual
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-200">
                  Loss = Lost Hours × Hourly Income
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-200">
                  Payout = Loss × 0.7
                </div>
              </div>
            </Card>

            <Card>
              <p className="text-sm text-slate-400">Premium logic</p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-cyan-500/10 p-5">
                <p className="text-sm text-slate-300">
                  premium = 20 + (0.5 × dailyIncome / 100)
                </p>
                <p className="mt-4 text-2xl font-semibold text-white">
                  20 + (0.5 × {user.dailyIncome} / 100) = <span className="text-cyan-200">{formatCurrency(metrics.premium)}</span>
                </p>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                Coverage is designed for frequent gig work with a 70% replacement
                ratio and a weekly cap sized to the user&apos;s earning profile.
              </p>
            </Card>
          </section>
        </AppShell>
      </AuthGuard>
    </PageTransition>
  );
}
