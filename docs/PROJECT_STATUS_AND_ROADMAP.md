# ecom.saas — Objectif, état, reste à faire + prérequis maintenabilité

> Date : 2026-10-08 — Stratégie validée : **mono-boutique fonctionnelle à 100 % sur mocks centralisés, sans backend pour l'instant. Backend branché ensuite.**
> Sprint A : **terminé le 2026-10-08** — `pnpm run build` vert, `tsc -b` vert, `eslint src` 0 erreur (2 warnings pré-existants sur `useProducts`/`useProductDetail`).

## 1. Objectif

Boutique e-commerce single-shop sportswear (sneakers / vêtements), UX inspirée JD Sports (sans copier contenus/assets).
Stack : React 19 + React Router 7 + Zustand persist + Tailwind v4 + Vite. Devise XOF/FCFA, langue fr.

**Hors scope immédiat :** backend, vrai auth, vrai paiement (PSP simulé en local).
**Préparation multi-tenant :** rester mono-boutique mais coder avec `shopId = "default-shop"` partout pour ne pas avoir à tout réécrire plus tard.

## 2. Où on en est (état réel vérifié dans `src/`)

| Domaine                         | État                               | Détail                                                                                                                                                                  |
| ------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Routing / shell                 | 95 % branché                       | `src/app/router.tsx` : blueprint complet. `RequireAuth` branché sur `/account/*`, `SystemLayout` nu pour 404/500/maintenance + catch-all `*`, `forgot-password` sous `AuthLayout`. `TrustStrip` créé et monté dans `AppShell` |
| Catalogue Category / Collection | 85 % démo                          | `PlpListing + FilterSidebar/SortBar/Pagination + catalogApi` fonctionnels, filtres/tri dans l'URL. `specifics?: ReactNode` ajouté à `PlpListing` (P0-1 résolu). Filtre prix FCFA `under-30k/30-120k/120-300k/300k-plus` + alias compat anciennes clés (P0-2 résolu) |
| Search                          | 90 % alignée                        | `SearchResultsPage.tsx` réécrite : thin wrapper `<PlpListing slug="search-results" titleOverride>` + requête `?q` dans le titre. 0 duplication catalogue (P1-5 résolu). Effet `set-state-in-effect` supprimé dans `useSearchQueryNavigation` |
| Brand                           | 80 % alignée                         | `BrandPage.tsx` lit `:slug`, résout le nom via `brands` et rend `<PlpListing slug>` (filtre natif `getPlpBySlug`, P1-6 résolu)                                                                                                  |
| PDP Produit                     | 70 % UI / 0 % backend              | `Gallery/AddToCart/StickyBar/SizeGuide` OK. `selectedColorName` ignorée, `PaymentMethods` sans handler, avis non persistés, textes livraison en dur → **Sprint B**                                                                  |
| Panier                          | 70 % local                         | `CartPage + CartSummary + useCartStore (ecom-default-shop-cart-v2)` OK. `CartLine {shopId, color, size…}` structurée, `useCartCount/useCartSubtotal` mémoïsés. Port/taxes → **Sprint C**                                          |
| Checkout                        | 5 % bloque                         | 4 pages = placeholders (`Formulaire informations client…`). `CheckoutStepper` statique. Pas de commande, pas de vidage panier → **Sprint C**                                                                                    |
| Auth / Compte                   | 40 %                               | `RequireAuth` actif sur `/account/*`. Wishlist résolue via `getPlpCardsByIds` (sans limite top-50), clé persist `ecom-default-shop-wishlist`. Orders/Addresses/PaymentMethods = stubs → **Sprint D**                           |
| Support / Légal / Système       | 25 % débloqué partiel              | Système : `404/500/maintenance` nues via `SystemLayout` (sans newsletter/header). 19 pages support/légal encore stubs → **Sprint D**                                                                                           |
| Admin                           | 35 % démo lecture seule            | 2 commandes mock `CMD-1001/1002`. `STATUS_LABELS` centralisé dans `shared/components/admin/orderStatus.ts`. `findPromoByCode` corrigé (lookup code seul). `DataTable` sans tri/pagination → **Sprint D/E**. `RequireAdmin` contournable client (connu, mock) |
| Data / Types / SEO              | Contrat mock sain, données OK      | Genres normalisés `women/kids` (P0-3 résolu). `formatPrice` en `fr-FR` + FCFA (P3-14 résolu). `shopId = "default-shop"` sur `Product/Promotion/MockOrder/CartLine`, `getPlpBySlug/getMockOrders/getMockOrderById(…, shopId?)` prêts. `Price` (primitif) vs `ProductPrice` (composé) conservés comme source unique. `MOCK_IMAGE_POOL` hors-sujet → **Sprint B**. Façades complètes : `data/index` (+shopApi), `components/index` (~50 exports, règle façade OU profond) |

Références : `docs/JD_STRUCTURE_MAP.md`, `docs/IMPLEMENTATION_SPRINT_PLAN.md`, `docs/COPILOT_HANDOFF.md`.

## 3. Ce qu'il faut changer AVANT de continuer (sinon la dette s'amplifie)

