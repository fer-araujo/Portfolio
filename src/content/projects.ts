/* ═══════════════════════════════════════
   Projects Data
   Portfolio Redesign 2026
   ═══════════════════════════════════════ */

import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "anime-tracker",
    title: "Anime Tracker",
    description: "Streaming availability platform",
    longDescription: {
      problem:
        "Anime fans struggled to find which streaming services carried specific shows across different regions.",
      solution:
        "Created a platform that tracks anime streaming availability across multiple services, using the TMDB API for show data and metadata.",
      impact:
        "Gives anime fans a single, well-designed place to discover which official streaming platforms carry their favorite shows — no more jumping between tabs or landing on shady sites that don't actually have what you're looking for.",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Express", "TMDB API"],
    thumbnail: "/images/projects/anime-tracker-01.png",
    images: [
      "/images/projects/anime-tracker-02.png",
      "/images/projects/anime-tracker-03.png",
      "/images/projects/anime-tracker-04.png",
      "/images/projects/anime-tracker-05.png",
    ],
    liveUrl: "https://anime-tracker-hazel-pi.vercel.app",
    githubUrl: "https://github.com/fer-araujo/anime-tracker",
    category: "web",
    featured: true,
    phase: "past",
  },
  {
    id: "patient-management",
    title: "Patient Management",
    description: "Healthcare management starter",
    longDescription: {
      problem:
        "Small clinics needed an affordable, simple patient management system without the overhead of enterprise EHR software.",
      solution:
        "Developed a lightweight patient management starter application with React and TypeScript, focused on core scheduling and records.",
      impact:
        "Built for a clinic with a large patient base where most people are 50–80 years old and not comfortable with technology. The doctor needed a better way to manage appointments and records — this system gives her exactly that, with a UI her patients can actually navigate.",
    },
    techStack: ["React", "TypeScript", "Vite"],
    thumbnail: "/images/projects/patient-management-01.png",
    images: [
      "/images/projects/patient-management-02.png",
      "/images/projects/patient-management-03.png",
      "/images/projects/patient-management-04.png",
      "/images/projects/patient-management-05.png",
    ],
    githubUrl: "https://github.com/fer-araujo/patient-management",
    category: "web",
    featured: true,
    phase: "planned",
  },
  {
    id: "school-system",
    title: "School Attendance System",
    description: "QR-based attendance tracking with Firebase",
    longDescription: {
      problem:
        "Manual attendance tracking in schools was slow and error-prone, with teachers spending hours on roll calls.",
      solution:
        "Built a QR-based attendance system where students scan to check in, with a Firebase backend for real-time tracking and reporting.",
      impact:
        "Currently in production testing with school staff for employee attendance tracking. The architecture is designed to expand into full student attendance management — starting small, validating with real users, then scaling.",
    },
    techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    thumbnail: "/images/projects/school-system-01.png",
    images: [
      "/images/projects/school-system-02.png",
      "/images/projects/school-system-03.png",
      "/images/projects/school-system-04.png",
      "/images/projects/school-system-05.png",
    ],
    githubUrl: "https://github.com/fer-araujo/school-system",
    category: "web",
    featured: true,
    phase: "past",
  },
  {
    id: "pokedex",
    title: "Pokédex App",
    description: "Simple Pokédex built with NextJS",
    longDescription: {
      problem:
        "As a fan and developer, building something around Pokémon was simply about having fun. No business case — just pure enthusiasm for the craft.",
      solution:
        "A clean Pokédex with search, filtering, and detailed Pokémon cards. Built with Next.js and the PokéAPI — zero overengineering, maximum fun.",
      impact:
        "Zero users. Infinite joy. Not every project needs a user base — some exist simply for the love of building.",
    },
    techStack: ["Next.js", "TypeScript", "API Integration"],
    thumbnail: "/images/projects/pokedex-01.png",
    images: [
      "/images/projects/pokedex-02.png",
      "/images/projects/pokedex-03.png",
      "/images/projects/pokedex-04.png",
      "/images/projects/pokedex-05.png",
    ],
    githubUrl: "https://github.com/fer-araujo/pokedex",
    category: "web",
    featured: true,
    phase: "past",
  },
];
