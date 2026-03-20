"use client";

import { Activity, BadgeIndianRupee, ShieldCheck, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AuthGuard } from "@/components/auth-guard";
import { Card } from "@/components/card";
import { PageTransition } from "@/components/page-transition";
import { StatCard } from "@/components/stat-card";
import { useAppContext } from "@/context/app-context";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminPage() {
  const { metrics, session, user } = useAppContext();

  return (
    <PageTransition>
      <AuthGuard allow="admin">
        <AppShell
          eyebrow="Admin"
          title="Operations Control Center"
          description="A demo admin panel for reviewing active workers, disruption exposure, and automated payout health across the platform."
        >
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Active Workers" value={128} icon={Users} />
            <StatCard label="High Risk Regions" value={4} icon={Activity} tone="danger" />
            <StatCard label="Today's Payouts" value={18450} prefix="₹" icon={BadgeIndianRupee} tone="success" />
            <StatCard label="Coverage Health" value={97} suffix="%" icon={ShieldCheck} />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <Card>
              <p className="text-sm text-slate-400">Current worker snapshot</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{user.name}</h2>
              <p className="mt-2 text-sm text-slate-400">Platform: {user.platform}</p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  Estimated payout exposure: <span className="font-semibold text-emerald-300">{formatCurrency(metrics.payout)}</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  Lost working hours tracked: <span className="font-semibold text-white">{metrics.lostHours} hrs</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  Current admin session: <span className="font-semibold text-cyan-200">{session.email}</span>
                </div>
              </div>
            </Card>

            <Card>
              <p className="text-sm text-slate-400">Claim system status</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-100">
                  Auto-claim engine: Healthy
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-cyan-100">
                  Policy coverage ratio: {metrics.coveragePercent}%
                </div>
                <div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4 text-violet-100">
                  Weekly premium benchmark: {formatCurrency(metrics.premium)}
                </div>
              </div>
            </Card>
          </section>
        </AppShell>
      </AuthGuard>
    </PageTransition>
  );
}
