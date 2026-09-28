import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../config/paths";

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to={ROUTE_PATHS.home}
      aria-label="Retour à l'accueil"
      onClick={onClick}
      className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <div className="w-6 h-6 lg:w-7 lg:h-7 bg-white"></div>
    </Link>
  );
}
