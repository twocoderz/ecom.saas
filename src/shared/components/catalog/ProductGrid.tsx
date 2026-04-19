import { ProductCard } from './ProductCard'

/**
 * Product listing grid.
 * JD mapping: core PLP/search grid section.
 */
export function ProductGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard title="Produit A" />
      <ProductCard title="Produit B" />
      <ProductCard title="Produit C" />
      <ProductCard title="Produit D" />
    </div>
  )
}
