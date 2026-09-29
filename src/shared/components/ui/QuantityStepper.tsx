import { MinusIcon, AddIcon } from "../../icons";

/**
 * Stepper quantite partage (panier, PDP).
 */
export function QuantityStepper({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (qty: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-xs border border-black-30">
      <button
        type="button"
        aria-label="Diminuer la quantité"
        onClick={() => onChange(Math.max(0, qty - 1))}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black-5"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span
        className="w-8 text-center text-sm font-semibold"
        aria-live="polite"
      >
        {qty}
      </span>
      <button
        type="button"
        aria-label="Augmenter la quantité"
        onClick={() => onChange(qty + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black-5"
      >
        <AddIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
