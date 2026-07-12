/* ═══════════════════════════════════════
   Projects Data
   Portfolio Redesign 2026
   ═══════════════════════════════════════ */

import type { Project } from "./types";

export const projects: Project[] = [
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
        "Reduced attendance processing time by 80% and eliminated data entry errors for school administrators.",
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
  },
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
        "Serves thousands of monthly active users looking for where to watch their favorite anime.",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Express", "TMDB API"],
    thumbnail: "/images/projects/anime-tracker-01.png",
    images: [
      "/images/projects/anime-tracker-02.png",
      "/images/projects/anime-tracker-03.png",
      "/images/projects/anime-tracker-04.png",
      "/images/projects/anime-tracker-05.png",
      "/images/projects/anime-tracker-06.png",
      "/images/projects/anime-tracker-07.png",
      "/images/projects/anime-tracker-08.png",
    ],
    liveUrl: "https://anime-tracker-hazel-pi.vercel.app",
    githubUrl: "https://github.com/fer-araujo/anime-tracker",
    category: "web",
    featured: true,
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
        "Deployed in 3 local clinics, helping streamline patient intake and appointment scheduling.",
    },
    techStack: ["React", "TypeScript", "Vite"],
    thumbnail: "/images/projects/patient-management-01.png",
    images: [
      "/images/projects/patient-management-02.png",
      "/images/projects/patient-management-03.png",
      "/images/projects/patient-management-04.png",
      "/images/projects/patient-management-05.png",
      "/images/projects/patient-management-06.png",
      "/images/projects/patient-management-07.png",
      "/images/projects/patient-management-08.png",
      "/images/projects/patient-management-09.png",
      "/images/projects/patient-management-10.png",
      "/images/projects/patient-management-11.png",
      "/images/projects/patient-management-12.png",
      "/images/projects/patient-management-13.png",
      "/images/projects/patient-management-14.png",
      "/images/projects/patient-management-15.png",
      "/images/projects/patient-management-16.png",
      "/images/projects/patient-management-17.png",
    ],
    githubUrl: "https://github.com/fer-araujo/patient-management",
    category: "web",
    featured: true,
  },
  {
    id: "pokedex",
    title: "Pokédex App",
    description: "Simple Pokédex built with NextJS",
    longDescription: {
      problem:
        "Pokémon fans need a fast, searchable way to browse Pokémon data with evolutions and stats.",
      solution:
        "Created a Pokédex application using Next.js and the PokéAPI, with search, filtering, and detailed Pokémon cards.",
      impact:
        "Provides a snappy, mobile-friendly Pokédex experience for quick Pokémon lookups during gameplay.",
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
  },
];
