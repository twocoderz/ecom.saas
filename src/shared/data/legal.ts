/**
 * Contenus legaux rediges (boutique demo, droit OHADA/UEMOA en toile de fond).
 * Contenu substantiel exige : aucune page mince avant indexation.
 */

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalPageContent = {
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
};

export const termsContent: LegalPageContent = {
  title: "Conditions générales d'utilisation et de vente",
  intro:
    "Les présentes conditions encadrent l'utilisation de la boutique ecom.saas et la vente d'articles de sportswear au Sénégal. Toute commande vaut acceptation sans réserve.",
  updatedAt: "Dernière mise à jour : 1er octobre 2026.",
  sections: [
    {
      heading: "1. Objet et champ d'application",
      paragraphs: [
        "ecom.saas exploite une boutique en ligne d'articles de sport (sneakers, textile, accessoires) livrés au Sénégal. Les présentes conditions s'appliquent à toute navigation, création de compte et commande.",
        "Le client déclare avoir au moins 18 ans ou agir avec l'accord de son représentant légal pour tout achat.",
      ],
    },
    {
      heading: "2. Produits et prix",
      paragraphs: [
        "Les fiches produits décrivent les caractéristiques essentielles : marque, modèle, coloris, tailles, prix en francs CFA (XOF), toutes taxes comprises. Les visuels sont illustratifs en phase de démonstration.",
        "Les prix peuvent évoluer ; le prix applicable est celui affiché au moment de la validation de la commande. Les codes promo sont soumis à leurs conditions de validité et de période.",
      ],
    },
    {
      heading: "3. Commande et paiement",
      paragraphs: [
        "Le tunnel comprend quatre étapes : informations, livraison, paiement, confirmation. La commande est ferme après validation du paiement simulé et attribution d'un numéro (CMD-…).",
        "Moyens acceptés : Mixx by Yas, Flooz, Visa et espèces à la livraison ou au retrait. En phase démo, aucun flux monétaire réel n'est exécuté.",
      ],
    },
    {
      heading: "4. Livraison",
      paragraphs: [
        "Standard 3 à 5 jours ouvrés (2 500 F, offerte dès 100 000 F), express 24 à 48 h (5 000 F), retrait gratuit en magasin le jour même. Les délais courent après confirmation de commande.",
        "En cas de retard supérieur à 7 jours ouvrés, le client peut annuler sans frais et obtenir remboursement intégral.",
      ],
    },
    {
      heading: "5. Rétractation, retours et garanties",
      paragraphs: [
        "Retours gratuits sous 30 jours, articles non portés avec étiquettes. Remboursement sous 5 à 10 jours ouvrés sur le moyen initial après contrôle.",
        "Les articles bénéficient de la garantie légale contre les défauts de conformité : échange ou remboursement selon le cas.",
      ],
    },
    {
      heading: "6. Compte client et responsabilités",
      paragraphs: [
        "Le client garde ses identifiants confidentiels et signale tout usage frauduleux. ecom.saas peut suspendre un compte en cas d'abus manifeste.",
        "La boutique est fournie en l'état en phase de démonstration ; ecom.saas met en œuvre les moyens raisonnables pour assurer disponibilité et exactitude des informations.",
      ],
    },
    {
      heading: "7. Droit applicable et litiges",
      paragraphs: [
        "Les présentes conditions relèvent du droit sénégalais et, à défaut, du droit uniforme OHADA applicable au commerce. Tout litige est d'abord recherché à l'amiable via le support, puis porté devant les juridictions compétentes de Dakar.",
      ],
    },
  ],
};

