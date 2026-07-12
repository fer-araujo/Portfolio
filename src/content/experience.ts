/* ═══════════════════════════════════════
   Work Experience Data
   Portfolio Redesign 2026
   ═══════════════════════════════════════ */

import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    id: "deloitte",
    company: "Deloitte",
    role: "Sr. Software Engineer",
    startDate: "2025-01",
    current: true,
    achievements: [
      "Leading delivery of modern web applications using React, Node.js, and TypeScript across the full software development lifecycle",
      "Partnering with stakeholders to translate complex business requirements into actionable technical roadmaps and scalable architectures",
      "Driving application performance improvements through rigorous code review processes and architecture optimization",
    ],
  },
  {
    id: "accenture",
    company: "Accenture México",
    role: "Sr. Front End Engineer",
    startDate: "2023-04",
    endDate: "2025-03",
    current: false,
    achievements: [
      "Led and mentored a team of frontend developers for Caterpillar's CAT web application, driving technical decisions in React and Next.js",
      "Established code review standards and engineering best practices, accelerating development cycles and team velocity",
      "Designed scalable state management solutions delivering a cohesive and intuitive user experience across the platform",
    ],
  },
  {
    id: "blueriver",
    company: "BlueRiver",
    role: "Senior Software Development Engineer",
    startDate: "2021-08",
    endDate: "2023-04",
    current: false,
    achievements: [
      "Led development of multiple scalable applications utilizing the MERN stack for diverse client needs",
      "Managed stakeholder relationships to translate business needs into technical solutions, ensuring on-time delivery",
      "Implemented unit testing frameworks and CI/CD pipelines to elevate overall software quality across the team",
    ],
  },
  {
    id: "lenovo",
    company: "Lenovo",
    role: "Software Engineer",
    startDate: "2019-07",
    endDate: "2021-02",
    current: false,
    achievements: [
      "Built and maintained applications to improve production efficiency using PHP, React, and MySQL",
      "Acted as key technical resource for cross-functional teams supporting HR and financial departments",
      "Delivered robust web solutions that streamlined internal operations and reduced manual workflows",
    ],
  },
  {
    id: "territorium",
    company: "Territorium Life",
    role: "Web Developer",
    startDate: "2019-01",
    endDate: "2019-07",
    current: false,
    achievements: [
      "Developed core modules for Territorium's educational platform using PHP, Bootstrap, and JavaScript",
      "Collaborated on Dell Technologies' Partner Ecosystem web tools",
    ],
  },
];
