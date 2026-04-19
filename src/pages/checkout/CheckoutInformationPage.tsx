import { CartSummary } from '../../shared/components/checkout/CartSummary'
import { CheckoutStepper } from '../../shared/components/checkout/CheckoutStepper'
import { Container } from '../../shared/components/layout/Container'
import { CheckoutPageSpecifics } from './components/CheckoutPageSpecifics'

/**
 * Checkout step 1.
 * JD mapping: customer and contact information stage.
 */
export function CheckoutInformationPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <CheckoutStepper />
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="rounded-xl border border-black/10 p-4">Formulaire informations client</section>
          <CartSummary />
        </div>
        <CheckoutPageSpecifics />
      </div>
    </Container>
  )
}
