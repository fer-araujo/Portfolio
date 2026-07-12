import { describe, it, expect } from "vitest";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

describe("projects data", () => {
  it("has exactly 4 projects", () => {
    expect(projects).toHaveLength(4);
  });

  it("is ordered: anime-tracker, patient-management, school-system, pokedex", () => {
    expect(projects[0].id).toBe("anime-tracker");
    expect(projects[1].id).toBe("patient-management");
    expect(projects[2].id).toBe("school-system");
    expect(projects[3].id).toBe("pokedex");
  });

  it("does NOT contain this-portfolio", () => {
    const found = projects.find((p) => p.id === "this-portfolio" || p.title === "This Portfolio");
    expect(found).toBeUndefined();
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

  it("has patient-management (Patient Management) at index 1 with phase=planned", () => {
    const project = projects[1];
    expect(project.id).toBe("patient-management");
    expect(project.title).toBe("Patient Management");
    expect(project.featured).toBe(true);
    expect(project.category).toBe("web");
    expect(project.techStack).toContain("Vite");
    expect(project.githubUrl).toBe("https://github.com/fer-araujo/patient-management");
    expect(project.phase).toBe("planned");
  });

  it("has school-system (School Attendance System) at index 2 with phase=past", () => {
    const project = projects[2];
    expect(project.id).toBe("school-system");
    expect(project.title).toBe("School Attendance System");
    expect(project.featured).toBe(true);
    expect(project.category).toBe("web");
    expect(project.techStack).toContain("Firebase");
    expect(project.githubUrl).toBe("https://github.com/fer-araujo/school-system");
    expect(project.phase).toBe("past");
  });

  it("has pokedex (Pokédex App) at index 3 with phase=past", () => {
    const project = projects[3];
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

  describe("image count limits", () => {
    it.each([
      ["anime-tracker", 5],
      ["patient-management", 5],
      ["school-system", 5],
      ["pokedex", 5],
    ])("%s has at most %i images", (id, max) => {
      const project = projects.find((p) => p.id === id);
      expect(project).toBeDefined();
      const imageCount = project!.images?.length ?? 0;
      expect(imageCount).toBeLessThanOrEqual(max);
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
