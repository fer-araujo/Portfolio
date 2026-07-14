"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { Briefcase } from "lucide-react";
import { experiences } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Format "YYYY-MM" to a display year range.
 * Returns "2020 — 2022" or "Present" for current roles.
 */
function formatYearRange(startDate: string, endDate?: string, current?: boolean): string {
  const startYear = startDate.split("-")[0];
  if (current) return `${startYear} — Present`;
  const endYear = endDate?.split("-")[0];
  return `${startYear} — ${endYear}`;
}

/**
 * Experience section with a vertical timeline layout.
 *
 * Desktop: Timeline line on the left with dots, date range on the left
 * of each entry, content (company, role, achievements) on the right.
 * Current role has a highlighted accent dot.
 *
 * Mobile: Simple card layout without the timeline line.
 */
export function ExperienceSection() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Parallax dot pattern overlay
      const parallaxEl = document.querySelector<HTMLElement>(
        "[data-gsap-parallax]"
      );
      if (parallaxEl) {
        gsap.to(parallaxEl, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxEl.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Timeline line "draws" from top to bottom
      const line = document.querySelector<HTMLElement>(
        "[data-gsap-timeline-line]"
      );
      const timelineContainer = document.querySelector<HTMLElement>(
        "[data-gsap-timeline]"
      );

      if (line && timelineContainer) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top 80%",
            },
          }
        );
      }

      // Entry reveal animations
      const entries =
        document.querySelectorAll<HTMLElement>("[data-gsap-entry]");
      entries.forEach((entry) => {
        const content = entry.querySelector<HTMLElement>(
          "[data-gsap-entry-content]"
        );
        const achievements =
          entry.querySelectorAll<HTMLElement>("[data-gsap-achievement]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: "top 80%",
          },
        });

        // Entry slides in from left
        if (content) {
          tl.fromTo(
            content,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }
          );
        }

        // Achievements stagger in
        if (achievements.length) {
          tl.fromTo(
            achievements,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }
      });
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      className="relative py-24 md:py-32 diagonal-dot"
      id="experience"
      data-testid="experience-section"
    >
      {/* Parallax overlay for dot pattern movement */}
      <div
        data-gsap-parallax
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* Gradient transition from previous section + subtle tint */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title="Experience"
            subtitle="My professional journey and the impact I've made along the way."
            aligned="left"
          />
        </Reveal>

        {/* Timeline entries */}
        <div className="relative" data-testid="experience-timeline" data-gsap-timeline>
          {/* Timeline vertical line (desktop only) */}
          <div
            className="absolute left-[19px] top-0 hidden h-full w-px bg-border md:block"
            aria-hidden="true"
            data-gsap-timeline-line
          />

          <div className="space-y-12">
            {experiences.map((entry) => {
              const isCurrent = entry.current;

              return (
                <article
                  key={entry.id}
                  data-testid={`experience-${entry.id}`}
                  data-current={isCurrent ? "" : undefined}
                  data-gsap-entry
                  className="relative pl-6 md:grid md:grid-cols-5 md:gap-8 md:pl-0"
                >
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute -left-[5px] top-1.5 h-3 w-3 rounded-full border-2 md:left-[11px]",
                      isCurrent ? "bg-accent border-accent" : "bg-bg-card border-border"
                    )}
                    aria-hidden="true"
                  />

                  {/* Date range column */}
                  <div className="md:col-span-2 md:text-right">
                    <span className="inline-block text-sm font-medium text-text-muted tabular-nums">
                      {formatYearRange(entry.startDate, entry.endDate, entry.current)}
                    </span>
                  </div>

                  {/* Content column */}
                  <div
                    data-gsap-entry-content
                    className={cn(
                      "mt-1 md:col-span-3 md:mt-0",
                      isCurrent && "md:border-l-2 md:border-accent md:pl-6"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <h3
                        data-testid="experience-company"
                        className="text-lg font-heading font-semibold tracking-tight text-text"
                      >
                        {entry.company}
                      </h3>
                      {isCurrent && (
                        <span
                          className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-text"
                          data-testid="current-badge"
                        >
                          <Briefcase className="h-3 w-3" aria-hidden="true" />
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 text-sm text-text-muted">{entry.role}</p>

                    <ul className="mt-3 space-y-2">
                      {entry.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          data-gsap-achievement
                          className="flex items-start gap-2 text-sm text-text-muted"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/50"
                            aria-hidden="true"
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
