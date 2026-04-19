import { Container } from '../../shared/components/layout/Container'

/**
 * 500 page template.
 * JD mapping: graceful failure screen in case of server issue.
 */
export function ErrorPage() {
  return (
    <Container>
      <section className="space-y-2 py-12">
        <h1 className="text-3xl font-semibold">500</h1>
        <p className="text-black/70">Erreur serveur. Reessaie dans un instant.</p>
      </section>
    </Container>
  )
}
