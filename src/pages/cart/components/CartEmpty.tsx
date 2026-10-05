import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../config/paths";
import { useAuthStore } from "../../../stores/useAuthStore";
import { ShoppingCartIcon } from "../../../shared/icons";

/**
 * État vide du panier : carte centrée (titre + texte compte + CTA
 * couleur primaire) puis lien secondaire vers le catalogue.
 * Textes intégralement en français.
 */
export function CartEmpty() {
  const user = useAuthStore((s) => s.user);

  return (
    <div
      role="status"
      className="rounded-xl border border-black-10 bg-white p-6 text-center sm:p-10"
    >
      <span
        aria-hidden="true"
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black-5 text-black-70"
      >
        <ShoppingCartIcon className="h-6 w-6" />
      </span>

      <h2 className="mt-4 text-lg font-bold text-black sm:text-xl">
        Votre panier est vide
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-black-60">
        {user
          ? "Découvrez nos nouveautés et ajoutez vos coups de cœur au panier."
          : "Connectez-vous à votre compte pour retrouver vos articles déjà ajoutés ou mis de côté."}
      </p>

      {!user && (
        <Link
          to={ROUTE_PATHS.auth}
          className="mx-auto mt-6 flex min-h-[44px] w-full items-center justify-center rounded-xs bg-primary px-4 py-3.5 text-sm font-bold text-white transition-all hover:brightness-95 sm:max-w-md"
        >
          Se connecter
        </Link>
      )}

      <p className="mt-4 text-sm">
        <Link to="/" className="font-semibold underline hover:text-black">
          Continuer mes achats
        </Link>
      </p>
    </div>
  );
}
