import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryTile } from "../../shared/components/merchandising/CategoryTile";
import { buildPlpPath } from "../../lib/slug";
import { TrendingCollection } from "../../shared/components/merchandising/TrendingCollection";
import { HeroBanner } from "../../shared/components/merchandising/HeroBanner";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { Section } from "../../shared/components/layout/Section";
import { HomeSectionsGuide } from "./components/HomeSectionsGuide";
import { BrandTile } from "../../shared/components";
import { PromoStrip } from "../../shared/components/merchandising/PromoStrip";
import { Rail } from "../../shared/components/ui/Rail";
import { getDefaultPlpCards } from "../../data/api/catalogApi";
import { genders } from "../../data";
import {
  getBrandCards,
  getShortcutCategories,
  getTrendingCollectionCards,
  getTrendingOutfitCards,
} from "./data/homeMerchandising";
import { TrendingOutfit } from "../../shared/components/merchandising/TrendingOutfit";

const GENDER_TILE_STYLES: Record<string, string> = {
  men: "from-black-80 to-black",
  women: "from-black-60 to-black-80",
  kids: "from-black-40 to-black-60",
};

/**
 * Page d'accueil : hero plein écran puis rails JD (genres, collections, marques, outfits, top picks).
 */
export function HomePage() {
  const shortcutCategories = getShortcutCategories();
  const trendingCollectionCards = getTrendingCollectionCards();
  const brandCards = getBrandCards();
  const trendingOutfitCards = getTrendingOutfitCards();
  const topPicks = useMemo(() => getDefaultPlpCards(12), []);
  const [activeOutfitProductId, setActiveOutfitProductId] = useState<
    string | null
  >(null);

  return (
    <div className="pb-8">
      {/* Hero plein écran */}
      <HeroBanner />

      <div className="space-y-4 pt-8">
        {/* Shop by gender */}
        <Section title="Shop By Gender">
          <div className="grid grid-cols-3 gap-4">
            {genders
              .filter((gender) => gender.code !== "unisex")
              .map((gender) => (
                <Link
                  key={gender.code}
                  to={buildPlpPath(`${gender.slug}-shoes`)}
                  aria-label={`Voir ${gender.name}`}
                  className={`flex min-h-28 flex-col items-start justify-end rounded-md bg-linear-to-br p-4 text-white transition-transform hover:scale-[1.02] sm:min-h-40 ${GENDER_TILE_STYLES[gender.code] ?? "from-black-70 to-black"}`}
                >
                  <span className="text-lg font-bold uppercase tracking-tight sm:text-2xl">
                    Shop {gender.name}
                  </span>
                  <span className="mt-1 text-xs font-semibold underline underline-offset-2">
                    Voir détails
                  </span>
                </Link>
              ))}
          </div>
        </Section>

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

        {/* Collections */}
        <Section title="Trending Collections" className="mt-p18">
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

        {/* Bandeau promo mid-page */}
        <Section className="mt-p18">
          <PromoStrip />
        </Section>

        {/* Outfits : un seul popup ouvert a la fois via Rail centralise */}
        <Section title="Top Tenues Tendances" className="mt-p18">
          <Rail
            itemSelector="[data-outfit-card]"
            ariaLabel="Top tenues tendances"
          >
            {trendingOutfitCards.map((card) => (
              <div
                key={card.id}
                data-outfit-card
                className="shrink-0 snap-start"
              >
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
        <Section title="Nos coups de cœur" className="mt-p18">
          <ProductGrid products={topPicks} layout="rail" showNavButtons />
        </Section>

        {/* Guide interne : visible uniquement en dev */}
        {import.meta.env.DEV && (
          <Section title="Guide structure home">
            <HomeSectionsGuide />
          </Section>
        )}
      </div>
    </div>
  );
}
