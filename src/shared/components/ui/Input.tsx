import type { InputHTMLAttributes } from 'react'

/**
 * Base input primitive.
 * JD mapping: search, account auth, and checkout forms.
 */
export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" {...props} />
}
