import { Container } from '../../shared/components/layout/Container'

/**
 * Saved payment methods page template.
 * JD mapping: account payment preferences management.
 */
export function PaymentMethodsPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Mes moyens de paiement</h1>
        <p className="text-black/70">Gestion des cartes et moyens sauvegardes.</p>
      </section>
    </Container>
  )
}
