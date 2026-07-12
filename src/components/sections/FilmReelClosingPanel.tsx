/**
 * Final panel of the film reel — dark background, text-only.
 * No project, no image, no interactive elements.
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

      <p className="max-w-md text-text-muted text-lg leading-relaxed">
        Let&apos;s build something extraordinary together. Reach out and tell me
        about your project.
      </p>
    </div>
  );
}
