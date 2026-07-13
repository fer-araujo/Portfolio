"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/content/types";

interface FilmReelPanelProps {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}

/**
 * Full-bleed cinematic panel for the horizontal film reel.
 * 100vw × 100vh, background image with gradient overlay,
 * editorial text at bottom-left. Click triggers case study overlay.
 *
 * Uses a div with role="button" (not a <button>) to avoid invalid
 * HTML from nesting <a> links inside. Keyboard accessible via
 * tabIndex + onKeyDown (Enter/Space).
 */
export function FilmReelPanel({ project, index, onOpen }: FilmReelPanelProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project);
        }
      }}
      aria-label={`View case study: ${project.title}`}
      className="group relative h-screen w-screen flex-shrink-0 cursor-pointer overflow-hidden max-md:w-full max-md:h-auto max-md:min-h-[50vh] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-text"
    >
      {/* ── Background image ──────────────────── */}
      <Image
        src={project.thumbnail}
        alt={`${project.title} project screenshot`}
        fill
        className="object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
        sizes="100vw"
        priority={index === 0}
        loading={index >= 1 ? "lazy" : undefined}
      />

      {/* ── Gradient overlay ──────────────────── */}
      <div className="film-reel-gradient pointer-events-none absolute inset-0" />

      {/* ── Hover darken ──────────────────────── */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

      {/* ── Action links (top-right) ──────────── */}
      <div
        className="absolute right-4 top-20 z-20 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
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

      {/* ── Bottom-left text stack ────────────── */}
      <div className="absolute bottom-0 left-0 z-10 p-6 pb-8 md:p-10 md:pb-12 [text-shadow:_0_2px_12px_rgb(0_0_0_/_0.9)]">
        {/* Tagline (optional, only shows if data exists) */}
        {project.tagline && (
          <p className="mb-2 max-w-xl font-heading text-lg font-light italic tracking-wide text-white/80 md:text-xl">
            {project.tagline}
          </p>
        )}

        {/* Title */}
        <h3 className="mb-3 max-w-2xl font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          {project.title}
        </h3>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Tag key={tech} label={tech} variant="accent" />
          ))}
        </div>
      </div>
    </div>
  );
}
