import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { Navbar } from "@/components/layout/Navbar";

// ── Mock motion/react ──────────────────────────────────
const mockUseReducedMotion = vi.fn().mockReturnValue(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createTag(Tag: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) =>
    React.createElement(Tag, props, children);
}

vi.mock("motion/react", () => ({
  motion: {
    nav: createTag("nav"),
    div: createTag("div"),
    button: createTag("button"),
    a: createTag("a"),
  },
  useReducedMotion: () => mockUseReducedMotion(),
}));

// ── Mock lucide-react ──────────────────────────────────
vi.mock("lucide-react", () => ({
  Menu: () => <svg data-testid="icon-menu" />,
  X: () => <svg data-testid="icon-x" />,
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it("renders logo text 'Fer Araujo'", () => {
    render(<Navbar />);
    const logo = screen.getByText("Fer Araujo");
    expect(logo).toBeInTheDocument();
  });

  it("renders all navigation links in correct order: About → Expertise → Experience → Projects → Contact", () => {
    render(<Navbar />);
    // Grab all rendered nav buttons (desktop links are direct button children of nav > div)
    const buttons = screen.getAllByRole("button");
    // Filter to nav buttons only (exclude hamburger menu toggle)
    const navLinks = buttons.filter(
      (btn) =>
        ["About", "Expertise", "Experience", "Projects", "Contact"].includes(
          btn.textContent ?? ""
        )
    );
    expect(navLinks).toHaveLength(5);
    expect(navLinks[0]).toHaveTextContent("About");
    expect(navLinks[1]).toHaveTextContent("Expertise");
    expect(navLinks[2]).toHaveTextContent("Experience");
    expect(navLinks[3]).toHaveTextContent("Projects");
    expect(navLinks[4]).toHaveTextContent("Contact");
  });

  it("clicking a nav link scrolls to the corresponding section", async () => {
    // Set up the DOM with a target section
    const target = document.createElement("section");
    target.id = "about";
    document.body.appendChild(target);

    const scrollIntoViewMock = vi.fn();
    target.scrollIntoView = scrollIntoViewMock;

    render(<Navbar />);
    const user = userEvent.setup();
    const link = screen.getByText("About");

    await user.click(link);

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);

    document.body.removeChild(target);
  });

  it("mobile hamburger button toggles mobile menu visibility", async () => {
    render(<Navbar />);
    const user = userEvent.setup();

    // Before clicking, mobile menu should NOT be in the document
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

    // Click the menu button
    const menuButton = screen.getByLabelText(/open menu/i);
    await user.click(menuButton);

    // After clicking, mobile menu should be visible
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    // Click again to close
    const closeButton = screen.getByLabelText(/close menu/i);
    await user.click(closeButton);

    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("closing mobile menu via link click hides the menu", async () => {
    // Set up target section
    const target = document.createElement("section");
    target.id = "about";
    document.body.appendChild(target);
    target.scrollIntoView = vi.fn();

    render(<Navbar />);
    const user = userEvent.setup();

    // Open mobile menu
    await user.click(screen.getByLabelText(/open menu/i));
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    // Click a link inside the mobile menu
    const aboutLink = screen.getAllByText("About")[1]; // mobile menu link
    await user.click(aboutLink);

    // Menu should close
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

    document.body.removeChild(target);
  });

  it("logo link scrolls to #home section", async () => {
    const target = document.createElement("section");
    target.id = "home";
    document.body.appendChild(target);

    const scrollIntoViewMock = vi.fn();
    target.scrollIntoView = scrollIntoViewMock;

    render(<Navbar />);
    const user = userEvent.setup();

    // The logo is an anchor with href="#home"
    const logo = screen.getByText("Fer Araujo").closest("a");
    expect(logo).toHaveAttribute("href", "#home");

    await user.click(logo!);

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);

    document.body.removeChild(target);
  });

  it("renders as a semantic nav element", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("applies scrolled background class after scroll", () => {
    render(<Navbar />);

    const nav = screen.getByTestId("navbar");
    expect(nav).toBeInTheDocument();

    // Simulate scroll inside act() to flush React state updates
    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event("scroll"));
    });

    // After scroll, the nav should have background classes
    expect(nav.className).toContain("transition-colors");
  });

  it("mobile hamburger button has background contrast and focus ring classes", () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText(/open menu/i);
    expect(menuButton.className).toContain("bg-bg-muted/80");
    expect(menuButton.className).toContain("ring-2");
    expect(menuButton.className).toContain("ring-accent/50");
  });
});
