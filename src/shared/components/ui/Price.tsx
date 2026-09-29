import { formatPrice } from "../../../lib/currency";

/**
 * Affiche un prix catalogue en francs CFA (devise unique du site).
 * `as="del"` pour un ancien prix barré (sémantique + lecteurs d'écran).
 */
export function Price({
  amountUsd,
  className,
  as = "span",
}: {
  amountUsd: number;
  className?: string;
  as?: "span" | "del" | "ins" | "strong";
}) {
  const Tag = as;
  return <Tag className={className}>{formatPrice(amountUsd, "XOF")}</Tag>;
}
