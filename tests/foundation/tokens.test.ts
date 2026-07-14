import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * T1 — globals.css token + scroll-behavior contract.
 * Spec: VIS-01 (accent-text >=4.5:1), VIS-02 (accent-teal defined),
 * MOT-05 (no top-level smooth; .lenis.lenis-smooth override).
 *
 * Structural test: reads the CSS artifact and asserts the contract.
 * This is a config/constant definition — triangulation skipped (single output).
 */
const globalsPath = resolve(__dirname, "../../src/app/globals.css");
const css = readFileSync(globalsPath, "utf-8");

describe("globals.css — accent tokens (VIS-01, VIS-02)", () => {
  it("defines --color-accent-text at oklch(0.62 0.20 160) for text usage", () => {
    expect(css).toContain("--color-accent-text: oklch(0.62 0.20 160)");
  });

  it("defines --color-accent-teal at oklch(0.60 0.14 200) for aurora", () => {
    expect(css).toContain("--color-accent-teal: oklch(0.60 0.14 200)");
  });
});

describe("globals.css — scroll-behavior (MOT-05)", () => {
  it("does NOT set a default scroll-behavior: smooth declaration on html", () => {
    // The top-level `html { scroll-behavior: smooth; }` rule conflicts with Lenis.
    // We assert no *declaration* (`scroll-behavior: smooth;` with semicolon) exists.
    // The `@supports (scroll-behavior: smooth)` feature query (no semicolon) is a
    // capability test, not a declaration — it is allowed to remain.
    expect(css).not.toContain("scroll-behavior: smooth;");
  });

  it("adds the .lenis.lenis-smooth override to force auto scrolling", () => {
    expect(css).toContain(".lenis.lenis-smooth");
    expect(css).toMatch(/\.lenis\.lenis-smooth\s*\{[^}]*scroll-behavior:\s*auto\s*!important/i);
  });

  it("keeps the prefers-reduced-motion block intact", () => {
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
