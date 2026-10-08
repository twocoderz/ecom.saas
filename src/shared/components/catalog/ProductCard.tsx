import { Link } from "react-router-dom";
import { HeartIcon, ShoppingCartIcon } from "../../icons";
import {
  buildPdpPath,
  generateProductDescriptiveSlug,
} from "../../../lib/slug";
import { mockReviewCount } from "../../../lib/reviews";
import { discountInfo } from "../../../lib/currency";
import type { PlpProductCard } from "../../../types";
import { ProductPrice } from "../ui/ProductPrice";
import { RatingStars } from "../ui/RatingStars";
import { useCartStore } from "../../../stores/useCartStore";
import { useWishlistStore } from "../../../stores/useWishlistStore";

export function ProductCard({
  product,
  variant = "default",
}: {
  product: PlpProductCard;
  variant?: "default" | "compact";
}) {
  const addLine = useCartStore((s) => s.addLine);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.ids.includes(product.id));

  const { hasDiscount, discountPct } = discountInfo(
    product.price,
    product.sale_price,
  );

  const pdpPath = buildPdpPath(
    generateProductDescriptiveSlug({
      gender: product.principal_gender,
      brand: product.brand,
      name: product.name,
    }),
    product.id,
  );

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-md border border-black-10 bg-white transition-colors hover:border-black-80 ${
        variant === "compact" ? "" : "h-full"
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-black-5">
        <Link
          to={pdpPath}
          aria-label={`Voir ${product.name}`}
          className="absolute inset-0 block"
        >
          <img
            src={product.main_image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </Link>

        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-sm bg-danger px-2 py-1 text-[11px] font-bold text-white">
            -{discountPct}%
          </span>
        )}

        <button
          type="button"
          aria-label={isWished ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={isWished}
          onClick={() => toggleWishlist(product.id)}
          className={`absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-colors ${
            isWished
              ? "bg-black text-white"
              : "bg-white text-black-80 hover:bg-black hover:text-white"
          }`}
        >
          <HeartIcon filled={isWished} className="h-4 w-4" />
        </button>

        <button
          type="button"
          aria-label={`Ajouter ${product.name} au panier`}
          onClick={() =>
            addLine({
              productId: product.id,
              name: product.name,
              image: product.main_image,
              unitPrice: product.sale_price ?? product.price,
              qty: 1,
            })
          }
          className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-black-80 shadow-sm transition-colors hover:bg-black hover:text-white"
        >
          <ShoppingCartIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        className={`flex flex-col items-start ${
          variant === "compact" ? "px-3 py-3" : "flex-1 px-4 py-4"
        }`}
      >
        <div className={variant === "compact" ? "" : "min-h-16"}>
          <p className="text-xs text-black-60">
            {product.color_count} couleur{product.color_count > 1 ? "s" : ""}
          </p>
          <Link to={pdpPath} className="block">
            <h3 className="line-clamp-2 min-h-10 text-md font-bold leading-tight text-black-80">
              {product.name}
            </h3>
          </Link>
          {variant === "default" && (
            <div className="mt-1">
              <RatingStars
                rating={product.rating}
                reviewCount={mockReviewCount(product.id)}
              />
            </div>
          )}
        </div>
        <div className={variant === "compact" ? "mt-2" : "mt-4 min-h-p13"}>
          <ProductPrice
            price={product.price}
            salePrice={product.sale_price}
            size={variant === "compact" ? "compact" : "card"}
          />
          {variant === "compact" ? (
            <p className="mt-1 line-clamp-2 min-h-8 text-xs text-black-80">
              {product.pricing_note ?? ""}
            </p>
          ) : product.pricing_note ? (
            <p className="mt-1 line-clamp-2 text-xs text-black-80">
              {product.pricing_note}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
