import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("should render with default props", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();
  });

  it("should render as a link when href is provided", () => {
    render(
      <Button href="https://example.com" target="_blank">
        Visit
      </Button>
    );
    const link = screen.getByRole("link", { name: /visit/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("should call onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press</Button>);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /press/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply variant data attribute for primary", () => {
    render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole("button", { name: /primary/i });
    expect(btn).toHaveAttribute("data-variant", "primary");
  });

  it("should apply variant data attribute for secondary", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole("button", { name: /secondary/i });
    expect(btn).toHaveAttribute("data-variant", "secondary");
  });

  it("should apply variant data attribute for ghost", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole("button", { name: /ghost/i });
    expect(btn).toHaveAttribute("data-variant", "ghost");
  });

  it("should apply size data attribute for sm", () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole("button", { name: /small/i });
    expect(btn).toHaveAttribute("data-size", "sm");
  });

  it("should apply size data attribute for lg", () => {
    render(<Button size="lg">Large</Button>);
    const btn = screen.getByRole("button", { name: /large/i });
    expect(btn).toHaveAttribute("data-size", "lg");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn).toBeDisabled();
  });
});
