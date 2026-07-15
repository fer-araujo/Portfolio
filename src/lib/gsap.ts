/**
 * Centralized GSAP + ScrollTrigger registration (RES-03).
 *
 * `registerPlugin` runs exactly once, at module scope, on first import.
 * Every gsap/ScrollTrigger consumer in the app MUST import from here so
 * the plugin is guaranteed registered before any `gsap.context`/`ScrollTrigger.create` use.
 *
 * Do NOT call `gsap.registerPlugin` from components — this is the single source.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
