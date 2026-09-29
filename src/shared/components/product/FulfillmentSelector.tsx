import { StoreIcon, TruckIcon } from "../../icons";

type FulfillmentMode = "livraison" | "retrait";

type FulfillmentSelectorProps = {
  mode: FulfillmentMode;
  onChange: (mode: FulfillmentMode) => void;
  hasSelectedSize: boolean;
};

/**
 * Bloc livraison / retrait version visuelle simple en français.
 */
export function FulfillmentSelector({
  mode,
  onChange,
  hasSelectedSize,
}: FulfillmentSelectorProps) {
  return (
    <div className="space-y-2" role="radiogroup" aria-label="Mode de réception">
      <button
        type="button"
        role="radio"
        aria-checked={mode === "livraison"}
        onClick={() => onChange("livraison")}
        className={`flex w-full items-center gap-3 cursor-pointer rounded-xs border p-4 text-left transition-colors ${
          mode === "livraison"
            ? "border-black-80"
            : "border-black-10 hover:border-black-40"
        }`}
      >
        <span aria-hidden="true" className="shrink-0 text-black-80">
          <TruckIcon className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block text-md font-bold">Livraison</span>
          <span className="block text-sm text-black-70">
            {hasSelectedSize
              ? "Expédition sous 3 à 5 jours ouvrés"
              : "Sélectionnez une taille pour voir le délai"}
          </span>
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
        className={`flex w-full items-center gap-3 rounded-xs cursor-pointer border p-4 text-left transition-colors ${
          mode === "retrait"
            ? "border-black"
            : "border-black-10 hover:border-black-40"
        }`}
      >
        <span aria-hidden="true" className="shrink-0 text-black-80">
          <StoreIcon className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block text-md font-bold">Retrait gratuit</span>
          <span className="block text-sm text-black-70">
            À retirer aujourd&apos;hui en magasin
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
