import { Container } from '../../shared/components/layout/Container'

/**
 * Orders list page template.
 * JD mapping: customer order history page.
 */
export function OrdersPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Mes commandes</h1>
        <p className="text-black/70">Historique des commandes client.</p>
      </section>
    </Container>
  )
}
