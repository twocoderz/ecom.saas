import { Container } from '../../shared/components/layout/Container'
import { PageHeader } from '../../shared/components/layout/PageHeader'

/**
 * Authentication page template.
 * JD mapping: account entry page before checkout/account operations.
 */
export function AuthPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader title="Connexion / Inscription" subtitle="Point d'entree compte client." />
        <section className="rounded-xl border border-black/10 p-4">Formulaires auth</section>
      </div>
    </Container>
  )
}
