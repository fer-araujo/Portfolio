import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

describe("BrowserFrame", () => {
  it("renders children content", () => {
    render(
      <BrowserFrame>
        <p>Test content</p>
      </BrowserFrame>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders three traffic-light dots with correct colors", () => {
    const { container } = render(
      <BrowserFrame>
        <p>content</p>
      </BrowserFrame>
    );
    // Traffic lights should be three rounded-full divs
    const dots = container.querySelectorAll(".rounded-full");
    expect(dots.length).toBeGreaterThanOrEqual(3);

    // First dot: red, second: amber, third: green
    const allDots = Array.from(
      container.querySelectorAll(".rounded-full")
    );
    expect(allDots.length).toBeGreaterThanOrEqual(3);
    expect((allDots[0] as HTMLElement).className).toContain("bg-red-500/80");
    expect((allDots[1] as HTMLElement).className).toContain("bg-amber-500/80");
    expect((allDots[2] as HTMLElement).className).toContain("bg-emerald-500/80");
  });

  it("renders URL bar with feraraujo.com text", () => {
    render(
      <BrowserFrame>
        <p>content</p>
      </BrowserFrame>
    );
    expect(screen.getByText("feraraujo.com")).toBeInTheDocument();
  });

  it("chrome elements (traffic lights and URL bar) are aria-hidden", () => {
    const { container } = render(
      <BrowserFrame>
        <p>content</p>
      </BrowserFrame>
    );
    // The outer chrome wrapper should be aria-hidden
    const chromeElements = container.querySelectorAll("[aria-hidden='true']");
    expect(chromeElements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders with border, rounded-xl, shadow-2xl, overflow-hidden on outer container", () => {
    const { container } = render(
      <BrowserFrame>
        <p>content</p>
      </BrowserFrame>
    );
    // The outermost div should have border and rounded-xl
    const outer = container.firstElementChild as HTMLElement;
    expect(outer).toBeInTheDocument();
    expect(outer.className).toContain("border");
    expect(outer.className).toContain("rounded-xl");
    expect(outer.className).toContain("shadow-2xl");
    expect(outer.className).toContain("overflow-hidden");
  });
});
