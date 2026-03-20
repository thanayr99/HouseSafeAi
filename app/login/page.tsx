"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import { useAppContext } from "@/context/app-context";

export default function LoginPage() {
  const router = useRouter();
  const { loginAdmin, loginWorker } = useAppContext();
  const [mode, setMode] = useState<"worker" | "admin">("worker");
  const [workerForm, setWorkerForm] = useState({
    name: "Ravi",
    email: "ravi@hoursafe.demo",
  });
  const [adminEmail, setAdminEmail] = useState("admin@hoursafe.demo");

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">
                  Demo access
                </p>
                <h1 className="mt-4 text-4xl font-semibold text-white">
                  Choose admin or worker login
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                  This demo version uses frontend-only role switching with local storage.
                  Use worker mode for the insured user journey or admin mode for platform monitoring.
                </p>
              </div>

              <div className="grid gap-4">
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-200">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Worker Demo</h2>
                      <p className="mt-2 text-sm text-slate-400">
                        Access the registration, dashboard, simulation, and payout experience.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-violet-400/10 p-3 text-violet-200">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Admin Demo</h2>
                      <p className="mt-2 text-sm text-slate-400">
                        Access a simple control view for claims, active policy stats, and risk monitoring.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            <Card className="p-8">
              <div className="inline-flex rounded-2xl border border-white/10 bg-slate-950/40 p-1">
                <button
                  type="button"
                  onClick={() => setMode("worker")}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${mode === "worker" ? "bg-white/10 text-white" : "text-slate-400"}`}
                >
                  Worker Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode("admin")}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${mode === "admin" ? "bg-white/10 text-white" : "text-slate-400"}`}
                >
                  Admin Login
                </button>
              </div>

              {mode === "worker" ? (
                <form
                  className="mt-8 space-y-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    loginWorker(workerForm);
                    router.push("/dashboard");
                  }}
                >
                  <label className="block space-y-2">
                    <span className="text-sm text-slate-300">Worker name</span>
                    <input
                      value={workerForm.name}
                      onChange={(event) =>
                        setWorkerForm((current) => ({ ...current, name: event.target.value }))
                      }
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-cyan-400/40"
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm text-slate-300">Email</span>
                    <input
                      value={workerForm.email}
                      onChange={(event) =>
                        setWorkerForm((current) => ({ ...current, email: event.target.value }))
                      }
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-cyan-400/40"
                    />
                  </label>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                    Demo credentials: any name + any email work in this frontend-only version.
                  </div>
                  <Button type="submit" className="w-full">
                    <UserRound className="h-4 w-4" />
                    Login as Worker
                  </Button>
                </form>
              ) : (
                <form
                  className="mt-8 space-y-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    loginAdmin({ email: adminEmail });
                    router.push("/admin");
                  }}
                >
                  <label className="block space-y-2">
                    <span className="text-sm text-slate-300">Admin email</span>
                    <input
                      value={adminEmail}
                      onChange={(event) => setAdminEmail(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none focus:border-violet-400/40"
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm text-slate-300">Password</span>
                    <input
                      type="password"
                      value="demo-admin"
                      readOnly
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-slate-400 outline-none"
                    />
                  </label>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                    Demo admin credentials: admin@hoursafe.demo / demo-admin
                  </div>
                  <Button type="submit" className="w-full">
                    <LockKeyhole className="h-4 w-4" />
                    Login as Admin
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </main>
      </PageTransition>
    </>
  );
}
