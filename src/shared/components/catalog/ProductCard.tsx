import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "../../icons";
import {
  buildPdpPath,
  generateProductDescriptiveSlug,
} from "../../../lib/slug";
import type { PlpProductCard } from "../../../types";

/**
 * Carte produit reutilisable pour PLP, recherche et recommandations.
 */
export function ProductCard({ product }: { product: PlpProductCard }) {
  const hasDiscount =
    typeof product.sale_price === "number" &&
    product.sale_price < product.price;
  const colorLabel =
    product.color_count === 1 ? "1 color" : `${product.color_count} colors`;

  const pdpPath = buildPdpPath(
    generateProductDescriptiveSlug({
      gender: product.principal_gender,
      brand: product.brand,
      name: product.name,
    }),
    product.id,
  );

  return (
    <article className="overflow-hidden rounded-md border border-black-10 bg-white">
      <div className="relative aspect-square bg-black-5">
        <Link to={pdpPath} aria-label={`Voir ${product.name}`}>
          <img
            src={product.main_image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </Link>

        <button
          type="button"
          aria-label={`Ajouter ${product.name} au panier`}
          className="absolute bottom-2 cursor-pointer right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black-80 shadow-sm"
        >
          <ShoppingCartIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col items-start gap-4 px-4 py-8">
        <div className="flex flex-col items-start">
          <p className="text-xs text-black-60">{colorLabel}</p>
          <Link to={pdpPath} className="block">
            <h3 className="line-clamp-2 text-md font-bold leading-tight text-black-80">
              {product.name}
            </h3>
          </Link>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`font-semibold ${hasDiscount ? "text-[#d60000]" : "text-black-80"}`}
            >
              ${(product.sale_price ?? product.price).toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-black/60 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          {product.pricing_note ? (
            <p className="text-xs text-black-80">{product.pricing_note}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
