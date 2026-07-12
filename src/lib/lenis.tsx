"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ═══════════════════════════════════════════════════
   Lenis Smooth Scroll — Provider + Hook
   ═══════════════════════════════════════════════════ */

interface LenisContextValue {
  /** Smooth-scroll to a target element or selector */
  scrollTo: (target: string | HTMLElement) => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

/**
 * Initialises the GSAP ScrollTrigger bridge for Lenis coexistence.
 * Must be called after ScrollTrigger is imported and before any
 * scroll-triggered animations are registered.
 */
export function initGsapLenisBridge() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * Provides Lenis smooth scroll to the component tree.
 * Disables itself when prefers-reduced-motion is active.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    initGsapLenisBridge();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  const scrollTo = useCallback(
    (target: string | HTMLElement) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: 0 });
      }
    },
    []
  );

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

/**
 * Hook to access Lenis smooth scroll.
 * Returns `null` when outside a LenisProvider or when
 * reduced motion is preferred (no Lenis instance active).
 */
export function useLenisScroll(): LenisContextValue | null {
  return useContext(LenisContext);
}
