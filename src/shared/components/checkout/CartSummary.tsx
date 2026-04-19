/**
 * Shared order summary card for cart and checkout.
 * JD mapping: sticky summary widget during checkout flow.
 */
export function CartSummary() {
  return (
    <aside className="rounded-xl border border-black/10 p-4">
      <h3 className="text-base font-semibold">Resume commande</h3>
      <p className="mt-2 text-sm text-black/70">Sous-total, livraison, taxes, total.</p>
    </aside>
  )
}
