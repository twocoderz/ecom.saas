import { CartSummary } from '../../shared/components/checkout/CartSummary'
import { CheckoutStepper } from '../../shared/components/checkout/CheckoutStepper'
import { Container } from '../../shared/components/layout/Container'

/**
 * Checkout step 2.
 * JD mapping: shipping method selection stage.
 */
export function CheckoutShippingPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <CheckoutStepper />
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="rounded-xl border border-black/10 p-4">Selection mode de livraison</section>
          <CartSummary />
        </div>
      </div>
    </Container>
  )
}
