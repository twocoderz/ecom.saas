import { FilterSidebar } from '../../shared/components/catalog/FilterSidebar'
import { ProductGrid } from '../../shared/components/catalog/ProductGrid'
import { SortBar } from '../../shared/components/catalog/SortBar'
import { Container } from '../../shared/components/layout/Container'
import { PageHeader } from '../../shared/components/layout/PageHeader'
import { CategoryPageSpecifics } from './components/CategoryPageSpecifics'

/**
 * Product listing page (PLP) template.
 * JD mapping: dense category listing with left filters and top sort controls.
 */
export function CategoryPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader title="Categorie" subtitle="Structure type PLP avec filtres + tri + grille." />
        <SortBar />
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <FilterSidebar />
          <ProductGrid />
        </div>
        <CategoryPageSpecifics />
      </div>
    </Container>
  )
}
