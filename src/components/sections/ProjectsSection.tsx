"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "marquee";

/**
 * Projects section with a Grid/Marquee toggle.
 *
 * **Grid view (default):** Full-width 2-column clean panel layout.
 * Each project renders as a full-bleed image panel with overlaid content.
 *
 * **Marquee view:** Horizontal snap-scroll strip of full-height project slides
 * with previous/next navigation.
 *
 * On mobile (<768px), grid view is forced — marquee doesn't work well
 * on small touch screens.
 */
export function ProjectsSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const effectiveView = isMobile ? "grid" : viewMode;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
      className="relative py-24 md:py-32"
      id="work"
      data-testid="projects-section"
    >
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        {/* ── Header row with toggle ─────────── */}
        <div className="mx-auto mb-12 flex max-w-7xl items-end justify-between">
          <Reveal>
            <SectionHeading
              title="Featured Work"
              subtitle="Selected projects that showcase my approach to engineering."
              aligned="left"
            />
          </Reveal>

          {/* View mode toggle — hidden on mobile */}
          <div
            className="hidden items-center gap-1 rounded-lg border border-border bg-bg-muted p-0.5 md:flex"
            data-testid="view-toggle"
          >
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                effectiveView === "grid"
                  ? "bg-accent text-white"
                  : "text-text-muted hover:text-text"
              )}
              aria-label="Grid view"
              aria-pressed={effectiveView === "grid"}
              data-testid="view-toggle-grid"
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("marquee")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                effectiveView === "marquee"
                  ? "bg-accent text-white"
                  : "text-text-muted hover:text-text"
              )}
              aria-label="Marquee view"
              aria-pressed={effectiveView === "marquee"}
              data-testid="view-toggle-marquee"
            >
              Marquee
            </button>
          </div>
        </div>

        {/* ── Grid view ──────────────────────── */}
        {effectiveView === "grid" && (
          <div className="mx-auto max-w-7xl" data-testid="projects-grid-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid gap-1 md:grid-cols-2"
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  variant="grid"
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* ── Marquee view ───────────────────── */}
        {effectiveView === "marquee" && (
          <div className="relative" data-testid="projects-marquee-wrapper">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: "none" }}
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  variant="marquee"
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-muted text-text-muted transition-colors hover:bg-bg-card hover:text-text"
                aria-label="Previous project"
                data-testid="marquee-prev"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-muted text-text-muted transition-colors hover:bg-bg-card hover:text-text"
                aria-label="Next project"
                data-testid="marquee-next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
