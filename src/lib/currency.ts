import type { Promotion } from "../types";

/**
 * Devise unique du site : franc CFA (XOF).
 * Les prix catalogue sont stockes en USD, convertis a l'affichage.
 */

/** Taux mock USD -> XOF (a remplacer par un vrai provider). */
const RATE_FROM_USD = 605;

/**
 * Convertit un montant USD vers le franc CFA.
 */
export function convertFromUsd(amountUsd: number): number {
  return amountUsd * RATE_FROM_USD;
}

/**
 * Formate un montant USD en francs CFA.
 * Milliers séparés par une espace insécable + suffixe "FCFA"
 * (ex : 13 400 FCFA, 123 456 600 FCFA). Montants exacts, sans décimales.
 */
export function formatPrice(amountUsd: number): string {
  const converted = convertFromUsd(amountUsd);
  const grouped = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(converted));
  return `${grouped} FCFA`;
}

/**
 * Calcule le prix effectif d'un produit (solde prioritaire).
 */
export function effectivePrice(price: number, salePrice: number | null): number {
  return salePrice ?? price;
}

export type DiscountInfo = {
  hasDiscount: boolean;
  discountPct: number;
  savingsUsd: number;
};

/**
 * Infos remise centralisées : un seul calcul pour cartes, PDP, recherche.
 * Les prix catalogue étant stockés en USD, les montants restent en USD
 * jusqu'au formatage (conversion via formatPrice).
 */
export function discountInfo(
  price: number,
  salePrice: number | null,
): DiscountInfo {
  const hasDiscount =
    typeof salePrice === "number" && salePrice < price && price > 0;
  if (!hasDiscount) {
    return { hasDiscount: false, discountPct: 0, savingsUsd: 0 };
  }
  return {
    hasDiscount: true,
    discountPct: Math.round((1 - (salePrice as number) / price) * 100),
    savingsUsd: price - (salePrice as number),
  };
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
