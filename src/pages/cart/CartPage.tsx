import { CartSummary } from '../../shared/components/checkout/CartSummary'
import { Container } from '../../shared/components/layout/Container'
import { PageHeader } from '../../shared/components/layout/PageHeader'
import { CartPageSpecifics } from './components/CartPageSpecifics'

/**
 * Cart page template.
 * JD mapping: bag page before checkout, with summary and trust reminders.
 */
export function CartPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader title="Panier" subtitle="Verification des articles avant checkout." />
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="rounded-xl border border-black/10 p-4">
            <p className="text-sm text-black/80">Liste des articles panier (placeholder)</p>
          </section>
          <CartSummary />
        </div>
        <CartPageSpecifics />
      </div>
    </Container>
  )
}
