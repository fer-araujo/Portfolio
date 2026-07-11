"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Section title rendered as an <h2> */
  title: string;
  /** Optional subtitle rendered below the title */
  subtitle?: string;
  /** Text alignment */
  aligned?: "left" | "center";
  className?: string;
}

/**
 * Reusable section heading with optional subtitle and animated underline accent.
 * The accent bar animates in from the left on scroll into view.
 * Respects prefers-reduced-motion.
 */
export function SectionHeading({
  title,
  subtitle,
  aligned = "left",
  className,
}: SectionHeadingProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      data-testid="section-heading"
      className={cn(
        "space-y-2 mb-10",
        aligned === "center" && "text-center",
        className
      )}
    >
      <h2
        className={cn(
          "text-3xl font-heading font-bold tracking-tight text-text sm:text-4xl",
          aligned === "left" && "text-left"
        )}
        data-aligned={aligned}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="text-text-muted text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      <motion.div
        className={cn(
          "h-1 w-16 rounded-full bg-accent mt-4",
          aligned === "center" && "mx-auto"
        )}
        initial={prefersReduced ? false : { width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  );
}
