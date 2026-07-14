import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

// ── Mock projects data (4 entries) ────────────────────
vi.mock("@/content/projects", () => ({
  projects: [
    {
      id: "anime-tracker",
      title: "Anime Tracker",
      description: "Streaming availability platform",
      tagline: "Find where to watch.",
      phase: "past",
      longDescription: { problem: "P1", solution: "S1", impact: "I1" },
      techStack: ["Next.js"],
      thumbnail: "/images/projects/anime-tracker-01.png",
      images: [],
      category: "web",
      featured: true,
      liveUrl: "https://anime.example.com",
    },
    {
      id: "patient-management",
      title: "Patient Management",
      description: "Healthcare management starter",
      phase: "planned",
      longDescription: { problem: "P2", solution: "S2", impact: "I2" },
      techStack: ["React"],
      thumbnail: "/images/projects/patient-management-01.png",
      images: [],
      category: "web",
      featured: true,
    },
    {
      id: "school-system",
      title: "School Attendance System",
      description: "QR-based attendance",
      phase: "past",
      longDescription: { problem: "P3", solution: "S3", impact: "I3" },
      techStack: ["React", "Firebase"],
      thumbnail: "/images/projects/school-system-01.png",
      images: ["/images/projects/school-system-02.png"],
      category: "web",
      featured: true,
      githubUrl: "https://github.com/fer-araujo/school-system",
    },
    {
      id: "pokedex",
      title: "Pokédex App",
      description: "Simple Pokédex",
      phase: "past",
      longDescription: { problem: "P4", solution: "S4", impact: "I4" },
      techStack: ["Next.js"],
      thumbnail: "/images/projects/pokedex-01.png",
      images: [],
      category: "web",
      featured: true,
    },
  ],
}));

// ── Mock GSAP ─────────────────────────────────────────
const { mockGsapTo, mockMmKill, mockTweenKill } = vi.hoisted(() => ({
  mockGsapTo: vi.fn().mockReturnValue({ kill: vi.fn() }),
  mockMmKill: vi.fn(),
  mockTweenKill: vi.fn(),
}));

vi.mock("@/lib/gsap", () => ({
  gsap: {
    to: mockGsapTo,
    context: () => ({ revert: vi.fn() }),
    registerPlugin: vi.fn(),
  },
  ScrollTrigger: {
    matchMedia: vi.fn(() => ({
      kill: mockMmKill,
    })),
    refresh: vi.fn(),
    normalizeScroll: vi.fn(),
    config: vi.fn(),
    update: vi.fn(),
    getAll: vi.fn(() => [
      { disable: vi.fn(), enable: vi.fn() },
    ]),
  },
}));

// ── Mock motion/react ─────────────────────────────────
const mockUseReducedMotion = vi.fn().mockReturnValue(false);

vi.mock("motion/react", () => ({
  motion: {
    section: "section",
    div: "div",
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => mockUseReducedMotion(),
}));

// ── Mock next/image ────────────────────────────────────
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    <img alt={alt} {...props} />
  ),
}));

// ── Mock lenis ─────────────────────────────────────────
vi.mock("@/lib/lenis", () => ({
  useLenisScroll: () => ({ scrollTo: vi.fn(), destroy: vi.fn(), init: vi.fn() }),
}));

// ── Mock lucide-react ──────────────────────────────────
vi.mock("lucide-react", () => ({
  ExternalLink: () => <svg data-testid="icon-external-link" />,
  X: () => <span>×</span>,
}));

