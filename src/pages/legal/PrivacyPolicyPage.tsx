import { Container } from '../../shared/components/layout/Container'

/**
 * Privacy policy page template.
 * JD mapping: legal privacy and data usage page.
 */
export function PrivacyPolicyPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Politique de confidentialité</h1>
        <p className="text-black/70">Traitement et protection des données personnelles.</p>
      </section>
    </Container>
  )
}
