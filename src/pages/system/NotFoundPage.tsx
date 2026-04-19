import { Container } from '../../shared/components/layout/Container'

/**
 * 404 page template.
 * JD mapping: fallback when URL is invalid.
 */
export function NotFoundPage() {
  return (
    <Container>
      <section className="space-y-2 py-12">
        <h1 className="text-3xl font-semibold">404</h1>
        <p className="text-black/70">Page introuvable.</p>
      </section>
    </Container>
  )
}
