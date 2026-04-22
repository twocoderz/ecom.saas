import type {
  ProductActivity,
  ProductAttribute,
  ProductCollection,
  ProductGender,
  ProductImage,
  ProductPromotion,
  ProductVariant,
  Promotion,
} from "../../types";
import { MOCK_IMAGE_POOL } from "./assets";
import { products } from "./products";

export const productGenders: ProductGender[] = [
  { product_id: "prod-1001", gender_code: "men" },
  { product_id: "prod-1001", gender_code: "women" },
  { product_id: "prod-1002", gender_code: "men" },
  { product_id: "prod-1002", gender_code: "women" },
  { product_id: "prod-1003", gender_code: "women" },
  { product_id: "prod-1003", gender_code: "men" },
  { product_id: "prod-1004", gender_code: "women" },
  { product_id: "prod-1005", gender_code: "men" },
  { product_id: "prod-1005", gender_code: "women" },
  { product_id: "prod-1006", gender_code: "men" },
  { product_id: "prod-1006", gender_code: "women" },
  { product_id: "prod-1007", gender_code: "men" },
  { product_id: "prod-1008", gender_code: "unisex" },
  { product_id: "prod-1008", gender_code: "women" },
  { product_id: "prod-1009", gender_code: "men" },
  { product_id: "prod-1009", gender_code: "women" },
  { product_id: "prod-1010", gender_code: "men" },
  { product_id: "prod-1010", gender_code: "women" },
  { product_id: "prod-1011", gender_code: "men" },
  { product_id: "prod-1012", gender_code: "women" },
  { product_id: "prod-1013", gender_code: "men" },
  { product_id: "prod-1013", gender_code: "women" },
  { product_id: "prod-1014", gender_code: "kids" },
  { product_id: "prod-1015", gender_code: "unisex" },
  { product_id: "prod-1016", gender_code: "kids" },
  { product_id: "prod-1017", gender_code: "kids" },
  { product_id: "prod-1018", gender_code: "women" },
  { product_id: "prod-1019", gender_code: "unisex" },
  { product_id: "prod-1019", gender_code: "men" },
  { product_id: "prod-1020", gender_code: "women" },
];

export const productActivities: ProductActivity[] = [
  { product_id: "prod-1001", activity_id: "act-lifestyle" },
  { product_id: "prod-1001", activity_id: "act-training" },
  { product_id: "prod-1002", activity_id: "act-running" },
  { product_id: "prod-1002", activity_id: "act-gym" },
  { product_id: "prod-1003", activity_id: "act-running" },
  { product_id: "prod-1004", activity_id: "act-running" },
  { product_id: "prod-1005", activity_id: "act-lifestyle" },
  { product_id: "prod-1006", activity_id: "act-running" },
  { product_id: "prod-1007", activity_id: "act-basketball" },
  { product_id: "prod-1007", activity_id: "act-lifestyle" },
  { product_id: "prod-1008", activity_id: "act-lifestyle" },
  { product_id: "prod-1009", activity_id: "act-training" },
  { product_id: "prod-1010", activity_id: "act-lifestyle" },
  { product_id: "prod-1011", activity_id: "act-football" },
  { product_id: "prod-1011", activity_id: "act-training" },
  { product_id: "prod-1012", activity_id: "act-gym" },
  { product_id: "prod-1013", activity_id: "act-training" },
  { product_id: "prod-1014", activity_id: "act-football" },
  { product_id: "prod-1015", activity_id: "act-lifestyle" },
  { product_id: "prod-1016", activity_id: "act-lifestyle" },
  { product_id: "prod-1017", activity_id: "act-lifestyle" },
  { product_id: "prod-1018", activity_id: "act-lifestyle" },
  { product_id: "prod-1019", activity_id: "act-lifestyle" },
  { product_id: "prod-1020", activity_id: "act-running" },
];

