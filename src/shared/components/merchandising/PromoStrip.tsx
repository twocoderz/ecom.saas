import { Link } from "react-router-dom";
import { promotions } from "../../../data/mock";
import { formatPrice } from "../../../lib/currency";
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
      ? `-${promo.discount_value} %`
      : `-${formatPrice(promo.discount_value, "XOF")}`;

  return (
    <div className="rounded-lg bg-black px-4 py-8 text-center text-white">
      <p className="text-md font-mdium uppercase tracking-tight sm:text-xl">
        {promo.name} : {value} avec le code {promo.code}
      </p>
      <Link
        to={ROUTE_PATHS.search}
        className="mt-8 inline-block rounded-full bg-white px-8 py-2 text-lg font-medium text-black hover:bg-white/85"
      >
        J'en profite
      </Link>
    </div>
  );
}
