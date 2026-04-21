import { Link } from "react-router-dom";
import {
  buildPdpPath,
  generateProductDescriptiveSlug,
} from "../../../lib/slug";
import type { PlpProductCard } from "../../../types";

/**
 * Carte produit reutilisable pour PLP, recherche et recommandations.
 * Repere JD : meme pattern de carte repete sur les listings.
 */
export function ProductCard({ product }: { product: PlpProductCard }) {
  const hasDiscount =
    typeof product.sale_price === "number" &&
    product.sale_price < product.price;

  const pdpPath = buildPdpPath(
    generateProductDescriptiveSlug({
      gender: product.principal_gender,
      brand: product.brand,
      name: product.name,
    }),
    product.id,
  );

  return (
    <article className="overflow-hidden rounded-xl border border-black/10 bg-white">
      <div className="relative aspect-square bg-black/5">
        <Link to={pdpPath} aria-label={`Voir ${product.name}`}>
          <img
            src={product.main_image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </Link>

        <div className="absolute left-2 top-2 flex gap-2">
          {hasDiscount && (
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
        <Link to={pdpPath} className="block">
          <h3 className="line-clamp-2 text-sm font-semibold text-black">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-black">
            ${(product.sale_price ?? product.price).toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-black/50 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-xs text-black/70">
          Note {product.rating.toFixed(1)} / 5
        </p>

        <button
          type="button"
          className="mt-2 w-full rounded-sm border border-black/20 px-2 py-1 text-xs font-semibold"
          disabled={!product.has_stock}
        >
          Quick Add To Bag
        </button>
      </div>
    </article>
  );
}
