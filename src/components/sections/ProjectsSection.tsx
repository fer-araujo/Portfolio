"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectLightbox } from "@/components/sections/ProjectLightbox";
import type { Project } from "@/content/types";

/**
 * Projects section — cinematic full-width grid with lightbox gallery.
 *
 * Each project card shows its main thumbnail. Clicking the gallery
 * indicator opens a fullscreen cinematic lightbox to browse all
 * screenshots with smooth transitions and keyboard navigation.
 */
export function ProjectsSection() {
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);

  return (
    <motion.section
      className="relative py-24 md:py-32"
      id="work"
      data-testid="projects-section"
    >
      <div className="mx-auto max-w-full px-0 sm:px-0 lg:px-0">
        {/* ── Header ─────────────────────────── */}
        <div className="mx-auto mb-12 flex max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              title="Featured Work"
              subtitle="Selected projects that showcase my approach to engineering."
              aligned="left"
            />
          </Reveal>
        </div>

        {/* ── Grid view ──────────────────────── */}
        <div className="w-full" data-testid="projects-grid-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid gap-0 md:grid-cols-2"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                variant="grid"
                onOpenLightbox={setLightboxProject}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Cinematic Lightbox ──────────────── */}
      <AnimatePresence>
        {lightboxProject && (
          <ProjectLightbox
            project={lightboxProject}
            onClose={() => setLightboxProject(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
