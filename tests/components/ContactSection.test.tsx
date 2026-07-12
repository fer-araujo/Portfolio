import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSection } from "@/components/sections/ContactSection";

// ── Mock social data ──────────────────────────────────
vi.mock("@/content/social", () => ({
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/fer-araujo",
      icon: "github",
      handle: "@fer-araujo",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/feraraujoruiz",
      icon: "linkedin",
      handle: "feraraujoruiz",
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
    p: createTag("p"),
    span: createTag("span"),
    a: createTag("a"),
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
  Mail: () => <svg data-testid="icon-mail" />,
  Github: () => <svg data-testid="icon-github" />,
  Linkedin: () => <svg data-testid="icon-linkedin" />,
}));

describe("ContactSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it("renders the section heading 'Get In Touch'", () => {
    render(<ContactSection />);
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
  });

  it("renders the opportunity text", () => {
    render(<ContactSection />);
    expect(
      screen.getByText(/I'm currently open to opportunities/i)
    ).toBeInTheDocument();
  });

  it("renders an email link button with correct href", () => {
    render(<ContactSection />);
    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:hello@feraraujo.com"
    );
  });

  it("renders GitHub and LinkedIn social links", () => {
    render(<ContactSection />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/fer-araujo");

    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/feraraujoruiz"
    );
  });

  it("does NOT render a Twitter/X link", () => {
    render(<ContactSection />);
    const twitterLink = screen.queryByRole("link", { name: /twitter/i });
    expect(twitterLink).not.toBeInTheDocument();
  });

  it("renders with correct section id for scroll targeting", () => {
    const { container } = render(<ContactSection />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("id", "contact");
  });

  it("renders GSAP reveal wrapper around contact content", () => {
    const { container } = render(<ContactSection />);
    const revealWrapper = container.querySelector("[data-gsap-contact]");
    expect(revealWrapper).toBeInTheDocument();
    // Wrapper should contain the email CTA and social links
    expect(revealWrapper?.querySelector('[data-testid="contact-social-links"]')).toBeInTheDocument();
    expect(revealWrapper?.querySelector("a[href^='mailto:']")).toBeInTheDocument();
  });

  it("renders without motion animation when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<ContactSection />);
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
    expect(
      screen.getByText(/I'm currently open to opportunities/i)
    ).toBeInTheDocument();
  });

  it("renders the contact section element", () => {
    render(<ContactSection />);
    const section = screen.getByTestId("contact-section");
    expect(section).toBeInTheDocument();
  });
});
