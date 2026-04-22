import { applyPriceRange, normalizeFilters } from "../../lib/filters";
import {
  buildPdpPath,
  buildPlpPath,
  generateProductDescriptiveSlug,
} from "../../lib/slug";
import { createSeoUrl } from "../../lib/seo";
import type {
  ApiPdpResponse,
  ApiPlpResponse,
  PlpFacetBlock,
  PlpFiltersQuery,
  PlpProductCard,
  PlpSortOption,
  PriceRange,
  Product,
  ProductAttribute,
  ProductImage,
  ProductVariant,
} from "../../types";
import {
  activities,
  activityById,
  attributeById,
  brandById,
  brands,
  categories,
  categoryById,
  collectionById,
  collections,
  genderByCode,
  productActivities,
  productAttributes,
  productById,
  productCollections,
  productGenders,
  productImages,
  productPromotions,
  productRatings,
  productVariants,
  products,
  promotionById,
} from "../mock";
import { BRAND_LOGO_FALLBACK } from "../mock/assets";

const CATEGORY_SLUGS = new Set(categories.map((category) => category.slug));
const BRAND_SLUGS = new Set(brands.map((brand) => brand.slug));
const COLLECTION_SLUGS = new Set(
  collections.map((collection) => collection.slug),
);
const ACTIVITY_SLUGS = new Set(activities.map((activity) => activity.slug));

const productGenderCodes = buildSetIndex(
  productGenders,
  "product_id",
  "gender_code",
);
const productActivityIds = buildSetIndex(
  productActivities,
  "product_id",
  "activity_id",
);
const productCollectionIds = buildSetIndex(
  productCollections,
  "product_id",
  "collection_id",
);
const productVariantMap = buildArrayIndex(productVariants, "product_id");
const productImageMap = buildArrayIndex(
  productImages,
  "product_id",
  (left, right) => {
    if (left.sort_order === right.sort_order) {
      return left.id.localeCompare(right.id);
    }

    return left.sort_order - right.sort_order;
  },
);
const productPromotionIds = buildSetIndex(
  productPromotions,
  "product_id",
  "promotion_id",
);

const productAttributeMap = productAttributes.reduce<
  Map<string, ProductAttribute[]>
>((acc, relation) => {
  const current = acc.get(relation.product_id) ?? [];
  current.push(relation);
  acc.set(relation.product_id, current);
  return acc;
}, new Map());

const GENDER_ALIASES: Record<string, string> = {
  men: "men",
  mens: "men",
  women: "women",
  womens: "women",
  kids: "kids",
  unisex: "unisex",
};

function buildSetIndex<T extends Record<string, unknown>>(
  rows: T[],
  groupKey: keyof T,
  valueKey: keyof T,
): Map<string, Set<string>> {
  return rows.reduce<Map<string, Set<string>>>((acc, row) => {
    const groupValue = String(row[groupKey]);
    const value = String(row[valueKey]);
    const current = acc.get(groupValue) ?? new Set<string>();
    current.add(value);
    acc.set(groupValue, current);
    return acc;
  }, new Map());
}

function buildArrayIndex<T extends Record<string, unknown>>(
  rows: T[],
  groupKey: keyof T,
  sorter?: (left: T, right: T) => number,
): Map<string, T[]> {
  const grouped = rows.reduce<Map<string, T[]>>((acc, row) => {
    const groupValue = String(row[groupKey]);
    const current = acc.get(groupValue) ?? [];
    current.push(row);
    acc.set(groupValue, current);
    return acc;
  }, new Map());

  if (!sorter) {
    return grouped;
  }

  grouped.forEach((value) => value.sort(sorter));
  return grouped;
}

function getEffectivePrice(product: Product): number {
  return product.sale_price ?? product.price;
}

function getMainImage(productId: string): string {
  const images = productImageMap.get(productId) ?? [];
  const mainImage = images.find((image) => image.is_main) ?? images[0];
  return mainImage?.url ?? BRAND_LOGO_FALLBACK;
}

function productToCard(product: Product): PlpProductCard {
  const brand = brandById.get(product.brand_id);
  const category = categoryById.get(product.category_id);
  const principalGender = genderByCode.get(product.gender_id);
  const variants = productVariantMap.get(product.id) ?? [];

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: brand?.name ?? "Unknown",
    principal_gender: principalGender?.slug ?? "unisex",
    category: category?.slug ?? "unknown",
    price: product.price,
    sale_price: product.sale_price,
    rating: productRatings[product.id] ?? 4,
    main_image: getMainImage(product.id),
    has_stock: variants.some((variant) => variant.stock > 0),
  };
}

