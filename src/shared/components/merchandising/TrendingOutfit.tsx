import { Link } from "react-router-dom";
import { AddIcon, ChevronRightIcon } from "../../icons";
import type {
  HomeTrendingOutfitCard,
  TrendingOutfitSlot,
} from "../../../pages/home/data/homeMerchandising";

type TrendingOutfitProps = {
  card?: HomeTrendingOutfitCard;
  title?: string;
};

function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

const SLOT_STYLES: Record<
  TrendingOutfitSlot,
  {
    left: string;
    top: string;
    imageClassName: string;
    hotspotClassName: string;
    tooltipClassName: string;
  }
> = {
  hero: {
    left: "28%",
    top: "23%",
    imageClassName: "h-40 w-40 sm:h-44 sm:w-44",
    hotspotClassName: "left-[10px] top-[6px]",
    tooltipClassName: "left-10 -top-3 origin-left",
  },
  topRight: {
    left: "73%",
    top: "21%",
    imageClassName: "h-23 w-23 sm:h-26 sm:w-26",
    hotspotClassName: "right-[4px] top-[5px]",
    tooltipClassName: "right-8 -top-2 origin-right",
  },
  center: {
    left: "52%",
    top: "46%",
    imageClassName: "h-24 w-24 sm:h-28 sm:w-28",
    hotspotClassName: "right-[6px] top-[6px]",
    tooltipClassName: "right-9 -top-2 origin-right",
  },
  bottomLeft: {
    left: "18%",
    top: "67%",
    imageClassName: "h-22 w-22 sm:h-25 sm:w-25",
    hotspotClassName: "left-[5px] top-[4px]",
    tooltipClassName: "left-9 -top-2 origin-left",
  },
  bottomRight: {
    left: "74%",
    top: "72%",
    imageClassName: "h-22 w-22 sm:h-25 sm:w-25",
    hotspotClassName: "right-[4px] top-[3px]",
    tooltipClassName: "right-8 -top-2 origin-right",
  },
};

/**
 * Outfit merchandising card with interactive hotspots.
 */
export function TrendingOutfit({ card }: TrendingOutfitProps) {
  if (!card) {
    return (
      <article className="rounded-xl border border-black/10 p-4 text-sm text-black/70">
        Top Trendings Outfits coming soon.
      </article>
    );
  }

  return (
    <article className="group relative h-125 w-[320px] shrink-0 snap-start overflow-hidden rounded-lg bg-black/5 p-4 sm:w-90">
      <div className="relative h-103">
        {card.items.map((item) => {
          const slot = SLOT_STYLES[item.slot];

          return (
            <div
              key={item.productId}
              className="absolute"
              style={{
                left: slot.left,
                top: slot.top,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={item.imageSrc}
                alt={item.imageAlt}
                className={`pointer-events-none object-contain ${slot.imageClassName}`}
              />

              <div className="group/item absolute left-0 top-0">
                <button
                  type="button"
                  aria-label={`Afficher ${item.name}`}
                  className={`absolute z-20 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-black/25 bg-white text-black/75 transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${slot.hotspotClassName}`}
                >
                  <AddIcon className="h-3.5 w-3.5" />
                </button>

                <Link
                  to={item.pdpPath}
                  className={`pointer-events-none absolute z-30 flex w-38 translate-y-1 items-center justify-between rounded-md bg-black/85 px-2 py-2 text-white opacity-0 shadow-lg transition-all duration-150 group-hover/item:pointer-events-auto group-hover/item:translate-y-0 group-hover/item:opacity-100 group-focus-within/item:pointer-events-auto group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100 ${slot.tooltipClassName}`}
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
          );
        })}
      </div>

      <div className="mt-3 flex justify-center">
        <Link
          to={card.to}
          className="inline-flex min-w-50 items-center justify-center rounded-full border border-black-20 bg-white px-6 py-3 text-xs font-semibold text-black transition-colors hover:border-black-90"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
