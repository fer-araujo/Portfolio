import type { ReactNode } from "react";

interface BrowserFrameProps {
  children: ReactNode;
}

/**
 * BrowserFrame wraps content with decorative browser chrome:
 * three traffic-light dots (red/amber/green) and a centered URL bar.
 * All chrome elements are aria-hidden — purely decorative.
 *
 * This is a Server Component — no interactivity, no hooks.
 */
export function BrowserFrame({ children }: BrowserFrameProps) {
  return (
    <div className="border border-border rounded-xl shadow-2xl overflow-hidden">
      {/* Chrome: traffic lights + URL bar */}
      <div
        className="flex items-center gap-2 bg-bg-card px-4 py-2.5 border-b border-border"
        aria-hidden="true"
      >
        {/* Traffic-light dots */}
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-red-500/80" />
          <span className="inline-block h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="inline-block h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>

        {/* URL bar */}
        <div className="mx-auto flex-1 max-w-xs">
          <div className="rounded-md bg-bg-muted px-3 py-1 text-center text-xs text-text-muted">
            feraraujo.com
          </div>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
