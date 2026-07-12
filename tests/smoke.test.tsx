import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/Navbar";

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
