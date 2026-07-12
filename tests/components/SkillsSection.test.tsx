import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillsSection } from "@/components/sections/SkillsSection";

// ── Mock skills data ───────────────────────────────────
vi.mock("@/content/skills", () => ({
  skills: [
    {
      category: "Languages",
      items: [
        { name: "TypeScript", level: "expert" },
        { name: "JavaScript", level: "expert" },
        { name: "PHP", level: "advanced" },
        { name: "Python", level: "advanced" },
      ],
    },
    {
      category: "Frontend",
      items: [
        { name: "React", level: "expert" },
        { name: "Next.js", level: "expert" },
        { name: "Tailwind CSS", level: "advanced" },
      ],
    },
  ],
}));

// ── Mock motion/react ──────────────────────────────────
const mockUseReducedMotion = vi.fn().mockReturnValue(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createTag(Tag: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) =>
    React.createElement(Tag, props, children);
}

vi.mock("motion/react", () => ({
  motion: {
    section: createTag("section"),
    div: createTag("div"),
    span: createTag("span"),
  },
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe("SkillsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it("renders the section heading", () => {
    render(<SkillsSection />);
    expect(screen.getByText(/skills & technologies/i)).toBeInTheDocument();
  });

  it("renders all category headings from the data", () => {
    render(<SkillsSection />);
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("renders all skill names", () => {
    render(<SkillsSection />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
  });

  it("renders the correct number of skill items per category", () => {
    render(<SkillsSection />);

    const languageCategory = screen.getByTestId("skills-category-Languages");
    expect(languageCategory).toBeInTheDocument();
    const languageItems = languageCategory.querySelectorAll("[data-skill-item]");
    expect(languageItems.length).toBe(4);

    const frontendCategory = screen.getByTestId("skills-category-Frontend");
    expect(frontendCategory).toBeInTheDocument();
    const frontendItems = frontendCategory.querySelectorAll("[data-skill-item]");
    expect(frontendItems.length).toBe(3);
  });

  it("renders category headings as h3 elements for accessible structure", () => {
    render(<SkillsSection />);
    const heading = screen.getByRole("heading", { name: /languages/i, level: 3 });
    expect(heading).toBeInTheDocument();
  });

  it("renders the section with a semantic section element", () => {
    const { container } = render(<SkillsSection />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies expert-level visual distinction to expert skill tags", () => {
    render(<SkillsSection />);
    const expertTag = screen.getByText("TypeScript");
    expect(expertTag.closest("[data-level]")).toHaveAttribute("data-level", "expert");
  });

  it("renders with responsive container classes", () => {
    const { container } = render(<SkillsSection />);
    const innerDiv = container.querySelector('[data-testid="skills-grid"]');
    expect(innerDiv).toBeInTheDocument();
  });

  it("renders section with correct id attribute for navigation", () => {
    render(<SkillsSection />);
    const section = screen.getByTestId("skills-section");
    expect(section).toHaveAttribute("id", "skills");
  });

  it("renders non-expert skills with correct data-level attribute", () => {
    render(<SkillsSection />);
    const phpTag = screen.getByText("PHP");
    expect(phpTag.closest("[data-level]")).toHaveAttribute("data-level", "advanced");
  });

  it("renders all category headings as h3 elements", () => {
    render(<SkillsSection />);
    const frontendHeading = screen.getByRole("heading", { name: /frontend/i, level: 3 });
    expect(frontendHeading).toBeInTheDocument();
  });

  it("renders without motion animation when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<SkillsSection />);
    expect(screen.getByText("Skills & Technologies")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
