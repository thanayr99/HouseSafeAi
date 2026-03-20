"use client";

import { animate, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpProps) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.9,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [motionValue, value]);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(latest.toFixed(decimals));
  });

  return (
    <motion.span>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
