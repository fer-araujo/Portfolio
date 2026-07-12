import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExperienceSection } from "@/components/sections/ExperienceSection";

// ── Mock experience data ──────────────────────────────
vi.mock("@/content/experience", () => ({
  experiences: [
    {
      id: "current-co",
      company: "Current Company",
      role: "Senior Software Engineer",
      startDate: "2023-01",
      current: true,
      achievements: [
        "Architected and delivered a design system serving 5 product teams",
        "Reduced bundle size by 45% through code-splitting optimization",
      ],
    },
    {
      id: "prev-co",
      company: "Previous Company",
      role: "Software Engineer II",
      startDate: "2020-06",
      endDate: "2022-12",
      current: false,
      achievements: [
        "Built real-time collaborative features serving 100K+ daily active users",
      ],
    },
    {
      id: "startup-co",
      company: "Early Startup",
      role: "Full Stack Developer",
      startDate: "2018-03",
      endDate: "2020-05",
      current: false,
      achievements: [
        "Built the MVP that secured $2M in seed funding",
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
    div: createTag("div"),
    span: createTag("span"),
  },
  useReducedMotion: () => mockUseReducedMotion(),
}));

// ── Mock GSAP + ScrollTrigger ──────────────────────────
const mockCtxRevert = vi.fn();

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: vi.fn((fn: () => void) => {
      fn();
      return { revert: mockCtxRevert };
    }),
    timeline: vi.fn(() => ({
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
    })),
    fromTo: vi.fn(),
    to: vi.fn(),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    normalizeScroll: vi.fn(),
    config: vi.fn(),
    update: vi.fn(),
  },
}));

// ── Mock lucide-react ──────────────────────────────────
vi.mock("lucide-react", () => ({
  Briefcase: () => <svg data-testid="icon-briefcase" />,
}));

