"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  Clock3,
  IndianRupee,
  Shield,
  UserCircle2,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AuthGuard } from "@/components/auth-guard";
import { Card } from "@/components/card";
import { ChartCard } from "@/components/chart-card";
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

export default function DashboardPage() {
  const { user, metrics } = useAppContext();

  const lineData = [
    { day: "Mon", hours: user.normalHours },
    { day: "Tue", hours: user.normalHours },
    { day: "Wed", hours: user.normalHours - 1 },
    { day: "Thu", hours: user.normalHours },
    { day: "Fri", hours: user.normalHours - 0.5 },
    { day: "Sat", hours: user.normalHours },
    { day: "Sun", hours: user.currentHours },
  ];

  const barData = [
    { label: "Earnings", value: user.dailyIncome },
    { label: "Loss", value: metrics.loss },
  ];

  const pieData = [
    { name: "Worked", value: user.currentHours, color: "#22d3ee" },
    { name: "Lost", value: metrics.lostHours, color: "#a855f7" },
  ];

  return (
    <PageTransition>
      <AuthGuard allow="worker">
        <AppShell
          eyebrow="Main focus"
          title="Income Protection Dashboard"
          description="Track actual hours, monitor disruption risk, and quantify how much HourSafe AI can recover when a shift is interrupted."
        >
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Normal Hours" value={user.normalHours} suffix=" hrs" icon={Clock3} />
            <StatCard
              label="Current Hours"
              value={user.currentHours}
              suffix=" hrs"
              icon={AlertTriangle}
              tone={metrics.risk === "High" ? "danger" : "default"}
            />
            <StatCard
              label="Hourly Income"
              value={metrics.hourlyIncome}
              prefix="₹"
              icon={IndianRupee}
            />
            <StatCard
              label="Estimated Payout"
              value={metrics.payout}
              prefix="₹"
              icon={Shield}
              tone="success"
            />
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">User Profile</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{user.name}</h2>
                  <p className="mt-2 text-sm text-slate-400">Platform: {user.platform}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-cyan-200">
                  <UserCircle2 className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Daily income
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {formatCurrency(user.dailyIncome)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Coverage ratio
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-cyan-200">
                    {metrics.coveragePercent}%
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Risk Indicator</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    {metrics.risk === "High"
                      ? "Weather event increasing claim probability"
                      : "Normal operations with low disruption risk"}
                  </h2>
                </div>
                <div
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    metrics.risk === "High"
                      ? "border border-rose-400/20 bg-rose-400/10 text-rose-200"
                      : "border border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                  }`}
                >
                  {metrics.risk}
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Lost Hours</p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {metrics.lostHours} hrs
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Income Loss</p>
                  <p className="mt-3 text-2xl font-semibold text-amber-200">
                    {formatCurrency(metrics.loss)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Payout Value</p>
                  <p className="mt-3 text-2xl font-semibold text-emerald-300">
                    {formatCurrency(metrics.payout)}
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <ChartCard
              title="Hours worked trend"
              subtitle="Daily working hours with a visible drop after simulation."
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={{ fill: "#a855f7", strokeWidth: 0 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard
              title="Earnings vs loss"
              subtitle="Compare the baseline income for the day versus estimated disruption loss."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="label" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                    }}
                  />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {barData.map((entry) => (
                      <Cell
                        key={entry.label}
                        fill={entry.label === "Loss" ? "#f97316" : "#22d3ee"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="xl:col-span-2">
              <ChartCard
                title="Work versus lost hours"
                subtitle="A clear share view of worked time and the hours protected by policy."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={65}
                      outerRadius={100}
                      paddingAngle={4}
                    >
                      {pieData.map((slice) => (
                        <Cell key={slice.name} fill={slice.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </section>
        </AppShell>
      </AuthGuard>
    </PageTransition>
  );
}
