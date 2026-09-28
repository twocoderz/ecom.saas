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
  { code: "men", name: "Homme", slug: "men" },
  { code: "women", name: "Femme", slug: "women" },
  { code: "kids", name: "Enfant", slug: "kids" },
  { code: "unisex", name: "Mixte", slug: "unisex" },
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
  { id: "cat-shoes", name: "Chaussures", slug: "shoes", parent_id: null },
  { id: "cat-clothing", name: "Vêtements", slug: "clothing", parent_id: null },
  {
    id: "cat-accessories",
    name: "Accessoires",
    slug: "accessories",
    parent_id: null,
  },
  {
    id: "cat-running-shoes",
    name: "Chaussures running",
    slug: "running-shoes",
    parent_id: "cat-shoes",
  },
  {
    id: "cat-lifestyle-shoes",
    name: "Sneakers lifestyle",
    slug: "lifestyle-shoes",
    parent_id: "cat-shoes",
  },
  {
    id: "cat-tshirts",
    name: "T-shirts",
    slug: "t-shirts",
    parent_id: "cat-clothing",
  },
  {
    id: "cat-hoodies",
    name: "Sweats à capuche",
    slug: "hoodies",
    parent_id: "cat-clothing",
  },
  {
    id: "cat-tracksuits",
    name: "Survêtements",
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
    name: "Sacs",
    slug: "bags",
    parent_id: "cat-accessories",
  },
];

export const activities: Activity[] = [
  { id: "act-running", name: "Course", slug: "running" },
  { id: "act-training", name: "Entraînement", slug: "training" },
  { id: "act-lifestyle", name: "Lifestyle", slug: "lifestyle" },
  { id: "act-football", name: "Football", slug: "football" },
  { id: "act-basketball", name: "Basket-ball", slug: "basketball" },
  { id: "act-gym", name: "Fitness", slug: "gym" },
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
    description: "Sélection molleton premium pour la ville et l'entraînement léger.",
    is_trending: true,
  },
  {
    id: "col-essentials",
    name: "Essentiels",
    slug: "essentials",
    description: "Basiques de saison faciles à porter.",
    is_trending: false,
  },
  {
    id: "col-summer-running",
    name: "Running d'été",
    slug: "summer-running",
    description: "Matériaux respirants et coloris été pour la course.",
    is_trending: true,
  },
  {
    id: "col-retro-court",
    name: "Rétro basket",
    slug: "retro-court",
    description: "Rétro basket et héritage sportstyle.",
    is_trending: false,
  },
  {
    id: "col-street-core",
    name: "Esprit street",
    slug: "street-core",
    description: "Capsule urbaine décontractée pour un usage quotidien.",
    is_trending: true,
  },
  {
    id: "col-athletic-performance",
    name: "Performance athlétique",
    slug: "athletic-performance",
    description: "Équipement haute performance pour athlètes et passionnés d'entraînement.",
    is_trending: true,
  },
  {
    id: "col-vintage-heritage",
    name: "Héritage vintage",
    slug: "vintage-heritage",
    description: "Classiques intemporels et designs rétro inspirés de l'héritage de la marque.",
    is_trending: true,
  },
  {
    id: "col-eco-friendly",
    name: "Éco-responsable",
    slug: "eco-friendly",
    description: "Matériaux durables et designs éco-conçus.",
    is_trending: false,
  },
  {
    id: "col-urban-streetwear",
    name: "Streetwear urbain",
    slug: "urban-streetwear",
    description: "Mode street audacieuse pour un style urbain moderne.",
    is_trending: true,
  },
  {
    id: "col-winter-training",
    name: "Entraînement hiver",
    slug: "winter-training",
    description: "Équipement chaud et résistant pour s'entraîner par temps froid.",
    is_trending: false,
  },
  {
    id: "col-casual-streetwear",
    name: "Street décontracté",
    slug: "casual-streetwear",
    description: "Tenues décontractées et stylées pour le quotidien urbain.",
    is_trending: true,
  },
];

export const attributes: Attribute[] = [
  { id: "attr-color", name: "Couleur", slug: "color", value_type: "color" },
  {
    id: "attr-material",
    name: "Matière",
    slug: "material",
    value_type: "text",
  },
  { id: "attr-style", name: "Style", slug: "style", value_type: "select" },
  { id: "attr-fit", name: "Coupe", slug: "fit", value_type: "select" },
  {
    id: "attr-technology",
    name: "Technologie",
    slug: "technology",
    value_type: "text",
  },
];
