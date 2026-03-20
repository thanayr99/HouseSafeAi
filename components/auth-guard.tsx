"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppContext, type UserRole } from "@/context/app-context";

type AuthGuardProps = {
  allow: UserRole;
  children: ReactNode;
};

export function AuthGuard({ allow, children }: AuthGuardProps) {
  const router = useRouter();
  const { isHydrated, session } = useAppContext();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!session.isAuthenticated || session.role !== allow) {
      router.replace("/login");
    }
  }, [allow, isHydrated, router, session.isAuthenticated, session.role]);

  if (!isHydrated) {
    return <div className="px-6 py-10 text-sm text-slate-400">Loading session...</div>;
  }

  if (!session.isAuthenticated || session.role !== allow) {
    return <div className="px-6 py-10 text-sm text-slate-400">Redirecting to login...</div>;
  }

  return <>{children}</>;
}
