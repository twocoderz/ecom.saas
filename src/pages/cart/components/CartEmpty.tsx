import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../config/paths";
import { useAuthStore } from "../../../stores/useAuthStore";

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
      className="rounded-xs border border-black-20 bg-white p-6 text-center sm:p-10"
    >
      <h2 className="mt-4 text-2xl font-medium text-black sm:text-4xl">
        Votre panier est vide
      </h2>

      <p className="mx-auto mt-4 max-w-xs md:max-w-sm text-md md:text-lg text-black-60">
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
