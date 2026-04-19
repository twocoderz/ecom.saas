import { Container } from '../../shared/components/layout/Container'

/**
 * Shipping and returns information page template.
 * JD mapping: policy visibility to improve trust and reduce friction.
 */
export function ShippingReturnsPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Livraison et retours</h1>
        <p className="text-black/70">Politiques logistiques et retours.</p>
      </section>
    </Container>
  )
}
