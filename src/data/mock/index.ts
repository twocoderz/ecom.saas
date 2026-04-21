import {
  activities,
  attributes,
  brands,
  categories,
  collections,
  genders,
} from "./entities";
import { products } from "./products";
import {
  productActivities,
  productAttributes,
  productCollections,
  productGenders,
  productImages,
  productPromotions,
  productRatings,
  productVariants,
  promotions,
} from "./relations";

export {
  activities,
  attributes,
  brands,
  categories,
  collections,
  genders,
  productActivities,
  productAttributes,
  productCollections,
  productGenders,
  productImages,
  productPromotions,
  productRatings,
  productVariants,
  products,
  promotions,
};

export const brandById = new Map(brands.map((brand) => [brand.id, brand]));
export const categoryById = new Map(
  categories.map((category) => [category.id, category]),
);
export const genderByCode = new Map(
  genders.map((gender) => [gender.code, gender]),
);
export const activityById = new Map(
  activities.map((activity) => [activity.id, activity]),
);
export const collectionById = new Map(
  collections.map((collection) => [collection.id, collection]),
);
export const attributeById = new Map(
  attributes.map((attribute) => [attribute.id, attribute]),
);
export const productById = new Map(
  products.map((product) => [product.id, product]),
);
export const promotionById = new Map(
  promotions.map((promotion) => [promotion.id, promotion]),
);
