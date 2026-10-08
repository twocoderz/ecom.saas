/**
 * Constantes du tunnel de commande (checkout simule, sans backend).
 * Methodes de livraison, taux de taxe et copies : source unique,
 * aucun montant en dur dans les pages/composants.
 */

export type ShippingMethodId = "standard" | "express" | "retrait";

export type ShippingMethod = {
  id: ShippingMethodId;
  name: string;
  delay: string;
  /** Frais en FCFA. */
  fee: number;
  /** Franco de port des `fee` a partir de ce sous-total remisé (null = jamais). */
  freeFrom: number | null;
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    name: "Livraison standard",
    delay: "3 à 5 jours ouvrés",
    fee: 2500,
    freeFrom: 100000,
  },
  {
    id: "express",
    name: "Livraison express",
    delay: "24 à 48 h",
    fee: 5000,
    freeFrom: null,
  },
  {
    id: "retrait",
    name: "Retrait en magasin",
    delay: "Prêt aujourd'hui",
    fee: 0,
    freeFrom: 0,
  },
];

/** TVA simulee (taux XOF/UEMOA) appliquee au sous-total remisé. */
export const TAX_RATE = 0.18;

export function getShippingMethod(id: string): ShippingMethod {
  return (
    SHIPPING_METHODS.find((method) => method.id === id) ?? SHIPPING_METHODS[0]
  );
}

export const checkoutCopy = {
  cartTitle: "Total",
  freeShipping: "Gratuite",
  taxesLabel: "Taxes estimées (TVA 18 %)",
  shippingLabel: "Livraison",
  discountLabel: "Remise",
  simulatedNotice:
    "Commande et paiement simulés localement : aucun appel réseau, aucune transaction réelle.",
  emptyCartTitle: "Votre panier est vide",
  emptyCartHint:
    "Ajoutez des articles depuis le catalogue pour passer commande.",
  backToCart: "Retour au panier",
  continueShopping: "Continuer mes achats",
} as const;
