import { Container } from '../../shared/components/layout/Container'

/**
 * Password recovery page template.
 * JD mapping: account recovery support flow.
 */
export function ForgotPasswordPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Mot de passe oublié</h1>
        <p className="text-black/70">Formulaire de réinitialisation.</p>
      </section>
    </Container>
  )
}
