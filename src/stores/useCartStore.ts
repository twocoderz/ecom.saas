import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_SHOP_ID } from "../types";
import type { FulfillmentMode } from "../shared/data/pdp";

/**
 * Ligne panier : produit + variante + quantite.
 * `shopId` fige la boutique (mono-boutique "default-shop" pour l'instant).
 * `color`/`size` structurent la variante (`name` reste affiche).
 * `fulfillment` memorise le mode choisi sur la PDP (exploite en Sprint C).
 */
export type CartLine = {
  shopId?: string;
  productId: string;
  variantId?: string;
  color?: string;
  size?: string;
  fulfillment?: FulfillmentMode;
  name: string;
  image: string;
  unitPrice: number;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  promoCode: string;
  addLine: (line: CartLine) => void;
  removeLine: (productId: string, variantId?: string) => void;
  setQty: (
    productId: string,
    variantId: string | undefined,
    qty: number,
  ) => void;
  clear: () => void;
  setPromoCode: (code: string) => void;
  subtotal: () => number;
  count: () => number;
};

function withShopId(line: CartLine): CartLine {
  return { shopId: DEFAULT_SHOP_ID, ...line };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      promoCode: "",
      addLine: (line) =>
        set((state) => {
          const normalized = withShopId(line);
          const idx = state.lines.findIndex(
            (l) =>
              l.productId === normalized.productId &&
              l.variantId === normalized.variantId,
          );
          if (idx >= 0) {
            const next = [...state.lines];
            next[idx] = { ...next[idx], qty: next[idx].qty + normalized.qty };
            return { lines: next };
          }
          return { lines: [...state.lines, normalized] };
        }),
      removeLine: (productId, variantId) =>
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productId === productId && l.variantId === variantId),
          ),
        })),
      setQty: (productId, variantId, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter(
                  (l) =>
                    !(l.productId === productId && l.variantId === variantId),
                )
              : state.lines.map((l) =>
                  l.productId === productId && l.variantId === variantId
                    ? { ...l, qty }
                    : l,
                ),
        })),
      clear: () => set({ lines: [], promoCode: "" }),
      setPromoCode: (promoCode) => set({ promoCode }),
      subtotal: () =>
        get().lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.qty, 0),
    }),
    // Cle namespacee par boutique : ecom-{shopId}-cart-v2.
    { name: `ecom-${DEFAULT_SHOP_ID}-cart-v2` },
  ),
);

/** Selecteurs memoises (preferer a subtotal()/count() dans les composants). */
export const useCartCount = () =>
  useCartStore((s) => s.lines.reduce((sum, l) => sum + l.qty, 0));
export const useCartSubtotal = () =>
  useCartStore((s) => s.lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0));
