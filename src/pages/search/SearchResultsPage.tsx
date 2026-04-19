import { ProductGrid } from '../../shared/components/catalog/ProductGrid'
import { SortBar } from '../../shared/components/catalog/SortBar'
import { Container } from '../../shared/components/layout/Container'
import { PageHeader } from '../../shared/components/layout/PageHeader'

/**
 * Search results template.
 * JD mapping: search listing variant close to PLP, with same product grid system.
 */
export function SearchResultsPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader title="Recherche" subtitle="Resultats pour un mot-cle avec tri et grille." />
        <SortBar />
        <ProductGrid />
      </div>
    </Container>
  )
}
