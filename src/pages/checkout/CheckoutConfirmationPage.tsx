import { Container } from '../../shared/components/layout/Container'

/**
 * Checkout final step.
 * JD mapping: order confirmation and post-purchase next actions.
 */
export function CheckoutConfirmationPage() {
  return (
    <Container>
      <section className="space-y-4 py-12">
        <h1 className="text-3xl font-semibold">Confirmation commande</h1>
        <p className="text-black/70">Numero commande, recap, et actions post-achat.</p>
      </section>
    </Container>
  )
}
