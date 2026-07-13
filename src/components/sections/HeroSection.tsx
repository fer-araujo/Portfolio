"use client";

import { useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLenisScroll } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const NAME = "Fer Araujo";
const TAGLINE = "Sr Software Engineer";
const words = NAME.split(" ");

const staggerVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

/**
 * Full-viewport hero section with animated name, title, status badge, and CTA.
 * The name is rendered with a staggered word-reveal animation.
 * The CTA button smoothly scrolls to the #projects section.
 * All animations respect prefers-reduced-motion.
 */
export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const lenis = useLenisScroll();

  const handleCtaClick = useCallback(() => {
    const target = document.getElementById("about");
    if (!target) return;
    if (lenis?.scrollTo) {
      lenis.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: "auto" });
    }
  }, [lenis]);

  return (
    <motion.section
      className={cn(
        "relative flex min-h-dvh items-center justify-center overflow-hidden dot-grid"
      )}
      id="home"
      data-testid="hero-section"
    >
      {/* Ambient background gradient with aurora-shift */}
      <div
        data-testid="hero-background"
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Top-left accent */}
        <div
          data-aurora-blob
          className={cn(
            "absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent-gold/6 blur-[120px]",
            !prefersReduced && "animate-aurora-shift"
          )}
          aria-hidden="true"
        />
        <div
          data-aurora-blob
          className={cn(
            "absolute -top-40 right-1/4 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[120px]",
            !prefersReduced && "animate-aurora-shift"
          )}
        />
        <div
          data-aurora-blob
          className={cn(
            "absolute left-1/3 top-1/3 h-[500px] w-[500px] rounded-full bg-accent-gold/5 blur-[100px]",
            !prefersReduced && "animate-aurora-shift"
          )}
        />
        <div
          data-aurora-blob
          className={cn(
            "absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-accent-teal/5 blur-[100px]",
            !prefersReduced && "animate-aurora-shift"
          )}
        />
        <div
          data-aurora-blob
          className={cn(
            "absolute -bottom-20 right-0 h-[450px] w-[450px] rounded-full bg-accent/8 blur-[100px]",
            !prefersReduced && "animate-aurora-shift"
          )}
          aria-hidden="true"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
        {/* Staggered name */}
        <h1
          className="flex flex-wrap justify-center gap-x-4 text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl md:text-6xl lg:text-7xl"
          data-testid="hero-name"
        >
          {prefersReduced
            ? NAME
            : words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="inline-block font-heading"
                  custom={i}
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}
                </motion.span>
              ))}
        </h1>

        {/* Tagline */}
        <motion.p
          className="max-w-xl text-lg text-text-muted sm:text-xl"
          data-testid="hero-tagline"
          initial={prefersReduced ? undefined : { y: 20, opacity: 0 }}
          animate={prefersReduced ? undefined : { y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          {TAGLINE}
        </motion.p>

        {/* Status badge */}
        <motion.div
          role="status"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent-text"
          )}
          data-testid="hero-status"
          initial={prefersReduced ? undefined : { y: 20, opacity: 0 }}
          animate={prefersReduced ? undefined : { y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full bg-accent opacity-75",
                !prefersReduced && "animate-ping"
              )}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for opportunities
        </motion.div>

        {/* CTA button — hidden via CSS when reduced motion to avoid hydration mismatches */}
        <motion.div
          className="motion-reduce:hidden"
          initial={prefersReduced ? undefined : { y: 20, opacity: 0 }}
          animate={prefersReduced ? undefined : { y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={handleCtaClick}
            aria-label="Scroll to learn more about me"
          >
            Learn more
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </Button>
        </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade — smooth transition to next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />
    </motion.section>
  );
}
