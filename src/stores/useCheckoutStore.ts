import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_SHOP_ID } from "../types";
import type { PaymentMethodId } from "../shared/components/product/PaymentMethods";
import type { ShippingMethodId } from "../shared/data/checkout";
import { EMPTY_INFORMATION, type InformationForm } from "../lib/checkout";

/**
 * Brouillon du tunnel de commande (sans backend), persiste en local :
 * formulaires pre-remplis au retour, navigation inter-etapes,
 * derniere commande pour la confirmation rejouable apres refresh.
 */
type CheckoutState = {
  information: InformationForm;
  shippingMethodId: ShippingMethodId;
  paymentMethod: PaymentMethodId;
  payerPhone: string;
  cardNumber: string;
  cardExpiry: string;
  lastOrderId: string | null;
  setInformation: (info: InformationForm) => void;
  setShippingMethodId: (id: ShippingMethodId) => void;
  setPaymentMethod: (method: PaymentMethodId) => void;
  setPaymentDetails: (details: {
    payerPhone: string;
    cardNumber: string;
    cardExpiry: string;
  }) => void;
  setLastOrderId: (orderId: string | null) => void;
  resetForms: () => void;
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      information: EMPTY_INFORMATION,
      shippingMethodId: "standard",
      paymentMethod: "mixx",
      payerPhone: "",
      cardNumber: "",
      cardExpiry: "",
      lastOrderId: null,
      setInformation: (information) => set({ information }),
      setShippingMethodId: (shippingMethodId) => set({ shippingMethodId }),
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
      setPaymentDetails: (details) => set({ ...details }),
      setLastOrderId: (lastOrderId) => set({ lastOrderId }),
      resetForms: () =>
        set({
          information: EMPTY_INFORMATION,
          shippingMethodId: "standard",
          paymentMethod: "mixx",
          payerPhone: "",
          cardNumber: "",
          cardExpiry: "",
        }),
    }),
    { name: `ecom-${DEFAULT_SHOP_ID}-checkout` },
  ),
);
