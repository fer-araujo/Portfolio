import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock next/font/google since it requires Next.js runtime
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Inter: () => ({ variable: "--font-inter" }),
}));

describe("RootLayout", () => {
  it("should render children content", async () => {
    const { default: RootLayout } = await import("@/app/layout");

    render(
      <RootLayout>
        <main>Test Content</main>
      </RootLayout>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Test Content");
  });
});
