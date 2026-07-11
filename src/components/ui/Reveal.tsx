"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Direction from which the element slides in */
  direction?: Direction;
  /** Animation duration in seconds */
  duration?: number;
  className?: string;
}

const directionVariants: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  left: { x: -40 },
  right: { x: 40 },
};

/**
 * Scroll-triggered reveal wrapper using motion's whileInView.
 * Animates children with a fade + translate effect when they enter the viewport.
 * Respects prefers-reduced-motion — no animation when reduced motion is preferred.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const offset = directionVariants[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
