import { Container } from '../../shared/components/layout/Container'

/**
 * Help center template.
 * JD mapping: FAQ and support entry point.
 */
export function HelpPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Aide / FAQ</h1>
        <p className="text-black/70">Centre d'aide client.</p>
      </section>
    </Container>
  )
}
