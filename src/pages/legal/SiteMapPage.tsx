import { Container } from '../../shared/components/layout/Container'

/**
 * Site map page template.
 * JD mapping: complete link index for discoverability and SEO support.
 */
export function SiteMapPage() {
  return (
    <Container>
      <section className="space-y-2 py-8">
        <h1 className="text-2xl font-semibold">Plan du site</h1>
        <p className="text-black/70">Index des pages departement, marque, legal et support.</p>
      </section>
    </Container>
  )
}
