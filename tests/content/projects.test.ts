import { describe, it, expect } from "vitest";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

describe("projects data", () => {
  it("has exactly 5 projects", () => {
    expect(projects).toHaveLength(5);
  });

  it("is ordered: anime-tracker, this-portfolio, patient-management, school-system, pokedex", () => {
    expect(projects[0].id).toBe("anime-tracker");
    expect(projects[1].id).toBe("this-portfolio");
    expect(projects[2].id).toBe("patient-management");
    expect(projects[3].id).toBe("school-system");
    expect(projects[4].id).toBe("pokedex");
  });

  it("has this-portfolio at index 1 with editorial fields", () => {
    const project = projects[1];
    expect(project.id).toBe("this-portfolio");
    expect(project.title).toBe("This Portfolio");
    expect(project.description).toBe("Handcrafted. Cinematic. Intentional.");
    expect(project.tagline).toBe("Craft over templates. Intent over filler.");
    expect(project.phase).toBe("current");
    expect(project.narrativeText).toContain("Every detail");
    expect(project.stats).toBeDefined();
    expect(project.stats).toHaveLength(3);
    expect(project.stats![0]).toEqual({ label: "Stack", value: "Next.js 16" });
    expect(project.stats![1]).toEqual({ label: "Animation", value: "GSAP + Motion" });
    expect(project.stats![2]).toEqual({ label: "Design", value: "Tailwind v4" });
    expect(project.techStack).toContain("GSAP");
    expect(project.githubUrl).toBe("https://github.com/fer-araujo/portfolio-2026");
  });

  it("has anime-tracker (Anime Tracker) at index 0", () => {
    const project = projects[0];
    expect(project.id).toBe("anime-tracker");
    expect(project.title).toBe("Anime Tracker");
    expect(project.featured).toBe(true);
    expect(project.category).toBe("web");
    expect(project.techStack).toContain("TMDB API");
    expect(project.liveUrl).toBe("https://anime-tracker-hazel-pi.vercel.app");
    expect(project.githubUrl).toBe("https://github.com/fer-araujo/anime-tracker");
  });

  it("has patient-management (Patient Management) at index 2 with phase=planned", () => {
    const project = projects[2];
    expect(project.id).toBe("patient-management");
    expect(project.title).toBe("Patient Management");
    expect(project.featured).toBe(true);
    expect(project.category).toBe("web");
    expect(project.techStack).toContain("Vite");
    expect(project.githubUrl).toBe("https://github.com/fer-araujo/patient-management");
    expect(project.phase).toBe("planned");
  });

  it("has school-system (School Attendance System) at index 3 with phase=past", () => {
    const project = projects[3];
    expect(project.id).toBe("school-system");
    expect(project.title).toBe("School Attendance System");
    expect(project.featured).toBe(true);
    expect(project.category).toBe("web");
    expect(project.techStack).toContain("Firebase");
    expect(project.githubUrl).toBe("https://github.com/fer-araujo/school-system");
    expect(project.phase).toBe("past");
  });

  it("has pokedex (Pokédex App) at index 4 with phase=past", () => {
    const project = projects[4];
    expect(project.id).toBe("pokedex");
    expect(project.title).toBe("Pokédex App");
    expect(project.featured).toBe(true);
    expect(project.category).toBe("web");
    expect(project.techStack).toContain("API Integration");
    expect(project.githubUrl).toBe("https://github.com/fer-araujo/pokedex");
    expect(project.phase).toBe("past");
  });

  it("all projects are featured", () => {
    projects.forEach((project) => {
      expect(project.featured).toBe(true);
    });
  });

  it("old projects are NOT in the array", () => {
    expect(projects.find((p) => p.id === "madlions")).toBeUndefined();
    expect(projects.find((p) => p.id === "cat-platform")).toBeUndefined();
  });

  it("does NOT have projectCategories or getProjectCategory exports", async () => {
    const mod = await import("@/content/projects");
    expect((mod as Record<string, unknown>).projectCategories).toBeUndefined();
    expect((mod as Record<string, unknown>).getProjectCategory).toBeUndefined();
  });

  it("all project thumbnails use .png extension", () => {
    projects.forEach((project) => {
      expect(project.thumbnail).toMatch(/\.png$/);
    });
  });

  describe("optional editorial fields", () => {
    it("tagline is optional — some projects lack it", () => {
      const withoutTagline = projects.filter((p: Project) => !p.tagline);
      // At least some projects should NOT have tagline
      expect(withoutTagline.length).toBeGreaterThan(0);
    });

    it("narrativeText is optional — some projects lack it", () => {
      const withoutNarrative = projects.filter((p: Project) => !p.narrativeText);
      expect(withoutNarrative.length).toBeGreaterThan(0);
    });

    it("stats is optional — some projects lack it", () => {
      const withoutStats = projects.filter((p: Project) => !p.stats);
      expect(withoutStats.length).toBeGreaterThan(0);
    });

    it("phase values are valid", () => {
      const validPhases = new Set(["past", "current", "planned"]);
      projects.forEach((p: Project) => {
        if (p.phase) {
          expect(validPhases.has(p.phase)).toBe(true);
        }
      });
    });

    it("stats items have label and value", () => {
      projects.forEach((p: Project) => {
        if (p.stats) {
          p.stats.forEach((stat) => {
            expect(stat).toHaveProperty("label");
            expect(stat).toHaveProperty("value");
          });
        }
      });
    });
  });
});
