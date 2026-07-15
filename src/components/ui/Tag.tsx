"use client";

import { cn } from "@/lib/utils";

type TagVariant = "default" | "accent";

interface TagProps {
  /** Display text inside the tag */
  label: string;
  /** Visual variant */
  variant?: TagVariant;
  /** Optional click handler — makes the tag interactive */
  onClick?: () => void;
  className?: string;
}

const variantStyles: Record<TagVariant, string> = {
  default:
    "bg-bg-muted text-text-muted hover:text-text hover:bg-white/10",
  accent:
    "bg-accent/10 text-accent-text hover:bg-accent/20",
};

/**
 * Tech tag/badge for displaying skills, technologies, or categories.
 * Renders as a <button> when onClick is provided, otherwise as a <span>.
 */
export function Tag({ label, variant = "default", onClick, className }: TagProps) {
  const classes = cn(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200",
    variantStyles[variant],
    onClick && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    className
  );

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick} aria-label={label}>
        {label}
      </button>
    );
  }

  return <span className={classes}>{label}</span>;
}