### P0 — bloquant (casse fonctionnelle ou build)

1. **Prop fantôme `CategoryPage → PlpListing`** — `CategoryPage.tsx` passe `specifics={…}` alors que `PlpListingProps = {slug, defaultSort?, titleOverride?}` ne l'a pas. Action : supprimer la prop ou ajouter `specifics?: ReactNode`. Vérifier `tsc -b`.
2. **Filtre prix inopérant** — `src/lib/filters.ts:applyPriceRange` seuils `under-50/50-200/200-500/>500` alors que prix FCFA 80k–126k → tout tombe dans `500-plus`. Action : clés `under-30k / 30-120k / 120-300k / 300k-plus` + seuils FCFA + aligner labels `src/shared/data/plp.ts`.
3. **Genres cassés** — `relations.ts: productGenders = femme/enfant` vs `entities.ts: genders = men/women/kids/unisex` → `genderByCode.get("femme") → undefined`. Action : normaliser données vers `women/kids`.
4. **`RequireAuth` mort** — défini dans `guards.tsx`, jamais utilisé → `/account/*` accessible sans login. Action : brancher `RequireAuth` sur routes account dans `router.tsx`.

### P1 — cohérence architecturale (uniformiser maintenant)

5. **Search alignée sur PLP** — supprimer duplication `SearchResultsPage` (126 lignes) → réutiliser `<PlpListing slug="search-results" />` + header recherche spécifique.
6. **Brand alignée** — `BrandPage` doit lire `params.slug` et filtrer via `getPlpBySlug` comme Category.
7. **Façades incomplètes → imports hétérogènes** :
   - `src/data/index.ts` n'exporte pas `shopApi` → barrel complet.
   - `src/shared/components/index.ts` 29/60 exports (manquent `PlpListing, CatalogFilterDrawer, Header, Footer…`) → compléter + règle : façade OU chemin profond, pas les deux.
   - `src/hooks/` + `src/shared/hooks/useCatalogFilters` (326 lignes, seule façade utilisée) → documenter responsabilité ou fusionner.
8. **Doublons à supprimer ou adopter** :
   - `ui/Button + Input + Badge` : 0 import dans `src` → adopter partout ou supprimer.
   - `Price` vs `ProductPrice`, `ActiveFilterPills` vs `FilterPillsBar`, `FilterSidebar` vs `CatalogFilterDrawer`, `HomeSectionsGuide.tsx` jamais importé, `*PageSpecifics.tsx` placeholders → garder une seule source, supprimer wrappers morts.
   - `HomePage.tsx` : 2× `<ProductGrid topPicks rail>` identiques → dédupliquer.
   - `STATUS_LABELS` dupliqué admin, `findPromoByCode` double lookup `id vs code`, `ProductGrid showNavButtons` prop morte.
9. **Layouts incohérents** — `forgot-password, maintenance, 500, 404` sous `StorefrontLayout` (header/footer/newsletter) → sortir vers `AuthLayout` ou `SystemLayout` nu.
10. **Blueprint vs réalité** — `componentBlueprint` annonce `TrustStrip` qui n'existe dans aucun fichier → créer `TrustStrip.tsx` ou retirer du blueprint. Compléter groupes `catalog/product/ui/cart`.
11. **Visuels stubs** — `Logo.tsx` (carré blanc), `Footer` sociaux `href="#"`, `MOCK_IMAGE_POOL` hors-sujet → remplacer avant démo client.

### P2 — centralisation mocks + prépa tenant (décision validée : pas de backend pour l'instant)

12. **Centraliser tous les mocks** (aucun backend) :
    - Source unique : `src/data/mock/` (`entities/products/relations/assets`) + `src/shared/data/` (constantes UI : `plp.ts, plpListings.ts, filterSections.ts, NavMenu.ts, Utilities.ts`) + `src/pages/home/data/homeMerchandising.ts` à rapatrier ou documenter comme exception.
    - Interdit : données en dur dans pages/composants (textes livraison, promos, slides, avis). Tout passe par `catalogApi.ts / shopApi.ts / lib/` qui simulent l'API (signatures `async`-ready, même si sync pour l'instant).
    - `shopApi.ts` : étendre mocks `orders/promos` + créer `getMockOrderById`, `createMockOrder()` local (panier → commande, sans backend).
