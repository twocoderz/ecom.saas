import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/useProductDetail";
import { applySeoToDocument } from "../../lib/seo";
import { buildPlpPath } from "../../lib/slug";
import { products } from "../../data/mock";
import type { ApiPdpResponse } from "../../types";
import { AddToCartPanel } from "../../shared/components/product/AddToCartPanel";
import { ProductGallery } from "../../shared/components/product/ProductGallery";
import { ProductInfoPanel } from "../../shared/components/product/ProductInfoPanel";
import { ProductReviews } from "../../shared/components/product/ProductReviews";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { Container } from "../../shared/components/layout/Container";
import { Section } from "../../shared/components/layout/Section";

const ATTRIBUTE_LABELS: Record<string, string> = {
  color: "Couleur",
  material: "Matière",
  style: "Style",
  fit: "Coupe",
  technology: "Technologie",
};

/**
 * Fiche produit façon JD : fil d'Ariane, galerie + colonne achat,
 * accordéons détails puis recommandations "Vous aimerez aussi".
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

  // `key` réinitialise la sélection couleur/taille à chaque produit,
  // sans setState dans un effet (cf. règle react-hooks/set-state-in-effect).
  return <ProductDetailContent key={detail.product.id} detail={detail} />;
}

function ProductDetailContent({ detail }: { detail: ApiPdpResponse }) {
  const availableColors = useMemo(
    () => Array.from(new Set(detail.variants.map((v) => v.color))),
    [detail],
  );

  const [selectedColor, setSelectedColor] = useState(availableColors[0] ?? "");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const galleryImages = useMemo(() => {
    if (!selectedColor) return detail.images;
    const variantIds = new Set(
      detail.variants.filter((v) => v.color === selectedColor).map((v) => v.id),
    );
    const filtered = detail.images.filter(
      (img) => img.variant_id && variantIds.has(img.variant_id),
    );
    return filtered.length > 0 ? filtered : detail.images;
  }, [detail, selectedColor]);

  const mainImage =
    galleryImages.find((image) => image.is_main)?.url ??
    galleryImages[0]?.url ??
    "";

  return (
    <Container>
      <div className="space-y-6 py-6 lg:py-8">
        {/* Fil d'Ariane façon JD */}
        <nav className="text-xs text-black-70" aria-label="Fil d'Ariane">
          <Link to="/" className="hover:text-black hover:underline">
            Accueil
          </Link>
          <span className="mx-1.5" aria-hidden="true">
            /
          </span>
          <Link
            to={buildPlpPath(detail.principal_gender.slug)}
            className="hover:text-black hover:underline"
          >
            {detail.principal_gender.name}
          </Link>
          <span className="mx-1.5" aria-hidden="true">
            /
          </span>
          <Link
            to={buildPlpPath(detail.category.slug)}
            className="hover:text-black hover:underline"
          >
            {detail.category.name}
          </Link>
          <span className="mx-1.5" aria-hidden="true">
            /
          </span>
          <span aria-current="page" className="text-black">
            {detail.product.name}
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery
            images={galleryImages}
            productName={`${detail.brand.name} ${detail.product.name}`}
          />
          <div className="space-y-5">
            <ProductInfoPanel
              detail={detail}
              selectedColorName={selectedColor}
            />
            <AddToCartPanel
              productId={detail.product.id}
              productName={`${detail.brand.name} ${detail.product.name}`}
              productImage={mainImage}
              priceUsd={detail.product.price}
              salePriceUsd={detail.product.sale_price}
              variants={detail.variants}
              images={detail.images}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={(color) => {
                setSelectedColor(color);
                setSelectedSize(null);
              }}
              onSizeChange={setSelectedSize}
            />
          </div>
        </div>

        {/* Détails produit façon JD */}
        <div className="border-t border-black-10">
          <details className="border-b border-black-10 py-4" open>
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold [&::-webkit-details-marker]:hidden">
              Détails produit
              <span aria-hidden="true">⌃</span>
            </summary>
            <div className="mt-3 space-y-4 text-sm text-black-80">
              <div>
                <h3 className="font-bold">Comment choisir votre taille</h3>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-black-70">
                  <li>
                    Nos tailles chaussures sont en pointure EU (ex : 40, 41,
                    42). Consultez le guide des tailles pour la correspondance
                    en cm.
                  </li>
                  <li>
                    Pour le textile, les tailles vont de XS à XL. Si vous
                    hésitez entre deux tailles, prenez la plus grande.
                  </li>
                </ul>
              </div>
              <p>{detail.product.description}</p>
              <div>
                <h3 className="font-bold">Caractéristiques</h3>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-black-70">
                  {Object.entries(detail.attributes).map(([key, values]) => (
                    <li key={key}>
                      <span className="font-semibold text-black-80">
                        {ATTRIBUTE_LABELS[key] ?? key} :
                      </span>{" "}
                      {values.join(", ")}
                    </li>
                  ))}
                  <li>Marque : {detail.brand.name}</li>
                  <li>Référence : {detail.product.sku}</li>
                </ul>
              </div>
            </div>
          </details>

          <details className="border-b border-black-10 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold [&::-webkit-details-marker]:hidden">
              Livraison &amp; retours
              <span aria-hidden="true">⌄</span>
            </summary>
            <p className="mt-2 text-sm text-black-70">
              Livraison suivie sous 3 à 5 jours ouvrés. Retrait gratuit en
              magasin le jour même. Retours gratuits sous 30 jours, articles non
              portés avec étiquettes.
            </p>
          </details>

          <ProductReviews
            productId={detail.product.id}
            productName={`${detail.brand.name} ${detail.product.name}`}
          />
        </div>

        {/* Recommandations conservées */}
        {detail.related_products.length > 0 && (
          <Section title="Vous aimerez aussi">
            <ProductGrid products={detail.related_products} layout="rail" />
          </Section>
        )}
      </div>
    </Container>
  );
}
