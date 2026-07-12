import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/ui/Reveal";

const mockUseReducedMotion = vi.fn().mockReturnValue(false);

// Mock motion/react
vi.mock("motion/react", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }) => (
      <div data-testid="reveal-wrapper" {...props}>
        {children}
      </div>
    ),
  },
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe("Reveal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it("should render children content", () => {
    render(<Reveal>Hello World</Reveal>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should render with animation when reduced motion is not preferred", () => {
    render(
      <Reveal>
        <span>Content</span>
      </Reveal>
    );
    expect(screen.getByTestId("reveal-wrapper")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render without animation when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);

    render(<Reveal>Static Content</Reveal>);
    expect(screen.getByText("Static Content")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(
      <Reveal className="custom-class">
        <span>Styled</span>
      </Reveal>
    );
    const wrapper = screen.getByTestId("reveal-wrapper");
    expect(wrapper.className).toContain("custom-class");
  });

  // ── Phase 6: SSR / reduced-motion safety ──────────────
  it("renders children without error when reduced motion is preferred (SSR-safe)", () => {
    // Framer Motion's useReducedMotion returns false during SSR,
    // and the Reveal component correctly gates whileInView animations.
    // This test verifies the plain <div> fallback path works.
    mockUseReducedMotion.mockReturnValue(true);
    render(
      <Reveal delay={0.5} direction="left" duration={0.8}>
        <span>SSR Safe</span>
      </Reveal>
    );
    // When reduced motion is preferred, component renders plain div (no motion)
    expect(screen.getByText("SSR Safe")).toBeInTheDocument();
    // No motion.div wrapper is used — the plain div fallback is active
    expect(screen.queryByTestId("reveal-wrapper")).not.toBeInTheDocument();
  });
});
