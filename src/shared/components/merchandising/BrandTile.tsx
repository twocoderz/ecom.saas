/**
 * Brand shortcut tile.
 */
import { Link } from "react-router-dom";

type BrandTileProps = {
  name: string;
  logoSrc: string;
  logoAlt: string;
  to: string;
};

export function BrandTile(props: BrandTileProps) {
  const { name, logoSrc, logoAlt, to } = props;

  return (
    <Link
      to={to}
      aria-label={`Voir les produits ${name}`}
      className="flex h-20 w-full items-center justify-center rounded-md border border-black-60 bg-black-5 p-4 transition-all duration-100 hover:border-4 hover:border-black-80"
    >
      <img
        src={logoSrc}
        alt={logoAlt}
        className="h-full w-full object-contain"
      />
    </Link>
  );
}
