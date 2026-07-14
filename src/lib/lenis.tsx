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
  /** Destroy Lenis (use when overlays/modals are open — releases wheel events) */
  destroy: () => void;
  /** Recreate Lenis after destroy */
  init: () => void;
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

function createLenis(): Lenis {
  return new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });
}

/**
 * Provides Lenis smooth scroll to the component tree.
 *
 * Uses a single gsap.ticker callback that reads from lenisRef — this way
 * destroy/init can swap instances without spawning new raf loops (fixes the
 * compounding leak). The ticker callback calls raf on whatever instance
 * the ref currently points to (or no-ops if null after destroy).
 *
 * Disables itself when prefers-reduced-motion is active.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    initGsapLenisBridge();

    const lenis = createLenis();
    lenis.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenis;

    // Single ticker callback — reads from ref, works across destroy/init.
    // No recursive raf, no orphaned loops. remove() cleanly detaches on unmount.
    const onTick = (time: number) => {
      lenisRef.current?.raf(time * 1000);
    };
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

  const destroy = useCallback(() => {
    lenisRef.current?.destroy();
    lenisRef.current = null;
  }, []);

  const init = useCallback(() => {
    if (prefersReduced || lenisRef.current) return;
    const lenis = createLenis();
    lenis.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenis;
    // No new raf loop — the gsap.ticker callback reads from ref automatically.
  }, [prefersReduced]);

  return (
    <LenisContext.Provider value={{ scrollTo, destroy, init }}>
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
