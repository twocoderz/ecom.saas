import { useEffect, useRef, useState } from "react";
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
  getTrendingOutfitCards,
} from "./data/homeMerchandising";
import { TrendingOutfit } from "../../shared/components/merchandising/TrendingOutfit";
import { ChevronLeftIcon, ChevronRightIcon } from "../../shared/icons";

/**
 * Homepage template.
 */
export function HomePage() {
  const shortcutCategories = getShortcutCategories();
  const trendingCollectionCards = getTrendingCollectionCards();
  const brandCards = getBrandCards();
  const trendingOutfitCards = getTrendingOutfitCards();
  const outfitRailRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const rail = outfitRailRef.current;
    if (!rail) {
      return;
    }

    const updateScrollState = () => {
      const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
      setCanScrollLeft(rail.scrollLeft > 4);
      setCanScrollRight(rail.scrollLeft < maxScrollLeft - 4);
    };

    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [trendingOutfitCards.length]);

  const scrollOutfitsByCard = (direction: "left" | "right") => {
    const rail = outfitRailRef.current;
    if (!rail) {
      return;
    }

    const firstCard = rail.querySelector<HTMLElement>("[data-outfit-card]");
    const gap = 16;
    const amount = (firstCard?.offsetWidth ?? 320) + gap;

    rail.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

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

      <Section title="Top Trending Outfits" className="mt-p18">
        <div className="relative">
          <div
            ref={outfitRailRef}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          >
            {trendingOutfitCards.map((card) => (
              <div key={card.id} data-outfit-card>
                <TrendingOutfit card={card} />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Voir les outfits precedents"
            onClick={() => scrollOutfitsByCard("left")}
            disabled={!canScrollLeft}
            className={`absolute left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white text-black shadow-sm transition sm:flex ${
              canScrollLeft
                ? "cursor-pointer opacity-100"
                : "cursor-not-allowed opacity-35"
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Voir les outfits suivants"
            onClick={() => scrollOutfitsByCard("right")}
            disabled={!canScrollRight}
            className={`absolute right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white text-black shadow-sm transition sm:flex ${
              canScrollRight
                ? "cursor-pointer opacity-100"
                : "cursor-not-allowed opacity-35"
            }`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </Section>
      <Section title="Top Picks For You" className="mt-p18">
        <ProductGrid />
      </Section>

      <Section title="Guide structure home">
        <HomeSectionsGuide />
      </Section>
    </div>
  );
}
