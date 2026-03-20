"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type CardProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl border border-white/10 bg-white/10 p-6 shadow-[0_20px_70px_-30px_rgba(59,130,246,0.45)] backdrop-blur-lg ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
