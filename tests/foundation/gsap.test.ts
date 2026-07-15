import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join } from "node:path";

/**
 * T2 — Centralize gsap registration in src/lib/gsap.ts (RES-03).
 * Spec: registerPlugin exactly once, in src/lib/gsap.ts module scope.
 * Components import { gsap, ScrollTrigger } from "@/lib/gsap".
 */

const SRC = resolve(__dirname, "../../src");

/** Recursively list .ts/.tsx files under a directory. */
function listTsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...listTsFiles(full));
    } else if (/\.(ts|tsx)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const allSrcFiles = listTsFiles(SRC);

describe("src/lib/gsap module re-exports (RES-03)", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("exports gsap and ScrollTrigger after registering the plugin at module scope", async () => {
    const registerPlugin = vi.fn();
    const fakeScrollTrigger = {
      normalizeScroll: vi.fn(),
      config: vi.fn(),
      update: vi.fn(),
    };
    vi.doMock("gsap", () => ({ gsap: { registerPlugin } }));
    vi.doMock("gsap/ScrollTrigger", () => ({ ScrollTrigger: fakeScrollTrigger }));

    const mod = await import("@/lib/gsap");

    // Re-exports are wired to the mocked singletons
    expect(mod.gsap).toBeDefined();
    expect(mod.ScrollTrigger).toBe(fakeScrollTrigger);
    // Plugin registered exactly once at module scope
    expect(registerPlugin).toHaveBeenCalledTimes(1);
    expect(registerPlugin).toHaveBeenCalledWith(fakeScrollTrigger);
  });
});

describe("gsap centralization across src (RES-03)", () => {
  it("calls registerPlugin exactly once, and only in src/lib/gsap.ts", () => {
    // Match actual CALLS (`registerPlugin(`), not the word in comments.
    const matches: string[] = [];
    for (const file of allSrcFiles) {
      const content = readFileSync(file, "utf-8");
      if (/registerPlugin\s*\(/.test(content)) {
        matches.push(relative(SRC, file).replace(/\\/g, "/"));
      }
    }
    expect(matches).toEqual(["lib/gsap.ts"]);
  });

  it("no component or lenis provider imports gsap/ScrollTrigger directly", () => {
    // Every gsap consumer must import from "@/lib/gsap" instead of the raw packages.
    const consumers = allSrcFiles.filter((f) => {
      const norm = f.replace(/\\/g, "/");
      return (
        /\/(components|lib)\//.test(norm) &&
        !norm.endsWith("lib/gsap.ts")
      );
    });
    const offenders: string[] = [];
    for (const file of consumers) {
      const content = readFileSync(file, "utf-8");
      if (/from\s+["']gsap["']/.test(content) || /from\s+["']gsap\/ScrollTrigger["']/.test(content)) {
        offenders.push(relative(SRC, file).replace(/\\/g, "/"));
      }
    }
    expect(offenders).toEqual([]);
  });

  it("src/lib/gsap.ts imports gsap and ScrollTrigger from the raw packages", () => {
    const gsapFile = readFileSync(resolve(SRC, "lib/gsap.ts"), "utf-8");
    expect(gsapFile).toMatch(/from\s+["']gsap["']/);
    expect(gsapFile).toMatch(/from\s+["']gsap\/ScrollTrigger["']/);
  });
});
