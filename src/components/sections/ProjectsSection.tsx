"use client";

import { motion } from "motion/react";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";

/**
 * Projects section with an asymmetric grid layout.
 * All projects render without filtering — with only 3 projects
 * in the same category, filter tabs are unnecessary.
 * Featured projects get prominent placement with larger cards.
 */
export function ProjectsSection() {
  return (
    <motion.section
      className="relative py-24 md:py-32"
      id="work"
      data-testid="projects-section"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title="Featured Work"
            subtitle="Selected projects that showcase my approach to engineering."
            aligned="left"
          />
        </Reveal>

        {/* ── Project grid ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
