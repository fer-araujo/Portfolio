import { describe, it, expect } from "vitest";
import { skills } from "@/content/skills";

describe("skills data", () => {
  it("has 17 total skills across all categories", () => {
    const total = skills.reduce((sum, cat) => sum + cat.items.length, 0);
    expect(total).toBe(17);
  });

  it("has 5 categories (Languages, Frontend, Backend, Databases, Tools & Platforms)", () => {
    expect(skills).toHaveLength(5);
  });

  it("does NOT include Angular", () => {
    const allNames = skills.flatMap((c) => c.items.map((i) => i.name));
    expect(allNames).not.toContain("Angular");
  });

  it("does NOT include Vue.js", () => {
    const allNames = skills.flatMap((c) => c.items.map((i) => i.name));
    expect(allNames).not.toContain("Vue.js");
  });

  it("does NOT include React Native", () => {
    const allNames = skills.flatMap((c) => c.items.map((i) => i.name));
    expect(allNames).not.toContain("React Native");
  });

  it("does NOT include Laravel", () => {
    const allNames = skills.flatMap((c) => c.items.map((i) => i.name));
    expect(allNames).not.toContain("Laravel");
  });

  it("does NOT include ColdFusion", () => {
    const allNames = skills.flatMap((c) => c.items.map((i) => i.name));
    expect(allNames).not.toContain("ColdFusion");
  });

  it("includes Tailwind CSS at advanced level in Frontend", () => {
    const frontend = skills.find((c) => c.category === "Frontend");
    expect(frontend).toBeDefined();

    const tailwind = frontend!.items.find((i) => i.name === "Tailwind CSS");
    expect(tailwind).toBeDefined();
    expect(tailwind!.level).toBe("advanced");
  });

  it("has expert-level entries for TypeScript and JavaScript", () => {
    const allNames = skills.flatMap((c) => c.items.map((i) => i.name));
    expect(allNames).toContain("TypeScript");
    expect(allNames).toContain("JavaScript");
  });
});
