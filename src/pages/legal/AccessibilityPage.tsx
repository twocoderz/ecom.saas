import { Container } from '../../shared/components/layout/Container'

/**
 * Accessibility policy page template.
 * JD mapping: accessibility statement and commitments page.
 */
export function AccessibilityPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Accessibilite</h1>
        <p className="text-black/70">Engagements accessibilite et support dedie.</p>
      </section>
    </Container>
  )
}
