/* ═══════════════════════════════════════
   Skills / Technologies Data — Impact Architecture Bento
   Portfolio Redesign 2026
   ═══════════════════════════════════════ */

import type { SkillDomain } from "@/content/types";

export type { SkillDomain };

export const skillDomains: SkillDomain[] = [
  {
    id: "architecture",
    domain: "Architecture & Systems",
    description: "Designing scalable architectures that grow with the product",
    icon: "Boxes",
    technologies: [
      { name: "System Design", level: "expert" },
      { name: "Hexagonal/Clean Architecture", level: "expert" },
      { name: "Micro-frontends", level: "advanced" },
      { name: "Design Systems", level: "expert" },
    ],
  },
  {
    id: "frontend",
    domain: "Frontend Engineering",
    description: "Building performant, accessible UIs at enterprise scale",
    icon: "Code2",
    technologies: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "Tailwind CSS", level: "advanced" },
      { name: "Framer Motion", level: "advanced" },
    ],
  },
  {
    id: "backend",
    domain: "Backend & APIs",
    description: "Robust APIs and services powering modern applications",
    icon: "Server",
    technologies: [
      { name: "Node.js", level: "advanced" },
      { name: "Express", level: "advanced" },
      { name: "REST/GraphQL", level: "advanced" },
      { name: "MongoDB", level: "advanced" },
      { name: "MySQL", level: "advanced" },
    ],
  },
  {
    id: "leadership",
    domain: "Leadership & Mentorship",
    description: "Growing teams and engineering culture through mentorship",
    icon: "Users",
    technologies: [
      { name: "Team Leadership 8+", level: "expert" },
      { name: "Code Review", level: "expert" },
      { name: "Mentoring", level: "expert" },
      { name: "Agile/Scrum", level: "advanced" },
    ],
  },
  {
    id: "devops",
    domain: "DevOps & Delivery",
    description: "Shipping with confidence through automation and testing",
    icon: "Rocket",
    technologies: [
      { name: "CI/CD", level: "expert" },
      { name: "Docker", level: "advanced" },
      { name: "Git", level: "expert" },
      { name: "Testing (Vitest/Playwright)", level: "expert" },
      { name: "PHP", level: "advanced" },
    ],
  },
];
