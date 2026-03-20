"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CloudRain, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";

const features = [
  {
    title: "AI Risk Detection",
    description:
      "Monitor weather-driven disruption signals and identify earnings volatility before it spikes.",
    icon: ShieldCheck,
  },
  {
    title: "Lost Hours Tracking",
    description:
      "See hour-by-hour disruption impact with instant visibility into protected time lost.",
    icon: CloudRain,
  },
  {
    title: "Instant Payout System",
    description:
      "Trigger automated claims and estimate compensation in a startup-grade control surface.",
    icon: Zap,
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.35),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_28%),linear-gradient(180deg,_rgba(2,6,23,0.95),_rgba(15,23,42,1))]" />
          <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-200">
                  Built for gig worker protection
                </div>
                <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
                  HourSafe AI
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  Protecting Gig Workers by Insuring Lost Working Hours
                </p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
                  A polished operating system for weather-driven income protection,
                  automated claims, and real-time visibility into work disruption.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/login">
                    <Button className="min-w-[10rem]">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="secondary" className="min-w-[10rem]">
                      Explore Demo
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <Card className="overflow-hidden p-0">
                  <div className="border-b border-white/10 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-300">Live signal</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">
                          Rain disruption detected
                        </h2>
                      </div>
                      <div className="rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1 text-sm text-rose-200">
                        High risk
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 p-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Estimated payout</p>
                      <p className="mt-3 text-3xl font-semibold text-emerald-300">
                        ₹490
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Hours protected</p>
                      <p className="mt-3 text-3xl font-semibold text-white">7 hrs</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
                      <div className="flex items-end justify-between gap-4">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day, index) => (
                            <div key={day} className="flex flex-1 flex-col items-center gap-3">
                              <div
                                className="w-full rounded-full bg-gradient-to-t from-violet-500 to-cyan-400"
                                style={{
                                  height: `${[88, 95, 92, 84, 76, 40, 35][index]}px`,
                                }}
                              />
                              <span className="text-xs text-slate-500">{day}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {features.map(({ title, description, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <Card className="h-full">
                    <div className="w-fit rounded-2xl border border-white/10 bg-white/10 p-3 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </PageTransition>
    </>
  );
}

