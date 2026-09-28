import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "../../icons";
import { useCartStore } from "../../../stores/useCartStore";
import { ROUTE_PATHS } from "../../../config/paths";

/**
 * Bouton panier avec compteur temps reel (Zustand).
 */
export default function CartButton() {
  const count = useCartStore((s) => s.count)();
  return (
    <div className="relative border-l border-black-80 bg-white transition-all duration-500 rounded-r-sm hover:bg-white/90">
      <Link
        to={ROUTE_PATHS.cart}
        aria-label={`Go to cart, ${count} articles`}
        className="flex cursor-pointer items-center gap-1 px-3 py-3"
      >
        <ShoppingCartIcon className="h-4 w-4 text-black-80" />
        <span className="text-sm font-normal text-black-80">Cart</span>
        {count > 0 && (
          <span
            aria-live="polite"
            className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] font-bold text-white"
          >
            {count}
          </span>
        )}
      </Link>
    </div>
  );
}
