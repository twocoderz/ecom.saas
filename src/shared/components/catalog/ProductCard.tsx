import type { Product } from "../../data/products";

/**
 * Carte produit reutilisable pour PLP, recherche et recommandations.
 * Repere JD : meme pattern de carte repete sur les listings.
 */
export function ProductCard({ product }: { product: Product }) {
  const hasDiscount =
    typeof product.oldPrice === "number" && product.oldPrice > product.price;

  return (
    <article className="overflow-hidden rounded-xl border border-black/10 bg-white">
      <div className="relative aspect-square bg-black/5">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute left-2 top-2 flex gap-2">
          {product.isNew && (
            <span className="rounded-full bg-black px-2 py-1 text-[10px] font-semibold text-white">
              New
            </span>
          )}
          {product.isSale && (
            <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-white">
              Sale
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1 p-3">
        <p className="text-xs uppercase tracking-wide text-black/60">
          {product.brand}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold text-black">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-black">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-black/50 line-through">
              ${product.oldPrice?.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-xs text-black/70">
          Note {product.rating.toFixed(1)} / 5
        </p>
      </div>
    </article>
  );
}
