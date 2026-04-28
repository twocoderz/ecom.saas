import { useEffect, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getDefaultPlpCards } from "../../../data/api/catalogApi";
import type { PlpProductCard } from "../../../types";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";

type ProductGridProps = {
  products?: PlpProductCard[];
  layout?: "grid" | "rail";
  showNavButtons?: boolean;
};

/**
 * Grille de produits pour PLP et recherche.
 */
export function ProductGrid({
  products,
  layout = "grid",
  showNavButtons = false,
}: ProductGridProps) {
  const visibleProducts = products ?? getDefaultPlpCards(12);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  if (visibleProducts.length === 0) {
    return (
      <div className="rounded-xl border border-black/10 bg-white p-6 text-sm text-black/70">
        Aucun produit ne correspond a cette selection.
      </div>
    );
  }

  useEffect(() => {
    if (layout !== "rail") {
      return;
    }

    const rail = railRef.current;
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
  }, [layout, visibleProducts.length]);

  const scrollByCard = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const firstCard = rail.querySelector<HTMLElement>(
      "[data-product-rail-item]",
    );
    const gap = 16;
    const amount = (firstCard?.offsetWidth ?? 300) + gap;

    rail.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (layout === "rail") {
    return (
      <div className="relative">
        <div
          ref={railRef}
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
        >
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              data-product-rail-item
              className="w-72.5 shrink-0 snap-start sm:w-[320px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {showNavButtons ? (
          <>
            <button
              type="button"
              aria-label="Voir les produits precedents"
              onClick={() => scrollByCard("left")}
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
              aria-label="Voir les produits suivants"
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              className={`absolute right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white text-black shadow-sm transition sm:flex ${
                canScrollRight
                  ? "cursor-pointer opacity-100"
                  : "cursor-not-allowed opacity-35"
              }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
