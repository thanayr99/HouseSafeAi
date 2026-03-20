"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useAppContext } from "@/context/app-context";

export function Toast() {
  const { toast } = useAppContext();

  return (
    <AnimatePresence>
      {toast.open ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/15 px-5 py-4 text-sm text-emerald-50 shadow-[0_20px_60px_-30px_rgba(16,185,129,0.8)] backdrop-blur-xl"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
          <span>{toast.message}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