function matchesAny(selected: string[], available: string[]): boolean {
  if (selected.length === 0) {
    return true;
  }

  return selected.some((item) => available.includes(item));
}

function toCategorySlugCandidates(raw: string): string[] {
  const normalized = raw.toLowerCase();

  if (CATEGORY_SLUGS.has(normalized)) {
    return [normalized];
  }

  if (normalized.endsWith("s") && CATEGORY_SLUGS.has(normalized.slice(0, -1))) {
    return [normalized, normalized.slice(0, -1)];
  }

  const singular = `${normalized}-shoes`;
  if (CATEGORY_SLUGS.has(singular)) {
    return [normalized, singular];
  }

  return [normalized];
}

function resolveSeedProductIds(slug: string): Set<string> {
  const normalizedSlug = slug.trim().toLowerCase();

  if (
    !normalizedSlug ||
    normalizedSlug === "all" ||
    normalizedSlug === "search-results"
  ) {
    return new Set(products.map((product) => product.id));
  }

  if (CATEGORY_SLUGS.has(normalizedSlug)) {
    return new Set(
      products
        .filter(
          (product) =>
            categoryById.get(product.category_id)?.slug === normalizedSlug,
        )
        .map((product) => product.id),
    );
  }

  if (BRAND_SLUGS.has(normalizedSlug)) {
    return new Set(
      products
        .filter(
          (product) => brandById.get(product.brand_id)?.slug === normalizedSlug,
        )
        .map((product) => product.id),
    );
  }

  if (COLLECTION_SLUGS.has(normalizedSlug)) {
    const collection = collections.find(
      (candidate) => candidate.slug === normalizedSlug,
    );
    if (!collection) {
      return new Set();
    }

    return new Set(
      productCollections
        .filter((relation) => relation.collection_id === collection.id)
        .map((relation) => relation.product_id),
    );
  }

  if (ACTIVITY_SLUGS.has(normalizedSlug)) {
    const activity = activities.find(
      (candidate) => candidate.slug === normalizedSlug,
    );
    if (!activity) {
      return new Set();
    }

    return new Set(
      productActivities
        .filter((relation) => relation.activity_id === activity.id)
        .map((relation) => relation.product_id),
    );
  }

  const [firstToken, ...restTokens] = normalizedSlug.split("-");
  const genderCode = GENDER_ALIASES[firstToken];
  if (genderCode && restTokens.length > 0) {
    const categoryCandidate = restTokens.join("-");
    const categoryCandidates = toCategorySlugCandidates(categoryCandidate);

    return new Set(
      products
        .filter((product) => {
          const categorySlug =
            categoryById.get(product.category_id)?.slug ?? "";
          const hasCategory = categoryCandidates.includes(categorySlug);
          const hasGender =
            productGenderCodes.get(product.id)?.has(genderCode) ?? false;
          return hasCategory && hasGender;
        })
        .map((product) => product.id),
    );
  }

  return new Set(products.map((product) => product.id));
}

function buildFacetValues(
  values: string[],
): Array<{ value: string; count: number }> {
  const counts = values.reduce<Map<string, number>>((acc, value) => {
    const current = acc.get(value) ?? 0;
    acc.set(value, current + 1);
    return acc;
  }, new Map());

  return Array.from(counts.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([value, count]) => ({ value, count }));
}

function sortProducts(items: Product[], sort: PlpSortOption): Product[] {
  const sorted = [...items];

  if (sort === "newest") {
    sorted.sort((left, right) => right.id.localeCompare(left.id));
    return sorted;
  }

  if (sort === "top-rated") {
    sorted.sort(
      (left, right) =>
        (productRatings[right.id] ?? 0) - (productRatings[left.id] ?? 0),
    );
    return sorted;
  }

  if (sort === "price-low-high") {
    sorted.sort(
      (left, right) => getEffectivePrice(left) - getEffectivePrice(right),
    );
    return sorted;
  }

  if (sort === "price-high-low") {
    sorted.sort(
      (left, right) => getEffectivePrice(right) - getEffectivePrice(left),
    );
    return sorted;
  }

  return sorted;
}

