/**
 * Base product card used in PLP, search, and recommendations.
 * JD mapping: repeated product card pattern across listing modules.
 */
export function ProductCard({ title }: { title: string }) {
  return (
    <article className="rounded-xl border border-black/10 p-4">
      <p className="text-sm text-black/60">Image produit</p>
      <h3 className="mt-2 text-sm font-semibold">{title}</h3>
      <p className="text-sm text-black/70">Prix / badge promo / note</p>
    </article>
  )
}
