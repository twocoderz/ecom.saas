You are an expert senior full-stack e-commerce architect. I am building a modern e-commerce web app that must replicate the exact content organization and data model of JD Sports[](https://www.jdsports.com/).

I am currently working ONLY on the frontend. I want the entire data structure, types, folder architecture, and mock data to be perfectly prepared so that when I add the backend later (Node.js / NestJS or Laravel), I will have ZERO refactoring.

Follow the JD Sports philosophy exactly:
- Flat taxonomy (NO deep nested categories like /men/shoes/nike/airmax).
- A product has ONE main category but can belong to MULTIPLE genders, activities, collections, brands, etc. via pivot relationships.
- All listing pages (/plp/...) are just filtered views on the same products.
- Product Detail Pages use descriptive SEO-friendly slugs (/pdp/...).

### STEP 1: DATABASE REFERENCE (use this as the source of truth)
Create the following TypeScript types that mirror this exact database schema:

- genders (code, name, slug)
- brands (name, slug, logo)
- categories (name, slug, parent_id optional for light hierarchy)
- activities (sport/usage)
- collections (seasonal or collab)
- attributes (color, material, style, etc. - EAV style)
- products (brand_id, category_id, gender_id principal, sku, name, description, price, sale_price)
- product_genders (pivot)
- product_activities (pivot)
- product_collections (pivot)
- product_attributes (pivot with value)
- product_variants (size, color, stock, sku_variant)
- product_images (url, is_main, sort_order)
- promotions

Also create:
- SeoUrl (for plp and pdp generation)
- Full API response shapes for:
  - GET /plp/{slug}?filters=...
  - GET /pdp/{slug}

### STEP 2: PROJECT STRUCTURE
Generate the complete folder structure for the frontend with these folders:
- src/types/ (all database + API types)
- src/lib/ (utils, slug generator, filter helpers)
- src/data/ (mock data in JSON/TS that respects the exact model above)
- src/components/catalog/ (ProductCard, FiltersSidebar, ProductGrid, SortSelect, etc.)
- src/components/product/ (ProductGallery, VariantSelector, AddToBag, etc.)
- src/app/ (Next.js app router routes: /plp/[slug], /pdp/[slug], etc.)
- src/hooks/ (useProducts, useFilters, useProductDetail)

### STEP 3: URL STRUCTURE (exactly like JD Sports)
- Listing pages: /plp/{category-or-brand-or-collection} (ex: /plp/mens-shoes, /plp/nike, /plp/air-max, /plp/running)
- Filters are passed as URL query params (gender=men&brand=nike&color=black&activity=running)
- Product pages: /pdp/{descriptive-slug}/{product-id} (ex: /pdp/mens-nike-air-max-97-black/prod12345)
- Slug generation function must be provided (gender-brand-name cleaned)

### STEP 4: MOCK DATA
Create rich, realistic mock data (at least 20 products) that uses ALL the relationships above. Include:
- Multiple genders per product when needed
- Multiple activities
- Variants with real stock
- Multiple images per variant
- Promotions applied to some products
- Trending collections

### STEP 5: FRONTEND IMPLEMENTATION REQUIREMENTS
- All components must be fully typed with the types you created.
- Filters must be URL-driven (Next.js useSearchParams + useRouter) so that sharing a filtered link works perfectly.
- Product listing page must support infinite scroll or pagination.
- Product card must show price, sale price, brand, main image, quick add to bag.
- PDP must have image gallery, variant selector (size + color), stock info, description, attributes display.
- SEO: generate meta title/description dynamically from the SeoUrl logic.
- State management: use Zustand or just URL params for filters (no heavy Redux).
- Performance: all data fetching simulated with mock data but structured exactly as future API calls will be.

### STEP 6: BEST PRACTICES (do not skip any)
- Use strict TypeScript (no any).
- Make everything extensible (easy to add new attributes later).
- Separate concerns: data models, UI components, business logic.
- Add comments everywhere explaining why it matches JD Sports model.
- Provide a small README.md section explaining how to switch from mock to real API later.

Start by creating the full types in src/types/index.ts, then the folder structure, then the mock data, then the main components and pages.

Do it step by step, but deliver the complete architecture in one go. Be extremely detailed and leave NOTHING to chance.