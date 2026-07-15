import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillsSection } from "@/components/sections/SkillsSection";

// ── Mock skillDomains data ──────────────────────────────
vi.mock("@/content/skills", () => ({
  skillDomains: [
    {
      id: "architecture",
      domain: "Architecture & Systems",
      description: "Designing scalable architectures",
      icon: "Boxes",
      technologies: [
        { name: "System Design", level: "expert" },
        { name: "Hexagonal Architecture", level: "expert" },
        { name: "Micro-frontends", level: "advanced" },
      ],
    },
    {
      id: "frontend",
      domain: "Frontend Engineering",
      description: "Building performant UIs",
      icon: "Code2",
      technologies: [
        { name: "React", level: "expert" },
        { name: "Next.js", level: "expert" },
        { name: "TypeScript", level: "expert" },
        { name: "Tailwind CSS", level: "advanced" },
      ],
    },
    {
      id: "backend",
      domain: "Backend & APIs",
      description: "Robust APIs and services",
      icon: "Server",
      technologies: [
        { name: "Node.js", level: "advanced" },
        { name: "REST/GraphQL", level: "advanced" },
      ],
    },
  ],
}));

// ── Mock motion/react ──────────────────────────────────
const mockUseReducedMotion = vi.fn().mockReturnValue(false);

vi.mock("motion/react", () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

// ── Mock lucide-react icons ──────────────────────────────
vi.mock("lucide-react", () => {
  const Icon = ({ className }: { className?: string }) =>
    React.createElement("svg", { className, "data-testid": "lucide-icon" });
  return { Boxes: Icon, Code2: Icon, Server: Icon, Users: Icon, Rocket: Icon };
});

// ── Mock @/lib/gsap (centralised gsap + ScrollTrigger) ──────────────────────────
const mockCtxRevert = vi.fn();

vi.mock("@/lib/gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: vi.fn((fn: () => void) => {
      fn();
      return { revert: mockCtxRevert };
    }),
    fromTo: vi.fn(),
    to: vi.fn(),
  },
  ScrollTrigger: {
    normalizeScroll: vi.fn(),
    config: vi.fn(),
    update: vi.fn(),
  },
}));

describe("SkillsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it("renders the expertise eyebrow label", () => {
    render(<SkillsSection />);
    expect(screen.getByText(/expertise/i)).toBeInTheDocument();
  });

  it("renders the bold headline", () => {
    render(<SkillsSection />);
    expect(screen.getByText(/engineering at scale/i)).toBeInTheDocument();
  });

  it("renders the intro paragraph", () => {
    render(<SkillsSection />);
    expect(screen.getByText(/six years of building/i)).toBeInTheDocument();
  });

  it("renders all domain names", () => {
    render(<SkillsSection />);
    expect(screen.getByText("Architecture & Systems")).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineering")).toBeInTheDocument();
    expect(screen.getByText("Backend & APIs")).toBeInTheDocument();
  });

  it("renders domain descriptions", () => {
    render(<SkillsSection />);
    expect(screen.getByText("Designing scalable architectures")).toBeInTheDocument();
    expect(screen.getByText("Building performant UIs")).toBeInTheDocument();
    expect(screen.getByText("Robust APIs and services")).toBeInTheDocument();
  });

  it("renders Lucide icons for each domain", () => {
    render(<SkillsSection />);
    const icons = screen.getAllByTestId("lucide-icon");
    expect(icons.length).toBe(3);
  });

  it("renders all technology names", () => {
    render(<SkillsSection />);
    expect(screen.getByText("System Design")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("expert-level tech tags exist in correct quantity", () => {
    render(<SkillsSection />);
    const expertTags = screen
      .getAllByTestId("skill-tag")
      .filter((tag) => tag.getAttribute("data-level") === "expert");
    expect(expertTags.length).toBe(5);
  });

  it("advanced-level tech tags are muted", () => {
    render(<SkillsSection />);
    const adv = screen
      .getAllByTestId("skill-tag")
      .filter((tag) => tag.getAttribute("data-level") === "advanced");
    expect(adv.length).toBeGreaterThanOrEqual(1);
    for (const tag of adv) {
      expect(tag.className).toContain("text-text-muted");
    }
  });

  it("GSAP animation targets exist", () => {
    render(<SkillsSection />);
    const items = document.querySelectorAll("[data-gsap-skill-item]");
    expect(items.length).toBe(3);
  });

  it("section has correct id for navigation", () => {
    render(<SkillsSection />);
    expect(screen.getByTestId("skills-section")).toHaveAttribute("id", "skills");
  });

  it("renders correct total technology tags", () => {
    render(<SkillsSection />);
    const allTags = screen.getAllByTestId("skill-tag");
    expect(allTags.length).toBe(9);
  });

  it("renders without crashing when reduced motion preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<SkillsSection />);
    expect(screen.getByText(/expertise/i)).toBeInTheDocument();
  });
});
