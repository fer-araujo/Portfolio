import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Vitest setup", () => {
  it("should render a simple component", () => {
    render(<div>Hello, Vitest!</div>);
    expect(screen.getByText("Hello, Vitest!")).toBeInTheDocument();
  });
});
