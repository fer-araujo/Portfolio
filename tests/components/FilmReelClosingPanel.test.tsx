import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FilmReelClosingPanel } from "@/components/sections/FilmReelClosingPanel";

// ── Mock motion/react ─────────────────────────────────
vi.mock("motion/react", () => ({
  motion: {
    div: "div",
  },
}));

describe("FilmReelClosingPanel", () => {
  it("renders the closing headline", () => {
    render(<FilmReelClosingPanel />);
    expect(screen.getByText(/this reel ends here/i)).toBeInTheDocument();
  });

  it("renders the CTA subtext", () => {
    render(<FilmReelClosingPanel />);
    expect(screen.getByText(/your story is next/i)).toBeInTheDocument();
  });

  it("has no links or buttons — text-only panel", () => {
    render(<FilmReelClosingPanel />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("applies dot-grid background class to the outer container", () => {
    render(<FilmReelClosingPanel />);
    const panel = screen.getByTestId("closing-panel");
    expect(panel.className).toContain("dot-grid");
  });

  it("renders the description paragraph", () => {
    render(<FilmReelClosingPanel />);
    expect(screen.getByText(/let's build something extraordinary/i)).toBeInTheDocument();
  });

  // ── Phase 3 + 5: mobile responsive + tablet title ─────
  it("panel has max-md responsive classes for mobile vertical stack", () => {
    render(<FilmReelClosingPanel />);
    const panel = screen.getByTestId("closing-panel");
    expect(panel.className).toContain("max-md:w-full");
    expect(panel.className).toContain("max-md:h-auto");
    expect(panel.className).toContain("max-md:min-h-[40vh]");
  });

  it("panel title uses md:text-4xl (not md:text-5xl for tablet)", () => {
    render(<FilmReelClosingPanel />);
    const title = screen.getByText(/this reel ends here/i);
    const classes = title.className.split(/\s+/);
    expect(classes).toContain("md:text-4xl");
    expect(classes).not.toContain("md:text-5xl");
  });
});
