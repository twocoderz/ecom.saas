import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "../../icons";
import { useCartStore } from "../../../stores/useCartStore";
import { ROUTE_PATHS } from "../../../config/paths";

export default function CartButton() {
  const count = useCartStore((s) => s.count)();
  return (
    <Link
      to={ROUTE_PATHS.cart}
      aria-label={`Voir le panier, ${count} articles`}
      className="flex cursor-pointer items-center gap-2 px-4 text-black-80 transition-colors hover:bg-black-5"
    >
      <ShoppingCartIcon className="h-6 w-6 text-black-80" />
      <span className="whitespace-nowrap text-sm font-normal">Panier</span>
      {count > 0 && (
        <span
          aria-hidden="true"
          className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] font-bold text-white"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
