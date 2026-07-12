import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
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
      thumbnail: "/images/projects/school-system-01.png",
      images: ["/images/projects/school-system-02.png"],
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
      thumbnail: "/images/projects/anime-tracker-01.png",
      images: [],
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
      thumbnail: "/images/projects/patient-management-01.png",
      images: ["/images/projects/patient-management-02.png"],
      category: "web",
      featured: true,
      githubUrl: "https://github.com/fer-araujo/patient-management",
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
      thumbnail: "/images/projects/pokedex-01.png",
      images: ["/images/projects/pokedex-02.png"],
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
  Github: () => <svg data-testid="icon-github" />,
  Maximize2: () => <svg data-testid="icon-maximize" />,
  X: () => <svg data-testid="icon-x" />,
  ChevronLeft: () => <svg data-testid="icon-chevron-left" />,
  ChevronRight: () => <svg data-testid="icon-chevron-right" />,
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
  });

  it("renders the section heading", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/featured work/i)).toBeInTheDocument();
  });

  it("renders all 4 projects", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("School Attendance System")).toBeInTheDocument();
    expect(screen.getByText("Anime Tracker")).toBeInTheDocument();
    expect(screen.getByText("Patient Management")).toBeInTheDocument();
    expect(screen.getByText("Pokédex App")).toBeInTheDocument();
  });

  it("does NOT render madlions", () => {
    render(<ProjectsSection />);
    expect(screen.queryByText("MadLions Database Manager")).not.toBeInTheDocument();
  });

  it("renders all 4 project cards with correct data attributes", () => {
    render(<ProjectsSection />);
    const cards = screen.getAllByTestId(/project-card-/i);
    expect(cards.length).toBe(4);
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
      screen.getByText("Simple Pokédex built with NextJS")
    ).toBeInTheDocument();
  });

  it("renders tech stack tags for each project", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByText("React").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText("Firebase")).toBeInTheDocument();
    expect(screen.getByText("TMDB API")).toBeInTheDocument();
    expect(screen.getByText("Vite")).toBeInTheDocument();
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
    expect(images.length).toBeGreaterThanOrEqual(4);
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

  it("does NOT render BrowserFrame wrapper", () => {
    render(<ProjectsSection />);
    // BrowserFrame had traffic-light dots with aria-hidden
    const trafficLights = document.querySelectorAll('[aria-hidden="true"]');
    // FilmGrain uses aria-hidden too, but BrowserFrame traffic lights are gone
    expect(
      Array.from(trafficLights).filter(
        (el) => el.tagName === "DIV" && el.classList.contains("rounded-full")
      ).length
    ).toBe(0);
  });

  it("shows gallery indicator for projects with multiple images", () => {
    render(<ProjectsSection />);
    // school-system has 1 extra image → "2 images"
    const schoolCard = screen.getByTestId("project-card-school-system");
    expect(within(schoolCard).getByText("2 images")).toBeInTheDocument();
  });

  it("does NOT show gallery indicator for projects without extra images", () => {
    render(<ProjectsSection />);
    // anime-tracker has empty images array
    const animeCard = screen.getByTestId("project-card-anime-tracker");
    expect(within(animeCard).queryByText(/images/i)).not.toBeInTheDocument();
  });

  it("opens lightbox when clicking gallery indicator", () => {
    render(<ProjectsSection />);
    const schoolCard = screen.getByTestId("project-card-school-system");
    const galleryBtn = within(schoolCard).getByText("2 images");
    fireEvent.click(galleryBtn);
    // Lightbox should appear with close button
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Close gallery")).toBeInTheDocument();
  });

  it("grid is always rendered directly (no conditional rendering)", () => {
    render(<ProjectsSection />);
    const grid = screen.getByTestId("projects-grid-wrapper");
    expect(grid).toBeInTheDocument();
    expect(screen.queryByTestId("projects-marquee-wrapper")).not.toBeInTheDocument();
  });
});
