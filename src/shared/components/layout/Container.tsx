import type { ReactNode } from "react";

/**
 * Max-width content wrapper.
 * JD mapping: centers large sections while keeping full-width hero rails possible.
 */
export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-2 md:px-4">{children}</div>
  );
}
