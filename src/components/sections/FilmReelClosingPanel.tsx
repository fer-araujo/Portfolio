/**
 * Final panel of the film reel — dark background, centered CTA.
 * No project, no image, no overlay trigger.
 * CTA is a mailto link that opens the user's email client.
 */
export function FilmReelClosingPanel() {
  return (
    <div
      data-testid="closing-panel"
      className="flex h-screen w-screen flex-shrink-0 flex-col items-center justify-center bg-bg dot-grid px-6 text-center"
    >
      <h2 className="mb-4 max-w-2xl font-heading text-3xl font-bold tracking-tight text-text md:text-5xl">
        This reel ends here.
        <br />
        <span className="text-accent">Your story is next.</span>
      </h2>

      <p className="mb-8 max-w-md text-text-muted text-lg leading-relaxed">
        Let&apos;s build something extraordinary together. Reach out and tell me
        about your project.
      </p>

      <a
        href="mailto:hello@feraraujo.com?subject=Let's%20build%20something"
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-base font-medium text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        Let&apos;s talk
      </a>
    </div>
  );
}