function buildFacets(filteredProducts: Product[]): PlpFacetBlock[] {
  const gendersForFacet = filteredProducts.flatMap((product) =>
    Array.from(productGenderCodes.get(product.id) ?? []).map(
      (genderCode) => genderByCode.get(genderCode)?.slug ?? genderCode,
    ),
  );

  const brandsForFacet = filteredProducts.map(
    (product) => brandById.get(product.brand_id)?.slug ?? "unknown",
  );

  const categoriesForFacet = filteredProducts.map(
    (product) => categoryById.get(product.category_id)?.slug ?? "unknown",
  );

  const activitiesForFacet = filteredProducts.flatMap((product) =>
    Array.from(productActivityIds.get(product.id) ?? []).map(
      (activityId) => activityById.get(activityId)?.slug ?? activityId,
    ),
  );

  const collectionsForFacet = filteredProducts.flatMap((product) =>
    Array.from(productCollectionIds.get(product.id) ?? []).map(
      (collectionId) => collectionById.get(collectionId)?.slug ?? collectionId,
    ),
  );

  const colorsForFacet = filteredProducts.flatMap((product) => {
    const attributeRows = productAttributeMap.get(product.id) ?? [];
    return attributeRows
      .filter((row) => row.attribute_id === "attr-color")
      .map((row) => row.value.toLowerCase());
  });

  return [
    {
      key: "gender",
      label: "Gender",
      values: buildFacetValues(gendersForFacet),
    },
    { key: "brand", label: "Brand", values: buildFacetValues(brandsForFacet) },
    {
      key: "category",
      label: "Category",
      values: buildFacetValues(categoriesForFacet),
    },
    {
      key: "activity",
      label: "Activity",
      values: buildFacetValues(activitiesForFacet),
    },
    {
      key: "collection",
      label: "Collection",
      values: buildFacetValues(collectionsForFacet),
    },
    { key: "color", label: "Color", values: buildFacetValues(colorsForFacet) },
  ];
}

function getAttributeMap(productId: string): Record<string, string[]> {
  const rows = productAttributeMap.get(productId) ?? [];
  const map = rows.reduce<Map<string, Set<string>>>((acc, row) => {
    const attribute = attributeById.get(row.attribute_id);
    if (!attribute) {
      return acc;
    }

    const values = acc.get(attribute.slug) ?? new Set<string>();
    values.add(row.value);
    acc.set(attribute.slug, values);
    return acc;
  }, new Map());

  return Array.from(map.entries()).reduce<Record<string, string[]>>(
    (acc, [key, values]) => {
      acc[key] = Array.from(values);
      return acc;
    },
    {},
  );
}

function getProductsByIds(productIds: Set<string>): Product[] {
  return Array.from(productIds)
    .map((productId) => productById.get(productId))
    .filter((product): product is Product => Boolean(product));
}

function applyFilters(
  seedProducts: Product[],
  query: Required<PlpFiltersQuery>,
): Product[] {
  return seedProducts.filter((product) => {
    const productBrandSlug = brandById.get(product.brand_id)?.slug ?? "";
    const productCategorySlug =
      categoryById.get(product.category_id)?.slug ?? "";

    const productGenderSlugs = Array.from(
      productGenderCodes.get(product.id) ?? [],
    ).map((genderCode) => genderByCode.get(genderCode)?.slug ?? genderCode);

    const productActivitySlugs = Array.from(
      productActivityIds.get(product.id) ?? [],
    ).map((activityId) => activityById.get(activityId)?.slug ?? activityId);

    const productCollectionSlugs = Array.from(
      productCollectionIds.get(product.id) ?? [],
    ).map(
      (collectionId) => collectionById.get(collectionId)?.slug ?? collectionId,
    );

    const productColorValues = (productAttributeMap.get(product.id) ?? [])
      .filter((row) => row.attribute_id === "attr-color")
      .map((row) => row.value.toLowerCase());

    const searchable = [
      product.name.toLowerCase(),
      productBrandSlug,
      productCategorySlug,
      ...productCollectionSlugs,
      ...productActivitySlugs,
    ];

    const hasQuery = query.q
      ? searchable.some((segment) => segment.includes(query.q.toLowerCase()))
      : true;

    return (
      hasQuery &&
      matchesAny(query.gender, productGenderSlugs) &&
      matchesAny(query.brand, [productBrandSlug]) &&
      matchesAny(query.category, [productCategorySlug]) &&
      matchesAny(query.activity, productActivitySlugs) &&
      matchesAny(query.collection, productCollectionSlugs) &&
      matchesAny(query.color, productColorValues) &&
      applyPriceRange(
        getEffectivePrice(product),
        query.price_range as PriceRange,
      )
    );
  });
}

/**
 * Simule GET /plp/{slug}?filters=... avec pagination et facettes.
 */
