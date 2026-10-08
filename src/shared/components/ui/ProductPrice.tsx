import { discountInfo } from "../../../lib/currency";
import { Price } from "./Price";

type ProductPriceProps = {
  price: number;
  salePrice: number | null;
  /** Taille d'affichage : pdp (grand + ligne économies), card, compact. */
  size?: "pdp" | "card" | "compact";
  /** Affiche la ligne "Économisez X F" (PDP uniquement par défaut). */
  showSavings?: boolean;
};

/**
 * Affichage prix unifié pour toute l'application : prix actuel,
 * ancien prix barré (<del>), badge -% et ligne d'économie en promo.
 * Montants exacts (pas d'arrondi), devise XOF via <Price />.
 */
export function ProductPrice({
  price,
  salePrice,
  size = "card",
  showSavings,
}: ProductPriceProps) {
  const { hasDiscount, discountPct, savings } = discountInfo(
    price,
    salePrice,
  );
  const shouldShowSavings = showSavings ?? size === "pdp";

  if (size === "pdp") {
    return (
      <div>
        <div className="flex flex-wrap items-center gap-2 text-base">
          <Price
            amount={salePrice ?? price}
            className={`font-bold ${hasDiscount ? "text-danger" : "text-black"}`}
          />
          {hasDiscount && (
            <Price
              amount={price}
              as="del"
              className="text-sm text-black-60"
            />
          )}
          {hasDiscount && (
            <span className="rounded-sm bg-danger px-1.5 py-0.5 text-[11px] font-bold text-white">
              -{discountPct}%
            </span>
          )}
        </div>
        {hasDiscount && shouldShowSavings && (
          <p className="mt-1 text-xs font-semibold text-danger">
            Économisez <Price amount={savings} /> ({discountPct} %)
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <Price
        amount={salePrice ?? price}
        className={`font-semibold ${hasDiscount ? "text-danger" : "text-black-80"}`}
      />
      {hasDiscount && (
        <Price
          amount={price}
          as="del"
          className={size === "compact" ? "text-[11px] text-black-60" : "text-xs text-black-60"}
        />
      )}
    </div>
  );
}
