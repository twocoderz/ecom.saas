import { CategoryTile } from "../../shared/components/merchandising/CategoryTile";
import {
  BRAND_LOGO_FALLBACK,
  categories,
  collections,
  productCollections,
  productImages,
} from "../../data";
import { buildPlpPath } from "../../lib/slug";
import { TrendingCollection } from "../../shared/components/merchandising/TrendingCollection";
import { HeroBanner } from "../../shared/components/merchandising/HeroBanner";
import { PromoStrip } from "../../shared/components/merchandising/PromoStrip";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { Section } from "../../shared/components/layout/Section";
import { HomeSectionsGuide } from "./components/HomeSectionsGuide";

/**
 * Homepage template.
 */
export function HomePage() {
  const shortcutCategories = categories.filter(
    (category) => category.parent_id != null,
  );
  const trendingCollectionCards = collections
    .filter((collection) => collection.is_trending)
    .map((collection) => {
      const relation = productCollections.find(
        (item) => item.collection_id === collection.id,
      );
      const images = relation
        ? productImages
            .filter((image) => image.product_id === relation.product_id)
            .sort((left, right) => left.sort_order - right.sort_order)
        : [];
      const mainImage = images.find((image) => image.is_main) ?? images[0];

      return {
        id: collection.id,
        name: collection.name,
        to: buildPlpPath(collection.slug),
        imageSrc: mainImage?.url ?? BRAND_LOGO_FALLBACK,
        imageAlt: mainImage?.alt ?? `Collection ${collection.name}`,
      };
    });

  return (
    <div className="space-y-4 py-8">
      {/* Category tiles */}
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex min-w-max items-center gap-4 sm:flex-wrap sm:justify-center">
          {shortcutCategories.map((category) => (
            <CategoryTile
              key={category.id}
              name={category.name}
              to={buildPlpPath(category.slug)}
            />
          ))}
        </div>
      </div>

      {/* Hero banner */}
      <Section>
        <HeroBanner />
      </Section>

      {/* Trending collections */}
      <Section title="💥 Trending Collections">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {trendingCollectionCards.map((collection) => (
            <TrendingCollection
              key={collection.id}
              name={collection.name}
              imageSrc={collection.imageSrc}
              imageAlt={collection.imageAlt}
              to={collection.to}
            />
          ))}
        </div>
      </Section>

      <Section title="">
        <PromoStrip />
      </Section>

      <Section title="Produits mis en avant">
        <ProductGrid />
      </Section>

      <Section title="Blocs campagne secondaires">
        <div className="grid gap-4 md:grid-cols-3"></div>
      </Section>

      <Section title="Guide structure home">
        <HomeSectionsGuide />
      </Section>
    </div>
  );
}
