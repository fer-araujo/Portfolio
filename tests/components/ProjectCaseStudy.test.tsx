import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectCaseStudy } from "@/components/sections/ProjectCaseStudy";
import type { Project } from "@/content/types";

// ── Mock next/image ────────────────────────────────────
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    <img alt={alt} {...props} />
  ),
}));

// ── Mock motion/react ─────────────────────────────────
vi.mock("motion/react", () => ({
  motion: {
    div: "div",
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// ── Mock lucide-react ──────────────────────────────────
vi.mock("lucide-react", () => ({
  X: () => <span data-testid="icon-x">×</span>,
  ExternalLink: () => <span data-testid="icon-external-link" />,
}));

// ── Test data ──────────────────────────────────────────
const fullProject: Project = {
  id: "test-project",
  title: "Test Project",
  description: "A test project description",
  tagline: "Building the future.",
  narrativeText: "This project demonstrates thoughtful engineering.",
  phase: "current",
  stats: [
    { label: "Stack", value: "Next.js 16" },
    { label: "Users", value: "10k+" },
  ],
  longDescription: {
    problem: "Users had a painful experience.",
    solution: "We redesigned the entire flow from scratch.",
    impact: "Satisfaction scores increased by 40%.",
  },
  techStack: ["React", "TypeScript", "Tailwind CSS"],
  thumbnail: "/images/projects/test-01.png",
  images: [
    "/images/projects/test-02.png",
    "/images/projects/test-03.png",
  ],
  githubUrl: "https://github.com/test/repo",
  liveUrl: "https://test.example.com",
  category: "web",
  featured: true,
};

describe("ProjectCaseStudy", () => {
  it("renders the project title in the header", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    expect(screen.getByText("Building the future.")).toBeInTheDocument();
  });

  it("renders narrative text", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    expect(screen.getByText("This project demonstrates thoughtful engineering.")).toBeInTheDocument();
  });

  it("renders problem section", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    expect(screen.getByText("Users had a painful experience.")).toBeInTheDocument();
    expect(screen.getByText(/problem/i)).toBeInTheDocument();
  });

  it("renders solution section", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    expect(screen.getByText("We redesigned the entire flow from scratch.")).toBeInTheDocument();
    expect(screen.getByText(/solution/i)).toBeInTheDocument();
  });

  it("renders impact section", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    expect(screen.getByText("Satisfaction scores increased by 40%.")).toBeInTheDocument();
    expect(screen.getByText(/impact/i)).toBeInTheDocument();
  });

  it("renders tech stack", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
  });

  it("renders stats when present", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    expect(screen.getByText("Stack")).toBeInTheDocument();
    expect(screen.getByText("Next.js 16")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("10k+")).toBeInTheDocument();
  });

  it("renders action links (GitHub + Live)", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/test/repo");
    const liveLink = screen.getByRole("link", { name: /live/i });
    expect(liveLink).toHaveAttribute("href", "https://test.example.com");
  });

  it("has a close button that calls onClose", async () => {
    const onClose = vi.fn();
    render(<ProjectCaseStudy project={fullProject} onClose={onClose} />);
    const closeBtn = screen.getByLabelText("Close case study");
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape key", async () => {
    const onClose = vi.fn();
    render(<ProjectCaseStudy project={fullProject} onClose={onClose} />);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on backdrop click", async () => {
    const onClose = vi.fn();
    render(<ProjectCaseStudy project={fullProject} onClose={onClose} />);
    const backdrop = screen.getByTestId("case-study-backdrop");
    await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders hero image", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThanOrEqual(1);
  });

  it("renders screenshot gallery when images present", () => {
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);
    // The hero + 2 gallery images = 3 images
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);
  });

  it("focus stays trapped inside overlay (tab cycling)", async () => {
    const user = userEvent.setup();
    render(<ProjectCaseStudy project={fullProject} onClose={vi.fn()} />);

    const closeBtn = screen.getByLabelText("Close case study");
    closeBtn.focus();
    expect(document.activeElement).toBe(closeBtn);

    // Tab forward through elements — focus should stay within overlay
    await user.tab();
    expect(document.activeElement).not.toBeNull();
    // The focusable element should be inside the dialog
    const dialog = screen.getByRole("dialog");
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});
