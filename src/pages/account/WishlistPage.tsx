import { ProductGrid } from '../../shared/components/catalog/ProductGrid'
import { Container } from '../../shared/components/layout/Container'

/**
 * Wishlist page template.
 * JD mapping: favorites/saved products area.
 */
export function WishlistPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <h1 className="text-2xl font-semibold">Liste d'envies</h1>
        <ProductGrid />
      </div>
    </Container>
  )
}
