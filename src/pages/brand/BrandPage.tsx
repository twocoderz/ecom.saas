import { ProductGrid } from '../../shared/components/catalog/ProductGrid'
import { Container } from '../../shared/components/layout/Container'
import { PageHeader } from '../../shared/components/layout/PageHeader'

/**
 * Brand landing page template.
 * JD mapping: shop-by-brand pages featuring a selected brand universe.
 */
export function BrandPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader title="Marque" subtitle="Landing marque avec merchandising + produits." />
        <ProductGrid />
      </div>
    </Container>
  )
}
