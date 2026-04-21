import { useMemo, useState } from "react";
import type { ProductVariant } from "../../../types";

type AddToCartPanelProps = {
  variants: ProductVariant[];
};

/**
 * Buy box actions.
 * JD mapping: PDP buy controls (size/quantity/add to cart).
 */
export function AddToCartPanel({ variants }: AddToCartPanelProps) {
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

  const selectedVariant = useMemo(
    () =>
      variants.find(
        (variant) =>
          variant.color === selectedColor && variant.size === selectedSize,
      ),
    [selectedColor, selectedSize, variants],
  );

  const inStock = (selectedVariant?.stock ?? 0) > 0;

  return (
    <section className="rounded-xl border border-black/10 p-4">
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase text-black/60">Color</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => {
                  setSelectedColor(color);
                  const firstSize =
                    variants.find((variant) => variant.color === color)?.size ??
                    "";
                  setSelectedSize(firstSize);
                }}
                className="rounded-md border border-black/20 px-2 py-1"
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-black/60">Size</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className="rounded-md border border-black/20 px-2 py-1"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-black/70">
          {inStock
            ? `En stock: ${selectedVariant?.stock ?? 0} unites`
            : "Rupture de stock pour cette variante"}
        </p>

        <button
          type="button"
          disabled={!inStock}
          className="w-full rounded-sm border border-black/20 px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          Quick Add To Bag
        </button>
      </div>
    </section>
  );
}
