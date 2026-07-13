"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { Boxes, Code2, Server, Users, Rocket } from "lucide-react";
import { skillDomains } from "@/content/skills";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Boxes,
  Code2,
  Server,
  Users,
  Rocket,
};

export function SkillsSection() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const items = document.querySelectorAll<HTMLElement>(
        "[data-gsap-skill-item]",
      );
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: items[0].parentElement,
              start: "top 80%",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      className="relative py-24 md:py-32"
      id="skills"
      data-testid="skills-section"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        {/* Section label — clean, minimal */}
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent/70">
          Expertise
        </p>

        <h2 className="mb-6 text-3xl font-heading font-bold tracking-tight text-text sm:text-4xl md:text-5xl">
          Engineering at scale.
        </h2>

        <p className="mb-16 max-w-2xl text-lg text-text-muted leading-relaxed">
          Six years of building products that serve millions. Architecture,
          frontend, backend, leadership — these are the domains where I bring
          depth.
        </p>

        {/* Domain grid — 3 cols, spacious */}
        <div
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 sm:gap-14"
          data-testid="skills-bento-grid"
        >
          {skillDomains.map((domain) => {
            const Icon = iconMap[domain.icon];

            return (
              <div
                key={domain.id}
                data-gsap-skill-item
                data-testid={`skills-domain-${domain.id}`}
                className="group"
              >
                {/* Icon + Domain name */}
                <div className="mb-3 flex items-center gap-3">
                  {Icon && (
                    <span className="text-accent/80">
                      <Icon className="h-6 w-6" />
                    </span>
                  )}
                  <h3 className="text-lg font-heading font-bold text-text">
                    {domain.domain}
                  </h3>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm text-text leading-relaxed">
                  {domain.description}
                </p>

                {/* Tech tags — subtle, comma-separated feel */}
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {domain.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      data-testid="skill-tag"
                      data-level={tech.level}
                      className="text-xs text-text-muted"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
