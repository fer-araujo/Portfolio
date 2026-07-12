import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { FilmGrain } from "@/components/ui/FilmGrain";

// ── Mock motion/react ──────────────────────────────────
const mockUseReducedMotion = vi.fn().mockReturnValue(false);

vi.mock("motion/react", () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe("FilmGrain", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders an SVG element after the activation delay (500ms)", () => {
    render(<FilmGrain />);

    // Before timeout, nothing is rendered
    expect(screen.queryByTestId("film-grain")).not.toBeInTheDocument();

    // Advance past the 500ms deferral
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // SVG should now be in the document
    const svg = screen.getByTestId("film-grain");
    expect(svg).toBeInTheDocument();
    expect(svg.tagName).toBe("svg");
  });

  it("applies 0.10 opacity to the SVG element", () => {
    render(<FilmGrain />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    const svg = screen.getByTestId("film-grain");
    expect(svg).toHaveStyle({ opacity: 0.1 });
  });

  it("is hidden from screen readers with aria-hidden", () => {
    render(<FilmGrain />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    const svg = screen.getByTestId("film-grain");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);

    render(<FilmGrain />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByTestId("film-grain")).not.toBeInTheDocument();
  });

  it("sets pointer-events to none", () => {
    render(<FilmGrain />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    const svg = screen.getByTestId("film-grain");
    expect(svg).toHaveStyle({ pointerEvents: "none" });
  });

  it("contains a filter element for the film grain texture", () => {
    render(<FilmGrain />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    const svg = screen.getByTestId("film-grain");
    const filter = svg.querySelector("filter");
    expect(filter).toBeInTheDocument();
    expect(filter?.innerHTML).toContain("feTurbulence");
  });
});
