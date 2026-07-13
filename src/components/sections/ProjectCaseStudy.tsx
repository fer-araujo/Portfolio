"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Tag } from "@/components/ui/Tag";
import { useLenisScroll } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";
import type { Project } from "@/content/types";

interface ProjectCaseStudyProps {
  project: Project;
  onClose: () => void;
}

export function ProjectCaseStudy({ project, onClose }: ProjectCaseStudyProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenisScroll();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- required for portal mounting
    setMounted(true);
    // Capture the element that opened this modal so we can restore focus on close
    triggerRef.current = document.activeElement as HTMLElement;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    lenis?.destroy();
    ScrollTrigger.normalizeScroll(false);
    ScrollTrigger.getAll().forEach((st) => st.disable());
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      ScrollTrigger.getAll().forEach((st) => st.enable());
      ScrollTrigger.normalizeScroll(true);
      window.scrollTo(0, scrollY);
      ScrollTrigger.refresh();
      lenis?.init();
      // Restore focus to the trigger element
      triggerRef.current?.focus();
    };
  }, [lenis]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const allImages =
    project.images && project.images.length > 0
      ? project.images
      : [project.thumbnail];

  if (!mounted) return null;

  return createPortal(
    <>
      <motion.div
        data-testid="case-study-backdrop"
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        data-testid="case-study-scroll-container"
        className="fixed inset-0 z-[101] overflow-y-auto overscroll-contain touch-pan-y"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <div
          ref={dialogRef}
          data-testid="case-study-scroll-area"
          className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 lg:px-8"
        >
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2
                id="case-study-title"
                className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl"
              >
                {project.title}
              </h2>
              {project.tagline && (
                <p className="mt-2 font-heading text-lg italic text-accent-text">
                  {project.tagline}
                </p>
              )}
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Close case study"
            >
              <X size={24} />
            </button>
          </div>

          {/* Hero image */}
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={project.thumbnail}
              alt={`${project.title} hero image`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>

          {/* Narrative text */}
          {project.narrativeText && (
            <p className="mb-12 max-w-3xl text-lg leading-relaxed text-white/70">
              {project.narrativeText}
            </p>
          )}

          {/* Problem / Solution / Impact */}
          <div className="mb-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-accent-text">
                Problem
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                {project.longDescription.problem}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-accent-text">
                Solution
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                {project.longDescription.solution}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-accent-text">
                Impact
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                {project.longDescription.impact}
              </p>
            </div>
          </div>

          {/* Screenshot gallery */}
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {allImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-video w-full overflow-hidden rounded-lg"
              >
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-white/50">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Tag key={tech} label={tech} variant="accent" />
              ))}
            </div>
          </div>

          {/* Stats */}
          {project.stats && project.stats.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-6">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                    {stat.label}
                  </p>
                  <p className="font-heading text-xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Action links */}
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={`GitHub: ${project.title}`}
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={`Live Demo: ${project.title}`}
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
