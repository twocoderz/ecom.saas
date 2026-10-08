# ecom.saas — Objectif, état, reste à faire + prérequis maintenabilité

> Date : 2026-10-08 — Stratégie validée : **mono-boutique fonctionnelle à 100 % sur mocks centralisés, sans backend pour l'instant. Backend branché ensuite.**
> Sprint A : **terminé le 2026-10-08** — `pnpm run build` vert, `tsc -b` vert, `eslint src` 0 erreur (2 warnings pré-existants sur `useProducts`/`useProductDetail`).
> Sprint B : **terminé le 2026-10-08** — `pnpm run build` vert, `tsc -b` vert, `eslint src` 0 erreur. Décision produit : **pagination conservée** (pas d'infinite scroll — URLs partageables, a11y, pas de backend).
> Sprint C : **terminé le 2026-10-08** — `pnpm run build` vert, `tsc -b` vert, `eslint src` 0 erreur. Harnais Node : 17/17 assertions (totaux, franco, validations, `CMD-1003` → séquence persistée).
> Sprint D : **terminé le 2026-10-08** — `pnpm run build` vert, `tsc -b` vert, `eslint src` 0 erreur. Harnais Node : 14/14 assertions (suivi + filtre e-mail, CRUD adresses/paiements, défaut auto). Audit : 0 stub restant dans `src/pages`.
> Sprint E : **terminé le 2026-10-08** — `pnpm run build` vert, `tsc -b` vert, `pnpm run lint` (src) 0 erreur, `pnpm test` 26/26 (vitest). Contrat backend figé : `docs/API_CONTRACT.md`.

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
| Search                          | 95 % alignée                        | `SearchResultsPage` = wrapper `PlpListing slug="search-results"`. `?q` sync URL via `useFilters` → `catalogApi` (recherche nom/marque/categorie/collection/activite). Pagination `page/per_page` dans l'URL conservée (décision Sprint B : pas d'infinite) |
| Brand                           | 90 % alignée                         | `BrandPage` lit `:slug`, résout le nom via `brands` et rend `<PlpListing slug>` (filtre natif `getPlpBySlug` + logos `public/images/brand/`)                                                                                                  |
| PDP Produit                     | 95 % UI mock                       | `selectedColorName` affiché (`ProductInfoPanel`), `fulfillment` persisté (`localStorage ecom-default-shop-fulfillment`) + mémorisé dans `CartLine`, avis persistés local (`useReviewStore ecom-default-shop-reviews`, note+texte, note/count blendés), textes livraison/retours/conseil tailles + tableaux guide des tailles en `shared/data/pdp.ts`, `PaymentMethods` sélectionnable (`selected/onSelect`, logos `public/images/payments/` déjà présents). Images curées par catégorie+genre (pool laptop/sofa/huile banni, `base.png` rig minage supprimé du fallback). Reste : vrais packshots sneakers à fournir (aucun dans le dépôt) |
| Panier                          | 95 % local simulé                  | `CartSummary` complet : sous-total (quantités) + promo `applyPromo` + livraison simulée (standard 2500/franco 100k, express 5000, retrait gratuit) + TVA 18 % + total, via `computeOrderTotals` (`lib/checkout.ts`). Méthodes et copies en `shared/data/checkout.ts` |
| Checkout                        | 95 % simulé                        | `CheckoutStepper` actif (`aria-current`, retours cliquables). 4 étapes réelles : Information (validée, e-mail pré-rempli si connecté) → Livraison (3 méthodes) → Paiement (Mixx/Flooz/Visa/Cash simulé, champs conditionnels validés) → Confirmation (n° `CMD-1003…` réel + récap + CTAs). `RequireCart` garde le tunnel panier vide. `createMockOrder()` dans `shopApi` (séquentiel, `pending`, persisté `localStorage`, rejouable après refresh). Formulaires persistés (`ecom-default-shop-checkout`). Seul code promo encore valide : `BUNDLE10` (les autres ont expiré — moteur d'expiry OK) |
| Auth / Compte                   | 90 %                               | `RequireAuth` actif sur `/account/*`. Dashboard hub réel (raccourcis + compteurs + dernière commande + déconnexion, `AccountPageSpecifics` supprimé). `Orders/OrderDetail` câblés à `getMockOrders/getMockOrderById` (seeds + commandes checkout) via `OrderDetailView` partagée (aussi utilisée par la Confirmation). `Addresses` CRUD local (`ecom-default-shop-addresses`, défaut auto), `PaymentMethods` CRUD local masqué (`ecom-default-shop-payments`, jamais de n° complet). Mot de passe oublié fonctionnel (simulé). Wishlist sans limite (Sprint B) |
| Support / Légal / Système       | 95 % rédigé                        | Support réel piloté par `shared/data/support.ts` : `OrderTracking` (n° + e-mail → `getMockOrderById`, filtre e-mail, timeline de statut), FAQ 6 entrées, Contact (canaux + formulaire validé simulé), Livraison & retours alignés checkout. Légal rédigé et substantiel (`shared/data/legal.ts` + gabarit `LegalPage`) : CGU/CGV (7 sections), confidentialité (5), mentions (4), accessibilité (3), plan du site réel (catégories/marques/collections + statique). Système : `404/500/maintenance` nues (`SystemLayout`) avec CTA retour/réessai |
| Admin                           | 90 % démo lecture seule            | Commandes mock (`CMD-1001/1002` + créées via `getMockOrders`). `STATUS_LABELS` + `statusLabel` centralisés (`admin/orderStatus.ts`). `findPromoByCode` corrigé. `DataTable` avec tri au clic + pagination + état vide. `RequireAdmin` contournable client (connu, mock — vrai auth au branchement backend) |
| Data / Types / SEO              | Contrat mock gelé, site prêt       | Cf. `docs/API_CONTRACT.md` (8 fonctions figées, moteurs purs testés). SEO : `title/meta/canonical` + OG dynamiques + JSON-LD `Product` (PDP) via `lib/seo.ts`, `robots.txt` + `sitemap.xml` statiques. Tests : `vitest` (`pnpm test`), 26 tests sur `currency/filters/checkout/catalogApi`. Design system tranché : primitifs morts `Button/Input/Badge` **supprimés** (0 usage), tokens `danger/surface/navy/mist` ajoutés à `index.css` (0 hex en dur restant). a11y : `useFocusTrap` + `SizeGuideModal` piégée/labelisée. Seul hex restant : AUCUN dans `src`. Reste connu : packshots sneakers à fournir |

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

### Sprint B — Catalogue + PDP finis (mock) — ✅ TERMINÉ 2026-10-08

- Search déjà alignée (Sprint A) + vérifiée : `?q` sync URL → `catalogApi`, pagination `page/per_page` dans l'URL. **Décision produit : pagination conservée**, pas d'infinite scroll (URLs partageables, a11y, pas de backend).
- Brand déjà filtrée par slug (Sprint A).
- PDP : `selectedColorName` affiché (`ProductInfoPanel`), `fulfillment` persisté en `localStorage` + mémorisé dans `CartLine` (PDP + sticky bar), avis persistés local (`stores/useReviewStore.ts`, clé `ecom-default-shop-reviews`, note 1–5 + texte, note/count moyens blendés avec le socle mock), textes livraison/retours/conseil tailles + tableaux du guide des tailles centralisés dans `shared/data/pdp.ts` (`ProductDetailPage`, `FulfillmentSelector`, `SizeGuideModal` câblés), `PaymentMethods` sélectionnable (`selected/onSelect`, prêt Sprint C).
- Images : pool historique banni (0 référence laptop/sofa/huile/rig dans `src`), fallback `base.png` remplacé, listes curées `APPAREL/KIDS/LIFESTYLE/BAG` (`data/mock/assets.ts`), assignation déterministe par catégorie+genre + alt enrichis (`relations.ts`), fallbacks collections corrigés (`homeMerchandising.ts`).
- Done : Category/Collection/Search/Brand partagent `PlpListing`, filtre prix FCFA utile, genres cohérents, PDP complète sur mocks.
- Reste connu : **vrais packshots sneakers à fournir** (aucun dans `public/images` — les chaussures réutilisent les visuels mode les plus proches, ex `mensjeans.png` qui montre des sneakers).

### Sprint C — Panier + Checkout simulé (bloqueur n°1, sans PSP réel) — ✅ TERMINÉ 2026-10-08

- `CartSummary` : sous-total + promo (`applyPromo`) + port/taxes simulés + total via `computeOrderTotals` (`src/lib/checkout.ts`), constantes en `src/shared/data/checkout.ts`. Mode `cart` (CTA) / `checkout` (récap seul + mention simulé).
- `CheckoutStepper` actif : étape courante `aria-current`, étapes terminées cliquables, suivantes désactivées.
- Formulaires Information/Shipping/Payment validés en ligne (`validateInformation`/`validatePayment`), persistés en `localStorage` (`stores/useCheckoutStore.ts`), navigation inter-étapes, `RequireCart` (panier vide → `/cart`) sur les 3 premières étapes.
- `createMockOrder()` dans `shopApi` : n° séquentiel `CMD-1003…`, statut `pending`, lignes + totaux + client + livraison + paiement, persisté (`ecom-default-shop-orders`), `clear()` panier, Confirmation avec n° réel + récap + CTAs (accueil/suivi/commandes), rejouable après refresh via `lastOrderId`.
- Paiement : `Mixx/Flooz/Visa/Cash` simulé (zéro appel réseau, mention explicite), `PaymentMethods` sélectionnable (`selected/onSelect`, `cash` ajouté), logos déjà dans `public/images/payments/`.
- Vérifié : harnais Node 17/17 (totaux 113361 F sur exemple 100k+BUNDLE10, franco 100k, retrait gratuit, 7 erreurs info, règles par moyen, séquence persistée `CMD-1003`→`CMD-1004`).
- Done : tunnel complet cliquable PDP → Confirmation avec commande mock persistée.
- Reste connu : les commandes créées remontent déjà dans `getMockOrders()` (câblage Compte/Admin → Sprint D).

### Sprint D — Compte + Support + Légal + Système (bloqueur n°2) — ✅ TERMINÉ 2026-10-08

- Compte : `Orders/OrderDetail` câblés aux commandes mock (seeds + créées) via `OrderDetailView` partagée (`shared/components/account/`, aussi utilisée par la Confirmation — dédupliquée). Dashboard hub réel (compteurs + dernière commande). `Addresses` CRUD + `PaymentMethods` CRUD masqué (stores persistés `ecom-default-shop-addresses/-payments`, défaut auto). Mot de passe oublié simulé. `AccountPageSpecifics` + `CheckoutPageSpecifics` orphelins supprimés.
- Support : `OrderTracking` (n° + e-mail → `getMockOrderById`, seeds sans e-mail visibles, créées filtrées, timeline 4 étapes, lien détail), FAQ 6 entrées, Contact (4 canaux + formulaire validé), Livraison & retours alignés checkout — contenus en `shared/data/support.ts`.
- Légal : CGU/CGV, confidentialité, mentions, accessibilité rédigées et substantielles (`shared/data/legal.ts`, gabarit `LegalPage`, dates de MAJ) ; plan du site réel (catalogue dynamique + statique).
- Système : `404/500/maintenance` nues avec CTA (retour accueil/aide, réessai reload, panier conservé).
- Vérifié : harnais Node 14/14 + audit 0 stub dans `src/pages`.
- Done : aucune page stub restante, footer/support/légal cohérents.
- Reste connu : `DataTable` admin sans tri/pagination → Sprint E.

### Sprint E — Qualité + gel mock (prêt à brancher backend plus tard) — ✅ TERMINÉ 2026-10-08

- Design system **tranché** : primitifs morts `Button/Input/Badge` supprimés (0 usage constaté — adoptés nulle part, donc suppression plutôt qu'adoption forcée) + alias `PdpAddToCartPanel` retiré + blueprint `ui` à jour. Tokens `danger/surface/navy/mist` ajoutés à `index.css`, tous les hex en dur remplacés (`#d60000`, `#f5f5f5`, `#1a1f71`, `#ececec`, accent-case), façades complétées (`OrderDetailView`, `orderStatus`, `CheckoutStepId`, `PaymentMethodId`).
- a11y : `useFocusTrap` (`shared/hooks/`) — focus piégé/circulaire, focus initial, retour focus, `aria-labelledby` sur `SizeGuideModal` (Escape déjà présent).
- SEO : `applySeoToDocument` étendu (OG dynamiques `title/description/type/image` + JSON-LD `Product` avec note/compteur réels en PDP), `robots.txt` (admin/compte/checkout exclus) + `sitemap.xml` statiques dans `public/`.
- Admin : `DataTable` avec tri au clic (numérique/texte fr) + pagination + état vide, sans changer les appels existants.
- Tests : `vitest` installé (`pnpm test`, script ajouté), 4 fichiers / 26 tests verts sur `currency` (format, remises, promos), `filters` (normalisation, alias legacy, seuils FCFA), `checkout` (totaux, franco, validations), `catalogApi` (marques, non-régression genres, prix, pagination, recherche).
- Contrat backend-ready **figé** : `docs/API_CONTRACT.md` (8 signatures, types, énumérations, checklist de branchement). `pnpm run lint` restreint à `src` (le worktree `.kilo/` polluait le lint racine).
- Done : site 100 % fonctionnel en local sur mocks, `build+lint+test` verts, docs à jour.
- Reste connu (hors scope, au branchement) : vrai auth, vrai PSP, packshots sneakers — checklist dans `API_CONTRACT.md`.

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
