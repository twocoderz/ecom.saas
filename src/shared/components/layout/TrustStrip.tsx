import { Container } from './Container'

/**
 * Compact reassurance row.
 * JD mapping: shipping, returns, support, and secure payment reminders.
 */
export function TrustStrip() {
  return (
    <section className="border-y border-black/10 bg-black/5 py-3">
      <Container>
        <ul className="flex flex-wrap items-center gap-4 text-sm text-black/80">
          <li>Livraison claire</li>
          <li>Retours simplifies</li>
          <li>Paiement securise</li>
          <li>Support client</li>
        </ul>
      </Container>
    </section>
  )
}
