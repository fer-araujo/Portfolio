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

  it("renders phase badge when phase is present", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    expect(screen.getByText("current")).toBeInTheDocument();
  });

  it("renders phase badge with bg-black/40 and font-bold for contrast", () => {
    render(<FilmReelPanel project={fullProject} index={0} onOpen={vi.fn()} />);
    const badge = screen.getByText("current");
    expect(badge.className).toContain("bg-black/40");
    expect(badge.className).toContain("font-bold");
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
});