export const productCollections: ProductCollection[] = [
  { product_id: "prod-1001", collection_id: "col-air-max" },
  { product_id: "prod-1002", collection_id: "col-summer-running" },
  { product_id: "prod-1003", collection_id: "col-summer-running" },
  { product_id: "prod-1004", collection_id: "col-summer-running" },
  { product_id: "prod-1005", collection_id: "col-street-core" },
  { product_id: "prod-1006", collection_id: "col-summer-running" },
  { product_id: "prod-1007", collection_id: "col-retro-court" },
  { product_id: "prod-1008", collection_id: "col-street-core" },
  { product_id: "prod-1009", collection_id: "col-tech-fleece" },
  { product_id: "prod-1010", collection_id: "col-essentials" },
  { product_id: "prod-1011", collection_id: "col-essentials" },
  { product_id: "prod-1012", collection_id: "col-essentials" },
  { product_id: "prod-1013", collection_id: "col-essentials" },
  { product_id: "prod-1014", collection_id: "col-essentials" },
  { product_id: "prod-1015", collection_id: "col-street-core" },
  { product_id: "prod-1016", collection_id: "col-air-max" },
  { product_id: "prod-1017", collection_id: "col-retro-court" },
  { product_id: "prod-1018", collection_id: "col-street-core" },
  { product_id: "prod-1019", collection_id: "col-retro-court" },
  { product_id: "prod-1020", collection_id: "col-summer-running" },
];

type AttributeSeed = {
  color: string;
  material: string;
  style: string;
  fit: string;
  technology: string;
};

const attributeSeeds: Record<string, AttributeSeed> = {
  "prod-1001": {
    color: "black",
    material: "mesh",
    style: "lifestyle",
    fit: "regular",
    technology: "air-max",
  },
  "prod-1002": {
    color: "blue",
    material: "engineered-mesh",
    style: "running",
    fit: "regular",
    technology: "reactx",
  },
  "prod-1003": {
    color: "white",
    material: "primeknit",
    style: "running",
    fit: "regular",
    technology: "boost",
  },
  "prod-1004": {
    color: "grey",
    material: "mesh",
    style: "running",
    fit: "regular",
    technology: "nitro",
  },
  "prod-1005": {
    color: "silver",
    material: "synthetic",
    style: "retro",
    fit: "regular",
    technology: "abzorb",
  },
  "prod-1006": {
    color: "black",
    material: "mesh",
    style: "running",
    fit: "stability",
    technology: "gel",
  },
  "prod-1007": {
    color: "red",
    material: "leather",
    style: "court",
    fit: "regular",
    technology: "zoom-air",
  },
  "prod-1008": {
    color: "beige",
    material: "canvas",
    style: "street",
    fit: "regular",
    technology: "platform",
  },
  "prod-1009": {
    color: "black",
    material: "fleece",
    style: "sportswear",
    fit: "slim",
    technology: "tech-fleece",
  },
  "prod-1010": {
    color: "white",
    material: "cotton",
    style: "casual",
    fit: "regular",
    technology: "essentials",
  },
  "prod-1011": {
    color: "navy",
    material: "polyester",
    style: "training",
    fit: "regular",
    technology: "drycell",
  },
  "prod-1012": {
    color: "grey",
    material: "fleece",
    style: "training",
    fit: "tapered",
    technology: "coldgear",
  },
  "prod-1013": {
    color: "black",
    material: "polyester",
    style: "training",
    fit: "regular",
    technology: "dri-fit",
  },
  "prod-1014": {
    color: "blue",
    material: "polyester",
    style: "football",
    fit: "regular",
    technology: "aeroready",
  },
  "prod-1015": {
    color: "black",
    material: "nylon",
    style: "lifestyle",
    fit: "one-size",
    technology: "water-repellent",
  },
  "prod-1016": {
    color: "white",
    material: "leather",
    style: "lifestyle",
    fit: "kids",
    technology: "air-max",
  },
  "prod-1017": {
    color: "green",
    material: "suede",
    style: "retro",
    fit: "kids",
    technology: "classic",
  },
  "prod-1018": {
    color: "cream",
    material: "leather",
    style: "lifestyle",
    fit: "women",
    technology: "platform",
  },
  "prod-1019": {
    color: "silver",
    material: "mesh",
    style: "retro",
    fit: "regular",
    technology: "abzorb",
  },
  "prod-1020": {
    color: "purple",
    material: "mesh",
    style: "running",
    fit: "regular",
    technology: "ff-blast",
  },
};

