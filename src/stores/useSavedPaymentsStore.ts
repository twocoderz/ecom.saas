import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_SHOP_ID } from "../types";
import type { PaymentMethodId } from "../shared/components/product/PaymentMethods";

/**
 * Moyens de paiement memorises en local (sans backend, sans PAN reel :
 * seul un libelle masque est conserve, jamais de numero complet).
 */
export type SavedPayment = {
  id: string;
  shopId?: string;
  method: PaymentMethodId;
  /** Libelle masque, ex : "Mixx ••• 77 00 00". */
  label: string;
  isDefault: boolean;
};

type SavedPaymentState = {
  payments: SavedPayment[];
  addPayment: (input: { method: PaymentMethodId; label: string }) => void;
  removePayment: (id: string) => void;
  setDefault: (id: string) => void;
};

let seq = 0;

export function maskPhoneLabel(method: PaymentMethodId, phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  const tail = digits.slice(-4).padStart(4, "•");
  const name =
    method === "mixx"
      ? "Mixx"
      : method === "flooz"
        ? "Flooz"
        : method === "visa"
          ? "Visa"
          : "Cash";
  return `${name} ••• ${tail}`;
}

export const useSavedPaymentsStore = create<SavedPaymentState>()(
  persist(
    (set) => ({
      payments: [],
      addPayment: (input) =>
        set((state) => ({
          payments: [
            ...state.payments,
            {
              id: `pay-${Date.now().toString(36)}-${seq++}`,
              shopId: DEFAULT_SHOP_ID,
              method: input.method,
              label: input.label,
              isDefault: state.payments.length === 0,
            },
          ],
        })),
      removePayment: (id) =>
        set((state) => {
          const next = state.payments.filter((entry) => entry.id !== id);
          if (next.length > 0 && !next.some((entry) => entry.isDefault)) {
            next[0] = { ...next[0], isDefault: true };
          }
          return { payments: next };
        }),
      setDefault: (id) =>
        set((state) => ({
          payments: state.payments.map((entry) => ({
            ...entry,
            isDefault: entry.id === id,
          })),
        })),
    }),
    { name: `ecom-${DEFAULT_SHOP_ID}-payments` },
  ),
);
