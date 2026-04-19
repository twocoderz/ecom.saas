/**
 * Product information block.
 * JD mapping: PDP right column with title, price, and attributes.
 */
export function ProductInfoPanel() {
  return (
    <section className="rounded-xl border border-black/10 p-4">
      <h2 className="text-xl font-semibold">Informations produit</h2>
      <p className="mt-2 text-sm text-black/70">Titre, prix, badges, resume.</p>
    </section>
  )
}
