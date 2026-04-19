import { Container } from '../../shared/components/layout/Container'

/**
 * Order tracking page template.
 * JD mapping: prominent tracking utility page.
 */
export function OrderTrackingPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Suivi de commande</h1>
        <p className="text-black/70">Formulaire numero commande + email.</p>
      </section>
    </Container>
  )
}