describe("ExperienceSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it("renders the section heading", () => {
    render(<ExperienceSection />);
    expect(screen.getByText(/experience/i)).toBeInTheDocument();
  });

  it("renders all company names in order", () => {
    render(<ExperienceSection />);
    const companies = screen.getAllByTestId("experience-company");
    expect(companies.length).toBe(3);
    expect(companies[0]).toHaveTextContent("Current Company");
    expect(companies[1]).toHaveTextContent("Previous Company");
    expect(companies[2]).toHaveTextContent("Early Startup");
  });

  it("renders all role titles", () => {
    render(<ExperienceSection />);
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer II")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
  });

  it("shows a current indicator for the active role", () => {
    render(<ExperienceSection />);
    const currentEntry = screen.getByTestId("experience-current-co");
    expect(currentEntry).toBeInTheDocument();
    expect(currentEntry).toHaveAttribute("data-current");
  });

  it("renders achievements for each entry", () => {
    render(<ExperienceSection />);
    expect(
      screen.getByText(
        "Architected and delivered a design system serving 5 product teams"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Built real-time collaborative features serving 100K+ daily active users"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Built the MVP that secured $2M in seed funding")
    ).toBeInTheDocument();
  });

  it("renders the section as a semantic section element", () => {
    const { container } = render(<ExperienceSection />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders date range for non-current roles", () => {
    render(<ExperienceSection />);
    const prevEntry = screen.getByTestId("experience-prev-co");
    expect(prevEntry).toBeInTheDocument();
    expect(screen.getByText("2020 — 2022")).toBeInTheDocument();
  });

  it("renders 'Present' for the current role date", () => {
    render(<ExperienceSection />);
    expect(screen.getByText(/present/i)).toBeInTheDocument();
  });

  it("renders section with correct id attribute for navigation", () => {
    render(<ExperienceSection />);
    const section = screen.getByTestId("experience-section");
    expect(section).toHaveAttribute("id", "experience");
  });

  it("does not set data-current on non-current entries", () => {
    render(<ExperienceSection />);
    const prevEntry = screen.getByTestId("experience-prev-co");
    expect(prevEntry).not.toHaveAttribute("data-current");
    const startupEntry = screen.getByTestId("experience-startup-co");
    expect(startupEntry).not.toHaveAttribute("data-current");
  });

  it("renders current badge with text 'Current'", () => {
    render(<ExperienceSection />);
    const currentBadge = screen.getByTestId("current-badge");
    expect(currentBadge).toBeInTheDocument();
    expect(currentBadge).toHaveTextContent(/current/i);
  });

  it("renders GSAP timeline draw line element", () => {
    const { container } = render(<ExperienceSection />);
    const line = container.querySelector("[data-gsap-timeline-line]");
    expect(line).toBeInTheDocument();
  });

  it("renders GSAP entry animation targets on each experience", () => {
    render(<ExperienceSection />);
    const currentEntry = screen.getByTestId("experience-current-co");
    expect(currentEntry).toHaveAttribute("data-gsap-entry");

    const prevEntry = screen.getByTestId("experience-prev-co");
    expect(prevEntry).toHaveAttribute("data-gsap-entry");
  });

  it("renders GSAP achievement stagger targets within entries", () => {
    render(<ExperienceSection />);
    const currentEntry = screen.getByTestId("experience-current-co");
    const achievements = currentEntry.querySelectorAll("[data-gsap-achievement]");
    expect(achievements.length).toBe(2);
  });

  it("renders without motion animation when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<ExperienceSection />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Current Company")).toBeInTheDocument();
  });

  it("renders section with diagonal dot background pattern", () => {
    render(<ExperienceSection />);
    const section = screen.getByTestId("experience-section");
    expect(section.className).toContain("diagonal-dot");
    expect(section.className).not.toContain("diagonal-dot-bg");
  });

  it("renders gradient overlay using Tailwind classes not inline style", () => {
    const { container } = render(<ExperienceSection />);
    // The second absolute overlay div (after parallax) should use Tailwind gradient classes
    const overlays = container.querySelectorAll("[aria-hidden='true']");
    // There should be at least 2 overlays: parallax + gradient
    expect(overlays.length).toBeGreaterThanOrEqual(2);
    // The gradient overlay should NOT have an inline style prop
    const gradientOverlay = overlays[1];
    expect(gradientOverlay.getAttribute("style")).toBeNull();
    expect(gradientOverlay.className).toContain("bg-gradient-to-b");
  });

  it("renders timeline dot with conditional Tailwind classes not inline style", () => {
    render(<ExperienceSection />);
    const currentEntry = screen.getByTestId("experience-current-co");
    const timelineDots = currentEntry.querySelectorAll("[aria-hidden='true']");
    // First aria-hidden element in the entry is the timeline dot div
    const dot = timelineDots[0] as HTMLElement;
    expect(dot).toBeInTheDocument();
    // Should NOT have an inline style attribute
    expect(dot.getAttribute("style")).toBeNull();
    // Should use Tailwind classes for background and border
    expect(dot.className).toContain("bg-accent");
    expect(dot.className).toContain("border-accent");
  });

  it("renders a GSAP parallax overlay div", () => {
    const { container } = render(<ExperienceSection />);
    const parallaxDiv = container.querySelector("[data-gsap-parallax]");
    expect(parallaxDiv).toBeInTheDocument();
    expect(parallaxDiv?.parentElement?.tagName).toBe("SECTION");
  });

  it("mobile timeline entry has border-l-2 and pl-8 for mobile indicator", () => {
    render(<ExperienceSection />);
    const currentEntry = screen.getByTestId("experience-current-co");
    // Entry should have mobile border and padding
    expect(currentEntry.className).toContain("border-l-2");
    expect(currentEntry.className).toContain("border-accent/30");
    expect(currentEntry.className).toContain("pl-8");
    // Desktop should remove the border
    expect(currentEntry.className).toContain("md:border-l-0");
  });

  it("mobile timeline dot is visible with -left-[5px] positioning", () => {
    render(<ExperienceSection />);
    const currentEntry = screen.getByTestId("experience-current-co");
    const timelineDots = currentEntry.querySelectorAll("[aria-hidden='true']");
    const dot = timelineDots[0] as HTMLElement;
    // Dot should be visible on mobile (no 'hidden' class)
    expect(dot.className).not.toContain("hidden");
    // Should have left positioning for mobile
    expect(dot.className).toContain("-left-[5px]");
  });
});
