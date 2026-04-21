import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/useProductDetail";
import { applySeoToDocument } from "../../lib/seo";
import { products } from "../../data/mock";
import { AddToCartPanel } from "../../shared/components/product/AddToCartPanel";
import { ProductGallery } from "../../shared/components/product/ProductGallery";
import { ProductInfoPanel } from "../../shared/components/product/ProductInfoPanel";
import { Container } from "../../shared/components/layout/Container";
import { ProductPageSpecifics } from "./components/ProductPageSpecifics";

/**
 * Product detail page template (PDP).
 * JD mapping: media left, info + buy box right, then recommendation blocks.
 */
export function ProductDetailPage() {
  const params = useParams();

  const resolvedProductId = useMemo(() => {
    if (params.productId) {
      return params.productId;
    }

    if (params.productSlug) {
      const match = products.find(
        (product) => product.slug === params.productSlug,
      );
      return match?.id ?? "";
    }

    return "";
  }, [params.productId, params.productSlug]);

  const resolvedSlug = params.descriptiveSlug ?? params.productSlug ?? "";

  const detail = useProductDetail({
    descriptiveSlug: resolvedSlug,
    productId: resolvedProductId,
  });

  useEffect(() => {
    if (detail) {
      applySeoToDocument(detail.seo);
    }
  }, [detail]);

  if (!detail) {
    return (
      <Container>
        <div className="space-y-6 py-8">
          <div className="rounded-xl border border-black/10 p-4 text-sm text-black/70">
            Produit introuvable.
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <ProductGallery
            images={detail.images}
            productName={detail.product.name}
          />
          <div className="space-y-4">
            <ProductInfoPanel detail={detail} />
            <AddToCartPanel variants={detail.variants} />
          </div>
        </div>
        <ProductPageSpecifics />
      </div>
    </Container>
  );
}
