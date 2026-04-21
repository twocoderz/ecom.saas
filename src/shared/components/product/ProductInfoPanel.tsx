import type { ApiPdpResponse } from "../../../types";

type ProductInfoPanelProps = {
  detail: ApiPdpResponse;
};

/**
 * Product information block.
 * JD mapping: PDP right column with title, price, and attributes.
 */
export function ProductInfoPanel({ detail }: ProductInfoPanelProps) {
  const currentPrice = detail.product.sale_price ?? detail.product.price;
  const hasDiscount =
    detail.product.sale_price !== null &&
    detail.product.sale_price < detail.product.price;

  return (
    <section className="rounded-xl border border-black/10 p-4">
      <p className="text-xs uppercase tracking-wide text-black/60">
        {detail.brand.name}
      </p>
      <h2 className="text-xl font-semibold">{detail.product.name}</h2>

      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className="font-semibold text-black">
          ${currentPrice.toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="text-black/50 line-through">
            ${detail.product.price.toFixed(2)}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-black/70">{detail.product.description}</p>

      <ul className="mt-3 space-y-1 text-sm text-black/80">
        {Object.entries(detail.attributes).map(([key, values]) => (
          <li key={key}>
            <span className="font-semibold capitalize">{key}:</span>{" "}
            {values.join(", ")}
          </li>
        ))}
      </ul>

      {detail.promotions.length > 0 && (
        <div className="mt-3 rounded-md border border-black/10 p-2 text-xs text-black/70">
          Promotions actives:{" "}
          {detail.promotions.map((promotion) => promotion.code).join(", ")}
        </div>
      )}
    </section>
  );
}
