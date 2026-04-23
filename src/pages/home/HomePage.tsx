import { CategoryTile } from "../../shared/components/merchandising/CategoryTile";
import { buildPlpPath } from "../../lib/slug";
import { TrendingCollection } from "../../shared/components/merchandising/TrendingCollection";
import { HeroBanner } from "../../shared/components/merchandising/HeroBanner";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { Section } from "../../shared/components/layout/Section";
import { HomeSectionsGuide } from "./components/HomeSectionsGuide";
import { BrandTile } from "../../shared/components";
import {
  getBrandCards,
  getShortcutCategories,
  getTrendingCollectionCards,
} from "./data/homeMerchandising";

/**
 * Homepage template.
 */
export function HomePage() {
  const shortcutCategories = getShortcutCategories();
  const trendingCollectionCards = getTrendingCollectionCards();
  const brandCards = getBrandCards();

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
      <Section title="💥 Trending Collections" className="mt-p18">
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

      {/* Shop By brand */}
      <Section title="Shop By Brand" className="mt-p18">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {brandCards.map((brand) => (
            <BrandTile
              key={brand.id}
              name={brand.name}
              logoSrc={brand.logoSrc}
              logoAlt={brand.logoAlt}
              to={brand.to}
            />
          ))}
        </div>
      </Section>

      <Section title="Top Picks For You">
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
