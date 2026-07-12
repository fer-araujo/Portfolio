/* ═══════════════════════════════════════
   Skills / Technologies Data
   Portfolio Redesign 2026
   ═══════════════════════════════════════ */

export interface SkillItem {
  name: string;
  icon?: string;
  level: "expert" | "advanced" | "intermediate" | "beginner";
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript", level: "expert" },
      { name: "PHP", level: "advanced" },
      { name: "Python", level: "intermediate" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "Tailwind CSS", level: "advanced" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: "advanced" },
      { name: "Express", level: "advanced" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", level: "advanced" },
      { name: "MongoDB", level: "advanced" },
      { name: "PostgreSQL", level: "intermediate" },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Docker", level: "advanced" },
      { name: "CI/CD", level: "advanced" },
      { name: "Git", level: "expert" },
      { name: "Webpack", level: "advanced" },
      { name: "Bitbucket", level: "advanced" },
    ],
  },
];
