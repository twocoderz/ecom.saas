import { Link } from "react-router-dom";
import { AddIcon, ChevronRightIcon } from "../../icons";
import type {
  HomeTrendingOutfitCard,
  TrendingOutfitSlot,
} from "../../../pages/home/data/homeMerchandising";
import { Popover } from "../ui/Popover";
import { Price } from "../ui/Price";

type TrendingOutfitProps = {
  card?: HomeTrendingOutfitCard;
  title?: string;
  /** Id du produit dont le popup est ouvert (controle remonte pour un seul ouvert). */
  activeProductId?: string | null;
  onActiveChange?: (productId: string | null) => void;
};

const SLOT_STYLES: Record<
  TrendingOutfitSlot,
  { left: string; top: string; imageClassName: string }
> = {
  hero: { left: "28%", top: "23%", imageClassName: "h-40 w-40 sm:h-44 sm:w-44" },
  topRight: { left: "73%", top: "21%", imageClassName: "h-[92px] w-[92px] sm:h-[104px] sm:w-[104px]" },
  center: { left: "52%", top: "46%", imageClassName: "h-24 w-24 sm:h-28 sm:w-28" },
  bottomLeft: { left: "18%", top: "67%", imageClassName: "h-[88px] w-[88px] sm:h-[100px] sm:w-[100px]" },
  bottomRight: { left: "74%", top: "72%", imageClassName: "h-[88px] w-[88px] sm:h-[100px] sm:w-[100px]" },
};

function alignForSlot(slot: TrendingOutfitSlot): "left" | "right" {
  return slot === "hero" || slot === "bottomLeft" ? "left" : "right";
}

/**
 * Carte outfit merchandising avec hotspots cliquables (tactile + clavier).
 * Le conteneur est en overflow-visible pour ne pas clipper les popups.
 */
export function TrendingOutfit({ card, activeProductId, onActiveChange }: TrendingOutfitProps) {
  if (!card) {
    return (
      <article className="rounded-xl border border-black-10 p-4 text-sm text-black-60">
        Top Trendings Outfits coming soon.
      </article>
    );
  }

  return (
    <article className="group relative h-[500px] w-[320px] shrink-0 snap-start overflow-visible rounded-lg bg-black-5 p-4 sm:w-[360px]">
      <div className="relative h-[412px]">
        {card.items.map((item) => {
          const slot = SLOT_STYLES[item.slot];
          const open = activeProductId === item.productId;

          return (
            <div
              key={item.productId}
              className="absolute"
              style={{ left: slot.left, top: slot.top, transform: "translate(-50%, -50%)" }}
            >
              <img
                src={item.imageSrc}
                alt={item.imageAlt}
                loading="lazy"
                className={`pointer-events-none object-contain ${slot.imageClassName}`}
              />

              <Popover
                open={open}
                align={alignForSlot(item.slot)}
                onToggle={() => onActiveChange?.(open ? null : item.productId)}
                onClose={() => open && onActiveChange?.(null)}
                trigger={
                  <button
                    type="button"
                    aria-label={`Afficher ${item.name}`}
                    aria-expanded={open}
                    onClick={() => onActiveChange?.(open ? null : item.productId)}
                    className={`absolute z-20 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-black-20 bg-white text-black-70 transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                      item.slot === "hero" || item.slot === "bottomLeft"
                        ? "left-[10px] top-[6px]"
                        : "right-[4px] top-[5px]"
                    }`}
                  >
                    <AddIcon className="h-3.5 w-3.5" />
                  </button>
                }
              >
                <Link
                  to={item.pdpPath}
                  className="flex w-[152px] items-center justify-between rounded-md bg-black-80 px-2 py-2 text-white shadow-lg"
                  aria-label={`Voir le détail de ${item.name}`}
                >
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-xs font-medium leading-4">{item.name}</p>
                    <p className="mt-1 text-xs font-semibold">
                      <Price amountUsd={item.salePrice ?? item.price} />
                    </p>
                  </div>
                  <ChevronRightIcon className="h-4 w-4 shrink-0" />
                </Link>
              </Popover>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-center">
        <Link
          to={card.to}
          className="inline-flex min-w-50 items-center justify-center rounded-full border border-black-20 bg-white px-6 py-3 text-xs font-semibold text-black transition-colors hover:border-black-90"
        >
          Voir détails
        </Link>
      </div>
    </article>
  );
}
