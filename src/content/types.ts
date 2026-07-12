/* ═══════════════════════════════════════
   Content Data Interfaces
   Portfolio Redesign 2026
   ═══════════════════════════════════════ */

/** Statistic displayed in the About section */
export interface AboutStat {
  label: string;
  value: string | number;
  suffix?: string; // e.g. "+", " yrs"
}

/** About section data */
export interface About {
  bio: string[]; // 2-3 paragraphs
  stats: AboutStat[];
  cvUrl: string; // path to PDF in /public
  avatar?: {
    src: string;
    alt: string;
  };
}

/** Simple stat displayed in project case studies */
export interface Stat {
  label: string;
  value: string | number;
}

/** Portfolio project */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: {
    problem: string;
    solution: string;
    impact: string;
  };
  techStack: string[];
  thumbnail: string; // path relative to /public
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  /** Short editorial tagline for the film reel panel */
  tagline?: string;
  /** Narrative paragraph for the case study overlay */
  narrativeText?: string;
  /** Project timeline phase */
  phase?: "past" | "current" | "planned";
  /** Quick stats displayed in case study */
  stats?: Stat[];
}

/** Technology skill */
export interface Skill {
  name: string;
  category: "languages" | "frontend" | "backend" | "tools" | "cloud";
  icon?: string; // Lucide icon name
  proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience?: number;
}

/** Skill domain for bento grid layout (Impact Architecture) */
export interface SkillDomain {
  id: string;
  domain: string;
  description: string;
  icon: string; // Lucide icon name
  technologies: { name: string; level: "expert" | "advanced" }[];
}

/** Work experience entry */
export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string; // ISO date "2020-06"
  endDate?: string; // ISO date or undefined for current
  current: boolean;
  achievements: string[];
  logo?: string;
  website?: string;
}

/** Social media link (GitHub, LinkedIn, Twitter/X) */
export interface SocialLink {
  platform: string; // "github" | "linkedin" | "twitter"
  url: string;
  icon: string; // Lucide icon name
  handle: string;
}
