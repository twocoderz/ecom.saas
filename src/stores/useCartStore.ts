import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Ligne panier : produit + variante + quantite.
 */
export type CartLine = {
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  unitPriceUsd: number;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  promoCode: string;
  addLine: (line: CartLine) => void;
  removeLine: (productId: string, variantId?: string) => void;
  setQty: (productId: string, variantId: string | undefined, qty: number) => void;
  clear: () => void;
  setPromoCode: (code: string) => void;
  subtotalUsd: () => number;
  count: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      promoCode: "",
      addLine: (line) =>
        set((state) => {
          const idx = state.lines.findIndex(
            (l) => l.productId === line.productId && l.variantId === line.variantId,
          );
          if (idx >= 0) {
            const next = [...state.lines];
            next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
            return { lines: next };
          }
          return { lines: [...state.lines, line] };
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
                  (l) => !(l.productId === productId && l.variantId === variantId),
                )
              : state.lines.map((l) =>
                  l.productId === productId && l.variantId === variantId
                    ? { ...l, qty }
                    : l,
                ),
        })),
      clear: () => set({ lines: [], promoCode: "" }),
      setPromoCode: (promoCode) => set({ promoCode }),
      subtotalUsd: () =>
        get().lines.reduce((sum, l) => sum + l.unitPriceUsd * l.qty, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.qty, 0),
    }),
    { name: "ecom-cart" },
  ),
);
