import type { ApiPdpResponse, SeoUrl } from "../types";

/**
 * Construit un objet SEO reutilisable pour la page active.
 */
export function createSeoUrl(input: {
  type: "plp" | "pdp";
  slug: string;
  path: string;
  title: string;
  description: string;
}): SeoUrl {
  return {
    type: input.type,
    slug: input.slug,
    path: input.path,
    canonical: input.path,
    meta_title: input.title,
    meta_description: input.description,
  };
}

/**
 * Applique les balises SEO dans le document sans imposer une lib externe.
 * Titre + description + canonical + Open Graph. JSON-LD optionnel
 * (produit en PDP) pour le referencement riche.
 */
export function applySeoToDocument(
  seo: SeoUrl,
  extra?: { ogImage?: string; jsonLd?: Record<string, unknown> },
): void {
  if (typeof document === "undefined") {
    return;
  }

  document.title = seo.meta_title;

  setMeta("description", seo.meta_description);
  setMeta("og:title", seo.meta_title, "property");
  setMeta("og:description", seo.meta_description, "property");
  setMeta("og:type", seo.type === "pdp" ? "product" : "website", "property");
  if (extra?.ogImage) {
    setMeta("og:image", extra.ogImage, "property");
  }

  let canonicalTag = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonicalTag) {
    canonicalTag = document.createElement("link");
    canonicalTag.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute("href", seo.canonical);

  const previousJsonLd = document.querySelector(
    'script[data-seo-jsonld="true"]',
  );
  previousJsonLd?.remove();
  if (extra?.jsonLd) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoJsonld = "true";
    script.textContent = JSON.stringify(extra.jsonLd);
    document.head.appendChild(script);
  }
}

function setMeta(
  name: string,
  content: string,
  attr: "name" | "property" = "name",
): void {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Donnees structurees Schema.org d'une fiche produit (offre XOF).
 * Note et compteur fournis par l'appelant (socle mock + avis locaux).
 */
export function pdpJsonLd(
  detail: ApiPdpResponse,
  rating: number,
  reviewCount: number,
): Record<string, unknown> {
  const mainImage = detail.images.find((image) => image.is_main) ?? detail.images[0];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${detail.brand.name} ${detail.product.name}`,
    sku: detail.product.sku,
    brand: { "@type": "Brand", name: detail.brand.name },
    category: detail.category.name,
    description: detail.product.description,
    ...(mainImage ? { image: [mainImage.url] } : {}),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(rating.toFixed(1)),
      reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "XOF",
      price: detail.product.sale_price ?? detail.product.price,
      availability: "https://schema.org/InStock",
    },
  };
}
