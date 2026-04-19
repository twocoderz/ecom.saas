import { Container } from '../../shared/components/layout/Container'

/**
 * Address book page template.
 * JD mapping: account address management for faster checkout.
 */
export function AddressesPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Mes adresses</h1>
        <p className="text-black/70">Gestion des adresses de livraison et facturation.</p>
      </section>
    </Container>
  )
}
