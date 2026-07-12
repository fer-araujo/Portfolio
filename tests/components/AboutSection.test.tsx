import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutSection } from "@/components/sections/AboutSection";

// ── Mock about data ──────────────────────────────────
vi.mock("@/content/about", () => ({
  about: {
    bio: [
      "Senior Software Engineer with 8+ years of experience building performant, user-centric web applications at scale.",
      "Currently specializing in modern frontend ecosystems — React, Next.js, and TypeScript.",
      "When I'm not pushing pixels or optimizing bundles, you'll find me exploring game development.",
    ],
    stats: [
      { label: "Years of Experience", value: 8, suffix: "+" },
      { label: "Projects Delivered", value: 40, suffix: "+" },
      { label: "Technologies", value: 25, suffix: "+" },
      { label: "Happy Clients", value: 20, suffix: "+" },
    ],
    cvUrl: "/cv/fer-araujo-resume.pdf",
  },
}));

// ── Mock motion/react ────────────────────────────────
const mockUseReducedMotion = vi.fn().mockReturnValue(false);

 
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
    p: createTag("p"),
    dd: createTag("dd"),
    button: createTag("button"),
    a: createTag("a"),
  },
  useReducedMotion: () => mockUseReducedMotion(),
  useInView: () => true,
}));

// ── Mock lucide-react ────────────────────────────────
vi.mock("lucide-react", () => ({
  Download: () => <svg data-testid="icon-download" />,
  ArrowDown: () => <svg data-testid="icon-arrow-down" />,
}));

describe("AboutSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the section heading", () => {
    render(<AboutSection />);
    expect(screen.getByText(/about me/i)).toBeInTheDocument();
  });

  it("renders all bio paragraphs", () => {
    render(<AboutSection />);
    const bio = screen.getByTestId("about-bio");
    expect(bio).toBeInTheDocument();
    const paragraphs = bio.querySelectorAll("p");
    expect(paragraphs.length).toBe(3);
  });

  it("renders stat labels", () => {
    render(<AboutSection />);
    expect(screen.getByText("Years of Experience")).toBeInTheDocument();
    expect(screen.getByText("Projects Delivered")).toBeInTheDocument();
    expect(screen.getByText("Technologies")).toBeInTheDocument();
    expect(screen.getByText("Happy Clients")).toBeInTheDocument();
  });

  it("renders a CV download button", () => {
    render(<AboutSection />);
    const cvButton = screen.getByRole("link", { name: /download cv/i });
    expect(cvButton).toBeInTheDocument();
    expect(cvButton).toHaveAttribute("href", "/cv/fer-araujo-resume.pdf");
    expect(cvButton).toHaveAttribute("download");
  });

  it("renders stats in a dl element with dt/dd semantics", () => {
    render(<AboutSection />);
    const dl = screen.getByTestId("about-stats");
    expect(dl).toBeInTheDocument();

    const dts = dl.querySelectorAll("dt");
    const dds = dl.querySelectorAll("dd");

    expect(dts.length).toBe(4);
    expect(dds.length).toBe(4);
    expect(dts[0]).toHaveTextContent("Years of Experience");
  });

  it("renders the CV button with a download icon", () => {
    render(<AboutSection />);
    const downloadIcon = screen.getByTestId("icon-download");
    expect(downloadIcon).toBeInTheDocument();
  });

  it("renders stats without animation when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);

    render(<AboutSection />);
    // Stats should render their final values immediately (no animation)
    expect(screen.getByText("8+")).toBeInTheDocument();
    expect(screen.getByText("40+")).toBeInTheDocument();
  });

  it("renders about section as a semantic section element", () => {
    const { container } = render(<AboutSection />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("uses data-testid for layout structure", () => {
    render(<AboutSection />);
    expect(screen.getByTestId("about-bio")).toBeInTheDocument();
    expect(screen.getByTestId("about-stats")).toBeInTheDocument();
  });

  it("renders stat counter elements with initial values", () => {
    // With useFakeTimers, requestAnimationFrame won't fire during render
    // so counters start at 0 (initial state before animation begins)
    vi.useFakeTimers();

    render(<AboutSection />);

    // counters start at 0 before animation kicks in
    const dds = screen.getByTestId("about-stats").querySelectorAll("dd");
    expect(dds.length).toBe(4);
    expect(dds[0]).toHaveTextContent(/0/);

    vi.useRealTimers();
  });
});
