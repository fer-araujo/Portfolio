"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/content/types";

interface ProjectLightboxProps {
  project: Project;
  onClose: () => void;
}

/** All images for this project: thumbnail + extra images */
function getAllImages(project: Project): string[] {
  return [project.thumbnail, ...(project.images ?? [])];
}

/**
 * Cinematic fullscreen image gallery.
 *
 * Opens as an overlay with backdrop-blur, smooth image transitions,
 * keyboard navigation, dot indicators, and image counter.
 * Minimalist aesthetic — dark, clean, lets the screenshots speak.
 */
export function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  const images = getAllImages(project);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = useCallback(
    (index: number, dir: 1 | -1 = 1) => {
      setDirection(dir);
      setCurrent(((index % images.length) + images.length) % images.length);
    },
    [images.length]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  /* ── Keyboard navigation ─────────────────── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          next();
          break;
        case "ArrowLeft":
          prev();
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
        onClick={onClose}
        role="dialog"
        aria-label={`${project.title} image gallery`}
      >
        {/* ── Close button ────────────────────── */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Close gallery"
        >
          <X size={24} />
        </button>

        {/* ── Image counter ──────────────────── */}
        <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/60 backdrop-blur-sm tabular-nums">
          {current + 1} / {images.length}
        </div>

        {/* ── Image ──────────────────────────── */}
        <div
          className="relative flex h-full w-full items-center justify-center p-8 pt-20 pb-24"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={images[current]}
                alt={`${project.title} screenshot ${current + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation arrows ──────────────── */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/40 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/40 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}

        {/* ── Dot indicators ─────────────────── */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i, i > current ? 1 : -1);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-white"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* ── Project title ──────────────────── */}
        <div className="absolute bottom-16 left-4 right-4 z-10 text-center md:hidden">
          <p className="text-sm font-medium text-white/50">{project.title}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