export function getPlpBySlug(
  slug: string,
  rawQuery: PlpFiltersQuery = {},
): ApiPlpResponse {
  const query = normalizeFilters(rawQuery);
  const seedIds = resolveSeedProductIds(slug);
  const seedProducts = getProductsByIds(seedIds);
  const filteredProducts = applyFilters(seedProducts, query);
  const sortedProducts = sortProducts(filteredProducts, query.sort);

  const start = (query.page - 1) * query.per_page;
  const end = start + query.per_page;
  const paginatedItems = sortedProducts.slice(start, end).map(productToCard);

  const totalItems = sortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / query.per_page));

  const seo = createSeoUrl({
    type: "plp",
    slug,
    path: buildPlpPath(slug),
    title: `${slug.replace(/-/g, " ")} | JD-style Listing`,
    description: `Decouvrez ${totalItems} produits pour ${slug.replace(/-/g, " ")} avec filtres partageables.`,
  });

  return {
    seo,
    slug,
    filters: query,
    facets: buildFacets(filteredProducts),
    items: paginatedItems,
    pagination: {
      page: query.page,
      per_page: query.per_page,
      total_items: totalItems,
      total_pages: totalPages,
      has_next: query.page < totalPages,
      has_previous: query.page > 1,
    },
  };
}

/**
 * Simule GET /pdp/{slug} en resolvant le produit via id + slug descriptif.
 */
export function getPdpBySlug(input: {
  descriptiveSlug: string;
  productId: string;
}): ApiPdpResponse | null {
  const product = productById.get(input.productId);
  if (!product) {
    return null;
  }

  const brand = brandById.get(product.brand_id);
  const category = categoryById.get(product.category_id);
  const principalGender = genderByCode.get(product.gender_id);

  if (!brand || !category || !principalGender) {
    return null;
  }

  const attributeMap = getAttributeMap(product.id);
  const color = attributeMap.color?.[0];

  const expectedSlug = generateProductDescriptiveSlug({
    gender: principalGender.slug,
    brand: brand.slug,
    name: product.name,
    color,
  });

  const descriptiveSlug = input.descriptiveSlug || expectedSlug;

  const relatedProducts = products
    .filter(
      (candidate) =>
        candidate.category_id === product.category_id &&
        candidate.id !== product.id,
    )
    .slice(0, 4)
    .map(productToCard);

  const pdpGenders = Array.from(productGenderCodes.get(product.id) ?? [])
    .map((genderCode) => genderByCode.get(genderCode))
    .filter((gender): gender is NonNullable<typeof gender> => Boolean(gender));

  const pdpActivities = Array.from(productActivityIds.get(product.id) ?? [])
    .map((activityId) => activityById.get(activityId))
    .filter((activity): activity is NonNullable<typeof activity> =>
      Boolean(activity),
    );

  const pdpCollections = Array.from(productCollectionIds.get(product.id) ?? [])
    .map((collectionId) => collectionById.get(collectionId))
    .filter((collection): collection is NonNullable<typeof collection> =>
      Boolean(collection),
    );

  const pdpVariants: ProductVariant[] = (
    productVariantMap.get(product.id) ?? []
  ).sort((left, right) => {
    if (left.color === right.color) {
      return left.size.localeCompare(right.size);
    }

    return left.color.localeCompare(right.color);
  });

  const pdpImages: ProductImage[] = [
    ...(productImageMap.get(product.id) ?? []),
  ];

  const pdpPromotions = Array.from(productPromotionIds.get(product.id) ?? [])
    .map((promotionId) => promotionById.get(promotionId))
    .filter((promotion): promotion is NonNullable<typeof promotion> =>
      Boolean(promotion),
    );

  const seo = createSeoUrl({
    type: "pdp",
    slug: descriptiveSlug,
    path: buildPdpPath(descriptiveSlug, product.id),
    title: `${brand.name} ${product.name} | JD-style PDP`,
    description: `${product.name} - ${category.name}. Prix ${getEffectivePrice(product)} USD.`,
  });

  return {
    seo,
    product,
    brand,
    category,
    principal_gender: principalGender,
    genders: pdpGenders,
    activities: pdpActivities,
    collections: pdpCollections,
    attributes: attributeMap,
    variants: pdpVariants,
    images: pdpImages,
    promotions: pdpPromotions,
    related_products: relatedProducts,
  };
}

export function getDefaultPlpCards(limit = 12): PlpProductCard[] {
  return products.slice(0, limit).map(productToCard);
}
