"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ExternalLink, Maximize2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/types";

type CardVariant = "grid" | "marquee";

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: CardVariant;
  /** Called when user clicks the card to open the lightbox */
  onOpenLightbox?: (project: Project) => void;
}

/**
 * ProjectCard — full-bleed cinematic project panel.
 *
 * Displays the thumbnail as a background, with gradient overlay,
 * title, description, tech tags, and hover action links.
 * If the project has additional images, a "view gallery" indicator
 * appears on hover, and clicking opens the cinematic lightbox.
 */
export function ProjectCard({
  project,
  index = 0,
  variant = "grid",
  onOpenLightbox,
}: ProjectCardProps) {
  const prefersReduced = useReducedMotion();
  const hasGallery = project.images && project.images.length > 0;

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
        className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
        sizes={
          variant === "grid"
            ? "(max-width: 640px) 100vw, 50vw"
            : "85vw"
        }
        priority={index < 2}
      />

      {/* ── Gradient overlay (bottom→top) ────── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* ── Hover darken overlay ─────────────── */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

      {/* ── Gallery indicator (top-left) ─────── */}
      {hasGallery && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox?.(project);
          }}
          className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white group-hover:opacity-100"
          aria-label={`View ${project.images!.length + 1} screenshots of ${project.title}`}
        >
          <Maximize2 size={12} />
          {project.images!.length + 1} images
        </button>
      )}

      {/* ── Hover action links (top-right) ───── */}
      <div className="absolute right-4 top-4 z-20 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
    </motion.div>
  );
}
