import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrencyCode } from "../lib/currency";

/**
 * Preferences globales : langue + devise (persistees).
 */
export type LocaleCode = "fr" | "en";

type PrefsState = {
  locale: LocaleCode;
  currency: CurrencyCode;
  setLocale: (locale: LocaleCode) => void;
  setCurrency: (currency: CurrencyCode) => void;
};

export const usePrefsStore = create<PrefsState>()(
  persist(
    (set) => ({
      locale: "fr",
      currency: "XOF",
      setLocale: (locale) => set({ locale }),
      setCurrency: (currency) => set({ currency }),
    }),
    { name: "ecom-prefs" },
  ),
);
