import type { Product } from "../types";

function toSlugPart(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Genere un slug descriptif proche du pattern JD: gender-brand-name.
 */
export function generateProductDescriptiveSlug(input: {
  gender: string;
  brand: string;
  name: string;
  color?: string;
}): string {
  const parts = [input.gender, input.brand, input.name, input.color]
    .filter(Boolean)
    .map((part) => toSlugPart(part as string))
    .filter(Boolean);

  return parts.join("-");
}

/**
 * Genere un slug de base stable pour stockage produit.
 */
export function generateProductBaseSlug(
  product: Pick<Product, "name">,
): string {
  return toSlugPart(product.name);
}

/**
 * Compose l'URL PDP canonique avec slug + ID, conforme au cahier des charges.
 */
export function buildPdpPath(
  descriptiveSlug: string,
  productId: string,
): string {
  return `/pdp/${descriptiveSlug}/${productId}`;
}

/**
 * Compose l'URL PLP canonique pour un slug de vue (categorie/marque/collection/activite).
 */
export function buildPlpPath(slug: string): string {
  return `/plp/${toSlugPart(slug)}`;
}
