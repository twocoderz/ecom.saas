import type { ReactNode } from "react";

/**
 * Max-width content wrapper.
 */
export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-2 md:px-8">{children}</div>
  );
}
