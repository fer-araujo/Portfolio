import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/Navbar";

// Navbar imports @/lib/lenis → @/lib/gsap; mock to avoid real gsap in jsdom.
vi.mock("@/lib/lenis", () => ({
  useLenisScroll: () => null,
}));

describe("Vitest setup", () => {
  it("should render a simple component", () => {
    render(<div>Hello, Vitest!</div>);
    expect(screen.getByText("Hello, Vitest!")).toBeInTheDocument();
  });
});

describe("Smoke: Mobile UX", () => {
  it("hamburger button has background and ring utilities for mobile contrast", () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText(/open menu/i);
    const classes = menuButton.getAttribute("class") ?? "";
    expect(classes).toContain("bg-bg-muted/80");
    expect(classes).toContain("focus-visible:ring-2");
    expect(classes).toContain("focus-visible:ring-accent-text");
  });
});