export const productAttributes: ProductAttribute[] = Object.entries(
  attributeSeeds,
).flatMap(([productId, seed]) => [
  { product_id: productId, attribute_id: "attr-color", value: seed.color },
  {
    product_id: productId,
    attribute_id: "attr-material",
    value: seed.material,
  },
  { product_id: productId, attribute_id: "attr-style", value: seed.style },
  { product_id: productId, attribute_id: "attr-fit", value: seed.fit },
  {
    product_id: productId,
    attribute_id: "attr-technology",
    value: seed.technology,
  },
]);

type VariantBlueprint = {
  product_id: string;
  sizes: string[];
  colors: string[];
};

const variantBlueprints: VariantBlueprint[] = [
  {
    product_id: "prod-1001",
    sizes: ["40", "41", "42", "43"],
    colors: ["black", "silver"],
  },
  {
    product_id: "prod-1002",
    sizes: ["40", "41", "42", "43"],
    colors: ["blue", "black"],
  },
  {
    product_id: "prod-1003",
    sizes: ["38", "39", "40", "41"],
    colors: ["white", "black"],
  },
  {
    product_id: "prod-1004",
    sizes: ["37", "38", "39", "40"],
    colors: ["grey", "pink"],
  },
  {
    product_id: "prod-1005",
    sizes: ["40", "41", "42", "43"],
    colors: ["silver", "black"],
  },
  {
    product_id: "prod-1006",
    sizes: ["40", "41", "42", "43"],
    colors: ["black", "lime"],
  },
  {
    product_id: "prod-1007",
    sizes: ["40", "41", "42", "43"],
    colors: ["red", "white"],
  },
  {
    product_id: "prod-1008",
    sizes: ["39", "40", "41", "42"],
    colors: ["beige", "black"],
  },
  {
    product_id: "prod-1009",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "grey"],
  },
  {
    product_id: "prod-1010",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black"],
  },
  {
    product_id: "prod-1011",
    sizes: ["S", "M", "L", "XL"],
    colors: ["navy", "black"],
  },
  {
    product_id: "prod-1012",
    sizes: ["XS", "S", "M", "L"],
    colors: ["grey", "black"],
  },
  {
    product_id: "prod-1013",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "olive"],
  },
  {
    product_id: "prod-1014",
    sizes: ["XS", "S", "M", "L"],
    colors: ["blue", "black"],
  },
  { product_id: "prod-1015", sizes: ["ONE"], colors: ["black", "red"] },
  {
    product_id: "prod-1016",
    sizes: ["30", "31", "32", "33"],
    colors: ["white", "black"],
  },
  {
    product_id: "prod-1017",
    sizes: ["30", "31", "32", "33"],
    colors: ["green", "pink"],
  },
  {
    product_id: "prod-1018",
    sizes: ["36", "37", "38", "39"],
    colors: ["cream", "black"],
  },
  {
    product_id: "prod-1019",
    sizes: ["39", "40", "41", "42"],
    colors: ["silver", "white"],
  },
  {
    product_id: "prod-1020",
    sizes: ["37", "38", "39", "40"],
    colors: ["purple", "black"],
  },
];

