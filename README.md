## Ecommerce sass website for shops

### Architecture catalogue (JD-like)

- `src/types/index.ts`: source de verite du modele relationnel frontend
  - entites: genders, brands, categories, activities, collections, attributes, products, variants, images, promotions
  - pivots: product_genders, product_activities, product_collections, product_attributes, product_promotions
  - shapes API: `ApiPlpResponse`, `ApiPdpResponse`, `SeoUrl`
- `src/data/mock/*`: donnees mock riches qui respectent la structure relationnelle
- `src/data/api/catalogApi.ts`: couche service qui simule `GET /plp/{slug}` et `GET /pdp/{slug}/{id}`
- `src/hooks/useFilters.ts`: filtres URL-driven (`useSearchParams`) pour liens partageables
- `src/hooks/useProducts.ts` et `src/hooks/useProductDetail.ts`: consommation typed des reponses PLP/PDP

### URL structure en place

- PLP: `/plp/:slug` (ex: `/plp/mens-shoes`, `/plp/nike`, `/plp/air-max`, `/plp/running`)
- PDP: `/pdp/:descriptiveSlug/:productId`
- Compat legacy temporaire:
  - `/c/:department/:category`
  - `/p/:productSlug`

### Migration mock -> API reelle (sans refactor UI)

1. Conserver les types dans `src/types/index.ts` comme contrat commun frontend/backend.
2. Remplacer le contenu de `src/data/api/catalogApi.ts` par des appels HTTP reels, sans changer les hooks/pages.
3. Mapper les endpoints backend vers les memes retours:
   - `GET /plp/{slug}?gender=&brand=&category=&activity=&collection=&color=&price=&sort=&page=&per_page=`
   - `GET /pdp/{descriptiveSlug}/{productId}`
4. Garder les hooks inchanges:
   - `useProducts` attend `ApiPlpResponse`
   - `useProductDetail` attend `ApiPdpResponse`
5. Supprimer progressivement `src/data/mock/*` une fois l'API backend validee.

### Notes de qualite

- Les filtres sont URL-driven (share/back/forward).
- La pagination est geree via query params (`page`, `per_page`).
- Les styles existants ne sont pas modifies dans les fichiers CSS globaux.
