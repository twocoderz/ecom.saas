import type { Promotion } from "../types";
import {
  TAX_RATE,
  getShippingMethod,
  type ShippingMethodId,
} from "../shared/data/checkout";
import { applyPromo } from "./currency";

export type OrderTotals = {
  /** Nombre total d'articles (quantites). */
  count: number;
  subtotal: number;
  discount: number;
  discountCode: string;
  discountApplied: boolean;
  discountReason: string;
  shippingMethodId: ShippingMethodId;
  shippingFee: number;
  shippingFree: boolean;
  taxes: number;
  total: number;
};

/**
 * Moteur de totaux simule, partage par le recap panier/checkout
 * et la creation de commande mock. Tous les montants sont en FCFA.
 */
export function computeOrderTotals(input: {
  subtotal: number;
  count: number;
  promo: Promotion | null | undefined;
  promoCode: string;
  shippingMethodId: ShippingMethodId;
}): OrderTotals {
  const promoResult = applyPromo(input.subtotal, input.promo, input.promoCode);
  const discounted = promoResult.totalAfterDiscount;

  const method = getShippingMethod(input.shippingMethodId);
  const shippingFree =
    method.freeFrom !== null && discounted >= method.freeFrom;
  const shippingFee = shippingFree ? 0 : method.fee;

  const taxes = Math.round(discounted * TAX_RATE);

  return {
    count: input.count,
    subtotal: input.subtotal,
    discount: promoResult.discountAmount,
    discountCode: promoResult.code,
    discountApplied: promoResult.applied,
    discountReason: promoResult.reason,
    shippingMethodId: method.id,
    shippingFee,
    shippingFree,
    taxes,
    total: Math.max(0, discounted + shippingFee + taxes),
  };
}

export type InformationForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
};

export const EMPTY_INFORMATION: InformationForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "Sénégal",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/[\s.\-()]/g, "");
  return /^[+0-9][0-9]{7,14}$/.test(digits);
}

/**
 * Validation du formulaire informations (retourne les erreurs par champ).
 */
export function validateInformation(
  form: InformationForm,
): Partial<Record<keyof InformationForm, string>> {
  const errors: Partial<Record<keyof InformationForm, string>> = {};

  if (form.firstName.trim().length < 2) errors.firstName = "Prénom requis.";
  if (form.lastName.trim().length < 2) errors.lastName = "Nom requis.";
  if (!EMAIL_RE.test(form.email.trim()))
    errors.email = "Adresse e-mail invalide.";
  if (!isValidPhone(form.phone)) errors.phone = "Numéro de téléphone invalide.";
  if (form.address.trim().length < 4) errors.address = "Adresse requise.";
  if (form.city.trim().length < 2) errors.city = "Ville requise.";
  if (form.country.trim().length < 2) errors.country = "Pays requis.";

  return errors;
}

export type PaymentDetails = {
  payerPhone: string;
  cardNumber: string;
  cardExpiry: string;
};

/**
 * Validation du paiement simule selon le moyen choisi.
 */
export function validatePayment(
  method: string,
  details: PaymentDetails,
): Partial<Record<keyof PaymentDetails, string>> {
  const errors: Partial<Record<keyof PaymentDetails, string>> = {};

  if (method === "mixx" || method === "flooz") {
    if (!isValidPhone(details.payerPhone))
      errors.payerPhone = "Numéro mobile money invalide.";
  }

  if (method === "visa") {
    const digits = details.cardNumber.replace(/[\s.-]/g, "");
    if (!/^[0-9]{16}$/.test(digits))
      errors.cardNumber = "Numéro de carte à 16 chiffres requis (simulé).";
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(details.cardExpiry.trim()))
      errors.cardExpiry = "Expiration au format MM/AA.";
  }

  return errors;
}