13. **Prépa multi-tenant sans le coder** :
    - Ajouter `shopId: "default-shop"` dans `Product/CartLine/MockOrder/Promotion` + clés persist `ecom-{shopId}-…`.
    - Signatures `getPlpBySlug(shopId, slug, …)` prêtes (param ignoré pour l'instant).
    - Interdire singletons globaux sans `shopId` (commentaire/règle).

### P3 — hygiène (rapide, fort ROI)

14. `formatPrice` : `Intl de-DE` → `fr-FR`/`fr-SN` + `XOF` cohérent.
15. `useCartStore` : `subtotal()/count()` → sélecteurs mémoïsés ; structurer `CartLine {productId, variantId, color, size…}` au lieu de `name` concaténé.
16. `Wishlist` : résoudre via `productById`, pas `getDefaultPlpCards(50).filter`.

## 4. Reste à faire pour site opérationnel (tout sur mocks, sans backend)

### Sprint A — Nettoyage P0+P1+P2 (prérequis, sans nouveau fonctionnel) — ✅ TERMINÉ 2026-10-08

- Fichiers : `CategoryPage, PlpListing (+specifics), SearchResultsPage (wrapper), BrandPage (slug), filters.ts (seuils FCFA + alias legacy), plp.ts (labels), relations.ts (women/kids), guards/router/layouts (RequireAuth + SystemLayout), data/index.ts (+shopApi), components/index.ts (~50 exports), orderStatus centralisé, TrustStrip créé, Logo texte, Footer sociaux réels, HomePage dédupliqué, ProductGrid (prop morte supprimée), currency fr-FR, useCartStore/useWishlistStore (shopId), catalogApi/shopApi (shopId ignoré + getPlpCardsByIds), HomeSectionsGuide supprimé`.
- Done : `pnpm run build` vert, `tsc -b` vert, `eslint src` 0 erreur, 0 duplication catalogue, 0 donnée en dur hors `data/`, `RequireAuth` branché.
- Restes connus (hors Sprint A) : `pnpm run lint` racine échoue sur `.kilo/worktrees/prickle-helper` (copie worktree pré-existante, hors `src`) ; `Button/Input/Badge` conservés comme design system (adoption progressive Sprint E) ; `MOCK_IMAGE_POOL` hors-sujet → Sprint B ; `CartLine.name` conservé en affichage (migration Sprint C).

### Sprint B — Catalogue + PDP finis (mock)

- Search alignée + sync URL + pagination/infinite (décision produit à prendre).
- Brand filtrée par slug. PDP : afficher `selectedColorName`, persister `fulfillment`, avis persistés local (store ou mock mutable), textes livraison/retours en data, vraies images produits (remplacer pool laptop/sofa).
- Done : Category/Collection/Search/Brand partagent `PlpListing`, filtre prix FCFA utile, genres cohérents.

### Sprint C — Panier + Checkout simulé (bloqueur n°1, sans PSP réel)

- `CartSummary` : sous-total + promo (`applyPromo`) + port/taxes simulés + total.
- `CheckoutStepper` actif (étape courante, liens). Formulaires Information/Shipping/Payment validés (état local + `localStorage`), navigation inter-étapes, garde panier vide.
- `createMockOrder()` dans `shopApi` : crée commande mock depuis panier + formulaire, `clear()` panier, Confirmation avec n° réel + récap.
- Paiement : sélecteur `Mixx/Flooz/Visa/cash` simulé (pas d'appel réseau), logos dans `public/images/payments/`.
- Done : tunnel complet cliquable de PDP → Confirmation avec commande mock persistée, rejouable après refresh.

### Sprint D — Compte + Support + Légal + Système (bloqueur n°2)

- Compte : `RequireAuth` actif, `Orders/OrderDetail` câblés aux commandes mock, `Addresses/PaymentMethods` CRUD local, Wishlist sans limite top-50.
- Support : `OrderTracking` (input n° + email → lookup `getMockOrderById`), `Help/Contact/ShippingReturns` contenus réels.
- Légal : 5 pages rédigées (CGU/privacy/mentions/a11y/sitemap) — contenu mince interdit avant indexation.
- Système : `404/500/maintenance` avec CTA retour + sans newsletter/header lourd.
- Done : aucune page stub restante, footer/support/légal cohérents.

### Sprint E — Qualité + gel mock (prêt à brancher backend plus tard)

- Design system : adopter OU supprimer `Button/Input/Badge`, tokens `index.css` utilisés uniformément, a11y (focus-trap `SizeGuideModal`, dialogs, `aria`), SEO (`title/meta/canonical` déjà via `lib/seo.ts` + OG/JSON-LD/sitemap/robots).
- Tests : ajouter `vitest` sur `currency/filters/cart/promo` (actuellement 0 test, scripts `dev/build/lint/preview` seuls).
- Contrat backend-ready : `catalogApi/shopApi` exposent déjà `ApiPlpResponse/ApiPdpResponse` ; figer leurs signatures pour que le futur backend n'impose aucun changement aux pages/composants.
- Done : site 100 % fonctionnel en local sur mocks, `build+lint+test` verts, docs à jour.

## 5. Ordre d'exécution recommandé

1. Sprint A (nettoyage) — obligatoire en premier.
2. Sprint B (catalogue/PDP).
3. Sprint C (panier/checkout simulé).
4. Sprint D (compte/support/légal).
5. Sprint E (qualité/gel mock).
6. Plus tard (hors scope actuel) : backend réel + vrai auth + vrai PSP — branchement derrière `catalogApi/shopApi` sans toucher aux pages.

## 6. Definition of Done (chaque sprint)

- `pnpm run build` vert + `pnpm run lint` sans erreur nouvelle.
- Routes impactées testées manuellement.
- Aucune donnée en dur hors `src/data/` (mock) et `src/shared/data/` (constantes UI).
- Aucun composant dupliqué ; commentaires en français ; docs mises à jour si structure change.
