import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../config/paths";

/**
 * Logo texte (en attendant un vrai logotype) : lisible + accessible.
 */
export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to={ROUTE_PATHS.home}
      aria-label="ecom.saas — Retour à l'accueil"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span
        aria-hidden="true"
        className="flex h-7 w-7 items-center justify-center bg-white text-sm font-black text-black"
      ></span>
      <span className="text-sm font-black uppercase tracking-tight text-white">
        ecom<span className="text-white/60">.saas</span>
      </span>
    </Link>
  );
}
