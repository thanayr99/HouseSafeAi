import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";

type AppShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  children: ReactNode;
};

export function AppShell({
  title,
  eyebrow,
  description,
  children,
}: AppShellProps) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/[0.08] p-6 shadow-[0_24px_90px_-42px_rgba(59,130,246,0.6)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              {description}
            </p>
          </section>
          {children}
        </div>
      </div>
    </div>
  );
}
