import { Container } from './Container'

/**
 * Deep footer links by theme.
 * JD mapping: customer care, company, legal, and quick links.
 */
export function FooterColumns() {
  return (
    <footer className="bg-black py-10 text-white">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Aide</h3>
            <p className="mt-2 text-sm text-white/70">Suivi commande, retours, contact.</p>
          </section>
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Entreprise</h3>
            <p className="mt-2 text-sm text-white/70">A propos, carriere, nos engagements.</p>
          </section>
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Legal</h3>
            <p className="mt-2 text-sm text-white/70">Confidentialite, CGU, accessibilite.</p>
          </section>
        </div>
      </Container>
    </footer>
  )
}
