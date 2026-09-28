import { Link } from "react-router-dom";
import { promotions } from "../../../data/mock";
import { ROUTE_PATHS } from "../../../config/paths";

/**
 * Bandeau promo mid-page : première promotion active du catalogue mock.
 */
export function PromoStrip() {
  const now = new Date();
  const promo = promotions.find(
    (candidate) =>
      candidate.is_active &&
      new Date(candidate.starts_at) <= now &&
      now <= new Date(candidate.ends_at),
  );

  if (!promo) {
    return null;
  }

  const value =
    promo.discount_type === "percentage"
      ? `-${promo.discount_value}%`
      : `-${promo.discount_value} USD`;

  return (
    <div className="rounded-lg bg-black p-4 text-center text-white">
      <p className="text-sm font-bold uppercase tracking-tight sm:text-base">
        {promo.name} : {value} avec le code {promo.code}
      </p>
      <Link
        to={ROUTE_PATHS.search}
        className="mt-2 inline-block rounded-full bg-white px-6 py-2 text-xs font-bold text-black hover:bg-white/85"
      >
        J'en profite
      </Link>
    </div>
  );
}
