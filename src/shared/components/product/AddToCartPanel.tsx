import { useMemo, useState } from "react";
import type { ProductVariant } from "../../../types";
import { useCartStore } from "../../../stores/useCartStore";
import { QuantityStepper } from "../ui/QuantityStepper";

type AddToCartPanelProps = {
  productId: string;
  productName: string;
  productImage: string;
  priceUsd: number;
  salePriceUsd: number | null;
  variants: ProductVariant[];
};

const SIZE_GUIDE_ROWS: Array<[string, string, string]> = [
  ["40", "25,0 cm", "UK 6"],
  ["41", "25,7 cm", "UK 7"],
  ["42", "26,0 cm", "UK 7.5"],
  ["43", "26,7 cm", "UK 8.5"],
  ["44", "27,1 cm", "UK 9"],
  ["45", "27,9 cm", "UK 10"],
];

/**
 * Buy box PDP : couleur/taille/quantite + ajout panier + guide des tailles.
 */
export function AddToCartPanel({
  productId,
  productName,
  productImage,
  priceUsd,
  salePriceUsd,
  variants,
}: AddToCartPanelProps) {
  const addLine = useCartStore((s) => s.addLine);

  const colors = useMemo(
    () => Array.from(new Set(variants.map((variant) => variant.color))),
    [variants],
  );

  const [selectedColor, setSelectedColor] = useState(colors[0] ?? "");

  const availableSizes = useMemo(
    () =>
      variants
        .filter((variant) => variant.color === selectedColor)
        .map((variant) => variant.size),
    [selectedColor, variants],
  );

  const [selectedSize, setSelectedSize] = useState(availableSizes[0] ?? "");
  const [qty, setQty] = useState(1);
  const [showGuide, setShowGuide] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant = useMemo(
    () =>
      variants.find(
        (variant) =>
          variant.color === selectedColor && variant.size === selectedSize,
      ),
    [selectedColor, selectedSize, variants],
  );

  const inStock = (selectedVariant?.stock ?? 0) > 0;

  const handleAdd = () => {
    if (!inStock) return;
    addLine({
      productId,
      variantId: selectedVariant?.id,
      name: `${productName} — ${selectedColor} / ${selectedSize}`,
      image: productImage,
      unitPriceUsd: salePriceUsd ?? priceUsd,
      qty,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section className="rounded-xl border border-black-10 bg-white p-4">
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase text-black-60">Color</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                aria-pressed={selectedColor === color}
                onClick={() => {
                  setSelectedColor(color);
                  const firstSize =
                    variants.find((variant) => variant.color === color)?.size ??
                    "";
                  setSelectedSize(firstSize);
                }}
                className={`rounded-md border px-2 py-1 transition-colors ${
                  selectedColor === color
                    ? "border-black bg-black text-white"
                    : "border-black-20 hover:border-black-80"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase text-black-60">Size</p>
            <button
              type="button"
              onClick={() => setShowGuide((prev) => !prev)}
              aria-expanded={showGuide}
              className="text-xs font-semibold underline underline-offset-2 hover:text-black"
            >
              Guide des tailles
            </button>
          </div>
          <div className="mt-1 flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={selectedSize === size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-11 rounded-md border px-2 py-1 transition-colors ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-black-20 hover:border-black-80"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {showGuide && (
            <table className="mt-2 w-full text-left text-xs">
              <thead>
                <tr className="text-black-60">
                  <th scope="col" className="py-1 pr-2">EU</th>
                  <th scope="col" className="py-1 pr-2">Pied</th>
                  <th scope="col" className="py-1">UK</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE_ROWS.map(([eu, foot, uk]) => (
                  <tr key={eu} className="border-t border-black-10">
                    <td className="py-1 pr-2 font-semibold">{eu}</td>
                    <td className="py-1 pr-2">{foot}</td>
                    <td className="py-1">{uk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="text-sm text-black-70" role="status">
          {inStock
            ? `${selectedVariant?.stock ?? 0} unités en stock`
            : "Rupture de stock pour cette variante"}
        </p>

        <div className="flex items-center gap-3">
          <QuantityStepper qty={qty} onChange={(next) => setQty(Math.max(1, next))} />
          <span className="text-xs text-black-60">Quantité</span>
        </div>

        <button
          type="button"
          disabled={!inStock}
          onClick={handleAdd}
          className="w-full rounded-sm bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-black-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {justAdded ? "Ajouté au panier ✓" : "Ajouter au panier"}
        </button>
      </div>
    </section>
  );
}
