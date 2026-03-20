"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, FileText, LayoutDashboard, ShieldCheck, Sparkles, Users } from "lucide-react";
import { useAppContext } from "@/context/app-context";

export function Sidebar() {
  const pathname = usePathname();
  const { session } = useAppContext();

  const items =
    session.role === "admin"
      ? [
          { href: "/admin", label: "Admin Overview", icon: Users },
          { href: "/policy", label: "Policy", icon: FileText },
        ]
      : [
          { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { href: "/simulate", label: "Simulation", icon: Activity },
          { href: "/policy", label: "Policy", icon: FileText },
        ];

  return (
    <aside className="w-full rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl lg:w-72">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-4">
        <div className="rounded-2xl bg-white/10 p-2 text-cyan-200">
          {session.role === "admin" ? <ShieldCheck className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">HourSafe AI</p>
          <p className="text-xs text-slate-400">
            {session.role === "admin" ? "Admin control" : "Decision cockpit"}
          </p>
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "border border-cyan-400/20 bg-cyan-400/10 text-white"
                  : "border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
