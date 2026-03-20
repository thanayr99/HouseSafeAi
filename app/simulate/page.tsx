"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, LoaderCircle, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/button";
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

export default function SimulatePage() {
  const { user, metrics, simulateRainEvent, resetSimulation } = useAppContext();
  const [isRunning, setIsRunning] = useState(false);

  const handleSimulation = async () => {
    setIsRunning(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1400));
    simulateRainEvent();
    setIsRunning(false);
  };

  return (
    <PageTransition>
      <AuthGuard allow="worker">
        <AppShell
          eyebrow="Simulation"
          title="Disruption Scenario Engine"
          description="Model a rain event, watch the protected-hour calculation update, and trigger an automated claim flow with polished motion feedback."
        >
          <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <Card>
              <p className="text-sm text-slate-400">Scenario control</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Simulate weather impact
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Current profile: {user.name} on {user.platform}, averaging {user.normalHours} working hours and earning {formatCurrency(user.dailyIncome)} per day.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={handleSimulation} disabled={isRunning}>
                  {isRunning ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Activity className="h-4 w-4" />
                      Simulate Rain Event 🌧️
                    </>
                  )}
                </Button>
                <Button variant="secondary" onClick={resetSimulation}>
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </div>

              <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{
                    width: isRunning ? "100%" : user.hasSimulated ? "100%" : "18%",
                  }}
                  transition={{ duration: isRunning ? 1.2 : 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                />
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-slate-400">Lost Hours</p>
                <p className="mt-4 text-3xl font-semibold text-white">{metrics.lostHours} hrs</p>
              </Card>
              <Card>
                <p className="text-sm text-slate-400">Loss Amount</p>
                <p className="mt-4 text-3xl font-semibold text-amber-200">{formatCurrency(metrics.loss)}</p>
              </Card>
              <Card>
                <p className="text-sm text-slate-400">Final Payout</p>
                <p className="mt-4 text-3xl font-semibold text-emerald-300">{formatCurrency(metrics.payout)}</p>
              </Card>
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: user.hasSimulated ? 1 : 0.7, y: 0 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            <Card>
              <p className="text-sm text-slate-400">Calculation logic</p>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Lost Hours = {user.normalHours} - {user.currentHours} = {metrics.lostHours}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Hourly Income = {formatCurrency(user.dailyIncome)} / {user.normalHours} = {formatCurrency(metrics.hourlyIncome)}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Payout = {formatCurrency(metrics.loss)} × 0.7 = <span className="font-semibold text-emerald-300">{formatCurrency(metrics.payout)}</span>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/15 to-cyan-500/10">
              <p className="text-sm text-slate-300">Claim outcome</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                {user.hasSimulated ? "Auto Claim Triggered ✅" : "Standing by for disruption events"}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {user.hasSimulated
                  ? "Your simulated disruption reduced working hours to 3 and triggered a protected payout workflow."
                  : "Run the simulation to see the policy react to a major drop in working hours."}
              </p>
              {user.hasSimulated ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-4 text-emerald-100"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Claim has been queued and payout confirmation has been sent.
                </motion.div>
              ) : null}
            </Card>
          </motion.section>
        </AppShell>
      </AuthGuard>
    </PageTransition>
  );
}
