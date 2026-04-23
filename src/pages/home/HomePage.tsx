import { CategoryTile } from "../../shared/components/merchandising/CategoryTile";
import { categories } from "../../data";
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
        <div className="flex items-center gap-4">
          <TrendingCollection />
          <TrendingCollection />
          <TrendingCollection />
          <TrendingCollection />
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
