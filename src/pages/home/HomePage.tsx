import { CategoryTile } from "../../shared/components/merchandising/CategoryTile";
import { categories } from "../../data";
import { buildPlpPath } from "../../lib/slug";
import { CollectionRail } from "../../shared/components/merchandising/CollectionRail";
import { HeroBanner } from "../../shared/components/merchandising/HeroBanner";
import { PromoStrip } from "../../shared/components/merchandising/PromoStrip";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { Section } from "../../shared/components/layout/Section";
import { HomeSectionsGuide } from "./components/HomeSectionsGuide";

/**
 * Homepage template.
 * JD mapping: campaign-first discovery page with rails and merchandising blocks.
 */
export function HomePage() {
  const shortcutCategories = categories.filter(
    (category) => category.parent_id != null,
  );

  return (
    <div className="space-y-8 py-8">
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
      <Section title="">
        <HeroBanner />
      </Section>

      <Section title="Bande promo">
        <PromoStrip />
      </Section>

      <Section title="Collections tendances">
        <CollectionRail />
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
