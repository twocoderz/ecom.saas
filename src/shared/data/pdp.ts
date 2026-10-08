/**
 * Constantes UI de la fiche produit (PDP).
 * Source unique : aucun texte livraison/retours/taille en dur dans
 * les pages ou composants (regle Sprint A : tout passe par `data/`).
 */

export type FulfillmentMode = "livraison" | "retrait";

/** Cle localStorage du mode de reception (persiste entre les visites). */
export const FULFILLMENT_STORAGE_KEY = "ecom-default-shop-fulfillment";

export const pdpSizeAdviceCopy = {
  title: "Comment choisir votre taille",
  bullets: [
    "Nos tailles chaussures sont en pointure EU (ex : 40, 41, 42). Consultez le guide des tailles pour la correspondance en cm.",
    "Pour le textile, les tailles vont de XS à XL. Si vous hésitez entre deux tailles, prenez la plus grande.",
  ],
} as const;

export const pdpDeliveryReturnsCopy = {
  title: "Livraison & retours",
  body: "Livraison suivie sous 3 à 5 jours ouvrés. Retrait gratuit en magasin le jour même. Retours gratuits sous 30 jours, articles non portés avec étiquettes.",
} as const;

export const fulfillmentCopy: Record<
  FulfillmentMode,
  { title: string; hintWithSize: string; hintWithoutSize: string }
> = {
  livraison: {
    title: "Livraison",
    hintWithSize: "Expédition sous 3 à 5 jours ouvrés",
    hintWithoutSize: "Sélectionnez une taille pour voir le délai",
  },
  retrait: {
    title: "Retrait gratuit",
    hintWithSize: "À retirer aujourd'hui en magasin",
    hintWithoutSize: "À retirer aujourd'hui en magasin",
  },
};

export const sizeGuideCopy = {
  title: "Guide des tailles",
  intro:
    "Mesurez votre pied en fin de journée. Si vous hésitez entre deux tailles, prenez la plus grande.",
  shoesTitle: "Chaussures (EU)",
  textileTitle: "Textile (tour de poitrine / tour de taille)",
} as const;

export const SHOE_SIZE_ROWS: Array<[string, string, string, string]> = [
  ["40", "25,0 cm", "UK 6", "US 7"],
  ["41", "25,7 cm", "UK 7", "US 8"],
  ["42", "26,0 cm", "UK 7.5", "US 8.5"],
  ["42,5", "26,4 cm", "UK 8", "US 9"],
  ["43", "26,7 cm", "UK 8.5", "US 9.5"],
  ["44", "27,1 cm", "UK 9", "US 10"],
  ["44,5", "27,5 cm", "UK 9.5", "US 10.5"],
  ["45", "27,9 cm", "UK 10", "US 11"],
];

export const TEXTILE_SIZE_ROWS: Array<[string, string, string]> = [
  ["XS", "86-91 cm", "63-68 cm"],
  ["S", "91-97 cm", "68-74 cm"],
  ["M", "97-104 cm", "74-81 cm"],
  ["L", "104-112 cm", "81-89 cm"],
  ["XL", "112-120 cm", "89-97 cm"],
];
