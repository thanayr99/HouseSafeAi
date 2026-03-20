"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { CountUp } from "./count-up";

type StatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  tone?: "default" | "success" | "warning" | "danger";
};

const toneMap = {
  default: "from-white/15 to-white/5 text-white",
  success: "from-emerald-500/20 to-emerald-300/5 text-emerald-200",
  warning: "from-amber-500/20 to-amber-300/5 text-amber-200",
  danger: "from-rose-500/20 to-rose-300/5 text-rose-200",
};

export function StatCard({
  label,
  value,
  icon: Icon,
  prefix,
  suffix,
  decimals,
  tone = "default",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-white/10 bg-gradient-to-br ${toneMap[tone]} p-5 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.9)] backdrop-blur-lg`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-300">
            {label}
          </p>
          <p className="mt-4 text-3xl font-semibold text-white">
            <CountUp
              value={value}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
            />
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-slate-100">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
