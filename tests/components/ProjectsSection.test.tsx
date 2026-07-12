import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

// ── Mock projects data ─────────────────────────────────
vi.mock("@/content/projects", () => ({
  projects: [
    {
      id: "school-system",
      title: "School Attendance System",
      description: "QR-based attendance tracking with Firebase",
      longDescription: {
        problem: "Manual attendance tracking was error-prone",
        solution: "Built a QR-based attendance system with Firebase backend",
        impact: "Reduced attendance processing time by 80%",
      },
      techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
      thumbnail: "/images/projects/school-system.svg",
      category: "web",
      featured: true,
      githubUrl: "https://github.com/fer-araujo/school-system",
    },
    {
      id: "anime-tracker",
      title: "Anime Tracker",
      description: "Streaming availability platform",
      longDescription: {
        problem: "Hard to find which streaming services have specific anime",
        solution: "Built a platform tracking streaming availability across services",
        impact: "Thousands of monthly active users",
      },
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Express", "TMDB API"],
      thumbnail: "/images/projects/anime-tracker.svg",
      category: "web",
      featured: true,
      liveUrl: "https://your-anime-tracker.vercel.app",
      githubUrl: "https://github.com/fer-araujo/anime-tracker",
    },
    {
      id: "patient-management",
      title: "Patient Management",
      description: "Healthcare management starter",
      longDescription: {
        problem: "Small clinics needed affordable management software",
        solution: "Built a lightweight patient management starter with React",
        impact: "Deployed in 3 local clinics",
      },
      techStack: ["React", "TypeScript", "Vite"],
      thumbnail: "/images/projects/patient-management.svg",
      category: "web",
      featured: true,
      githubUrl: "https://github.com/fer-araujo/patient-management",
    },
    {
      id: "madlions",
      title: "MadLions Database Manager",
      description: "GUI for database management",
      longDescription: {
        problem: "Database management tools lacked a clean GUI",
        solution: "Built a GUI-based database management app with React",
        impact: "Simplifies database management with a clean visual interface",
      },
      techStack: ["React", "TypeScript", "Node.js"],
      thumbnail: "/images/projects/madlions.svg",
      category: "web",
      featured: true,
      githubUrl: "https://github.com/fer-araujo/MadLions",
    },
    {
      id: "pokedex",
      title: "Pokédex App",
      description: "Simple Pokédex built with NextJS",
      longDescription: {
        problem: "Pokémon fans need a fast, searchable Pokémon database",
        solution: "Built a Pokédex app with Next.js and the PokéAPI",
        impact: "Provides snappy Pokémon lookups during gameplay",
      },
      techStack: ["Next.js", "TypeScript", "API Integration"],
      thumbnail: "/images/projects/pokedex.svg",
      category: "web",
      featured: true,
      githubUrl: "https://github.com/fer-araujo/pokedex",
    },
  ],
}));

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
    section: createTag("section"),
    div: createTag("div"),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => mockUseReducedMotion(),
}));

// ── Mock lucide-react ──────────────────────────────────
vi.mock("lucide-react", () => ({
  ExternalLink: () => <svg data-testid="icon-external-link" />,
  ChevronLeft: () => <svg data-testid="icon-chevron-left" />,
  ChevronRight: () => <svg data-testid="icon-chevron-right" />,
  Github: () => <svg data-testid="icon-github" />,
}));

// ── Mock next/image ────────────────────────────────────
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img alt={alt} {...props} />;
  },
}));

