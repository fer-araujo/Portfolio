import "@testing-library/jest-dom/vitest";
import { beforeAll, afterAll, vi } from "vitest";

// Suppress specific console errors during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render is no longer supported")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// ── jsdom polyfills ────────────────────────────────────
// IntersectionObserver — not implemented in jsdom
class IntersectionObserverMock {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// matchMedia — not implemented in jsdom (needed by motion/react useReducedMotion)
vi.stubGlobal("matchMedia", (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// requestAnimationFrame — jsdom's default doesn't return an id
let rafCounter = 0;
vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
  return ++rafCounter;
});
vi.stubGlobal("cancelAnimationFrame", () => {});
