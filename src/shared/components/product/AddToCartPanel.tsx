import { useMemo, useState } from "react";
import type { ProductImage, ProductVariant } from "../../../types";
import { useCartStore } from "../../../stores/useCartStore";
import { ShoppingCartIcon } from "../../icons";
import { QuantityStepper } from "../ui/QuantityStepper";
import { FulfillmentSelector } from "./FulfillmentSelector";
import { PaymentMethods } from "./PaymentMethods";
import { SizeGuideModal } from "./SizeGuideModal";

type AddToCartPanelProps = {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  salePrice: number | null;
  variants: ProductVariant[];
  images: ProductImage[];
  selectedColor: string;
  selectedSize: string | null;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
};

/**
 * La taille n'est pas présélectionnée : le client doit la choisir.
 */
export function AddToCartPanel({
  productId,
  productName,
  productImage,
  price,
  salePrice,
  variants,
  images,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: AddToCartPanelProps) {
  const addLine = useCartStore((s) => s.addLine);

  const colors = useMemo(
    () => Array.from(new Set(variants.map((variant) => variant.color))),
    [variants],
  );

  const colorThumbnails = useMemo(() => {
    const variantColorById = new Map(
      variants.map((variant) => [variant.id, variant.color]),
    );
    const result = new Map<string, string>();
    for (const image of images) {
      if (!image.variant_id) continue;
      const color = variantColorById.get(image.variant_id);
      if (color && !result.has(color)) {
        result.set(color, image.url);
      }
    }
    return result;
  }, [images, variants]);

  const sizesForColor = useMemo(
    () => variants.filter((variant) => variant.color === selectedColor),
    [selectedColor, variants],
  );

  const [qty, setQty] = useState(1);
  const [showGuide, setShowGuide] = useState(false);
  const [fulfillment, setFulfillment] = useState<"livraison" | "retrait">(
    "livraison",
  );
  const [justAdded, setJustAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const selectedVariant = useMemo(
    () =>
      variants.find(
        (variant) =>
          variant.color === selectedColor && variant.size === selectedSize,
      ),
    [selectedColor, selectedSize, variants],
  );

  const inStock = (selectedVariant?.stock ?? 0) > 0;
  const canAdd = selectedSize !== null && inStock;

  const handleAdd = () => {
    if (selectedSize === null) {
      setSizeError(true);
      return;
    }
    if (!inStock) return;
    addLine({
      productId,
      variantId: selectedVariant?.id,
      name: `${productName} — ${selectedColor} / ${selectedSize}`,
      image: productImage,
      unitPrice: salePrice ?? price,
      qty,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section className="space-y-10" aria-label="Choix de la variante et achat">
      {/* Couleur: swatch image + nom déjà affiché dans InfoPanel */}
      <div>
        <h4 className="text-md font-medium text-black-80 mb-3">Couleurs</h4>
        <div className="flex gap-6">
          {colors.map((color) => {
            const isActive = selectedColor === color;
            const thumb = colorThumbnails.get(color);
            return (
              <button
                key={color}
                type="button"
                title={color}
                aria-label={`Couleur ${color}`}
                aria-pressed={isActive}
                onClick={() => {
                  onColorChange(color);
                }}
                className={`h-14 w-14 overflow-hidden rounded-xs cursor-pointer bg-[#f5f5f5] transition-all ${
                  isActive
                    ? "ring-1 ring-black-70 ring-offset-1"
                    : "opacity-80 ring-1 ring-black-10 hover:opacity-100 hover:ring-black-40"
                }`}
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs font-bold uppercase">
                    {color.slice(0, 2)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Taille : label + guide à droite, grille compacte */}
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-black-80">Taille</h4>
          <button
            type="button"
            onClick={() => setShowGuide(true)}
            className="text-xs underline underline-offset-2 cursor-pointer hover:text-black"
          >
            Guide des tailles
          </button>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {sizesForColor.map((variant) => {
            const out = variant.stock <= 0;
            const isActive = selectedSize === variant.size;
            return (
              <button
                key={variant.id}
                type="button"
                disabled={out}
                aria-pressed={isActive}
                title={
                  out ? `${variant.size} — Rupture de stock` : variant.size
                }
                onClick={() => {
                  onSizeChange(variant.size);
                  setSizeError(false);
                }}
                className={`rounded-xs cursor-pointer border px-1 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-black bg-black-80 text-white"
                    : out
                      ? "cursor-not-allowed border-black-20 text-black-30 line-through"
                      : "border-black-20 hover:border-black"
                }`}
              >
                {variant.size}
              </button>
            );
          })}
        </div>
        {sizeError && selectedSize === null && (
          <p
            className="mt-1.5 text-xs font-semibold text-[#d60000]"
            role="alert"
          >
            Veuillez sélectionner une taille.
          </p>
        )}
        {selectedVariant && (
          <p className="mt-1.5 text-xs text-black-70" role="status">
            {inStock
              ? `${selectedVariant.stock} unités en stock`
              : "Rupture de stock pour cette taille"}
          </p>
        )}
      </div>

      <FulfillmentSelector
        mode={fulfillment}
        onChange={setFulfillment}
        hasSelectedSize={selectedSize !== null}
      />

      <PaymentMethods />

      <div className="flex items-center gap-3">
        <QuantityStepper
          qty={qty}
          onChange={(next) => setQty(Math.max(1, next))}
        />
        <span className="text-sm text-black-80">Quantité</span>
      </div>

      <button
        type="button"
        disabled={!canAdd}
        onClick={handleAdd}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3.5 text-sm font-bold text-white transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ShoppingCartIcon aria-hidden="true" className="h-5 w-5" />
        {justAdded ? "Ajouté au panier" : "Ajouter au panier"}
      </button>
      {!canAdd && selectedSize === null && (
        <p className="text-center text-xs text-black-60">
          Sélectionnez une taille pour ajouter au panier
        </p>
      )}

      <SizeGuideModal open={showGuide} onClose={() => setShowGuide(false)} />
    </section>
  );
}
