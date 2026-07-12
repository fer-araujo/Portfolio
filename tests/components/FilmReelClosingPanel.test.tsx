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

  it("renders the Let's talk CTA as a mailto link", () => {
    render(<FilmReelClosingPanel />);
    const link = screen.getByRole("link", { name: /let's talk/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", expect.stringContaining("mailto:"));
    expect(link).toHaveAttribute("href", expect.stringContaining("hello@feraraujo.com"));
  });

  it("applies dot-grid background class to the outer container", () => {
    render(<FilmReelClosingPanel />);
    const panel = screen.getByTestId("closing-panel");
    expect(panel.className).toContain("dot-grid");
  });

  it("does NOT trigger overlay or scroll behavior when panel div is clicked", () => {
    render(<FilmReelClosingPanel />);
    // The outer panel div should render without error — it has no onClick handler
    const panel = screen.getByTestId("closing-panel");
    expect(panel).toBeInTheDocument();
    expect(panel).not.toHaveAttribute("onClick");
    // The mailto link is the only interactive element
    expect(screen.getByRole("link")).toBeInTheDocument();
    // There should be no buttons in this component
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
