"use client";

import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Track scroll progress as a percentage (0 to 1).
 * Returns how far the user has scrolled through the page,
 * where 0 = top and 1 = bottom.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) {
      setProgress(0);
      return;
    }
    setProgress(Math.min(window.scrollY / scrollable, 1));
  }, []);

  useEffect(() => {
    handleScroll(); // set initial value
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return progress;
}

/**
 * Reactive media query hook.
 * Returns whether the given CSS media query string currently matches.
 * Updates reactively when the query state changes.
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (ev: MediaQueryListEvent) => setMatches(ev.matches);

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// Re-export motion's useReducedMotion for convenience
export { useReducedMotion };
