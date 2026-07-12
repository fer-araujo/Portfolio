"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Film grain texture overlay — the signature cinematic detail.
 *
 * Uses SVG `<filter>` with `feTurbulence` to create a subtle
 * analog film grain effect over the entire page.
 *
 * - Deferred: activates 500ms after page load (down from 3.5s)
 * - Pointer-events: none (doesn't block interactions)
 * - Opacity: 0.10 (increased from 0.04 for more texture depth)
 * - Respects reduced-motion: disabled entirely
 * - Static — no re-renders or animations after mount
 */
export function FilmGrain() {
  const [active, setActive] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const timer = setTimeout(() => {
      setActive(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [prefersReduced]);

  if (!active) return null;

  return (
    <svg
      data-testid="film-grain"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
      style={{ pointerEvents: "none", opacity: 0.1 }}
    >
      <filter id="film-grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#film-grain-filter)" />
    </svg>
  );
}
