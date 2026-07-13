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
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ═══════════════════════════════════════════════════
   Lenis Smooth Scroll — Provider + Hook
   ═══════════════════════════════════════════════════ */

interface LenisContextValue {
  /** Smooth-scroll to a target element or selector */
  scrollTo: (target: string | HTMLElement) => void;
  /** Stop Lenis (pause scroll — use when overlays/modals are open) */
  stop: () => void;
  /** Resume Lenis after stop */
  start: () => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

/**
 * Initialises the GSAP ScrollTrigger bridge for Lenis coexistence.
 * `registerPlugin` is centralised in `@/lib/gsap` (runs once at module scope).
 */
export function initGsapLenisBridge() {
  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * Provides Lenis smooth scroll to the component tree.
 * Uses a single gsap.ticker callback for the page lifetime — no recursive
 * raf loops that leak on modal open/close. Disables itself when
 * prefers-reduced-motion is active.
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

    // Single tracked callback on gsap's internal raf loop —
    // remove() cleanly detaches it on cleanup. No orphaned recursive raf.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  const scrollTo = useCallback((target: string | HTMLElement) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0 });
    }
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return (
    <LenisContext.Provider value={{ scrollTo, stop, start }}>
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
