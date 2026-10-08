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
import {
  APPAREL_IMAGES,
  BAG_IMAGES,
  KIDS_APPAREL_IMAGES,
  LIFESTYLE_IMAGES,
} from "./assets";
import { products } from "./products";

const productByIdLocal = new Map(products.map((product) => [product.id, product]));

/**
 * Liste d'images curee par produit (categorie + genre).
 * Aucun packshot sneakers dans le depot : les chaussures reutilisent les
 * visuels mode les plus proches (ex : `mensjeans.png` montre des sneakers).
 */
function imageListForProduct(productId: string): readonly string[] {
  const product = productByIdLocal.get(productId);
  if (!product) return APPAREL_IMAGES;

  if (product.category_id === "cat-bags") return BAG_IMAGES;

  const isShoe =
    product.category_id === "cat-running-shoes" ||
    product.category_id === "cat-lifestyle-shoes";

  if (product.gender_id === "kids") {
    return isShoe
      ? ["/images/mensjeans.png", ...KIDS_APPAREL_IMAGES]
      : KIDS_APPAREL_IMAGES;
  }

  if (product.gender_id === "women") {
    return isShoe
      ? [
          "/images/mensjeans.png",
          "/images/womenblouse.png",
          "/images/womentop-1.png",
          LIFESTYLE_IMAGES[1],
        ]
      : [
          "/images/womenblouse.png",
          "/images/womentop-1.png",
          "/images/womenkurtha.png",
          "/images/saaree.png",
        ];
  }

  const textile = [
    "/images/pumatshirt1.png",
    "/images/pumatshirt2.png",
    "/images/shirt.png",
    "/images/mensjeans.png",
  ];
  return isShoe
    ? [
        "/images/mensjeans.png",
        "/images/pumatshirt1.png",
        "/images/shirt.png",
        LIFESTYLE_IMAGES[0],
      ]
    : textile;
}

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
    color: "noir",
    material: "maille",
    style: "lifestyle",
    fit: "standard",
    technology: "air-max",
  },
  "prod-1002": {
    color: "bleu",
    material: "maille technique",
    style: "running",
    fit: "standard",
    technology: "reactx",
  },
  "prod-1003": {
    color: "blanc",
    material: "maille tricotée",
    style: "running",
    fit: "standard",
    technology: "boost",
  },
  "prod-1004": {
    color: "gris",
    material: "maille",
    style: "running",
    fit: "standard",
    technology: "nitro",
  },
  "prod-1005": {
    color: "argent",
    material: "synthétique",
    style: "rétro",
    fit: "standard",
    technology: "abzorb",
  },
  "prod-1006": {
    color: "noir",
    material: "maille",
    style: "running",
    fit: "stabilité",
    technology: "gel",
  },
  "prod-1007": {
    color: "rouge",
    material: "cuir",
    style: "basket",
    fit: "standard",
    technology: "zoom-air",
  },
  "prod-1008": {
    color: "beige",
    material: "toile",
    style: "street",
    fit: "standard",
    technology: "platform",
  },
  "prod-1009": {
    color: "noir",
    material: "molleton",
    style: "sportswear",
    fit: "ajusté",
    technology: "tech-fleece",
  },
  "prod-1010": {
    color: "blanc",
    material: "coton",
    style: "décontracté",
    fit: "standard",
    technology: "essentials",
  },
  "prod-1011": {
    color: "marine",
    material: "polyester",
    style: "entraînement",
    fit: "standard",
    technology: "drycell",
  },
  "prod-1012": {
    color: "gris",
    material: "molleton",
    style: "entraînement",
    fit: "fuselé",
    technology: "coldgear",
  },
  "prod-1013": {
    color: "noir",
    material: "polyester",
    style: "entraînement",
    fit: "standard",
    technology: "dri-fit",
  },
  "prod-1014": {
    color: "bleu",
    material: "polyester",
    style: "football",
    fit: "standard",
    technology: "aeroready",
  },
  "prod-1015": {
    color: "noir",
    material: "nylon",
    style: "lifestyle",
    fit: "taille unique",
    technology: "water-repellent",
  },
  "prod-1016": {
    color: "blanc",
    material: "cuir",
    style: "lifestyle",
    fit: "enfant",
    technology: "air-max",
  },
  "prod-1017": {
    color: "vert",
    material: "suède",
    style: "rétro",
    fit: "enfant",
    technology: "classic",
  },
  "prod-1018": {
    color: "crème",
    material: "cuir",
    style: "lifestyle",
    fit: "femme",
    technology: "platform",
  },
  "prod-1019": {
    color: "argent",
    material: "maille",
    style: "rétro",
    fit: "standard",
    technology: "abzorb",
  },
  "prod-1020": {
    color: "violet",
    material: "maille",
    style: "running",
    fit: "standard",
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
    colors: ["noir", "argent"],
  },
  {
    product_id: "prod-1002",
    sizes: ["40", "41", "42", "43"],
    colors: ["bleu", "noir"],
  },
  {
    product_id: "prod-1003",
    sizes: ["38", "39", "40", "41"],
    colors: ["blanc", "noir"],
  },
  {
    product_id: "prod-1004",
    sizes: ["37", "38", "39", "40"],
    colors: ["gris", "rose"],
  },
  {
    product_id: "prod-1005",
    sizes: ["40", "41", "42", "43"],
    colors: ["argent", "noir"],
  },
  {
    product_id: "prod-1006",
    sizes: ["40", "41", "42", "43"],
    colors: ["noir", "citron"],
  },
  {
    product_id: "prod-1007",
    sizes: ["40", "41", "42", "43"],
    colors: ["rouge", "blanc"],
  },
  {
    product_id: "prod-1008",
    sizes: ["39", "40", "41", "42"],
    colors: ["beige", "noir"],
  },
  {
    product_id: "prod-1009",
    sizes: ["S", "M", "L", "XL"],
    colors: ["noir", "gris"],
  },
  {
    product_id: "prod-1010",
    sizes: ["S", "M", "L", "XL"],
    colors: ["blanc", "noir"],
  },
  {
    product_id: "prod-1011",
    sizes: ["S", "M", "L", "XL"],
    colors: ["marine", "noir"],
  },
  {
    product_id: "prod-1012",
    sizes: ["XS", "S", "M", "L"],
    colors: ["gris", "noir"],
  },
  {
    product_id: "prod-1013",
    sizes: ["S", "M", "L", "XL"],
    colors: ["noir", "olive"],
  },
  {
    product_id: "prod-1014",
    sizes: ["XS", "S", "M", "L"],
    colors: ["bleu", "noir"],
  },
  { product_id: "prod-1015", sizes: ["ONE"], colors: ["noir", "rouge"] },
  {
    product_id: "prod-1016",
    sizes: ["30", "31", "32", "33"],
    colors: ["blanc", "noir"],
  },
  {
    product_id: "prod-1017",
    sizes: ["30", "31", "32", "33"],
    colors: ["vert", "rose"],
  },
  {
    product_id: "prod-1018",
    sizes: ["36", "37", "38", "39"],
    colors: ["crème", "noir"],
  },
  {
    product_id: "prod-1019",
    sizes: ["39", "40", "41", "42"],
    colors: ["argent", "blanc"],
  },
  {
    product_id: "prod-1020",
    sizes: ["37", "38", "39", "40"],
    colors: ["violet", "noir"],
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
    name: "Running de printemps -20 %",
    description: "Remise de 20 % sur une sélection running.",
    discount_type: "percentage",
    discount_value: 20,
    starts_at: "2026-03-01T00:00:00.000Z",
    ends_at: "2026-06-01T00:00:00.000Z",
    is_active: true,
  },
  {
    id: "promo-airmax-15",
    code: "AIRDROP15",
    name: "Drop Air Max",
    description: "Remise dédiée à la collection Air Max.",
    discount_type: "percentage",
    discount_value: 15,
    starts_at: "2026-04-01T00:00:00.000Z",
    ends_at: "2026-05-31T00:00:00.000Z",
    is_active: true,
  },
  {
    id: "promo-bundle-10",
    code: "BUNDLE10",
    name: "Pack Essentiels",
    description: "Réduction fixe de 6 050 FCFA sur les produits essentiels.",
    discount_type: "fixed",
    discount_value: 6050,
    starts_at: "2026-01-01T00:00:00.000Z",
    ends_at: "2026-12-31T00:00:00.000Z",
    is_active: true,
  },
  {
    id: "promo-kids-15",
    code: "KIDS15",
    name: "Saison enfant",
    description: "Sélection enfant en remise saisonnière.",
    discount_type: "percentage",
    discount_value: 15,
    starts_at: "2026-02-15T00:00:00.000Z",
    ends_at: "2026-08-30T00:00:00.000Z",
    is_active: true,
  },
  {
    id: "promo-clearance-25",
    code: "CLEAR25",
    name: "Déstockage final",
    description: "Dernières tailles à prix réduits.",
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
  const sortCounters = new Map<string, number>();
  const imageCounters = new Map<string, number>();

  return productVariants.flatMap((variant) => {
    const list = imageListForProduct(variant.product_id);
    const imageIndex = imageCounters.get(variant.product_id) ?? 0;
    imageCounters.set(variant.product_id, imageIndex + 2);

    const productName =
      productByIdLocal.get(variant.product_id)?.name ?? variant.product_id;

    const nextSortOrder = (sortCounters.get(variant.product_id) ?? 0) + 1;
    sortCounters.set(variant.product_id, nextSortOrder + 1);

    const firstImage: ProductImage = {
      id: `img-${variant.id}-1`,
      product_id: variant.product_id,
      variant_id: variant.id,
      url: list[imageIndex % list.length],
      alt: `${productName} — couleur ${variant.color}, taille ${variant.size}`,
      is_main: nextSortOrder === 1,
      sort_order: nextSortOrder,
    };

    const secondImage: ProductImage = {
      id: `img-${variant.id}-2`,
      product_id: variant.product_id,
      variant_id: variant.id,
      url: list[(imageIndex + 1) % list.length],
      alt: `${productName} — détail couleur ${variant.color}, taille ${variant.size}`,
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
