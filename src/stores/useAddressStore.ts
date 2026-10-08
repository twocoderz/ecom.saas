import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_SHOP_ID } from "../types";

/**
 * Carnet d'adresses local (sans backend), persiste par boutique.
 */
export type AddressEntry = {
  id: string;
  shopId?: string;
  label: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

export type AddressDraft = Omit<AddressEntry, "id" | "shopId" | "isDefault">;

type AddressState = {
  addresses: AddressEntry[];
  addAddress: (draft: AddressDraft) => void;
  updateAddress: (id: string, draft: AddressDraft) => void;
  removeAddress: (id: string) => void;
  setDefault: (id: string) => void;
};

let seq = 0;

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [],
      addAddress: (draft) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            {
              ...draft,
              id: `addr-${Date.now().toString(36)}-${seq++}`,
              shopId: DEFAULT_SHOP_ID,
              isDefault: state.addresses.length === 0,
            },
          ],
        })),
      updateAddress: (id, draft) =>
        set((state) => ({
          addresses: state.addresses.map((entry) =>
            entry.id === id ? { ...entry, ...draft } : entry,
          ),
        })),
      removeAddress: (id) =>
        set((state) => {
          const next = state.addresses.filter((entry) => entry.id !== id);
          if (next.length > 0 && !next.some((entry) => entry.isDefault)) {
            next[0] = { ...next[0], isDefault: true };
          }
          return { addresses: next };
        }),
      setDefault: (id) =>
        set((state) => ({
          addresses: state.addresses.map((entry) => ({
            ...entry,
            isDefault: entry.id === id,
          })),
        })),
    }),
    { name: `ecom-${DEFAULT_SHOP_ID}-addresses` },
  ),
);
