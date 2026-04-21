export type EntityId = string;

export type Gender = {
  code: string;
  name: string;
  slug: string;
};

export type Brand = {
  id: EntityId;
  name: string;
  slug: string;
  logo: string;
};

export type Category = {
  id: EntityId;
  name: string;
  slug: string;
  parent_id?: EntityId | null;
};

export type Activity = {
  id: EntityId;
  name: string;
  slug: string;
};

export type Collection = {
  id: EntityId;
  name: string;
  slug: string;
  description: string;
  is_trending: boolean;
};

export type AttributeValueType = "text" | "color" | "number" | "select";

export type Attribute = {
  id: EntityId;
  name: string;
  slug: string;
  value_type: AttributeValueType;
};

export type Product = {
  id: EntityId;
  brand_id: EntityId;
  category_id: EntityId;
  gender_id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  currency: "USD";
};

export type ProductGender = {
  product_id: EntityId;
  gender_code: string;
};

export type ProductActivity = {
  product_id: EntityId;
  activity_id: EntityId;
};

export type ProductCollection = {
  product_id: EntityId;
  collection_id: EntityId;
};

export type ProductAttribute = {
  product_id: EntityId;
  attribute_id: EntityId;
  value: string;
};

export type ProductVariant = {
  id: EntityId;
  product_id: EntityId;
  size: string;
  color: string;
  stock: number;
  sku_variant: string;
};

export type ProductImage = {
  id: EntityId;
  product_id: EntityId;
  variant_id?: EntityId | null;
  url: string;
  alt: string;
  is_main: boolean;
  sort_order: number;
};

export type PromotionDiscountType = "percentage" | "fixed";

export type Promotion = {
  id: EntityId;
  code: string;
  name: string;
  description: string;
  discount_type: PromotionDiscountType;
  discount_value: number;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
};

export type ProductPromotion = {
  product_id: EntityId;
  promotion_id: EntityId;
};

export type SeoUrl = {
  type: "plp" | "pdp";
  slug: string;
  path: string;
  canonical: string;
  meta_title: string;
  meta_description: string;
};

export type PlpSortOption =
  | "relevance"
  | "newest"
  | "top-rated"
  | "price-low-high"
  | "price-high-low";

export type PriceRange = "all" | "under-50" | "50-200" | "200-500" | "500-plus";

export type PlpFiltersQuery = {
  q?: string;
  gender?: string[];
  brand?: string[];
  category?: string[];
  activity?: string[];
  collection?: string[];
  color?: string[];
  price_range?: PriceRange;
  sort?: PlpSortOption;
  page?: number;
  per_page?: number;
};

export type PlpFacetValue = {
  value: string;
  count: number;
};

export type PlpFacetBlock = {
  key: "gender" | "brand" | "category" | "activity" | "collection" | "color";
  label: string;
  values: PlpFacetValue[];
};

export type PlpProductCard = {
  id: EntityId;
  slug: string;
  name: string;
  brand: string;
  principal_gender: string;
  category: string;
  price: number;
  sale_price: number | null;
  rating: number;
  main_image: string;
  has_stock: boolean;
};

export type PaginationMeta = {
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
};

export type ApiPlpResponse = {
  seo: SeoUrl;
  slug: string;
  filters: Required<
    Pick<
      PlpFiltersQuery,
      "gender" | "brand" | "category" | "activity" | "collection" | "color"
    >
  > & {
    price_range: PriceRange;
    sort: PlpSortOption;
    q: string;
  };
  facets: PlpFacetBlock[];
  items: PlpProductCard[];
  pagination: PaginationMeta;
};

export type AttributeMap = Record<string, string[]>;

export type ApiPdpResponse = {
  seo: SeoUrl;
  product: Product;
  brand: Brand;
  category: Category;
  principal_gender: Gender;
  genders: Gender[];
  activities: Activity[];
  collections: Collection[];
  attributes: AttributeMap;
  variants: ProductVariant[];
  images: ProductImage[];
  promotions: Promotion[];
  related_products: PlpProductCard[];
};
