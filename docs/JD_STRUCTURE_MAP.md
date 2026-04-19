# JD-Inspired Structure Map

Ce document explique comment la structure de ce projet se relie aux patterns observes sur JD Sports,
mais sans copier leur contenu ou assets.

## 1) Architecture globale

- src/pages: pages du site, organisees par domaine fonctionnel.
- src/shared/components: composants reutilisables transverses.
- src/shared/icons: icones personnalisees TSX.
- src/app: blueprints (routes et inventaire composants) + routeur central.

## 2) Correspondance des zones du site

- Homepage type JD:
  - src/pages/home/HomePage.tsx
  - src/pages/home/components/HomeSectionsGuide.tsx
  - shared merchandising blocks: HeroBanner, PromoStrip, CategoryTile, CollectionRail, CampaignCard.

- Navigation dense type JD:
  - src/shared/components/navigation/UtilityBar.tsx
  - src/shared/components/navigation/MainHeader.tsx
  - src/shared/components/navigation/MegaMenu.tsx
  - src/shared/components/navigation/MobileMenuDrawer.tsx
  - src/shared/components/navigation/SearchOverlay.tsx

- Listing categorie (PLP) type JD:
  - src/pages/category/CategoryPage.tsx
  - src/shared/components/catalog/FilterSidebar.tsx
  - src/shared/components/catalog/SortBar.tsx
  - src/shared/components/catalog/ProductGrid.tsx
  - src/shared/data/products.ts
  - src/shared/data/plp.ts

- Product detail page (PDP) type JD:
  - src/pages/product/ProductDetailPage.tsx
  - src/shared/components/product/ProductGallery.tsx
  - src/shared/components/product/ProductInfoPanel.tsx
  - src/shared/components/product/AddToCartPanel.tsx

- Cart + Checkout:
  - src/pages/cart/CartPage.tsx
  - src/pages/checkout/CheckoutInformationPage.tsx
  - src/pages/checkout/CheckoutShippingPage.tsx
  - src/pages/checkout/CheckoutPaymentPage.tsx
  - src/pages/checkout/CheckoutConfirmationPage.tsx
  - src/shared/components/checkout/CartSummary.tsx
  - src/shared/components/checkout/CheckoutStepper.tsx

- Account / support / legal:
  - src/pages/account/\*
  - src/pages/support/\*
  - src/pages/legal/\*
  - src/pages/system/\*

## 3) Logique de reutilisation

- AppShell est le cadre principal (barre utilitaire, header, trust strip, footer).
- Les pages injectent leurs blocs metier dans ce shell.
- Les blocs partages evitent de reimplementer la meme UI sur plusieurs pages.
- Les composants dans src/pages/\*\*/components sont specifiques a une page ou un groupe de pages.
- Les constantes de comportement/copy PLP sont centralisees dans src/shared/data/plp.ts.

## 4) Ordre conseille pour coder la vraie version

1. Brancher le routeur et mapper les routes de src/app/routeBlueprint.ts.
2. Stabiliser navigation + layout global (shell).
3. Coder PLP et PDP avec donnees mockees.
4. Coder panier puis checkout etats par etape.
5. Finaliser compte/support/legal.

## 5) Etat implemente a date (2026-04-19)

- Navigation globale: en place (desktop/mobile) avec mega menu et drawer mobile.
- PLP categorie:
  - barre de controles type JD (shop my store + show filters + sort)
  - drawer de filtres a droite avec overlay
  - facettes accordion (department/brand/category/price)
  - chips de filtres actifs + clear all
  - tri applique a la grille
- Donnees:
  - catalogue mock centralise: src/shared/data/products.ts
  - config PLP centralisee: src/shared/data/plp.ts
- Build: vert apres integration.

## 6) Fichiers de pilotage

- src/app/routeBlueprint.ts: inventaire des routes et de leur role.
- src/app/componentBlueprint.ts: inventaire des composants reutilisables par groupe.
- src/app/router.tsx: implementation reelle du routeur, mappee au blueprint.

Ces deux fichiers servent de reference pour ne pas se perdre pendant les iterations.

Etat actuel: le routeur est branche, toutes les pages scaffoldees sont accessibles, et le PLP categorie est deja passe d'un template statique a une base fonctionnelle data-driven.
