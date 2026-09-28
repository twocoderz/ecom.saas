import { formatPrice } from "../../../lib/currency";

/**
 * Affiche un prix catalogue en francs CFA (devise unique du site).
 */
export function Price({
  amountUsd,
  className,
}: {
  amountUsd: number;
  className?: string;
}) {
  return <span className={className}>{formatPrice(amountUsd, "XOF")}</span>;
}
