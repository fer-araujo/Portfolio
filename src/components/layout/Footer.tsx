"use client";

import {
  GithubIcon,
  LinkedinIcon,
} from "@/components/ui/BrandIcons";
import { socialLinks } from "@/content/social";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon className="h-4 w-4" />,
  linkedin: <LinkedinIcon className="h-4 w-4" />,
};

/**
 * Clean, minimal footer with social links and credits.
 *
 * - Social links (GitHub, LinkedIn, Twitter) from socialLinks data
 * - Copyright: "© {currentYear} Fer Araujo"
 * - "Built with Next.js, Tailwind CSS & Motion" credit line
 * - Subtle top border
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="border-t border-border py-8"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* ── Social links ──────────────────── */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="text-text-muted transition-colors hover:text-text"
              >
                {iconMap[link.icon.toLowerCase()] ?? null}
              </a>
            ))}
          </div>

          {/* ── Copyright ─────────────────────── */}
          <p className="text-sm text-text-muted">
            &copy; {currentYear} Fer Araujo
          </p>
        </div>

        {/* ── Credit line ─────────────────────── */}
        <p className="mt-4 text-center text-xs text-text-muted/60 sm:text-left">
          Built with Next.js, Tailwind CSS &amp; Motion
        </p>
      </div>
    </footer>
  );
}
