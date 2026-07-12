import { describe, it, expect } from "vitest";
import { projects } from "@/content/projects";

describe("projects data", () => {
  it("has exactly 3 projects", () => {
    expect(projects).toHaveLength(3);
  });

  it("has school-system (School Attendance System)", () => {
    const project = projects.find((p) => p.id === "school-system");
    expect(project).toBeDefined();
    expect(project!.title).toBe("School Attendance System");
    expect(project!.featured).toBe(true);
    expect(project!.category).toBe("web");
    expect(project!.techStack).toContain("Firebase");
    expect(project!.githubUrl).toBe("https://github.com/fer-araujo/school-system");
  });

  it("has anime-tracker (Anime Tracker)", () => {
    const project = projects.find((p) => p.id === "anime-tracker");
    expect(project).toBeDefined();
    expect(project!.title).toBe("Anime Tracker");
    expect(project!.featured).toBe(true);
    expect(project!.category).toBe("web");
    expect(project!.techStack).toContain("TMDB API");
    expect(project!.liveUrl).toBe("https://your-anime-tracker.vercel.app");
    expect(project!.githubUrl).toBe("https://github.com/fer-araujo/anime-tracker");
  });

  it("has patient-management (Patient Management)", () => {
    const project = projects.find((p) => p.id === "patient-management");
    expect(project).toBeDefined();
    expect(project!.title).toBe("Patient Management");
    expect(project!.featured).toBe(true);
    expect(project!.category).toBe("web");
    expect(project!.techStack).toContain("Vite");
    expect(project!.githubUrl).toBe("https://github.com/fer-araujo/patient-management");
  });

  it("does NOT have the old CAT platform project", () => {
    const catProject = projects.find((p) => p.id === "cat-platform");
    expect(catProject).toBeUndefined();
  });

  it("does NOT have the old portfolio-2026 project entry", () => {
    const portfolio = projects.find((p) => p.id === "portfolio-2026");
    expect(portfolio).toBeUndefined();
  });

  it("does NOT have projectCategories or getProjectCategory exports", async () => {
    // Dynamic import to check exports
    const mod = await import("@/content/projects");
    expect((mod as Record<string, unknown>).projectCategories).toBeUndefined();
    expect((mod as Record<string, unknown>).getProjectCategory).toBeUndefined();
  });
});
