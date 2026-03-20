"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import { AuthGuard } from "@/components/auth-guard";
import { useAppContext, type Platform } from "@/context/app-context";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAppContext();
  const [form, setForm] = useState({
    name: "Ravi",
    platform: "Swiggy" as Platform,
    dailyIncome: "1000",
    normalHours: "10",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    registerUser({
      name: form.name,
      platform: form.platform,
      dailyIncome: Number(form.dailyIncome),
      normalHours: Number(form.normalHours),
    });

    router.push("/dashboard");
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <AuthGuard allow="worker">
          <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">
                Profile setup
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-white">
                Register for HourSafe AI
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Capture a few details and we will tailor premium, protection, and
                simulation outputs to your working pattern.
              </p>
            </motion.div>

            <Card className="p-8">
              <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Name</span>
                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                    placeholder="Ravi"
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Platform</span>
                  <select
                    value={form.platform}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        platform: event.target.value as Platform,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                  >
                    <option>Swiggy</option>
                    <option>Zomato</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Daily Income</span>
                  <input
                    value={form.dailyIncome}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        dailyIncome: event.target.value,
                      }))
                    }
                    type="number"
                    min="100"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                    placeholder="1000"
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Avg Working Hours</span>
                  <input
                    value={form.normalHours}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        normalHours: event.target.value,
                      }))
                    }
                    type="number"
                    min="1"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                    placeholder="10"
                    required
                  />
                </label>

                <div className="flex justify-end md:col-span-2">
                  <Button type="submit" className="min-w-[11rem]">
                    Save and continue
                  </Button>
                </div>
              </form>
            </Card>
          </main>
        </AuthGuard>
      </PageTransition>
    </>
  );
}
