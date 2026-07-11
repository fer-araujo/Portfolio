import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";

/**
 * Custom render wrapper that wraps components with providers.
 * Add providers (theme, context, etc.) here as the app grows.
 */
function AllProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