describe("ProjectsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
    // Default to desktop viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1280,
    });
  });

  it("renders the section heading", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/featured work/i)).toBeInTheDocument();
  });

  it("renders all 5 projects", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("School Attendance System")).toBeInTheDocument();
    expect(screen.getByText("Anime Tracker")).toBeInTheDocument();
    expect(screen.getByText("Patient Management")).toBeInTheDocument();
    expect(screen.getByText("MadLions Database Manager")).toBeInTheDocument();
    expect(screen.getByText("Pokédex App")).toBeInTheDocument();
  });

  it("renders all 5 project cards with correct data attributes", () => {
    render(<ProjectsSection />);
    const cards = screen.getAllByTestId(/project-card-/i);
    expect(cards.length).toBe(5);
  });

  it("renders project descriptions", () => {
    render(<ProjectsSection />);
    expect(
      screen.getByText("QR-based attendance tracking with Firebase")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Streaming availability platform")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Healthcare management starter")
    ).toBeInTheDocument();
    expect(
      screen.getByText("GUI for database management")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Simple Pokédex built with NextJS")
    ).toBeInTheDocument();
  });

  it("renders tech stack tags for each project", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByText("React").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(4);
    expect(screen.getByText("Firebase")).toBeInTheDocument();
    expect(screen.getByText("TMDB API")).toBeInTheDocument();
    expect(screen.getByText("Vite")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("API Integration")).toBeInTheDocument();
  });

  it("renders live demo link when liveUrl is present", () => {
    render(<ProjectsSection />);
    const animeCard = screen.getByTestId("project-card-anime-tracker");
    const liveLink = within(animeCard).getByRole("link", { name: /live/i });
    expect(liveLink).toHaveAttribute("href", "https://your-anime-tracker.vercel.app");
  });

  it("renders GitHub link when githubUrl is present", () => {
    render(<ProjectsSection />);
    const schoolCard = screen.getByTestId("project-card-school-system");
    const githubLink = within(schoolCard).getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/fer-araujo/school-system"
    );
  });

  it("renders project thumbnails as images", () => {
    render(<ProjectsSection />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThanOrEqual(5);
  });

  it("renders the grid inside a visual structure wrapper", () => {
    const { container } = render(<ProjectsSection />);
    const grid = container.querySelector(
      '[data-testid="projects-grid-wrapper"]'
    );
    expect(grid).toBeInTheDocument();
  });

  it("renders without motion animation when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<ProjectsSection />);
    expect(screen.getByText("Featured Work")).toBeInTheDocument();
    expect(screen.getByText("School Attendance System")).toBeInTheDocument();
  });

  it("defaults to grid view", () => {
    render(<ProjectsSection />);
    expect(screen.getByTestId("view-toggle-grid")).toBeInTheDocument();
    expect(screen.getByTestId("projects-grid-wrapper")).toBeInTheDocument();
  });

  it("renders the view toggle with Grid and Marquee buttons", () => {
    render(<ProjectsSection />);
    const toggle = screen.getByTestId("view-toggle");
    expect(toggle).toBeInTheDocument();
    expect(
      within(toggle).getByRole("button", { name: /grid/i })
    ).toBeInTheDocument();
    expect(
      within(toggle).getByRole("button", { name: /marquee/i })
    ).toBeInTheDocument();
  });

  it("switches to marquee view when toggle is clicked", () => {
    render(<ProjectsSection />);
    fireEvent.click(screen.getByTestId("view-toggle-marquee"));
    expect(screen.getByTestId("projects-marquee-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("projects-grid-wrapper")).not.toBeInTheDocument();
  });

  it("forcefully hides the toggle on mobile (< 768px)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600,
    });
    render(<ProjectsSection />);
    // Toggle should not be visible on mobile (has hidden class)
    const toggle = screen.getByTestId("view-toggle");
    expect(toggle.className).toContain("hidden");
  });

  it("forces grid view on mobile even if marquee was previously selected", () => {
    // Start with desktop and switch to marquee
    const { rerender } = render(<ProjectsSection />);
    fireEvent.click(screen.getByTestId("view-toggle-marquee"));
    expect(screen.getByTestId("projects-marquee-wrapper")).toBeInTheDocument();

    // Now shrink to mobile
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600,
    });
    // Trigger resize event
    window.dispatchEvent(new Event("resize"));

    // Wait a tick for state update
    rerender(<ProjectsSection />);

    // Grid view should be shown despite marquee being selected
    expect(screen.getByTestId("projects-grid-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("projects-marquee-wrapper")).not.toBeInTheDocument();
  });

  it("marquee view has navigation buttons", () => {
    render(<ProjectsSection />);
    fireEvent.click(screen.getByTestId("view-toggle-marquee"));
    expect(screen.getByTestId("marquee-prev")).toBeInTheDocument();
    expect(screen.getByTestId("marquee-next")).toBeInTheDocument();
  });
});
