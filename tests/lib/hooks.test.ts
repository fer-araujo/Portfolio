import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollProgress, useMediaQuery } from "@/lib/hooks";

describe("useScrollProgress", () => {
  beforeEach(() => {
    // Mock scroll position
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      writable: true,
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1000,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return 0 when at the top of the page", () => {
    window.scrollY = 0;
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBeCloseTo(0, 1);
  });

  it("should return ~0.5 when scrolled halfway", () => {
    window.scrollY = 500;
    const { result } = renderHook(() => useScrollProgress());
    // scrollable height = 2000 - 1000 = 1000
    // progress = 500 / 1000 = 0.5
    expect(result.current).toBeCloseTo(0.5, 1);
  });

  it("should return ~1 when scrolled to the bottom", () => {
    window.scrollY = 1000;
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBeCloseTo(1, 1);
  });

  it("should update on scroll event", () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      window.scrollY = 500;
      window.dispatchEvent(new Event("scroll", { bubbles: true }));
    });

    expect(result.current).toBeCloseTo(0.5, 1);
  });
});

describe("useMediaQuery", () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("should return true when the query matches", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("should return false when the query does not match", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);
  });

  it("should update when the media query changes", () => {
    let listener: ((ev: MediaQueryListEvent) => void) | null = null;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: (
        _event: string,
        cb: (ev: MediaQueryListEvent) => void
      ) => {
        listener = cb;
      },
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);

    act(() => {
      listener?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });

  it("should clean up event listener on unmount", () => {
    const removeListener = vi.fn();

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: removeListener,
    })) as unknown as typeof window.matchMedia;

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    unmount();

    expect(removeListener).toHaveBeenCalled();
  });
});
