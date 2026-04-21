# Implementation Sprint Plan

Ce plan explique dans quel ordre coder les fichiers deja structures, en gardant la logique JD-like:
navigation forte, pages catalogue robustes, puis tunnel d'achat.

Mise a jour: 2026-04-19

## Sprint 0 - Foundation (en place)

Objectif:

- Valider architecture, pages scaffold, composants de base, routeur branche.

Deja fait:

- Routeur central: src/app/router.tsx
- Blueprint routes: src/app/routeBlueprint.ts
- Blueprint composants: src/app/componentBlueprint.ts
- Shell global: src/shared/components/layout/AppShell.tsx

## Sprint 1 - Navigation et Layout global

Objectif:

- Stabiliser l'ossature visible sur toutes les pages.

Fichiers prioritaires:

- src/shared/components/navigation/UtilityBar.tsx
- src/shared/components/navigation/MainHeader.tsx
- src/shared/components/navigation/MegaMenu.tsx
- src/shared/components/navigation/MobileMenuDrawer.tsx
- src/shared/components/navigation/SearchOverlay.tsx
- src/shared/components/layout/FooterColumns.tsx
- src/shared/components/layout/TrustStrip.tsx

Livrables:

- Header desktop/mobile exploitable
- Mega-menu fonctionnel (3 niveaux)
- Footer service/legal relié aux pages support/legal

## Sprint 2 - Catalogue (PLP + Search)

Objectif:

- Rendre la recherche et la navigation catalogue utiles.

Fichiers prioritaires:

- src/pages/category/CategoryPage.tsx
- src/pages/search/SearchResultsPage.tsx
- src/shared/components/catalog/ProductCard.tsx
- src/shared/components/catalog/ProductGrid.tsx
- src/shared/components/catalog/FilterSidebar.tsx
- src/shared/components/catalog/SortBar.tsx
- src/data/mock/products.ts
- src/shared/data/plp.ts

Livrables:

- Listing avec filtres et tri reels
- Composants produits reutilisables pour PLP + Search
- Pattern drawer de filtres a droite type JD

Etat d'avancement (Sprint 2):

- Fait:
  - ProductCard branchee aux vraies donnees produit
  - ProductGrid branchee a un tableau de produits
  - CategoryPage migree vers une barre de controles JD-like
  - Filtres en drawer right overlay (plus de sidebar fixe a gauche)
  - FilterSidebar convertie en panneau facettes accordions + chips actives + bouton View Items
  - SortBar convertie en dropdown fonctionnel (relevance/newest/top rated/prix)
  - Extraction des constantes PLP dans src/shared/data/plp.ts
  - Build vert apres chaque etape
- Reste a faire:
  - Aligner SearchResultsPage sur le meme pattern de controles + filtres
  - Ajouter pagination ou infinite scroll selon decision produit
  - Synchroniser filtres/tri dans l'URL (query params)

## Sprint 3 - Product Detail (PDP)

Objectif:

- Finaliser la page qui convertit vers le panier.

Fichiers prioritaires:

- src/pages/product/ProductDetailPage.tsx
- src/shared/components/product/ProductGallery.tsx
- src/shared/components/product/ProductInfoPanel.tsx
- src/shared/components/product/AddToCartPanel.tsx

Livrables:

- Galerie, prix, variantes, CTA panier
- Zone de reassurance livraison/retours

## Sprint 4 - Panier et Checkout

Objectif:

- Construire un tunnel d'achat clair et court.

Fichiers prioritaires:

- src/pages/cart/CartPage.tsx
- src/pages/checkout/CheckoutInformationPage.tsx
- src/pages/checkout/CheckoutShippingPage.tsx
- src/pages/checkout/CheckoutPaymentPage.tsx
- src/pages/checkout/CheckoutConfirmationPage.tsx
- src/shared/components/checkout/CartSummary.tsx
- src/shared/components/checkout/CheckoutStepper.tsx

Livrables:

- Panier avec resume fiable
- Checkout multi-etapes coherent
- Confirmation commande

## Sprint 5 - Account, Support, Legal

Objectif:

- Boucler l'experience post-achat et la confiance.

Fichiers prioritaires:

- src/pages/account/\*
- src/pages/support/\*
- src/pages/legal/\*
- src/pages/system/\*

Livrables:

- Espace compte complet
- Pages support connectees
- Pages legales prêtes
- Ecrans systeme 404/500/maintenance

## Sprint 6 - Qualite et homogenisation

Objectif:

- Homogeneiser l'UI et preparer les integrations backend.

Fichiers prioritaires:

- src/shared/components/ui/\*
- src/index.css
- src/shared/components/index.ts

Livrables:

- Design system coherent (variants, etats, accessibilite)
- Tokens utilises de facon uniforme
- Composants nettoyes et documentes

## Regles de mise en oeuvre

- Toujours coder d'abord dans les composants partages si le bloc apparait sur plusieurs pages.
- Garder les composants de src/pages/\*\*/components pour les besoins strictement locaux.
- Mettre a jour src/app/routeBlueprint.ts a chaque nouvelle route.
- Eviter les logiques metier dans le layout global.
- Centraliser les constantes UI/metier dans src/shared/data avant de les diffuser dans les composants.

## Definition of Done par sprint

- Build passe: pnpm run build
- Routes impactees testees manuellement
- Aucun composant duplique inutilement
- Documentation mise a jour si un nouveau bloc structurel est ajoute

## Notes d'implementation recents

- Le PLP categorie sert maintenant de reference visuelle/interactionnelle pour les autres listings.
- Le module src/shared/data/plp.ts est la source unique pour:
  - labels PLP
  - options de tri
  - options/ranges de prix
  - labels et etat d'ouverture des sections de filtres
