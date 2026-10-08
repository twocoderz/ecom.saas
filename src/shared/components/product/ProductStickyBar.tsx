import { useState } from "react";
import { useCartStore } from "../../../stores/useCartStore";
import { FULFILLMENT_STORAGE_KEY } from "../../data/pdp";
import type { FulfillmentMode } from "../../data/pdp";
import { ShoppingCartIcon } from "../../icons";
import { Price } from "../ui/Price";

type ProductStickyBarProps = {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  salePrice: number | null;
  variantId?: string;
  variantLabel: string;
  selectedColor?: string;
  selectedSize?: string | null;
  inStock: boolean;
  hasSelectedSize: boolean;
};

/**
 * Barre d'achat sticky mobile uniquement (lg:hidden).
 * Desktop strictement inchangé : composant non rendu au-delà de lg.
 */
export function ProductStickyBar({
  productId,
  productName,
  productImage,
  price,
  salePrice,
  variantId,
  variantLabel,
  selectedColor,
  selectedSize,
  inStock,
  hasSelectedSize,
}: ProductStickyBarProps) {
  const addLine = useCartStore((s) => s.addLine);
  const [justAdded, setJustAdded] = useState(false);

  const scrollToOptions = () => {
    document
      .getElementById("add-to-cart")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const readFulfillment = (): FulfillmentMode => {
    try {
      return window.localStorage.getItem(FULFILLMENT_STORAGE_KEY) === "retrait"
        ? "retrait"
        : "livraison";
    } catch {
      return "livraison";
    }
  };

  const handleAdd = () => {
    if (!hasSelectedSize) {
      scrollToOptions();
      return;
    }
    if (!inStock) return;
    addLine({
      productId,
      variantId,
      color: selectedColor,
      size: selectedSize ?? undefined,
      fulfillment: readFulfillment(),
      name: variantLabel ? `${productName} — ${variantLabel}` : productName,
      image: productImage,
      unitPrice: salePrice ?? price,
      qty: 1,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black-10 bg-white/95 backdrop-blur lg:hidden">
      <div
        className="flex items-center gap-3 px-4 pt-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        {productImage ? (
          <img
            src={productImage}
            alt=""
            aria-hidden="true"
            className="h-10 w-10 shrink-0 rounded-xs bg-[#f5f5f5] object-contain"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-1.5">
            <Price
              amount={salePrice ?? price}
              className="text-sm font-bold text-black"
            />
            {salePrice !== null && (
              <Price
                amount={price}
                as="del"
                className="text-xs text-black-60"
              />
            )}
          </div>
          <p className="truncate text-[11px] text-black-60">
            {hasSelectedSize ? variantLabel : "Sélectionnez une taille"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={hasSelectedSize && !inStock}
          className="flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-black transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingCartIcon
            strokeWidth={2}
            aria-hidden="true"
            className="h-5 w-5"
          />
          {justAdded
            ? "Ajouté"
            : hasSelectedSize
              ? "Ajouter"
              : "Choisir taille"}
        </button>
      </div>
    </div>
  );
}
