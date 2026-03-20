"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "./button";
import { useAppContext } from "@/context/app-context";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout } = useAppContext();

  const links =
    session.role === "admin"
      ? [
          { href: "/", label: "Home" },
          { href: "/admin", label: "Admin" },
          { href: "/policy", label: "Policy" },
        ]
      : [
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/policy", label: "Policy" },
        ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-2 text-cyan-200">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">HourSafe AI</p>
            <p className="text-xs text-slate-400">Income Protection OS</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition ${active ? "text-white" : "text-slate-400 hover:text-slate-100"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {session.isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-white">{session.displayName}</p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                {session.role}
              </p>
            </div>
            <Button
              variant="secondary"
              className="px-4 py-2.5 text-sm"
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button className="px-4 py-2.5 text-sm">Demo Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
