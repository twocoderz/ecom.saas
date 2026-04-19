import { Container } from '../../shared/components/layout/Container'

/**
 * Maintenance page template.
 * JD mapping: temporary downtime communication screen.
 */
export function MaintenancePage() {
  return (
    <Container>
      <section className="space-y-2 py-12">
        <h1 className="text-3xl font-semibold">Maintenance</h1>
        <p className="text-black/70">Le site revient bientot.</p>
      </section>
    </Container>
  )
}
