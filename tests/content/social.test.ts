import { describe, it, expect } from "vitest";
import { socialLinks } from "@/content/social";

describe("social links data", () => {
  it("has exactly 2 social links", () => {
    expect(socialLinks).toHaveLength(2);
  });

  it("has GitHub with correct URL and handle", () => {
    const github = socialLinks.find((l) => l.platform === "GitHub");
    expect(github).toBeDefined();
    expect(github!.url).toBe("https://github.com/fer-araujo");
    expect(github!.handle).toBe("@fer-araujo");
    expect(github!.icon).toBe("github");
  });

  it("has LinkedIn", () => {
    const linkedin = socialLinks.find((l) => l.platform === "LinkedIn");
    expect(linkedin).toBeDefined();
    expect(linkedin!.url).toContain("linkedin.com");
  });

  it("does NOT have Twitter/X", () => {
    const twitter = socialLinks.find((l) => l.platform === "Twitter");
    expect(twitter).toBeUndefined();
  });

  it("does NOT have any other social platforms", () => {
    const platforms = socialLinks.map((l) => l.platform);
    expect(platforms).toEqual(["GitHub", "LinkedIn"]);
  });
});
