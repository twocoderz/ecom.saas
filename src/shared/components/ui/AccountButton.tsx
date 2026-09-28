import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../config/paths";
import { useAuthStore } from "../../../stores/useAuthStore";

/**
 * Bouton compte : affiche l'initiale si connecte, lien vers /account ou /auth.
 */
export default function AccountButton() {
  const user = useAuthStore((s) => s.user);
  return (
    <div className="border-l border-black-60 bg-white transition-all duration-500 hover:bg-white/90">
      <Link
        to={user ? ROUTE_PATHS.accountDashboard : ROUTE_PATHS.auth}
        aria-label="Go to account"
        className="flex cursor-pointer items-center justify-center gap-2 px-4 py-3"
      >
        {user && (
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-bold text-white"
          >
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="text-sm font-normal text-black-80">
          {user ? user.name : "Account"}
        </span>
      </Link>
    </div>
  );
}
