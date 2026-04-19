import { ProductCard } from "./ProductCard";
import { productCatalog, type Product } from "../../data/products";

type ProductGridProps = {
  products?: Product[];
};

/**
 * Grille de produits pour PLP et recherche.
 * Repere JD : coeur du listing catalogue.
 */
export function ProductGrid({ products }: ProductGridProps) {
  const visibleProducts = products ?? productCatalog.slice(0, 12);

  if (visibleProducts.length === 0) {
    return (
      <div className="rounded-xl border border-black/10 bg-white p-6 text-sm text-black/70">
        Aucun produit ne correspond a cette selection.
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
