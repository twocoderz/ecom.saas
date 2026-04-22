import type {
  Activity,
  Attribute,
  Brand,
  Category,
  Collection,
  Gender,
} from "../../types";
import { BRAND_LOGO_FALLBACK } from "./assets";

/**
 * Entites de reference du catalogue, alignees sur un modele relationnel type JD.
 */
export const genders: Gender[] = [
  { code: "men", name: "Men", slug: "men" },
  { code: "women", name: "Women", slug: "women" },
  { code: "kids", name: "Kids", slug: "kids" },
  { code: "unisex", name: "Unisex", slug: "unisex" },
];

export const brands: Brand[] = [
  { id: "br-nike", name: "Nike", slug: "nike", logo: BRAND_LOGO_FALLBACK },
  {
    id: "br-adidas",
    name: "adidas",
    slug: "adidas",
    logo: BRAND_LOGO_FALLBACK,
  },
  { id: "br-puma", name: "Puma", slug: "puma", logo: BRAND_LOGO_FALLBACK },
  {
    id: "br-jordan",
    name: "Jordan",
    slug: "jordan",
    logo: BRAND_LOGO_FALLBACK,
  },
  {
    id: "br-new-balance",
    name: "New Balance",
    slug: "new-balance",
    logo: BRAND_LOGO_FALLBACK,
  },
  { id: "br-asics", name: "ASICS", slug: "asics", logo: BRAND_LOGO_FALLBACK },
  {
    id: "br-under-armour",
    name: "Under Armour",
    slug: "under-armour",
    logo: BRAND_LOGO_FALLBACK,
  },
  {
    id: "br-converse",
    name: "Converse",
    slug: "converse",
    logo: BRAND_LOGO_FALLBACK,
  },
];

export const categories: Category[] = [
  { id: "cat-shoes", name: "Shoes", slug: "shoes", parent_id: null },
  { id: "cat-clothing", name: "Clothing", slug: "clothing", parent_id: null },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    parent_id: null,
  },
  {
    id: "cat-running-shoes",
    name: "Running Shoes",
    slug: "running-shoes",
    parent_id: "cat-shoes",
  },
  {
    id: "cat-lifestyle-shoes",
    name: "Lifestyle Shoes",
    slug: "lifestyle-shoes",
    parent_id: "cat-shoes",
  },
  {
    id: "cat-tshirts",
    name: "T-Shirts",
    slug: "t-shirts",
    parent_id: "cat-clothing",
  },
  {
    id: "cat-hoodies",
    name: "Hoodies",
    slug: "hoodies",
    parent_id: "cat-clothing",
  },
  {
    id: "cat-tracksuits",
    name: "Tracksuits",
    slug: "tracksuits",
    parent_id: "cat-clothing",
  },
  {
    id: "cat-shorts",
    name: "Shorts",
    slug: "shorts",
    parent_id: "cat-clothing",
  },
  {
    id: "cat-bags",
    name: "Bags",
    slug: "bags",
    parent_id: "cat-accessories",
  },
];

export const activities: Activity[] = [
  { id: "act-running", name: "Running", slug: "running" },
  { id: "act-training", name: "Training", slug: "training" },
  { id: "act-lifestyle", name: "Lifestyle", slug: "lifestyle" },
  { id: "act-football", name: "Football", slug: "football" },
  { id: "act-basketball", name: "Basketball", slug: "basketball" },
  { id: "act-gym", name: "Gym", slug: "gym" },
];

export const collections: Collection[] = [
  {
    id: "col-air-max",
    name: "Air Max",
    slug: "air-max",
    description: "Silhouettes Air Max iconiques pour usage quotidien.",
    is_trending: true,
  },
  {
    id: "col-tech-fleece",
    name: "Tech Fleece",
    slug: "tech-fleece",
    description: "Selection layering premium pour ville et training leger.",
    is_trending: true,
  },
  {
    id: "col-essentials",
    name: "Essentials",
    slug: "essentials",
    description: "Baselines saisonnieres faciles a porter.",
    is_trending: false,
  },
  {
    id: "col-summer-running",
    name: "Summer Running",
    slug: "summer-running",
    description: "Materiaux respirants et coloris ete pour la course.",
    is_trending: true,
  },
  {
    id: "col-retro-court",
    name: "Retro Court",
    slug: "retro-court",
    description: "Retro basketball et heritage sportstyle.",
    is_trending: false,
  },
  {
    id: "col-street-core",
    name: "Street Core",
    slug: "street-core",
    description: "Capsule urbaine casual orientee silhouette quotidienne.",
    is_trending: true,
  },
];

export const attributes: Attribute[] = [
  { id: "attr-color", name: "Color", slug: "color", value_type: "color" },
  {
    id: "attr-material",
    name: "Material",
    slug: "material",
    value_type: "text",
  },
  { id: "attr-style", name: "Style", slug: "style", value_type: "select" },
  { id: "attr-fit", name: "Fit", slug: "fit", value_type: "select" },
  {
    id: "attr-technology",
    name: "Technology",
    slug: "technology",
    value_type: "text",
  },
];
