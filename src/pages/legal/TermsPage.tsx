import { Container } from '../../shared/components/layout/Container'

/**
 * Terms of use page template.
 * JD mapping: terms and conditions legal page.
 */
export function TermsPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Conditions d'utilisation</h1>
        <p className="text-black/70">Regles d'utilisation de la plateforme.</p>
      </section>
    </Container>
  )
}
