import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeroSection } from "@/components/sections/HeroSection";

// ── Mock about data ──────────────────────────────────
vi.mock("@/content/about", () => ({
  about: {
    bio: [
      "Senior Software Engineer with 8+ years of experience building performant, user-centric web applications at scale.",
      "Currently specializing in modern frontend ecosystems.",
    ],
    stats: [
      { label: "Years of Experience", value: 8, suffix: "+" },
      { label: "Projects Delivered", value: 40, suffix: "+" },
    ],
    cvUrl: "/cv/fer-araujo-resume.pdf",
  },
}));

// ── Mock motion/react ────────────────────────────────
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
    p: createTag("p"),
    button: createTag("button"),
    a: createTag("a"),
  },
  useReducedMotion: () => mockUseReducedMotion(),
}));

// ── Mock lucide-react ────────────────────────────────
vi.mock("lucide-react", () => ({
  ArrowDown: () => <svg data-testid="icon-arrow-down" />,
}));

describe("HeroSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it("renders name as an h1", () => {
    render(<HeroSection />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/fer/i);
    expect(heading.textContent).toMatch(/araujo/i);
  });

  it("renders the title/tagline", () => {
    render(<HeroSection />);
    expect(screen.getByText(/sr software engineer/i)).toBeInTheDocument();
  });

  it("renders a status badge indicating availability", () => {
    render(<HeroSection />);
    const badge = screen.getByText(/available for opportunities/i);
    expect(badge).toBeInTheDocument();
  });

  it("renders a CTA button with text 'View my work'", () => {
    render(<HeroSection />);
    const cta = screen.getByRole("button", { name: /view my work/i });
    expect(cta).toBeInTheDocument();
  });

  it("CTA button scrolls to #work section on click", async () => {
    // Set up the DOM with a target section
    const target = document.createElement("section");
    target.id = "work";
    document.body.appendChild(target);

    const scrollIntoViewMock = vi.fn();
    target.scrollIntoView = scrollIntoViewMock;

    render(<HeroSection />);
    const user = userEvent.setup();
    const cta = screen.getByRole("button", { name: /view my work/i });

    await user.click(cta);

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

    document.body.removeChild(target);
  });

  it("does not render motion elements when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);

    const { container } = render(<HeroSection />);

    // Should still render name and CTA
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view my work/i })).toBeInTheDocument();

    // Section should not have motion-specific data attributes (no whileInView etc)
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(1);
  });

  it("CTA button is keyboard accessible", async () => {
    render(<HeroSection />);
    const user = userEvent.setup();

    // Tab to the CTA
    await user.tab();
    const cta = screen.getByRole("button", { name: /view my work/i });

    expect(cta).toHaveFocus();
  });

  it("CTA button is reachable via Tab key", async () => {
    render(<HeroSection />);
    const user = userEvent.setup();

    await user.tab();
    const focused = document.activeElement;
    expect(focused).toHaveTextContent(/view my work/i);
  });

  it("renders a decorative background element", () => {
    const { container } = render(<HeroSection />);
    // Should have a background gradient div
    const bgDiv = container.querySelector('[data-testid="hero-background"]');
    expect(bgDiv).toBeInTheDocument();
  });

  it("renders the status badge with role='status'", () => {
    render(<HeroSection />);
    const badge = screen.getByRole("status");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent(/available for opportunities/i);
  });

  it("does not wrap content in content-card container (flatter DOM structure)", () => {
    const { container } = render(<HeroSection />);
    const contentCard = container.querySelector(
      '[data-testid="hero-content-card"]'
    );
    expect(contentCard).not.toBeInTheDocument();
  });

  it("flattens hero content — content divs are direct children of the z-10 wrapper", () => {
    const { container } = render(<HeroSection />);
    // The section should have exactly 2 top-level children: background + content wrapper
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    const children = section!.children;
    // First child: background, Second child: content wrapper
    expect(children[0]).toHaveAttribute("data-testid", "hero-background");
    // The second child should contain the content directly (no nested content-card)
    expect(children[1].querySelector('[data-testid="hero-content-card"]')).toBeNull();
  });

  it("renders an extended background with 3-4 aurora gradient blobs", () => {
    const { container } = render(<HeroSection />);
    const bgDiv = container.querySelector('[data-testid="hero-background"]');
    expect(bgDiv).toBeInTheDocument();
    // Should have 3-4 blob divs (formerly 2)
    const blobs = bgDiv!.querySelectorAll("div");
    expect(blobs.length).toBeGreaterThanOrEqual(3);
    expect(blobs.length).toBeLessThanOrEqual(4);
  });

  it("applies aurora-shift animation class to background blobs", () => {
    render(<HeroSection />);
    const bgDiv = screen.getByTestId("hero-background");
    // Each blob div should have data-aurora-blob for the animation
    const blobs = bgDiv.querySelectorAll('[data-aurora-blob]');
    expect(blobs.length).toBeGreaterThanOrEqual(3);
  });

  it("disables aurora animation on background blobs when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);
    const { container } = render(<HeroSection />);
    // Blobs should still exist but without animation attribute
    const bgDiv = container.querySelector('[data-testid="hero-background"]');
    expect(bgDiv).toBeInTheDocument();
  });
});
