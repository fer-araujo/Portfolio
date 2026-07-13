import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LenisProvider, initGsapLenisBridge } from "@/lib/lenis";

// ── Hoisted mocks (before vi.mock) ────────────────────
const { mockLenisOn, mockLenisStop, mockLenisStart, mockNormalizeScroll, mockConfig, mockUpdate, mockUseReducedMotion, mockTickerAdd, mockTickerRemove, mockLagSmoothing } =
  vi.hoisted(() => ({
    mockLenisOn: vi.fn(),
    mockLenisStop: vi.fn(),
    mockLenisStart: vi.fn(),
    mockNormalizeScroll: vi.fn(),
    mockConfig: vi.fn(),
    mockUpdate: vi.fn(),
    mockUseReducedMotion: vi.fn().mockReturnValue(false),
    mockTickerAdd: vi.fn(),
    mockTickerRemove: vi.fn(),
    mockLagSmoothing: vi.fn(),
  }));

// ── Mock motion/react ──────────────────────────────────
vi.mock("motion/react", () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

// ── Mock lenis ─────────────────────────────────────────
vi.mock("lenis", () => ({
  default: function LenisMock() {
    return {
      on: mockLenisOn,
      stop: mockLenisStop,
      start: mockLenisStart,
      raf: vi.fn(),
      scrollTo: vi.fn(),
      destroy: vi.fn(),
    };
  },
}));

// ── Mock @/lib/gsap (centralised ScrollTrigger + ticker) ───────
vi.mock("@/lib/gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    ticker: {
      add: mockTickerAdd,
      remove: mockTickerRemove,
      lagSmoothing: mockLagSmoothing,
    },
  },
  ScrollTrigger: {
    normalizeScroll: mockNormalizeScroll,
    config: mockConfig,
    update: mockUpdate,
  },
}));

describe("initGsapLenisBridge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls ScrollTrigger.normalizeScroll(true)", () => {
    initGsapLenisBridge();
    expect(mockNormalizeScroll).toHaveBeenCalledWith(true);
  });

  it("calls ScrollTrigger.config with ignoreMobileResize", () => {
    initGsapLenisBridge();
    expect(mockConfig).toHaveBeenCalledWith({ ignoreMobileResize: true });
  });

  it("does not throw when called", () => {
    expect(() => initGsapLenisBridge()).not.toThrow();
  });
});

describe("LenisProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it("renders children", () => {
    render(
      <LenisProvider>
        <div data-testid="child">Hello</div>
      </LenisProvider>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("registers scroll event with ScrollTrigger.update", () => {
    render(
      <LenisProvider>
        <div />
      </LenisProvider>
    );
    expect(mockLenisOn).toHaveBeenCalledWith("scroll", mockUpdate);
  });

  it("initializes the GSAP bridge when creating Lenis", () => {
    render(
      <LenisProvider>
        <div />
      </LenisProvider>
    );
    expect(mockNormalizeScroll).toHaveBeenCalledWith(true);
    expect(mockTickerAdd).toHaveBeenCalled();
    expect(mockLagSmoothing).toHaveBeenCalledWith(0);
  });

  it("does not create Lenis when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);

    render(
      <LenisProvider>
        <div data-testid="child">Content</div>
      </LenisProvider>
    );

    // Children still render
    expect(screen.getByTestId("child")).toBeInTheDocument();

    // Lenis should not be created (ScrollTrigger should not be configured)
    expect(mockNormalizeScroll).not.toHaveBeenCalled();
    expect(mockLenisOn).not.toHaveBeenCalled();
  });
});
