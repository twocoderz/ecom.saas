import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/useProductDetail";
import { applySeoToDocument } from "../../lib/seo";
import { buildPlpPath } from "../../lib/slug";
import { products } from "../../data/mock";
import { AddToCartPanel } from "../../shared/components/product/AddToCartPanel";
import { ProductGallery } from "../../shared/components/product/ProductGallery";
import { ProductInfoPanel } from "../../shared/components/product/ProductInfoPanel";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { Container } from "../../shared/components/layout/Container";
import { Section } from "../../shared/components/layout/Section";
import { ProductPageSpecifics } from "./components/ProductPageSpecifics";

/**
 * Fiche produit façon JD : fil d'Ariane, galerie, infos + buy box,
 * accordéons descriptifs puis recommandations.
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
          <div className="rounded-xl border border-black-10 bg-white p-4 text-sm text-black-70">
            Produit introuvable.
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6 py-8">
        {/* Fil d'Ariane */}
        <nav className="text-xs text-black-70" aria-label="Fil d'Ariane">
          <Link
            to="/"
            className="underline underline-offset-2 hover:text-black"
          >
            Accueil
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link
            to={buildPlpPath(detail.category.slug)}
            className="underline underline-offset-2 hover:text-black"
          >
            {detail.category.name}
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{detail.product.name}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-2">
          <ProductGallery
            images={detail.images}
            productName={detail.product.name}
          />
          <div className="space-y-4">
            <ProductInfoPanel detail={detail} />
            <AddToCartPanel
              productId={detail.product.id}
              productName={detail.product.name}
              productImage={
                detail.images.find((image) => image.is_main)?.url ??
                detail.images[0]?.url ??
                ""
              }
              priceUsd={detail.product.price}
              salePriceUsd={detail.product.sale_price}
              variants={detail.variants}
            />
          </div>
        </div>

        {/* Accordéons descriptifs */}
        <div className="space-y-2">
          <details className="rounded-xl border border-black-10 bg-white px-4 py-3">
            <summary className="cursor-pointer text-sm font-semibold">
              Description produit
            </summary>
            <p className="mt-2 text-sm text-black-70">
              {detail.product.description}
            </p>
          </details>
          <details className="rounded-xl border border-black-10 bg-white px-4 py-3">
            <summary className="cursor-pointer text-sm font-semibold">
              Livraison & retours
            </summary>
            <p className="mt-2 text-sm text-black-70">
              Livraison suivie sous 3 à 5 jours ouvrés. Retours gratuits sous 30
              jours, articles non portés avec étiquettes.
            </p>
          </details>
        </div>

        {/* Recommandations */}
        {detail.related_products.length > 0 && (
          <Section title="Vous aimerez aussi">
            <ProductGrid products={detail.related_products} layout="rail" />
          </Section>
        )}

        <ProductPageSpecifics />
      </div>
    </Container>
  );
}
