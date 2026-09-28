import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CategoryTile } from "../../shared/components/merchandising/CategoryTile";
import { buildPlpPath } from "../../lib/slug";
import { TrendingCollection } from "../../shared/components/merchandising/TrendingCollection";
import { HeroBanner } from "../../shared/components/merchandising/HeroBanner";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { Section } from "../../shared/components/layout/Section";
import { HomeSectionsGuide } from "./components/HomeSectionsGuide";
import { BrandTile } from "../../shared/components";
import { Rail } from "../../shared/components/ui/Rail";
import { getDefaultPlpCards } from "../../data/api/catalogApi";
import {
  getBrandCards,
  getShortcutCategories,
  getTrendingCollectionCards,
  getTrendingOutfitCards,
} from "./data/homeMerchandising";
import { TrendingOutfit } from "../../shared/components/merchandising/TrendingOutfit";

/**
 * Page d'accueil : rails JD (collections, marques, outfits, top picks).
 */
export function HomePage() {
  const { t } = useTranslation();
  const shortcutCategories = getShortcutCategories();
  const trendingCollectionCards = getTrendingCollectionCards();
  const brandCards = getBrandCards();
  const trendingOutfitCards = getTrendingOutfitCards();
  const topPicks = useMemo(() => getDefaultPlpCards(12), []);
  const [activeOutfitProductId, setActiveOutfitProductId] = useState<string | null>(null);

  return (
    <div className="space-y-4 py-8">
      {/* Tuiles categories */}
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

      {/* Hero */}
      <Section>
        <HeroBanner />
      </Section>

      {/* Collections */}
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

      {/* Marques */}
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

      {/* Outfits : un seul popup ouvert a la fois via Rail centralise */}
      <Section title={t("common.trendingOutfits")} className="mt-p18">
        <Rail itemSelector="[data-outfit-card]" ariaLabel={t("common.trendingOutfits")}>
          {trendingOutfitCards.map((card) => (
            <div key={card.id} data-outfit-card className="shrink-0 snap-start">
              <TrendingOutfit
                card={card}
                activeProductId={activeOutfitProductId}
                onActiveChange={setActiveOutfitProductId}
              />
            </div>
          ))}
        </Rail>
      </Section>

      {/* Top picks : produits explicites + cartes corrigees */}
      <Section title={t("common.topPicks")} className="mt-p18">
        <ProductGrid products={topPicks} layout="rail" showNavButtons />
      </Section>

      <Section title="Guide structure home">
        <HomeSectionsGuide />
      </Section>
    </div>
  );
}
