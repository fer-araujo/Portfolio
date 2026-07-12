"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import { Download } from "lucide-react";
import { about } from "@/content/about";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

/**
 * Animated counter that counts up from 0 to the target value.
 * Animation triggers once when the element enters the viewport.
 * Skips animation when reduced motion is preferred.
 */
function AnimatedCounter({ value, suffix = "", duration = 1 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setCount(value);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startValue + (value - startValue) * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, duration, prefersReduced]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/**
 * About section with bio, animated stats, and CV download.
 * Two-column layout: bio on the left, stats grid on the right.
 * Responsive: stacks on mobile.
 */
export function AboutSection() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.section
      className="relative py-24 md:py-32"
      id="about"
      data-testid="about-section"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title="About Me"
            subtitle="A brief overview of my professional journey and what drives me."
            aligned="left"
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Bio column */}
          <div className="lg:col-span-3" data-testid="about-bio">
            <div className="space-y-4 text-text-muted leading-relaxed">
              {about.bio.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-base sm:text-lg">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {/* CV Download */}
            <Reveal delay={0.3}>
              <div className="mt-8">
                <Button
                  variant="secondary"
                  size="md"
                  href={about.cvUrl}
                  download
                  aria-label={`Download CV (PDF, 120KB)`}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CV
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Stats column */}
          <div className="lg:col-span-2" data-testid="about-stats-column">
            <Reveal direction="right" delay={0.2}>
              <dl
                className="grid grid-cols-2 gap-4"
                data-testid="about-stats"
              >
                {about.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "rounded-xl border border-border bg-bg-card p-5 text-center transition-colors hover:border-accent/30"
                    )}
                  >
                    <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-text-muted">
                      {stat.label}
                    </dt>
                    <dd className="text-3xl font-bold text-text sm:text-4xl font-heading">
                      {typeof stat.value === "number" ? (
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      ) : (
                        <span>
                          {stat.value}
                          {stat.suffix}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
