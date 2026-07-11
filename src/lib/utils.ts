import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind conflict resolution.
 * Filters falsy values and resolves conflicting Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO date string to a human-readable display format.
 * Accepts "YYYY-MM-DD" or "YYYY-MM" formats.
 * Returns "Mon YYYY" format (e.g. "Jun 2023").
 * Uses UTC to avoid timezone offset shifting the month.
 */
export function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  if (!year || !month) return dateStr;
  const date = new Date(Date.UTC(year, month - 1));
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Group an array of items by a key derived from each item.
 * Returns a record mapping each key to the array of matching items.
 */
export function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

/**
 * Truncate a string to a maximum length, appending an ellipsis if truncated.
 * @param str - The string to truncate
 * @param maxLength - Maximum allowed length
 * @param ellipsis - Suffix for truncated strings (default "…")
 */
export function truncate(
  str: string,
  maxLength: number,
  ellipsis = "…"
): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + ellipsis;
}
