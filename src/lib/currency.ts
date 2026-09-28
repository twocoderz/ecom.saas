import type { Promotion } from "../types";

/**
 * Devises supportees par le template single-shop.
 * Les prix catalogue sont stockes en USD, convertis a l'affichage.
 */
export type CurrencyCode = "XOF" | "EUR" | "USD";

/** Taux mock USD -> devise cible (a remplacer par un vrai provider). */
const RATES_FROM_USD: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  XOF: 605,
};

/**
 * Convertit un montant USD vers la devise cible.
 */
export function convertFromUsd(amountUsd: number, currency: CurrencyCode): number {
  return amountUsd * RATES_FROM_USD[currency];
}

/**
 * Formate un montant USD dans la devise cible avec Intl.
 */
export function formatPrice(amountUsd: number, currency: CurrencyCode): string {
  const converted = convertFromUsd(amountUsd, currency);
  const fractionDigits = currency === "XOF" ? 0 : 2;
  return new Intl.NumberFormat(currency === "XOF" ? "fr-SN" : undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(converted);
}

/**
 * Calcule le prix effectif d'un produit (solde prioritaire).
 */
export function effectivePrice(price: number, salePrice: number | null): number {
  return salePrice ?? price;
}

export type PromoResult = {
  code: string;
  discountAmountUsd: number;
  totalAfterDiscountUsd: number;
  applied: boolean;
  reason: string;
};

/**
 * Moteur promo minimal : % ou fixe, actif sur la periode, applique au sous-total.
 */
export function applyPromo(
  subtotalUsd: number,
  promo: Promotion | null | undefined,
  codeInput: string,
): PromoResult {
  const code = codeInput.trim().toUpperCase();
  if (!promo || promo.code.toUpperCase() !== code) {
    return {
      code,
      discountAmountUsd: 0,
      totalAfterDiscountUsd: subtotalUsd,
      applied: false,
      reason: "Code promo inconnu.",
    };
  }
  const now = new Date();
  const active =
    promo.is_active && new Date(promo.starts_at) <= now && now <= new Date(promo.ends_at);
  if (!active) {
    return {
      code,
      discountAmountUsd: 0,
      totalAfterDiscountUsd: subtotalUsd,
      applied: false,
      reason: "Code promo expire ou inactif.",
    };
  }
  const discount =
    promo.discount_type === "percentage"
      ? (subtotalUsd * promo.discount_value) / 100
      : Math.min(promo.discount_value, subtotalUsd);
  return {
    code,
    discountAmountUsd: discount,
    totalAfterDiscountUsd: Math.max(0, subtotalUsd - discount),
    applied: true,
    reason: "Code promo appliqué.",
  };
}
