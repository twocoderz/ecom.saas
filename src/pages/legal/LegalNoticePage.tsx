import { Container } from '../../shared/components/layout/Container'

/**
 * Legal notice page template.
 * JD mapping: legal information baseline page.
 */
export function LegalNoticePage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Mentions legales</h1>
        <p className="text-black/70">Informations legales de l'entreprise.</p>
      </section>
    </Container>
  )
}
