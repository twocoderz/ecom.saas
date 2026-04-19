/**
 * Small status label.
 * JD mapping: promo tags such as New, Sale, and Limited.
 */
export function Badge({ label }: { label: string }) {
  return <span className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">{label}</span>
}
