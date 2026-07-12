import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/Navbar";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

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
    expect(classes).toContain("ring-2");
    expect(classes).toContain("ring-accent/50");
  });
});

describe("Smoke: BrowserFrame", () => {
  it("renders traffic lights and URL bar with feraraujo.com", () => {
    render(
      <BrowserFrame>
        <p>content</p>
      </BrowserFrame>
    );
    // URL bar should show feraraujo.com
    expect(screen.getByText("feraraujo.com")).toBeInTheDocument();
    // Traffic lights should be visible (3 colored dots)
    const dots = document.querySelectorAll(".rounded-full");
    expect(dots.length).toBeGreaterThanOrEqual(3);
  });
});