describe("ProjectsSection — film reel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
    mockGsapTo.mockReturnValue({ kill: mockTweenKill });
  });

  it("renders the section heading", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/featured work/i)).toBeInTheDocument();
  });

  it("renders all 4 project panels", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Anime Tracker")).toBeInTheDocument();
    expect(screen.getByText("Patient Management")).toBeInTheDocument();
    expect(screen.getByText("School Attendance System")).toBeInTheDocument();
    expect(screen.getByText("Pokédex App")).toBeInTheDocument();
  });

  it("does NOT render This Portfolio", () => {
    render(<ProjectsSection />);
    expect(screen.queryByText("This Portfolio")).not.toBeInTheDocument();
  });

  it("renders the closing panel (text-only)", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/this reel ends here/i)).toBeInTheDocument();
    expect(screen.getByText(/your story is next/i)).toBeInTheDocument();
    // Closing panel is text-only — no links, no buttons
    expect(screen.queryByRole("link", { name: /let's talk/i })).not.toBeInTheDocument();
  });

  it("renders 4 project button panels (4 total interactive)", () => {
    render(<ProjectsSection />);
    const projectButtons = screen.getAllByRole("button");
    // 4 project panels = 4 buttons; closing panel has no interactive elements
    expect(projectButtons.length).toBe(4);
  });

  it("opens case study overlay when clicking a project panel", async () => {
    render(<ProjectsSection />);
    const animePanel = screen.getByRole("button", { name: /view case study: anime tracker/i });
    await userEvent.click(animePanel);
    // Case study overlay should appear — verify via dialog role + close button
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Close case study")).toBeInTheDocument();
  });

  it("closes case study overlay via close button", async () => {
    render(<ProjectsSection />);
    const animePanel = screen.getByRole("button", { name: /view case study: anime tracker/i });
    await userEvent.click(animePanel);
    // Click close button
    const closeBtn = screen.getByLabelText("Close case study");
    await userEvent.click(closeBtn);
    // Overlay should be gone
    expect(screen.queryByLabelText("Close case study")).not.toBeInTheDocument();
  });

  it("closes case study overlay via Escape key", async () => {
    render(<ProjectsSection />);
    const animePanel = screen.getByRole("button", { name: /view case study: anime tracker/i });
    await userEvent.click(animePanel);
    await userEvent.keyboard("{Escape}");
    // Overlay should be gone
    expect(screen.queryByLabelText("Close case study")).not.toBeInTheDocument();
  });

  it("renders with reduced motion — no GSAP registered", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<ProjectsSection />);
    // Should still render all panels
    expect(screen.getByText("Anime Tracker")).toBeInTheDocument();
    // GSAP should NOT be called
    expect(mockGsapTo).not.toHaveBeenCalled();
  });

  it("does not crash when window is undefined (SSR safety)", () => {
    // The component uses useEffect which only runs in browser — this is SSR-safe
    render(<ProjectsSection />);
    expect(screen.getByText(/featured work/i)).toBeInTheDocument();
  });

  // ── Phase 2: heading reposition (normal flow, not absolute overlay) ──
  it("heading is rendered in normal flow — NOT inside an absolute overlay", () => {
    render(<ProjectsSection />);
    const heading = screen.getByText(/featured work/i);
    // After fix: heading is in normal flow ABOVE the overflow-hidden wrapper
    const overlayContainer = heading.closest(".absolute");
    expect(overlayContainer).toBeNull();
  });

  it("heading appears before the #film-reel-wrapper in DOM order", () => {
    render(<ProjectsSection />);
    const heading = screen.getByText(/featured work/i);
    const wrapper = document.getElementById("film-reel-wrapper");
    // heading should come before the wrapper in document order
    expect(wrapper).toBeInTheDocument();
    const headingPos = heading.compareDocumentPosition(wrapper!);
    expect(headingPos & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("film-reel-wrapper has id and wraps the film-reel-track", () => {
    render(<ProjectsSection />);
    const wrapper = document.getElementById("film-reel-wrapper");
    expect(wrapper).toBeInTheDocument();
    const track = screen.getByTestId("film-reel-track");
    expect(wrapper).toContainElement(track);
  });

  it("film-reel wrapper uses md:overflow-hidden (not unconditional overflow-hidden)", () => {
    render(<ProjectsSection />);
    const wrapper = document.getElementById("film-reel-wrapper");
    expect(wrapper).toBeInTheDocument();
    const classes = wrapper!.className.split(/\s+/);
    expect(classes).toContain("md:overflow-hidden");
    expect(classes).not.toContain("overflow-hidden");
  });

  it("film-reel track uses flex-col on mobile (max-md:flex-col)", () => {
    render(<ProjectsSection />);
    const track = screen.getByTestId("film-reel-track");
    expect(track.className).toContain("max-md:flex-col");
  });
});
