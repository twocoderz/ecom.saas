import { AddToCartPanel } from '../../shared/components/product/AddToCartPanel'
import { ProductGallery } from '../../shared/components/product/ProductGallery'
import { ProductInfoPanel } from '../../shared/components/product/ProductInfoPanel'
import { Container } from '../../shared/components/layout/Container'
import { ProductPageSpecifics } from './components/ProductPageSpecifics'

/**
 * Product detail page template (PDP).
 * JD mapping: media left, info + buy box right, then recommendation blocks.
 */
export function ProductDetailPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <ProductGallery />
          <div className="space-y-4">
            <ProductInfoPanel />
            <AddToCartPanel />
          </div>
        </div>
        <ProductPageSpecifics />
      </div>
    </Container>
  )
}
