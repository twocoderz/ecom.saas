import { StoreIcon, TruckIcon } from "../../icons";
import { fulfillmentCopy, type FulfillmentMode } from "../../data/pdp";

export type { FulfillmentMode };

type FulfillmentSelectorProps = {
  mode: FulfillmentMode;
  onChange: (mode: FulfillmentMode) => void;
  hasSelectedSize: boolean;
};

/**
 * Bloc livraison / retrait version visuelle simple en français.
 * Textes centralises dans `shared/data/pdp.ts`.
 */
export function FulfillmentSelector({
  mode,
  onChange,
  hasSelectedSize,
}: FulfillmentSelectorProps) {
  const livraisonHint = hasSelectedSize
    ? fulfillmentCopy.livraison.hintWithSize
    : fulfillmentCopy.livraison.hintWithoutSize;

  return (
    <div className="space-y-2" role="radiogroup" aria-label="Mode de réception">
      <button
        type="button"
        role="radio"
        aria-checked={mode === "livraison"}
        onClick={() => onChange("livraison")}
        className={`flex w-full items-center gap-3 cursor-pointer rounded-xs border p-3 text-left transition-colors sm:p-4 ${
          mode === "livraison"
            ? "border-black-80"
            : "border-black-10 hover:border-black-40"
        }`}
      >
        <span aria-hidden="true" className="shrink-0 text-black-80">
          <TruckIcon className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block text-[15px] font-bold sm:text-md">
            {fulfillmentCopy.livraison.title}
          </span>
          <span className="block text-sm text-black-70">{livraisonHint}</span>
        </span>
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            mode === "livraison" ? "border-black" : "border-black-20"
          }`}
        >
          {mode === "livraison" && (
            <span className="h-2.5 w-2.5 rounded-full bg-black" />
          )}
        </span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={mode === "retrait"}
        onClick={() => onChange("retrait")}
        className={`flex w-full items-center gap-3 rounded-xs cursor-pointer border p-3 text-left transition-colors sm:p-4 ${
          mode === "retrait"
            ? "border-black"
            : "border-black-10 hover:border-black-40"
        }`}
      >
        <span aria-hidden="true" className="shrink-0 text-black-80">
          <StoreIcon className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block text-[15px] font-bold sm:text-md">
            {fulfillmentCopy.retrait.title}
          </span>
          <span className="block text-sm text-black-70">
            {fulfillmentCopy.retrait.hintWithSize}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            mode === "retrait" ? "border-black" : "border-black-20"
          }`}
        >
          {mode === "retrait" && (
            <span className="h-2.5 w-2.5 rounded-full bg-black" />
          )}
        </span>
      </button>
    </div>
  );
}
