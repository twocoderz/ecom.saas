# Contrat d'API backend-ready (gel mock — Sprint E)

> Date : 2026-10-08. La boutique tourne à 100 % sur mocks centralisés.
> Ce document fige les signatures que le futur backend devra honorer :
> **aucune page ni composant ne devra changer** au branchement — seules les
> implémentations sous `src/data/api/` seront remplacées par des appels réseau.

## Règles de gel

1. Les pages/composants n'importent que `src/data/` (façade), `src/lib/`,
   `src/stores/` et `src/shared/` — jamais d'URL réseau en dur.
2. Toute fonction ci-dessous garde **nom, paramètres et type de retour**.
   Le backend peut ajouter des champs optionnels, jamais en retirer ni en
   renommer.
3. `shopId = "default-shop"` est déjà propagé (`Product`, `Promotion`,
   `MockOrder`, `CartLine`, `LocalReview`) : le backend multi-tenant
   réutilisera ce champ.
4. Devise unique `XOF`, montants entiers en FCFA.

## Catalogue — `src/data/api/catalogApi.ts`

| Signature | Retour | Futur endpoint |
| --- | --- | --- |
| `getPlpBySlug(slug: string, rawQuery?: PlpFiltersQuery, shopId?: string)` | `ApiPlpResponse` | `GET /plp/{slug}?{query}` |
| `getPdpBySlug({ descriptiveSlug, productId })` | `ApiPdpResponse \| null` | `GET /pdp/{slug}/{id}` |
| `getDefaultPlpCards(limit?: number)` | `PlpProductCard[]` | `GET /plp/top-picks?limit=` |
| `getPlpCardsByIds(ids: string[])` | `PlpProductCard[]` | `GET /products?ids=` (wishlist) |

Types réponses : `ApiPlpResponse` (`seo`, `slug`, `filters`, `facets`, `items`,
`pagination`) et `ApiPdpResponse` (`product`, `brand`, `category`,
`principal_gender`, `genders`, `activities`, `collections`, `attributes`,
`variants`, `images`, `promotions`, `related_products`) — voir
`src/types/index.ts`.

Valeurs énumérées figées : `PlpSortOption`
(`relevance|newest|top-rated|price-low-high|price-high-low`), `PriceRange`
(`all|under-30k|30-120k|120-300k|300k-plus`, alias legacy `$` convertis côté
`lib/filters.ts`), `MockOrderStatus`
(`pending|paid|shipped|delivered|cancelled`).

## Boutique — `src/data/api/shopApi.ts`

| Signature | Retour | Futur endpoint |
| --- | --- | --- |
| `findPromoByCode(code: string)` | `Promotion \| null` | `GET /promos?code=` |
| `getMockOrders(shopId?: string)` | `MockOrder[]` | `GET /orders` |
| `getMockOrderById(orderId: string, shopId?: string)` | `MockOrder \| null` | `GET /orders/{id}` |
| `createMockOrder(input: CreateMockOrderInput, shopId?: string)` | `MockOrder` | `POST /orders` |

`CreateMockOrderInput` : lignes (`productId`, `name`, `image`, `unitPrice`,
`qty`), totaux (`subtotal`, `discount`, `discountCode`, `shippingFee`,
`shippingMethodId`, `taxes`, `total`), client (`customerName`, `email`,
`phone`, `addressLine`, `city`, `country`), `paymentMethod`.

## Moteurs purs (couverts par tests, `vitest`)

- `src/lib/currency.ts` : `formatPrice` (fr-FR + FCFA), `effectivePrice`,
  `discountInfo`, `applyPromo` (%, fixe plafonné, périodes).
- `src/lib/filters.ts` : `normalizeFilters`,
  `parsePlpFiltersFromSearchParams`, `toSearchParams`, `toggleFilterValue`,
  `applyPriceRange` (seuils FCFA).
- `src/lib/checkout.ts` : `computeOrderTotals` (remise + port + TVA 18 %),
  `validateInformation`, `validatePayment`.

## Checklists de branchement (plus tard, hors scope)

- Remplacer le corps des 8 fonctions par `fetch` (mêmes signatures).
- Vrai auth (remplacer `useAuthStore.signIn` mock + `RequireAuth/Admin`).
- Vrai PSP derrière `PaymentMethods` (`selected/onSelect` déjà prêts).
- Packshots sneakers réels (le pool curé `assets.ts` reste l'interface).
