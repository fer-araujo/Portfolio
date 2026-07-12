"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FilmReelPanel } from "@/components/sections/FilmReelPanel";
import { FilmReelClosingPanel } from "@/components/sections/FilmReelClosingPanel";
import { ProjectCaseStudy } from "@/components/sections/ProjectCaseStudy";
import type { Project } from "@/content/types";

/**
 * Projects section — cinematic horizontal film reel.
 *
 * Replaces the old 2×2 grid with a GSAP ScrollTrigger-driven
 * horizontal scrub across 5 panels (4 projects + 1 closing).
 * On mobile (< 768px), panels stack vertically with native scroll.
 * Respects prefers-reduced-motion.
 */
export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = ScrollTrigger.matchMedia({
      "(min-width: 768px)": () => {
        if (!trackRef.current) return;

        const tl = gsap.to(trackRef.current, {
          x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: "#work",
            pin: true,
            start: "top top",
            end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tl.kill();
        };
      },
    }) as unknown as { kill: () => void };

    let debounceTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", onResize);

    return () => {
      mm.kill();
      window.removeEventListener("resize", onResize);
      clearTimeout(debounceTimer);
    };
  }, [prefersReduced]);

  const handleOpen = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      id="work"
      data-testid="projects-section"
    >
      {/* ── Heading overlay ─────────────────────── */}
      <div className="pointer-events-none absolute left-0 top-0 z-30 w-full px-6 pt-20 md:px-10 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              title="Featured Work"
              subtitle="Selected projects that showcase my approach to engineering."
              aligned="left"
            />
          </Reveal>
        </div>
      </div>

      {/* ── Film reel track ───────────────────── */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          id="film-reel-track"
          data-testid="film-reel-track"
          className="flex flex-nowrap"
        >
          {projects.map((project, index) => (
            <FilmReelPanel
              key={project.id}
              project={project}
              index={index}
              onOpen={handleOpen}
            />
          ))}
          <FilmReelClosingPanel />
        </div>
      </div>

      {/* ── Case study overlay ────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectCaseStudy
            project={selectedProject}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
