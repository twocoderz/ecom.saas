import { useMemo } from 'react'
import { ProductGrid } from '../../shared/components/catalog/ProductGrid'
import { Container } from '../../shared/components/layout/Container'
import { EmptyState } from '../../shared/components/ui/EmptyState'
import { getPlpCardsByIds } from '../../data/api/catalogApi'
import { useWishlistStore } from '../../stores/useWishlistStore'

/**
 * Liste d'envies reelle depuis le store (ids -> cartes catalogue),
 * resolue via le catalogue (aucune limite top-N).
 */
export function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids)
  const products = useMemo(() => getPlpCardsByIds(ids), [ids])

  return (
    <Container>
      <div className="space-y-6 py-8">
        <h1 className="text-2xl font-semibold">Liste d'envies ({ids.length})</h1>
        {products.length === 0 ? (
          <EmptyState message="Votre liste d'envies est vide. Touchez le cœur sur une carte produit." />
        ) : (
          <ProductGrid products={products} layout="grid" />
        )}
      </div>
    </Container>
  )
}
