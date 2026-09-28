import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HeartIcon, ShoppingCartIcon } from "../../icons";
import {
  buildPdpPath,
  generateProductDescriptiveSlug,
} from "../../../lib/slug";
import { mockReviewCount } from "../../../lib/reviews";
import type { PlpProductCard } from "../../../types";
import { Price } from "../ui/Price";
import { RatingStars } from "../ui/RatingStars";
import { useCartStore } from "../../../stores/useCartStore";
import { useWishlistStore } from "../../../stores/useWishlistStore";

/**
 * Carte produit reutilisable pour PLP, recherche et Top Picks.
 * Style JD : fond blanc, bord fin, prix rouge si solde, note avis, badge promo.
 */
export function ProductCard({ product }: { product: PlpProductCard }) {
  const { t } = useTranslation();
  const addLine = useCartStore((s) => s.addLine);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.ids.includes(product.id));

  const hasDiscount =
    typeof product.sale_price === "number" &&
    product.sale_price < product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - (product.sale_price as number) / product.price) * 100)
    : 0;

  const pdpPath = buildPdpPath(
    generateProductDescriptiveSlug({
      gender: product.principal_gender,
      brand: product.brand,
      name: product.name,
    }),
    product.id,
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-black-10 bg-white transition-colors hover:border-black-80">
      <div className="relative aspect-square bg-black-5">
        <Link to={pdpPath} aria-label={`Voir ${product.name}`}>
          <img
            src={product.main_image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </Link>

        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-sm bg-[#d60000] px-2 py-1 text-[11px] font-bold text-white">
            -{discountPct}%
          </span>
        )}

        <button
          type="button"
          aria-label={
            isWished ? t("common.wishlistRemove") : t("common.wishlistAdd")
          }
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
          aria-label={`${t("common.addToCart")} : ${product.name}`}
          onClick={() =>
            addLine({
              productId: product.id,
              name: product.name,
              image: product.main_image,
              unitPriceUsd: product.sale_price ?? product.price,
              qty: 1,
            })
          }
          className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-black-80 shadow-sm transition-colors hover:bg-black hover:text-white"
        >
          <ShoppingCartIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-start px-4 py-4">
        <div className="min-h-16">
          <p className="text-xs text-black-60">
            {t("common.colorCount", { count: product.color_count })}
          </p>
          <Link to={pdpPath} className="block">
            <h3 className="line-clamp-2 text-md font-bold leading-tight text-black-80">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1">
            <RatingStars
              rating={product.rating}
              reviewCount={mockReviewCount(product.id)}
            />
          </div>
        </div>
        <div className="mt-4 min-h-p13">
          <div className="flex items-center gap-2 text-sm">
            <Price
              amountUsd={product.sale_price ?? product.price}
              className={`font-semibold ${hasDiscount ? "text-[#d60000]" : "text-black-80"}`}
            />
            {hasDiscount && (
              <Price
                amountUsd={product.price}
                className="text-black-60 line-through"
              />
            )}
          </div>
          <p className="line-clamp-2 text-xs text-black-80">
            {product.pricing_note ?? " "}
          </p>
        </div>
      </div>
    </article>
  );
}
