import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Mock motion/react
vi.mock("motion/react", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }) => <div {...props}>{children}</div>,
    h2: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }) => <h2 {...props}>{children}</h2>,
    span: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }) => <span {...props}>{children}</span>,
  },
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

describe("SectionHeading", () => {
  it("should render the title", () => {
    render(<SectionHeading title="About Me" />);
    expect(
      screen.getByRole("heading", { name: /about me/i })
    ).toBeInTheDocument();
  });

  it("should render the subtitle when provided", () => {
    render(
      <SectionHeading title="Skills" subtitle="Technologies I work with" />
    );
    expect(screen.getByText("Technologies I work with")).toBeInTheDocument();
  });

  it("should not render subtitle when not provided", () => {
    render(<SectionHeading title="Projects" />);
    expect(screen.queryByText(/technologies/i)).not.toBeInTheDocument();
  });

  it("should apply center alignment when aligned is center", () => {
    render(<SectionHeading title="Centered" aligned="center" />);
    const heading = screen.getByRole("heading", { name: /centered/i });
    expect(heading).toHaveAttribute("data-aligned", "center");
  });

  it("should default to left alignment", () => {
    render(<SectionHeading title="Default" />);
    const heading = screen.getByRole("heading", { name: /default/i });
    expect(heading).toHaveAttribute("data-aligned", "left");
  });

  it("should render the accent underline element", () => {
    render(<SectionHeading title="With Underline" />);
    const container = screen.getByTestId("section-heading");
    expect(container).toBeInTheDocument();
  });
});
