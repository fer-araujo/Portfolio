import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as BrandIcons from "@/components/ui/BrandIcons";

describe("BrandIcons", () => {
  it("exports GithubIcon", () => {
    expect(BrandIcons.GithubIcon).toBeDefined();
  });

  it("exports LinkedinIcon", () => {
    expect(BrandIcons.LinkedinIcon).toBeDefined();
  });

  it("does NOT export TwitterIcon", () => {
    expect(
      (BrandIcons as Record<string, unknown>).TwitterIcon
    ).toBeUndefined();
  });

  it("GithubIcon renders an svg element", () => {
    render(<BrandIcons.GithubIcon data-testid="icon-github" />);
    const svg = screen.getByTestId("icon-github");
    expect(svg).toBeInTheDocument();
    expect(svg.tagName).toBe("svg");
  });

  it("LinkedinIcon renders an svg element", () => {
    render(<BrandIcons.LinkedinIcon data-testid="icon-linkedin" />);
    const svg = screen.getByTestId("icon-linkedin");
    expect(svg).toBeInTheDocument();
    expect(svg.tagName).toBe("svg");
  });
});
