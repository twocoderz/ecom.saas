import { Link } from "react-router-dom";
import { getDefaultPlpCards } from "../../../data/api/catalogApi";
import { buildPdpPath, generateProductDescriptiveSlug } from "../../../lib/slug";
import { buildSearchDestination } from "../../../config/paths";
import { Price } from "../ui/Price";

const TRENDING_SEARCHES = ["Jordan", "Nike", "adidas", "ASICS", "Salomon", "New Balance"];

/**
 * Dropdown recherche façon JD : recherches tendances (pills) +
 * produits tendances (image, nom, prix XOF).
 */
export function SearchOverlay({ onNavigate }: { onNavigate: () => void }) {
  const trendingProducts = getDefaultPlpCards(6);

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 grid gap-6 rounded-md border border-black-20 bg-white p-4 text-black-80 shadow-lg sm:grid-cols-2">
      <div>
        <p className="text-sm font-bold">Recherches tendances</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {TRENDING_SEARCHES.map((term) => {
            const dest = buildSearchDestination(term);
            return (
              <li key={term}>
                <Link
                  to={{ pathname: dest.pathname, search: dest.search }}
                  onClick={onNavigate}
                  className="inline-block rounded-full border border-black-20 px-3 py-1 text-xs font-semibold lowercase hover:border-black hover:bg-black hover:text-white"
                >
                  {term}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="text-sm font-bold">Produits tendances</p>
        <ul className="mt-2 space-y-2">
          {trendingProducts.map((product) => (
            <li key={product.id}>
              <Link
                to={buildPdpPath(
                  generateProductDescriptiveSlug({
                    gender: product.principal_gender,
                    brand: product.brand,
                    name: product.name,
                  }),
                  product.id,
                )}
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-sm p-1 hover:bg-black-5"
              >
                <img
                  src={product.main_image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-sm bg-black-5 object-contain"
                />
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold underline underline-offset-2">
                    {product.name}
                  </span>
                  <Price
                    amountUsd={product.sale_price ?? product.price}
                    className="text-xs font-bold"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
