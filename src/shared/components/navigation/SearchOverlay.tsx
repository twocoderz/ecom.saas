import { Link } from "react-router-dom";
import { brands } from "../../../data/mock";
import { buildPlpPath } from "../../../lib/slug";
import { buildSearchDestination } from "../../../config/paths";

const POPULAR_SEARCHES = ["Air Max", "Jordan", "Running", "Hoodie", "Sneakers"];

/**
 * Panneau de suggestions sous la barre de recherche façon JD :
 * recherches populaires + marques top.
 */
export function SearchOverlay({ onNavigate }: { onNavigate: () => void }) {
  const topBrands = brands.slice(0, 6);

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-md border border-black-20 bg-white p-4 text-black-80 shadow-lg">
      <p className="text-xs font-bold uppercase tracking-wide text-black-60">
        Recherches populaires
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {POPULAR_SEARCHES.map((term) => {
          const dest = buildSearchDestination(term);
          return (
            <li key={term}>
              <Link
                to={{ pathname: dest.pathname, search: dest.search }}
                onClick={onNavigate}
                className="rounded-full border border-black-20 px-3 py-1 text-xs font-semibold hover:border-black hover:bg-black hover:text-white"
              >
                {term}
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-black-60">
        Marques top
      </p>
      <ul className="mt-2 grid gap-1">
        {topBrands.map((brand) => (
          <li key={brand.id}>
            <Link
              to={buildPlpPath(brand.slug)}
              onClick={onNavigate}
              className="block rounded-sm px-2 py-1.5 text-sm font-semibold hover:bg-black-5"
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
