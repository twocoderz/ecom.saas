import { formatPrice } from "../../../lib/currency";
import { usePrefsStore } from "../../../stores/usePrefsStore";

/**
 * Seul composant autorise a afficher un prix catalogue (USD -> devise).
 */
export function Price({
  amountUsd,
  className,
}: {
  amountUsd: number;
  className?: string;
}) {
  const currency = usePrefsStore((s) => s.currency);
  return <span className={className}>{formatPrice(amountUsd, currency)}</span>;
}
