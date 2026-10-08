import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../config/paths";

const TRUST_ITEMS = [
  { label: "Paiement à la livraison disponible" },
  { label: "Retours gratuits sous 14 jours" },
  { label: "Produits 100 % authentiques" },
] as const;

/**
 * Bandeau de reassurance sous le header (prevu par le blueprint layout).
 */
export function TrustStrip() {
  return (
    <section aria-label="Garanties boutique" className="border-b border-black/10 bg-black/[0.03]">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-2 text-xs font-semibold text-black-70">
        {TRUST_ITEMS.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
        <li>
          <Link to={ROUTE_PATHS.shippingReturns} className="underline underline-offset-2 hover:text-black">
            En savoir plus
          </Link>
        </li>
      </ul>
    </section>
  );
}
