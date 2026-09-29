import type { Promotion } from "../types";

/**
 * Devise unique du site : franc CFA (XOF).
 * Tous les montants sont stockes et manipules en FCFA.
 */

/**
 * Formate un montant en francs CFA.
 * Milliers séparés par un point + suffixe "FCFA"
 * (ex : 13.400 FCFA, 123.456.600 FCFA). Montants exacts, sans décimales.
 */
export function formatPrice(amount: number): string {
  const grouped = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
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
  savings: number;
};

/**
 * Infos remise centralisées : un seul calcul pour cartes, PDP, recherche.
 * Tous les montants sont en FCFA.
 */
export function discountInfo(
  price: number,
  salePrice: number | null,
): DiscountInfo {
  const hasDiscount =
    typeof salePrice === "number" && salePrice < price && price > 0;
  if (!hasDiscount) {
    return { hasDiscount: false, discountPct: 0, savings: 0 };
  }
  return {
    hasDiscount: true,
    discountPct: Math.round((1 - (salePrice as number) / price) * 100),
    savings: price - (salePrice as number),
  };
}

export type PromoResult = {
  code: string;
  discountAmount: number;
  totalAfterDiscount: number;
  applied: boolean;
  reason: string;
};

/**
 * Moteur promo minimal : % ou fixe, actif sur la periode, applique au sous-total.
 */
export function applyPromo(
  subtotal: number,
  promo: Promotion | null | undefined,
  codeInput: string,
): PromoResult {
  const code = codeInput.trim().toUpperCase();
  if (!promo || promo.code.toUpperCase() !== code) {
    return {
      code,
      discountAmount: 0,
      totalAfterDiscount: subtotal,
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
      discountAmount: 0,
      totalAfterDiscount: subtotal,
      applied: false,
      reason: "Code promo expire ou inactif.",
    };
  }
  const discount =
    promo.discount_type === "percentage"
      ? (subtotal * promo.discount_value) / 100
      : Math.min(promo.discount_value, subtotal);
  return {
    code,
    discountAmount: discount,
    totalAfterDiscount: Math.max(0, subtotal - discount),
    applied: true,
    reason: "Code promo appliqué.",
  };
}
