import type { ApiPdpResponse } from "../../../types";
import { mockReviewCount } from "../../../lib/reviews";
import { productRatings } from "../../../data/mock/relations";
import { Price } from "../ui/Price";
import { RatingStars } from "../ui/RatingStars";

type ProductInfoPanelProps = {
  detail: ApiPdpResponse;
  selectedColorName?: string;
};

/**
 * Bloc haut de colonne droite: marque, titre, note, prix,
 * nom de couleur. Les sélecteurs couleur/taille vivent dans AddToCartPanel.
 */
export function ProductInfoPanel({
  detail,
  selectedColorName,
}: ProductInfoPanelProps) {
  const hasDiscount =
    detail.product.sale_price !== null &&
    detail.product.sale_price < detail.product.price;

  const rating = productRatings[detail.product.id] ?? 4;
  const reviewCount = mockReviewCount(detail.product.id);
  const colorLabel =
    selectedColorName ?? detail.attributes.color?.join(" / ") ?? "";

  return (
    <section aria-label="Informations produit">
      <h1 className="text-xl font-bold leading-tight text-black-80 lg:text-3xl">
        {detail.brand.name} {detail.product.name}
      </h1>

      <div className="mt-1.5">
        <a
          href="#avis-produit"
          className="inline-flex items-center gap-1.5 hover:underline"
        >
          <RatingStars rating={rating} reviewCount={reviewCount} />
        </a>
      </div>

      <div className="mt-2 flex items-center gap-2 text-base">
        <Price
          amountUsd={detail.product.sale_price ?? detail.product.price}
          className={`font-bold ${hasDiscount ? "text-[#d60000]" : "text-black"}`}
        />
        {hasDiscount && (
          <Price
            amountUsd={detail.product.price}
            className="text-sm text-black-60 line-through"
          />
        )}
      </div>

      {colorLabel && (
        <p className="mt-3 text-sm text-black-80">
          <span className="text-black-60">Couleur : </span>
          <span className="font-medium capitalize">{colorLabel}</span>
        </p>
      )}

      {detail.promotions.length > 0 && (
        <p className="mt-2 inline-block rounded bg-black-5 px-2 py-1 text-xs font-semibold text-black-80">
          {detail.promotions[0]?.code} :{" "}
          {detail.promotions[0]?.description ?? "Offre en cours"}
        </p>
      )}
    </section>
  );
}
