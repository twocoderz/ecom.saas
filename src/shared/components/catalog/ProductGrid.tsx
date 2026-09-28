import { ProductCard } from "./ProductCard";
import { Rail } from "../ui/Rail";
import { EmptyState } from "../ui/EmptyState";
import { getDefaultPlpCards } from "../../../data/api/catalogApi";
import type { PlpProductCard } from "../../../types";

type ProductGridProps = {
  products?: PlpProductCard[];
  layout?: "grid" | "rail";
  showNavButtons?: boolean;
  cardVariant?: "default" | "compact";
};

export function ProductGrid({
  products,
  layout = "grid",
  showNavButtons = false,
  cardVariant = "default",
}: ProductGridProps) {
  const visibleProducts = products ?? getDefaultPlpCards(12);

  if (visibleProducts.length === 0) {
    return (
      <EmptyState message="Aucun produit ne correspond à cette sélection." />
    );
  }

  if (layout === "rail") {
    const isCompact = cardVariant === "compact";
    const content = visibleProducts.map((product) => (
      <div
        key={product.id}
        data-product-rail-item
        className={`shrink-0 snap-start ${
          isCompact ? "w-50 sm:w-55" : "w-70 sm:w-75"
        }`}
      >
        <ProductCard product={product} variant={cardVariant} />
      </div>
    ));
    void showNavButtons;
    return (
      <Rail
        itemSelector="[data-product-rail-item]"
        ariaLabel="Nos coups de cœur"
        alignItems={isCompact ? "start" : "stretch"}
      >
        {content}
      </Rail>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} variant={cardVariant} />
      ))}
    </div>
  );
}
