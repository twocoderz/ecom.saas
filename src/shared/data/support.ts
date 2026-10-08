/**
 * Contenus reels du support (aide, contact, livraison/retours, suivi).
 * Source unique : les pages ne dupliquent aucun texte.
 */

export const helpFaq: Array<{ question: string; answer: string }> = [
  {
    question: "Comment suivre ma commande ?",
    answer:
      "Rendez-vous sur la page Suivi de commande et saisissez votre numéro (ex : CMD-1003) ainsi que l'e-mail utilisé à la commande. Vos commandes passées connecté sont aussi visibles dans Mes commandes.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Mixx by Yas, Flooz, Visa et espèces à la livraison ou au retrait. Le paiement est simulé localement en démo : aucune transaction réelle n'est effectuée.",
  },
  {
    question: "Quels sont les délais et frais de livraison ?",
    answer:
      "Standard 3 à 5 jours ouvrés (2 500 F, offerte dès 100 000 F), express 24 à 48 h (5 000 F), retrait en magasin gratuit et prêt le jour même.",
  },
  {
    question: "Puis-je retourner un article ?",
    answer:
      "Oui, sous 30 jours, articles non portés avec étiquettes. Le remboursement suit le moyen de paiement initial sous 5 à 10 jours ouvrés après réception.",
  },
  {
    question: "Comment choisir ma taille ?",
    answer:
      "Les chaussures taillent en pointure EU, le textile de XS à XL. En cas d'hésitation entre deux tailles, prenez la plus grande, et consultez le guide des tailles sur chaque fiche produit.",
  },
  {
    question: "Comment utiliser un code promo ?",
    answer:
      "Saisissez-le dans le bloc promo du panier avant de passer commande. La remise s'applique au sous-total, cumulable avec la livraison offerte.",
  },
];

export const contactChannels = {
  title: "Contact",
  intro:
    "Une question sur une commande, une taille ou un retour ? Écrivez-nous, on répond vite.",
  email: "support@ecom.saas",
  phone: "+221 33 800 00 00",
  whatsapp: "+221 77 000 00 00",
  hours: "Lun – Sam, 8h – 20h (GMT)",
  address: "12 rue 10, Plateau, Dakar — Sénégal",
} as const;

export const shippingPolicy: Array<{ title: string; body: string }> = [
  {
    title: "Livraison standard",
    body: "3 à 5 jours ouvrés partout au Sénégal, 2 500 F, offerte dès 100 000 F d'achat. Suivi par e-mail et dans votre compte.",
  },
  {
    title: "Livraison express",
    body: "24 à 48 h sur Dakar et environs, 5 000 F. Commandée avant 14h, expédiée le jour même ouvré.",
  },
  {
    title: "Retrait en magasin",
    body: "Gratuit, prêt le jour même. Présentez votre numéro de commande et une pièce d'identité.",
  },
];

export const returnsPolicy: Array<{ title: string; body: string }> = [
  {
    title: "Délai et conditions",
    body: "30 jours après réception, articles non portés, non lavés, avec étiquettes et emballage d'origine. Les articles soldés restent échangeables.",
  },
  {
    title: "Comment retourner",
    body: "Depuis Mes commandes, demandez un retour, puis déposez le colis en magasin ou via le transporteur indiqué. Le remboursement suit sous 5 à 10 jours ouvrés sur le moyen initial.",
  },
  {
    title: "Échanges de taille",
    body: "Un échange taille est traité comme un retour + une nouvelle commande au prix du jour, avec livraison offerte sur la seconde expédition.",
  },
];

export const trackingCopy = {
  title: "Suivi de commande",
  intro:
    "Saisissez votre numéro de commande (ex : CMD-1003) et l'e-mail utilisé lors de l'achat.",
  notFound:
    "Aucune commande trouvée avec ce numéro et cet e-mail. Vérifiez la saisie ou consultez Mes commandes.",
  timeline: [
    "Commande reçue",
    "Paiement confirmé",
    "Colis expédié",
    "Commande livrée",
  ],
} as const;
