import { describe, it, expect } from "vitest";
import { skillDomains } from "@/content/skills";

describe("skillDomains data", () => {
  it("has 5-6 skill domains", () => {
    expect(skillDomains.length).toBeGreaterThanOrEqual(5);
    expect(skillDomains.length).toBeLessThanOrEqual(6);
  });

  it("each domain has required fields: id, domain, description, icon, technologies", () => {
    for (const domain of skillDomains) {
      expect(domain).toHaveProperty("id");
      expect(typeof domain.id).toBe("string");
      expect(domain.id.length).toBeGreaterThan(0);

      expect(domain).toHaveProperty("domain");
      expect(typeof domain.domain).toBe("string");
      expect(domain.domain.length).toBeGreaterThan(0);

      expect(domain).toHaveProperty("description");
      expect(typeof domain.description).toBe("string");
      expect(domain.description.length).toBeGreaterThan(0);

      expect(domain).toHaveProperty("icon");
      expect(typeof domain.icon).toBe("string");
      expect(domain.icon.length).toBeGreaterThan(0);

      expect(domain).toHaveProperty("technologies");
      expect(Array.isArray(domain.technologies)).toBe(true);
      expect(domain.technologies.length).toBeGreaterThan(0);
    }
  });

  it("each technology has a name and a level of 'expert' or 'advanced'", () => {
    for (const domain of skillDomains) {
      for (const tech of domain.technologies) {
        expect(tech).toHaveProperty("name");
        expect(typeof tech.name).toBe("string");
        expect(tech.name.length).toBeGreaterThan(0);

        expect(tech).toHaveProperty("level");
        expect(["expert", "advanced"]).toContain(tech.level);
      }
    }
  });

  it("has Architecture & Systems as the first domain", () => {
    const first = skillDomains[0];
    expect(first.domain).toBe("Architecture & Systems");
    expect(first.icon).toBe("Boxes");
  });

  it("has Frontend Engineering domain with React, Next.js, TypeScript", () => {
    const frontend = skillDomains.find((d) => d.domain === "Frontend Engineering");
    expect(frontend).toBeDefined();
    const names = frontend!.technologies.map((t) => t.name);
    expect(names).toContain("React");
    expect(names).toContain("Next.js");
    expect(names).toContain("TypeScript");
  });

  it("has at least one expert-level technology in most domains", () => {
    const domainsWithExpert = skillDomains.filter((d) =>
      d.technologies.some((t) => t.level === "expert")
    );
    // At least 4 of 5 domains should have expert techs
    expect(domainsWithExpert.length).toBeGreaterThanOrEqual(4);
  });

  it("does NOT contain old SkillCategory structure with categories and items", () => {
    // skillDomains should be the new SkillDomain[] — no old-style categories
    for (const domain of skillDomains) {
      expect(domain).not.toHaveProperty("category");
      expect(domain).not.toHaveProperty("items");
    }
  });

  it("excludes Angular, Vue, React Native, Laravel, and ColdFusion from all technologies", () => {
    const allNames = skillDomains.flatMap((d) => d.technologies.map((t) => t.name));
    const excluded = ["Angular", "Vue.js", "React Native", "Laravel", "ColdFusion"];
    for (const name of excluded) {
      expect(allNames).not.toContain(name);
    }
  });
});
