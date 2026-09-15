"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Seconds. Stagger siblings by passing increasing values. */
  delay?: number;
  className?: string;
};

/**
 * Fade-and-rise on first entry into the viewport. `MotionConfig reducedMotion="user"`
 * in the layout turns it into a plain fade for users who asked for less motion.
 */
export function Reveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
