"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  href?: never;
};

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent shadow-lg shadow-accent/20",
  secondary:
    "border border-border bg-transparent text-text hover:bg-white/5 focus-visible:ring-border",
  ghost:
    "bg-transparent text-text-muted hover:bg-white/5 hover:text-text focus-visible:ring-border",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

function isHrefProps(props: ButtonProps): props is ButtonAsLink {
  return typeof (props as ButtonAsLink).href === "string";
}

/**
 * Polymorphic button component with variant and size support.
 * Renders as a <button> by default, or as an <a> when `href` is provided.
 * Includes spring hover/tap animation (scale 1.03 / 0.97) for interactive feel.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, children, ...props }, ref) {
    const prefersReduced = useReducedMotion();
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const motionProps = prefersReduced
      ? {}
      : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

    if (isHrefProps(props as ButtonProps)) {
      const { href, target, rel, ...linkRest } = props as ButtonAsLink;
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
          className={classes}
          data-variant={variant}
          data-size={size}
          {...motionProps}
          {...(linkRest as Record<string, unknown>)}
        >
          {children}
        </motion.a>
      );
    }

    const { ...buttonRest } = props as ButtonAsButton;
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        data-variant={variant}
        data-size={size}
        {...motionProps}
        {...(buttonRest as Record<string, unknown>)}
      >
        {children}
      </motion.button>
    );
  }
);
