"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-dvh bg-bg text-text font-body antialiased">
        <div
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center"
        >
          <h1 className="font-heading text-2xl font-bold text-text">
            Something went wrong
          </h1>
          <p className="max-w-md text-text-muted">
            {error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={reset}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
