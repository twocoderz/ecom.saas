import {
  BRAND_LOGO_FALLBACK,
  brands,
  categories,
  collections,
  productById,
  productCollections,
  productImages,
  products,
} from "../../../data";
import { buildPlpPath } from "../../../lib/slug";
import { buildPdpPath, generateProductDescriptiveSlug } from "../../../lib";

const BRAND_LOGO_BY_SLUG: Record<string, string> = {
  nike: "/images/brand/nikee.png",
};

const COLLECTION_IMAGES: Record<string, string> = {
  "col-athletic-performance": "/images/pumatshirt1.png",
  "col-vintage-heritage": "/images/mensjeans.png",
  "col-eco-friendly": "/images/dove_body_lotion.png",
  "col-urban-streetwear": "/images/womentop 1.png",
  "col-winter-training": "/images/wardrobe1.jpg",
  "col-casual-streetwear": "/images/shirt.png",
};

const BRAND_LOGO_FILES = new Set([
  "adidas.png",
  "jordan.png",
  "new-balance.png",
  "nikee.png",
  "prada.png",
  "louis-vuitton.png",
  "sonneti.svg",
]);

function resolveBrandLogoPath(slug: string): string | null {
  const explicit = BRAND_LOGO_BY_SLUG[slug];
  if (explicit) {
    return explicit;
  }

  const pngName = `${slug}.png`;
  if (BRAND_LOGO_FILES.has(pngName)) {
    return `/images/brand/${pngName}`;
  }

  const svgName = `${slug}.svg`;
  if (BRAND_LOGO_FILES.has(svgName)) {
    return `/images/brand/${svgName}`;
  }

  return null;
}

export type HomeTrendingCollectionCard = {
  id: string;
  name: string;
  to: string;
  imageSrc: string;
  imageAlt: string;
};

export type HomeBrandCard = {
  id: string;
  name: string;
  to: string;
  logoSrc: string;
  logoAlt: string;
};

export type HomeTrendingOutfitItem = {
  productId: string;
  name: string;
  price: number;
  salePrice: number | null;
  imageSrc: string;
  imageAlt: string;
  pdpPath: string;
  slot: TrendingOutfitSlot;
};

export type HomeTrendingOutfitCard = {
  id: string;
  brandName: string;
  to: string;
  items: HomeTrendingOutfitItem[];
};

export type TrendingOutfitSlot =
  | "hero"
  | "topRight"
  | "center"
  | "bottomLeft"
  | "bottomRight";

const OUTFIT_SLOTS: TrendingOutfitSlot[] = [
  "hero",
  "topRight",
  "center",
  "bottomLeft",
  "bottomRight",
];

export function getShortcutCategories() {
  return categories.filter((category) => category.parent_id != null);
}

export function getTrendingCollectionCards(): HomeTrendingCollectionCard[] {
  return collections
    .filter((collection) => collection.is_trending)
    .map((collection) => {
      const relation = productCollections.find(
        (item) => item.collection_id === collection.id,
      );
      const images = relation
        ? productImages
            .filter((image) => image.product_id === relation.product_id)
            .sort((left, right) => left.sort_order - right.sort_order)
        : [];
      const mainImage = images.find((image) => image.is_main) ?? images[0];

      return {
        id: collection.id,
        name: collection.name,
        to: buildPlpPath(collection.slug),
        imageSrc: mainImage?.url ?? COLLECTION_IMAGES[collection.id] ?? BRAND_LOGO_FALLBACK,
        imageAlt: mainImage?.alt ?? `Collection ${collection.name}`,
      };
    });
}

export function getBrandCards(): HomeBrandCard[] {
  return brands.reduce<HomeBrandCard[]>((acc, brand) => {
    const logoSrc = resolveBrandLogoPath(brand.slug);

    if (!logoSrc) {
      return acc;
    }

    acc.push({
      id: brand.id,
      name: brand.name,
      to: buildPlpPath(brand.slug),
      logoSrc,
      logoAlt: `Logo ${brand.name}`,
    });

    return acc;
  }, []);
}

export function getTrendingOutfitCards(): HomeTrendingOutfitCard[] {
  const imageMap = productImages.reduce<Map<string, typeof productImages>>(
    (acc, image) => {
      const current = acc.get(image.product_id) ?? [];
      current.push(image);
      acc.set(image.product_id, current);
      return acc;
    },
    new Map(),
  );

  imageMap.forEach((images) => {
    images.sort((left, right) => {
      if (left.sort_order === right.sort_order) {
        return left.id.localeCompare(right.id);
      }

      return left.sort_order - right.sort_order;
    });
  });

  return brands
    .map((brand) => {
      const brandProducts = products
        .filter((product) => product.brand_id === brand.id)
        .sort((left, right) => left.name.localeCompare(right.name))
        .slice(0, OUTFIT_SLOTS.length);

      const items = brandProducts.map((product, index) => {
        const productRecord = productById.get(product.id) ?? product;
        const images = imageMap.get(product.id) ?? [];
        const mainImage = images.find((image) => image.is_main) ?? images[0];
        const imageSrc = mainImage?.url ?? BRAND_LOGO_FALLBACK;
        const imageAlt = mainImage?.alt ?? product.name;

        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          salePrice: product.sale_price,
          imageSrc,
          imageAlt,
          pdpPath: buildPdpPath(
            generateProductDescriptiveSlug({
              gender: productRecord.gender_id,
              brand: brand.name,
              name: product.name,
            }),
            product.id,
          ),
          slot: OUTFIT_SLOTS[index],
        };
      });

      return {
        id: `outfit-${brand.id}`,
        brandName: brand.name,
        to: buildPlpPath(brand.slug),
        items,
      };
    })
    .filter((card) => card.items.length > 0);
}
