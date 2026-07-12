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
    thumbnail: "/images/projects/school-system.jpg",
    images: [],
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
    thumbnail: "/images/projects/anime-tracker.jpg",
    images: [],
    liveUrl: "https://your-anime-tracker.vercel.app",
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
    thumbnail: "/images/projects/patient-management.jpg",
    images: [],
    githubUrl: "https://github.com/fer-araujo/patient-management",
    category: "web",
    featured: true,
  },
];
