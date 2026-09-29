import { Link } from "react-router-dom";
import { getDefaultPlpCards } from "../../../data/api/catalogApi";
import {
  buildPdpPath,
  generateProductDescriptiveSlug,
} from "../../../lib/slug";
import { buildSearchDestination } from "../../../config/paths";
import { ProductPrice } from "../ui/ProductPrice";

const TRENDING_SEARCHES = [
  "Jordan",
  "Nike",
  "adidas",
  "ASICS",
  "Salomon",
  "New Balance",
];

export function SearchOverlay({ onNavigate }: { onNavigate: () => void }) {
  const trendingProducts = getDefaultPlpCards(6);

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 grid gap-8 rounded-xs border border-black-20 bg-white p-4 text-black-80 shadow-lg sm:grid-cols-2">
      <div>
        <p className="text-md font-bold">Recherches tendances</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {TRENDING_SEARCHES.map((term) => {
            const dest = buildSearchDestination(term);
            return (
              <li key={term}>
                <Link
                  to={{ pathname: dest.pathname, search: dest.search }}
                  onClick={onNavigate}
                  className="inline-block rounded-full border border-black-20 px-3 py-1 text-sm font-semibold lowercase hover:border-black hover:bg-black hover:text-white"
                >
                  {term}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="text-md font-bold">Produits tendances</p>
        <ul className="mt-4 space-y-4">
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
                  <span className="block truncate text-sm font-semibold underline underline-offset-2">
                    {product.name}
                  </span>
                  <ProductPrice
                    price={product.price}
                    salePrice={product.sale_price}
                    size="compact"
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
