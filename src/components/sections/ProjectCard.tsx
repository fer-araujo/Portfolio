"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/types";

type CardVariant = "grid" | "marquee";

interface ProjectCardProps {
  /** The project data to render */
  project: Project;
  /** Animation delay factor (index-based) */
  index?: number;
  /** Visual variant — grid (aspect ratio) or marquee (full-height slide) */
  variant?: CardVariant;
}

/**
 * ProjectCard renders a full-bleed project panel with the SVG thumbnail
 * as a background image, content overlaid, and hover-triggered action links.
 *
 * Grid variant: aspect-[4/3] with fixed minimum height, 2-column layout.
 * Marquee variant: viewport-height panel with snap scroll, wider aspect.
 */
export function ProjectCard({
  project,
  index = 0,
  variant = "grid",
}: ProjectCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      data-testid={`project-card-${project.id}`}
      data-variant={variant}
      layout
      initial={prefersReduced ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className={cn(
        "group relative overflow-hidden",
        variant === "grid"
          ? "aspect-[4/3] min-h-[280px] md:min-h-[320px]"
          : "h-[80vh] min-h-[500px] min-w-[85vw] snap-start"
      )}
    >
      {/* ── Background thumbnail ─────────────── */}
      <Image
        src={project.thumbnail}
        alt={`${project.title} project screenshot`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={
          variant === "grid"
            ? "(max-width: 640px) 100vw, 50vw"
            : "85vw"
        }
      />

      {/* ── Gradient overlay (bottom→top) ────── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* ── Hover darken overlay ─────────────── */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

      {/* ── Content overlay ──────────────────── */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h3 className="mb-2 text-xl font-heading font-bold tracking-tight text-white md:text-2xl">
          {project.title}
        </h3>
        <p className="mb-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Tag key={tech} label={tech} variant="accent" />
          ))}
        </div>
      </div>

      {/* ── Hover action links ───────────────── */}
      <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live Demo"
            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            <ExternalLink size={14} />
            Live
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}
