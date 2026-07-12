"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const levelStyles: Record<string, string> = {
  expert: "text-sm font-semibold text-text",
  advanced: "text-xs font-medium text-text",
  intermediate: "text-xs text-text-muted",
  beginner: "text-xs text-text-muted",
};

/**
 * Skills section displaying categorized technology tags.
 * Uses a tag cloud layout — NOT progress bars.
 * Expert-level skills get slightly larger/bolder text for visual hierarchy.
 * Responsive: wraps on mobile.
 */
export function SkillsSection() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const categories = document.querySelectorAll<HTMLElement>(
        "[data-gsap-category]"
      );

      categories.forEach((category) => {
        const tags =
          category.querySelectorAll<HTMLElement>("[data-skill-item]");
        const expertTags =
          category.querySelectorAll<HTMLElement>('[data-level="expert"]');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: category,
            start: "top 80%",
          },
        });

        // Category row slides up + fades in
        tl.fromTo(
          category,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );

        // Tags stagger in after category reveals
        if (tags.length) {
          tl.fromTo(
            tags,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.07,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }

        // Expert-level tags get a brief pulse glow
        if (expertTags.length) {
          tl.to(
            expertTags,
            {
              boxShadow:
                "0 0 14px rgba(80, 200, 130, 0.35)",
              duration: 0.5,
              ease: "power1.inOut",
              yoyo: true,
              repeat: 1,
            },
            "-=0.15"
          );
        }
      });
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      className="relative py-24 md:py-32"
      id="skills"
      data-testid="skills-section"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title="Skills & Technologies"
            subtitle="Technologies and tools I work with on a daily basis."
            aligned="left"
          />
        </Reveal>

        <div className="grid gap-6" data-testid="skills-grid">
          {skills.map((category) => (
            <div
              key={category.category}
              data-testid={`skills-category-${category.category}`}
              data-layout="two-column"
              data-gsap-category
              className="grid grid-cols-[auto_1fr] gap-3 sm:gap-4 max-sm:grid-cols-1"
            >
              <h3 className="text-right max-sm:text-left text-lg font-heading font-semibold tracking-tight text-text">
                {category.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill.name}
                    data-skill-item
                    data-level={skill.level}
                    className={cn(
                      "inline-flex items-center rounded-full border border-border bg-bg-card px-3 py-1.5 transition-colors hover:border-accent/30",
                      levelStyles[skill.level]
                    )}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
