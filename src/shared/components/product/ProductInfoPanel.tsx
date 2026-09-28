import type { ApiPdpResponse } from "../../../types";
import { mockReviewCount } from "../../../lib/reviews";
import { Price } from "../ui/Price";
import { RatingStars } from "../ui/RatingStars";

const ATTRIBUTE_LABELS: Record<string, string> = {
  color: "Couleur",
  material: "Matière",
  style: "Style",
  fit: "Coupe",
  technology: "Technologie",
};

type ProductInfoPanelProps = {
  detail: ApiPdpResponse;
};

/**
 * Bloc d'information produit (colonne droite PDP).
 * Prix affiches dans la devise active, note avis façon JD.
 */
export function ProductInfoPanel({ detail }: ProductInfoPanelProps) {
  const hasDiscount =
    detail.product.sale_price !== null &&
    detail.product.sale_price < detail.product.price;

  return (
    <section className="rounded-xl border border-black-10 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-black-60">
        {detail.brand.name}
      </p>
      <h2 className="text-xl font-semibold">{detail.product.name}</h2>

      <div className="mt-2">
        <RatingStars rating={4} reviewCount={mockReviewCount(detail.product.id)} />
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm">
        <Price
          amountUsd={detail.product.sale_price ?? detail.product.price}
          className={`font-semibold ${hasDiscount ? "text-[#d60000]" : "text-black"}`}
        />
        {hasDiscount && (
          <Price amountUsd={detail.product.price} className="text-black-60 line-through" />
        )}
      </div>

      <p className="mt-2 text-sm text-black-70">{detail.product.description}</p>

      <ul className="mt-3 space-y-1 text-sm text-black-80">
        {Object.entries(detail.attributes).map(([key, values]) => (
          <li key={key}>
            <span className="font-semibold">{ATTRIBUTE_LABELS[key] ?? key} :</span>{" "}
            {values.join(", ")}
          </li>
        ))}
      </ul>

      {detail.promotions.length > 0 && (
        <div className="mt-3 rounded-md border border-black-10 p-2 text-xs text-black-70">
          Promotions actives:{" "}
          {detail.promotions.map((promotion) => promotion.code).join(", ")}
        </div>
      )}
    </section>
  );
}
