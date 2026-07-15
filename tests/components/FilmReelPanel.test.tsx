import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilmReelPanel } from "@/components/sections/FilmReelPanel";
import type { Project } from "@/content/types";

// ── Mock next/image ────────────────────────────────────
vi.mock("next/image", () => ({
  default: ({ alt, priority, ...props }: { alt: string; priority?: boolean; [key: string]: unknown }) => (
    <img alt={alt} data-priority={String(!!priority)} {...props} />
  ),
}));

// ── Mock motion/react ─────────────────────────────────
const mockUseReducedMotion = vi.fn().mockReturnValue(false);

vi.mock("motion/react", () => ({
  motion: {
    div: "div",
  },
  useReducedMotion: () => mockUseReducedMotion(),
}));

// ── Mock lucide-react ──────────────────────────────────
vi.mock("lucide-react", () => ({
  ExternalLink: () => <svg data-testid="icon-external-link" />,
}));

// ── Test data ──────────────────────────────────────────
const baseProject: Project = {
  id: "test-project",
  title: "Test Project",
  description: "A test project for unit testing",
  longDescription: {
    problem: "A problem statement",
    solution: "A solution approach",
    impact: "Measurable impact",
  },
  techStack: ["React", "TypeScript"],
  thumbnail: "/images/test.png",
  category: "web",
  featured: true,
};

const fullProject: Project = {
  ...baseProject,
  tagline: "Build better. Ship faster.",
  narrativeText: "A long narrative about the project.",
  phase: "current",
  stats: [{ label: "Users", value: "10k+" }],
  githubUrl: "https://github.com/test/repo",
  liveUrl: "https://test.example.com",
};

describe("FilmReelPanel", () => {
  it("renders the project title", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders the tagline when present", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    expect(screen.getByText("Build better. Ship faster.")).toBeInTheDocument();
  });

  it("does not render tagline when absent", () => {
    render(<FilmReelPanel project={baseProject} index={0} onOpen={vi.fn()} />);
    expect(screen.queryByText("Build better. Ship faster.")).not.toBeInTheDocument();
  });

  it("does not render phase badge even when phase is present (removed per user request)", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    expect(screen.queryByText("current")).not.toBeInTheDocument();
  });

  it("does not render phase badge when phase is absent", () => {
    render(<FilmReelPanel project={baseProject} index={0} onOpen={vi.fn()} />);
    expect(screen.queryByText("current")).not.toBeInTheDocument();
  });

  it("renders tech stack tags", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders GitHub link when githubUrl is present", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/test/repo");
  });

  it("renders live link when liveUrl is present", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    const liveLink = screen.getByRole("link", { name: /live/i });
    expect(liveLink).toHaveAttribute("href", "https://test.example.com");
  });

  it("does not render GitHub link when githubUrl is absent", () => {
    render(<FilmReelPanel project={baseProject} index={0} onOpen={vi.fn()} />);
    expect(screen.queryByRole("link", { name: /github/i })).not.toBeInTheDocument();
  });

  it("calls onOpen when panel is clicked", () => {
    const onOpen = vi.fn();
    render(<FilmReelPanel project={fullProject} index={0} onOpen={onOpen} />);
    const panel = screen.getByRole("button");
    fireEvent.click(panel);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen).toHaveBeenCalledWith(fullProject);
  });

  it("renders thumbnail image with priority for index < 2", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/images/test.png");
    expect(img).toHaveAttribute("data-priority", "true");
  });

  it("renders thumbnail without priority for index >= 2", () => {
    render(<FilmReelPanel project={fullProject} index={3} onOpen={vi.fn()} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("data-priority", "false");
  });

  it("uses object-contain for full image visibility (no cropping)", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    const img = screen.getByRole("img");
    expect(img.className).toContain("object-contain");
  });

  // ── Phase 3 + 5: mobile responsive panel + tablet titles ──
  it("panel has max-md responsive classes for mobile vertical stack", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    const panel = screen.getByRole("button");
    expect(panel.className).toContain("max-md:w-full");
    expect(panel.className).toContain("max-md:h-auto");
    expect(panel.className).toContain("max-md:min-h-[50vh]");
  });

  it("panel title uses md:text-4xl lg:text-5xl (not md:text-5xl alone)", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    const title = screen.getByText("Test Project");
    const classes = title.className.split(/\s+/);
    expect(classes).toContain("md:text-4xl");
    expect(classes).toContain("lg:text-5xl");
    // Should NOT have bare md:text-5xl (too aggressive on tablet)
    expect(classes).not.toContain("md:text-5xl");
  });
});
