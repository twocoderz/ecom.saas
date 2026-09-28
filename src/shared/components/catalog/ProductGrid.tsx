import { useTranslation } from "react-i18next";
import { ProductCard } from "./ProductCard";
import { Rail } from "../ui/Rail";
import { EmptyState } from "../ui/EmptyState";
import { getDefaultPlpCards } from "../../../data/api/catalogApi";
import type { PlpProductCard } from "../../../types";

type ProductGridProps = {
  products?: PlpProductCard[];
  layout?: "grid" | "rail";
  showNavButtons?: boolean;
};

/**
 * Grille de produits pour PLP, recherche et Top Picks.
 * Le mode rail delegue le scroll aux fleches JD via <Rail/>.
 */
export function ProductGrid({
  products,
  layout = "grid",
  showNavButtons = false,
}: ProductGridProps) {
  const { t } = useTranslation();
  const visibleProducts = products ?? getDefaultPlpCards(12);

  if (visibleProducts.length === 0) {
    return <EmptyState message={t("common.emptyProducts")} />;
  }

  if (layout === "rail") {
    const content = visibleProducts.map((product) => (
      <div
        key={product.id}
        data-product-rail-item
        className="w-[280px] shrink-0 snap-start sm:w-[300px]"
      >
        <ProductCard product={product} />
      </div>
    ));
    // Les fleches JD sont toujours rendues via Rail ; showNavButtons garde la compatibilite.
    void showNavButtons;
    return (
      <Rail itemSelector="[data-product-rail-item]" ariaLabel={t("common.topPicks")}>
        {content}
      </Rail>
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
