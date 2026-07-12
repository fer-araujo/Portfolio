import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilmReelClosingPanel } from "@/components/sections/FilmReelClosingPanel";

// ── Mock lenis scroll hook ─────────────────────────────
const mockScrollTo = vi.fn();
vi.mock("@/lib/lenis", () => ({
  useLenisScroll: () => ({ scrollTo: mockScrollTo }),
}));

// ── Mock motion/react ─────────────────────────────────
vi.mock("motion/react", () => ({
  motion: {
    div: "div",
  },
}));

describe("FilmReelClosingPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the closing headline", () => {
    render(<FilmReelClosingPanel />);
    expect(screen.getByText(/this reel ends here/i)).toBeInTheDocument();
  });

  it("renders the CTA subtext", () => {
    render(<FilmReelClosingPanel />);
    expect(screen.getByText(/your story is next/i)).toBeInTheDocument();
  });

  it("renders the Let's talk button", () => {
    render(<FilmReelClosingPanel />);
    expect(screen.getByRole("button", { name: /let's talk/i })).toBeInTheDocument();
  });

  it("calls scrollTo with #contact when CTA button is clicked", () => {
    render(<FilmReelClosingPanel />);
    const button = screen.getByRole("button", { name: /let's talk/i });
    fireEvent.click(button);
    expect(mockScrollTo).toHaveBeenCalledTimes(1);
    expect(mockScrollTo).toHaveBeenCalledWith("#contact");
  });

  it("does NOT call onOpen or render a case study trigger", () => {
    render(<FilmReelClosingPanel />);
    // This panel should NOT have a click handler that opens an overlay
    const panel = screen.getByTestId("closing-panel");
    fireEvent.click(panel);
    // scrollTo is only called by the button, not by the panel itself
    // So clicking the panel itself should not trigger scrollTo
    expect(mockScrollTo).not.toHaveBeenCalled();
  });
});
