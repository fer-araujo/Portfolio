import { describe, it, expect } from "vitest";
import { cn, formatDate, groupBy, truncate } from "@/lib/utils";

describe("cn", () => {
  it("should merge class names, removing falsy values", () => {
    expect(cn("px-4", "py-2", false && "hidden", null, undefined)).toBe(
      "px-4 py-2"
    );
  });

  it("should resolve tailwind conflicts (last class wins)", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("should handle conditional classes with clsx syntax", () => {
    const isActive = true;
    const isDisabled = false;
    expect(
      cn("btn", isActive && "btn-active", isDisabled && "btn-disabled")
    ).toBe("btn btn-active");
  });

  it("should return empty string for no arguments", () => {
    expect(cn()).toBe("");
  });
});

describe("formatDate", () => {
  it("should format an ISO date string to display format", () => {
    expect(formatDate("2023-06-01")).toBe("Jun 2023");
  });

  it("should format a date without day (YYYY-MM)", () => {
    expect(formatDate("2020-06")).toBe("Jun 2020");
  });

  it("should handle December dates", () => {
    expect(formatDate("2022-12-15")).toBe("Dec 2022");
  });

  it("should handle January dates", () => {
    expect(formatDate("2021-01-01")).toBe("Jan 2021");
  });
});

describe("groupBy", () => {
  const items = [
    { category: "frontend", name: "React" },
    { category: "frontend", name: "Vue" },
    { category: "backend", name: "Node" },
    { category: "tools", name: "Docker" },
  ];

  it("should group items by a key function", () => {
    const grouped = groupBy(items, (item) => item.category);
    expect(grouped).toEqual({
      frontend: [
        { category: "frontend", name: "React" },
        { category: "frontend", name: "Vue" },
      ],
      backend: [{ category: "backend", name: "Node" }],
      tools: [{ category: "tools", name: "Docker" }],
    });
  });

  it("should return an empty map for an empty array", () => {
    expect(groupBy([], (item: unknown) => String(item))).toEqual({});
  });

  it("should handle single-item groups", () => {
    const single = [{ type: "a", val: 1 }];
    expect(groupBy(single, (item) => item.type)).toEqual({
      a: [{ type: "a", val: 1 }],
    });
  });
});

describe("truncate", () => {
  it("should truncate a string longer than max length", () => {
    expect(truncate("Hello World This Is Long", 10)).toBe("Hello Worl…");
  });

  it("should NOT truncate a string shorter than max length", () => {
    expect(truncate("Short", 10)).toBe("Short");
  });

  it("should NOT truncate a string equal to max length", () => {
    expect(truncate("Exactly 10", 10)).toBe("Exactly 10");
  });

  it("should use custom ellipsis when provided", () => {
    expect(truncate("Hello World Extra", 5, "..")).toBe("Hello..");
  });

  it("should handle empty string", () => {
    expect(truncate("", 10)).toBe("");
  });
});
