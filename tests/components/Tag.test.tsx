import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tag } from "@/components/ui/Tag";

describe("Tag", () => {
  it("should render the label text", () => {
    render(<Tag label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("should render without button role by default", () => {
    render(<Tag label="TypeScript" />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should render with accent variant as a span", () => {
    render(<Tag label="Featured" variant="accent" />);
    const tag = screen.getByText("Featured");
    expect(tag).toBeInTheDocument();
    expect(tag.tagName).toBe("SPAN");
  });

  it("should call onClick when clicked and onClick is provided", async () => {
    const handleClick = vi.fn();
    render(<Tag label="Clickable" onClick={handleClick} />);

    const user = userEvent.setup();
    await user.click(screen.getByText("Clickable"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should have button role when onClick is provided", () => {
    render(<Tag label="Filter" onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: /filter/i })).toBeInTheDocument();
  });

  it("should not have button role when no onClick", () => {
    render(<Tag label="Static" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
