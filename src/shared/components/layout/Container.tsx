import type { ReactNode } from 'react'

/**
 * Max-width content wrapper.
 * JD mapping: centers large sections while keeping full-width hero rails possible.
 */
export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">{children}</div>
}
