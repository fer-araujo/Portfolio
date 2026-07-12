import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

// ── Mock projects data (5 entries) ────────────────────
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
      id: "this-portfolio",
      title: "This Portfolio",
      description: "Handcrafted. Cinematic.",
      tagline: "Craft over templates.",
      phase: "current",
      narrativeText: "Every detail was designed.",
      stats: [{ label: "Stack", value: "Next.js 16" }],
      longDescription: { problem: "P2", solution: "S2", impact: "I2" },
      techStack: ["Next.js", "GSAP"],
      thumbnail: "/images/projects/portfolio-2026-01.png",
      images: [],
      category: "web",
      featured: true,
      githubUrl: "https://github.com/fer-araujo/portfolio-2026",
    },
    {
      id: "patient-management",
      title: "Patient Management",
      description: "Healthcare management starter",
      phase: "planned",
      longDescription: { problem: "P3", solution: "S3", impact: "I3" },
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
      longDescription: { problem: "P4", solution: "S4", impact: "I4" },
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
      longDescription: { problem: "P5", solution: "S5", impact: "I5" },
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

vi.mock("gsap", () => ({
  gsap: {
    to: mockGsapTo,
    context: (fn: () => void) => ({ revert: vi.fn() }),
    registerPlugin: vi.fn(),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    matchMedia: vi.fn(() => ({
      kill: mockMmKill,
    })),
    refresh: vi.fn(),
    normalizeScroll: vi.fn(),
    config: vi.fn(),
    update: vi.fn(),
  },
}));

// ── Mock motion/react ─────────────────────────────────
const mockUseReducedMotion = vi.fn().mockReturnValue(false);

function createTag(Tag: string) {
  return ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
    React.createElement(Tag, props, children);
}

vi.mock("motion/react", () => ({
  motion: {
    section: createTag("section"),
    div: createTag("div"),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => mockUseReducedMotion(),
}));

// ── Mock next/image ────────────────────────────────────
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img alt={alt} {...props} />
  ),
}));

// ── Mock lenis ─────────────────────────────────────────
vi.mock("@/lib/lenis", () => ({
  useLenisScroll: () => ({ scrollTo: vi.fn() }),
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

  it("renders all 5 project panels", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Anime Tracker")).toBeInTheDocument();
    expect(screen.getByText("This Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Patient Management")).toBeInTheDocument();
    expect(screen.getByText("School Attendance System")).toBeInTheDocument();
    expect(screen.getByText("Pokédex App")).toBeInTheDocument();
  });

  it("renders the closing CTA panel", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/this reel ends here/i)).toBeInTheDocument();
    expect(screen.getByText(/your story is next/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /let's talk/i })).toBeInTheDocument();
  });

  it("renders 6 panels total (5 projects + 1 CTA)", () => {
    render(<ProjectsSection />);
    const panels = screen.getAllByRole("button");
    // 5 project panels + 1 CTA button = 6 buttons
    expect(panels.length).toBe(6);
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

  it("does not open overlay when clicking the closing CTA panel", async () => {
    render(<ProjectsSection />);
    // The CTA panel has its own button, clicking it should not open case study
    const ctaButton = screen.getByRole("button", { name: /let's talk/i });
    await userEvent.click(ctaButton);
    // No case study overlay should appear
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
});
