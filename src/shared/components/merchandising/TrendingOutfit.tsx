import { Link } from "react-router-dom";
import { AddIcon, ChevronRightIcon } from "../../icons";
import type { HomeTrendingOutfitCard } from "../../../pages/home/data/homeMerchandising";

type TrendingOutfitProps = {
  card?: HomeTrendingOutfitCard;
  title?: string;
};

function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

/**
 * Outfit merchandising card with interactive hotspots.
 */
export function TrendingOutfit({ card }: TrendingOutfitProps) {
  if (!card) {
    return (
      <article className="rounded-xl border border-black/10 p-4 text-sm text-black/70">
        Module outfit en attente de donnees.
      </article>
    );
  }

  return (
    <article className="group relative h-125 w-[320px] shrink-0 snap-start overflow-hidden rounded-lg bg-black/5 p-4 sm:w-[360px]">
      <div className="relative h-103">
        {card.items.map((item) => (
          <div
            key={item.productId}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              className="pointer-events-none h-24 w-24 object-contain sm:h-28 sm:w-28"
            />

            <div className="group/item absolute left-0 top-0">
              <button
                type="button"
                aria-label={`Afficher ${item.name}`}
                className="absolute -left-2 -top-2 z-20 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-black/25 bg-white text-black/75 transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <AddIcon className="h-3.5 w-3.5" />
              </button>

              <Link
                to={item.pdpPath}
                className="pointer-events-none absolute left-3 top-[-16px] z-30 flex w-[150px] translate-y-1 items-center justify-between rounded-md bg-black/80 px-2 py-2 text-white opacity-0 shadow-lg transition-all duration-150 group-hover/item:pointer-events-auto group-hover/item:translate-y-0 group-hover/item:opacity-100 group-focus-within/item:pointer-events-auto group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100"
                aria-label={`Voir le détail de ${item.name}`}
              >
                <div className="min-w-0">
                  <p className="line-clamp-2 text-xs font-medium leading-4">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs font-semibold">
                    {formatPrice(item.salePrice ?? item.price)}
                  </p>
                </div>
                <ChevronRightIcon className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-center">
        <Link
          to={card.to}
          className="inline-flex min-w-50 items-center justify-center rounded-full border border-black/25 bg-white px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
