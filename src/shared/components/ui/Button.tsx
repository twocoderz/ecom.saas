import type { ButtonHTMLAttributes } from 'react'

/**
 * Base button primitive.
 * JD mapping: used by CTA blocks across home, PLP, PDP, and checkout.
 */
export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white" {...props} />
}
