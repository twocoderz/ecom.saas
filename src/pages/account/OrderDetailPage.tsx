import { Container } from '../../shared/components/layout/Container'

/**
 * Order detail page template.
 * JD mapping: order tracking and detail view after purchase.
 */
export function OrderDetailPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Detail commande</h1>
        <p className="text-black/70">Lignes article, statut, suivi, facturation.</p>
      </section>
    </Container>
  )
}
