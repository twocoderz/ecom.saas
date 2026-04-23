import {
  BRAND_LOGO_FALLBACK,
  brands,
  categories,
  collections,
  productCollections,
  productImages,
} from "../../../data";
import { buildPlpPath } from "../../../lib/slug";

const BRAND_LOGO_BY_SLUG: Record<string, string> = {
  nike: "/images/brand/nikee.png",
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
        imageSrc: mainImage?.url ?? BRAND_LOGO_FALLBACK,
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