function toVariantId(productId: string, color: string, size: string): string {
  return `var-${productId}-${color}-${size}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");
}

export const productVariants: ProductVariant[] = variantBlueprints.flatMap(
  (blueprint, productIndex) =>
    blueprint.colors.flatMap((color, colorIndex) =>
      blueprint.sizes.map((size, sizeIndex) => ({
        id: toVariantId(blueprint.product_id, color, size),
        product_id: blueprint.product_id,
        size,
        color,
        stock: Math.max(
          0,
          25 - colorIndex * 5 - sizeIndex * 2 + (productIndex % 3),
        ),
        sku_variant: `${blueprint.product_id.toUpperCase()}-${color.toUpperCase()}-${size}`,
      })),
    ),
);

export const promotions: Promotion[] = [
  {
    id: "promo-spring-20",
    code: "SPRING20",
    name: "Spring Running 20%",
    description: "Remise de 20% sur une selection running.",
    discount_type: "percentage",
    discount_value: 20,
    starts_at: "2026-03-01T00:00:00.000Z",
    ends_at: "2026-06-01T00:00:00.000Z",
    is_active: true,
  },
  {
    id: "promo-airmax-15",
    code: "AIRDROP15",
    name: "Air Max Drop",
    description: "Remise dediee a la collection Air Max.",
    discount_type: "percentage",
    discount_value: 15,
    starts_at: "2026-04-01T00:00:00.000Z",
    ends_at: "2026-05-31T00:00:00.000Z",
    is_active: true,
  },
  {
    id: "promo-bundle-10",
    code: "BUNDLE10",
    name: "Bundle Essentials",
    description: "Reduction fixe de 10$ sur produits essentials.",
    discount_type: "fixed",
    discount_value: 10,
    starts_at: "2026-01-01T00:00:00.000Z",
    ends_at: "2026-12-31T00:00:00.000Z",
    is_active: true,
  },
  {
    id: "promo-kids-15",
    code: "KIDS15",
    name: "Kids Season",
    description: "Selection kids en remise saisonniere.",
    discount_type: "percentage",
    discount_value: 15,
    starts_at: "2026-02-15T00:00:00.000Z",
    ends_at: "2026-08-30T00:00:00.000Z",
    is_active: true,
  },
  {
    id: "promo-clearance-25",
    code: "CLEAR25",
    name: "Clearance Final",
    description: "Dernieres tailles a prix reduits.",
    discount_type: "percentage",
    discount_value: 25,
    starts_at: "2026-04-01T00:00:00.000Z",
    ends_at: "2026-04-30T00:00:00.000Z",
    is_active: true,
  },
];

export const productPromotions: ProductPromotion[] = [
  { product_id: "prod-1001", promotion_id: "promo-airmax-15" },
  { product_id: "prod-1002", promotion_id: "promo-spring-20" },
  { product_id: "prod-1003", promotion_id: "promo-spring-20" },
  { product_id: "prod-1004", promotion_id: "promo-spring-20" },
  { product_id: "prod-1009", promotion_id: "promo-bundle-10" },
  { product_id: "prod-1010", promotion_id: "promo-bundle-10" },
  { product_id: "prod-1014", promotion_id: "promo-kids-15" },
  { product_id: "prod-1016", promotion_id: "promo-kids-15" },
  { product_id: "prod-1018", promotion_id: "promo-clearance-25" },
  { product_id: "prod-1020", promotion_id: "promo-clearance-25" },
];

export const productImages: ProductImage[] = (() => {
  const productOrder = products.map((product) => product.id);
  const productIndexById = new Map(
    productOrder.map((productId, index) => [productId, index]),
  );

  const sortCounters = new Map<string, number>();

  return productVariants.flatMap((variant, variantIndex) => {
    const productIndex = productIndexById.get(variant.product_id) ?? 0;
    const startIndex =
      (productIndex * 3 + variantIndex) % MOCK_IMAGE_POOL.length;

    const nextSortOrder = (sortCounters.get(variant.product_id) ?? 0) + 1;
    sortCounters.set(variant.product_id, nextSortOrder + 1);

    const firstImage: ProductImage = {
      id: `img-${variant.id}-1`,
      product_id: variant.product_id,
      variant_id: variant.id,
      url: MOCK_IMAGE_POOL[startIndex % MOCK_IMAGE_POOL.length],
      alt: `${variant.product_id} ${variant.color} ${variant.size}`,
      is_main: nextSortOrder === 1,
      sort_order: nextSortOrder,
    };

    const secondImage: ProductImage = {
      id: `img-${variant.id}-2`,
      product_id: variant.product_id,
      variant_id: variant.id,
      url: MOCK_IMAGE_POOL[(startIndex + 1) % MOCK_IMAGE_POOL.length],
      alt: `${variant.product_id} detail ${variant.color} ${variant.size}`,
      is_main: false,
      sort_order: nextSortOrder + 1,
    };

    return [firstImage, secondImage];
  });
})();

export const productRatings: Record<string, number> = {
  "prod-1001": 4.8,
  "prod-1002": 4.6,
  "prod-1003": 4.7,
  "prod-1004": 4.4,
  "prod-1005": 4.5,
  "prod-1006": 4.7,
  "prod-1007": 4.4,
  "prod-1008": 4.2,
  "prod-1009": 4.5,
  "prod-1010": 4.3,
  "prod-1011": 4.1,
  "prod-1012": 4.4,
  "prod-1013": 4.2,
  "prod-1014": 4.1,
  "prod-1015": 4.0,
  "prod-1016": 4.6,
  "prod-1017": 4.3,
  "prod-1018": 4.2,
  "prod-1019": 4.5,
  "prod-1020": 4.7,
};