export const privacyContent: LegalPageContent = {
  title: "Politique de confidentialité",
  intro:
    "ecom.saas traite vos données avec parcimonie : en démo, tout reste stocké localement dans votre navigateur, sans serveur ni revente.",
  updatedAt: "Dernière mise à jour : 1er octobre 2026.",
  sections: [
    {
      heading: "1. Données collectées",
      paragraphs: [
        "Compte : e-mail et nom. Commande : identité, adresse, téléphone, contenu du panier, moyen de paiement (libellé masqué uniquement, jamais de numéro complet). Navigation : préférences de filtres et panier pour le fonctionnement du site.",
        "Aucune donnée sensible (santé, biométrie) n'est demandée ni traitée.",
      ],
    },
    {
      heading: "2. Finalités et bases",
      paragraphs: [
        "Exécution du contrat (commandes, livraison, retours), gestion du compte, support client, et mesure d'audience strictement nécessaire. En démo, le stockage local du navigateur tient lieu d'hébergeur.",
        "La newsletter, lorsqu'elle sera activée, reposera sur votre consentement explicite, retirable à tout moment.",
      ],
    },
    {
      heading: "3. Conservation et sécurité",
      paragraphs: [
        "Commandes et avis : conservés 3 ans à des fins de preuve et de suivi. Données de compte : jusqu'à suppression du compte. Panier et brouillons : supprimables à tout moment depuis le navigateur.",
        "Accès restreint, chiffrement en transit (HTTPS) dès la mise en production, et minimisation systématique des champs collectés.",
      ],
    },
    {
      heading: "4. Partage et transferts",
      paragraphs: [
        "Aucune vente ni location de données. Sous-traitants strictement nécessaires en production (hébergeur, transporteur, PSP agréé), encadrés contractuellement, sans transfert hors UEMOA sauf garanties appropriées.",
      ],
    },
    {
      heading: "5. Vos droits",
      paragraphs: [
        "Accès, rectification, suppression, opposition et portabilité : écrivez à support@ecom.saas avec la copie d'une pièce d'identité. Réponse sous 30 jours.",
        "En démo, vous pouvez déjà tout effacer : videz le stockage local du navigateur pour supprimer compte, panier, commandes et avis.",
      ],
    },
  ],
};

export const legalNoticeContent: LegalPageContent = {
  title: "Mentions légales",
  intro:
    "Identification de l'éditeur, hébergement et propriété intellectuelle de la boutique de démonstration ecom.saas.",
  updatedAt: "Dernière mise à jour : 1er octobre 2026.",
  sections: [
    {
      heading: "1. Éditeur",
      paragraphs: [
        "ecom.saas — boutique de démonstration, 12 rue 10, Plateau, Dakar (Sénégal). Contact : support@ecom.saas, +221 33 800 00 00. Directeur de la publication : l'équipe ecom.saas.",
        "Immatriculation et capital : en cours de constitution — ces mentions seront complétées avant l'ouverture commerciale réelle.",
      ],
    },
    {
      heading: "2. Hébergement",
      paragraphs: [
        "Phase démo : site statique sans serveur applicatif, données stockées localement dans le navigateur du visiteur. Hébergeur de production : à désigner avant lancement (mention mise à jour alors).",
      ],
    },
    {
      heading: "3. Propriété intellectuelle",
      paragraphs: [
        "Textes, design et code : © ecom.saas. Marques citées (Nike, adidas, Puma…) : propriété de leurs titulaires, utilisées à titre descriptif pour la démo. Visuels produits : packshots temporaires en attente des assets clients.",
        "Toute reproduction sans autorisation est interdite, hors courte citation avec source.",
      ],
    },
    {
      heading: "4. Crédits et contact",
      paragraphs: [
        "Design UX inspiré des standards du commerce sportswear, sans reprise de contenus tiers. Signalez tout contenu litigieux à support@ecom.saas : retrait sous 72 h après vérification.",
      ],
    },
  ],
};

export const accessibilityContent: LegalPageContent = {
  title: "Accessibilité",
  intro:
    "ecom.saas vise un commerce accessible à tous : navigation clavier complète, contrastes soignés et contenus compréhensibles.",
  updatedAt: "Dernière mise à jour : 1er octobre 2026.",
  sections: [
    {
      heading: "1. Engagements",
      paragraphs: [
        "Objectif de conformité au niveau AA des règles internationales (WCAG 2.1) : alternatives textuelles, hiérarchie de titres, formulaires étiquetés avec erreurs annoncées, et tunnel de commande utilisable sans souris.",
        "Nouvelles pages et composants sont relus sous cet angle à chaque sprint (voir Sprint E : qualité).",
      ],
    },
    {
      heading: "2. Aides déjà en place",
      paragraphs: [
        "Fil d'Ariane et stepper avec étape courante annoncée, galerie avec statuts d'image, modale guide des tailles fermable au clavier, messages de statut (panier, avis, formulaires) exposés aux lecteurs d'écran.",
      ],
    },
    {
      heading: "3. Limites connues et assistance",
      paragraphs: [
        "Certains visuels produits temporaires portent des alternatives génériques : ils seront remplacés avec les packshots définitifs. En cas de blocage, contactez support@ecom.saas ou le +221 33 800 00 00 (lun–sam, 8h–20h) : nous finalisons la tâche avec vous.",
      ],
    },
  ],
};
