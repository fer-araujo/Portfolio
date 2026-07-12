import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock next/font/google since it requires Next.js runtime
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Inter: () => ({ variable: "--font-inter" }),
}));

// Mock motion/react for Navbar/LenisProvider
vi.mock("motion/react", () => ({
  motion: {
    nav: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
      React.createElement("nav", props, children),
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
      React.createElement("div", props, children),
    button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
      React.createElement("button", props, children),
    a: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
      React.createElement("a", props, children),
    section: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
      React.createElement("section", props, children),
    p: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
      React.createElement("p", props, children),
    span: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) =>
      React.createElement("span", props, children),
  },
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

// Mock lucide-react for Navbar/Footer icons
vi.mock("lucide-react", () => ({
  Menu: () => React.createElement("svg", { "data-testid": "icon-menu" }),
  X: () => React.createElement("svg", { "data-testid": "icon-x" }),
  Github: () => React.createElement("svg", { "data-testid": "icon-github" }),
  Linkedin: () => React.createElement("svg", { "data-testid": "icon-linkedin" }),

  Mail: () => React.createElement("svg", { "data-testid": "icon-mail" }),
}));

// Mock social data for Footer
vi.mock("@/content/social", () => ({
  socialLinks: [{ platform: "GitHub", url: "https://github.com/fer-araujo", icon: "github", handle: "@fer-araujo" }],
}));

// Mock lenis package (default export constructor)
vi.mock("lenis", () => {
  return {
    default: function MockLenis() {
      return { raf: () => {}, destroy: () => {}, scrollTo: () => {}, on: () => {} };
    },
  };
});

// Mock gsap/ScrollTrigger (initGsapLenisBridge calls normalizeScroll/config)
vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    normalizeScroll: vi.fn(),
    config: vi.fn(),
    update: vi.fn(),
  },
}));

// Mock FilmGrain (uses useReducedMotion, which is already mocked)
vi.mock("@/components/ui/FilmGrain", () => ({
  FilmGrain: () => React.createElement("div", { "data-testid": "film-grain" }),
}));

describe("RootLayout", () => {
  it("should render Navbar, children content, and Footer", async () => {
    const { default: RootLayout } = await import("@/app/layout");

    render(
      <RootLayout>
        <main>Test Content</main>
      </RootLayout>
    );

    // Navbar renders its logo
    expect(screen.getByText("Fer Araujo")).toBeInTheDocument();

    // Children render
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Test Content");

    // Footer renders copyright
    expect(screen.getByText(/built with/i)).toBeInTheDocument();
  });
});
