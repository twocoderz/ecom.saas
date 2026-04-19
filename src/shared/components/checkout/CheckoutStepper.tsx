/**
 * Checkout progress indicator.
 * JD mapping: information -> shipping -> payment -> confirmation.
 */
export function CheckoutStepper() {
  return (
    <ol className="flex flex-wrap gap-3 text-sm text-black/70">
      <li>1. Informations</li>
      <li>2. Livraison</li>
      <li>3. Paiement</li>
      <li>4. Confirmation</li>
    </ol>
  )
}
