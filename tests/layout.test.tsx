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

// Mock @/lib/gsap (centralised gsap + ScrollTrigger — initGsapLenisBridge calls normalizeScroll/config)
vi.mock("@/lib/gsap", () => ({
  gsap: { registerPlugin: vi.fn() },
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
        <div>Test Content</div>
      </RootLayout>
    );

    // Navbar renders its logo
    expect(screen.getByText("Fer Araujo")).toBeInTheDocument();

    // Children render inside the layout's <main> landmark
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Test Content");

    // Footer renders copyright
    expect(screen.getByText(/built with/i)).toBeInTheDocument();
  });
});

describe("RootLayout — A11Y-01 main landmark + skip link", () => {
  it("wraps page content in <main id=\"main-content\">", async () => {
    const { default: RootLayout } = await import("@/app/layout");
    render(
      <RootLayout>
        <div>body content</div>
      </RootLayout>
    );
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveTextContent("body content");
  });

  it("renders a skip link as the first focusable element targeting #main-content", async () => {
    const { default: RootLayout } = await import("@/app/layout");
    const { container } = render(
      <RootLayout>
        <div>body content</div>
      </RootLayout>
    );

    const skipLink = screen.getByRole("link", { name: /skip to content/i });
    expect(skipLink).toHaveAttribute("href", "#main-content");

    // Skip link is visually hidden until focused (sr-only + focus:not-sr-only)
    expect(skipLink.className).toContain("sr-only");
    expect(skipLink.className).toContain("focus:not-sr-only");

    // Skip link precedes the main landmark in DOM order
    const main = screen.getByRole("main");
    const allFocusable = Array.from(
      container.querySelectorAll("a[href], button, [tabindex]")
    );
    const skipIndex = allFocusable.indexOf(skipLink);
    const mainIndex = Array.from(container.querySelectorAll("*")).indexOf(main);
    expect(skipIndex).toBeGreaterThanOrEqual(0);
    expect(skipIndex).toBe(0); // first focusable element
    // skip link comes before main in document order
    expect(skipLink.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    void mainIndex;
  });

  it("renders exactly one main landmark", async () => {
    const { default: RootLayout } = await import("@/app/layout");
    render(
      <RootLayout>
        <div>body content</div>
      </RootLayout>
    );
    expect(screen.getAllByRole("main")).toHaveLength(1);
  });
});
