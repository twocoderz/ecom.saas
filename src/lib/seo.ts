import type { SeoUrl } from "../types";

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
 */
export function applySeoToDocument(seo: SeoUrl): void {
  if (typeof document === "undefined") {
    return;
  }

  document.title = seo.meta_title;

  let descriptionTag = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );
  if (!descriptionTag) {
    descriptionTag = document.createElement("meta");
    descriptionTag.setAttribute("name", "description");
    document.head.appendChild(descriptionTag);
  }
  descriptionTag.setAttribute("content", seo.meta_description);

  let canonicalTag = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonicalTag) {
    canonicalTag = document.createElement("link");
    canonicalTag.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute("href", seo.canonical);
}
