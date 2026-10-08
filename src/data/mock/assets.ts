/**
 * Images mock centralisees (aucun backend).
 * Constate Sprint B : le depot ne contient aucun packshot sneakers ;
 * le pool historique (laptop/sofa/cosmetique) est banni des fiches produit.
 * En attendant de vrais visuels client, l'assignation est curée par
 * categorie + genre (voir `relations.ts`), uniquement avec des visuels
 * verifies mode/sportswear du dossier `public/images`.
 */

/** Fallback neutre allure packshot (ex-rig minage `base.png` supprime). */
export const BRAND_LOGO_FALLBACK = "/images/pumatshirt1.png";

/** Textile / packshots verifies (series puma, chemise, jeans, tops). */
export const APPAREL_IMAGES = [
  "/images/pumatshirt1.png",
  "/images/pumatshirt2.png",
  "/images/shirt.png",
  "/images/mensjeans.png",
  "/images/womenblouse.png",
  "/images/womentop-1.png",
  "/images/womenkurtha.png",
  "/images/saaree.png",
] as const;

/** Enfant : series kids verifiees par nom de fichier. */
export const KIDS_APPAREL_IMAGES = [
  "/images/kidvest1.png",
  "/images/kidvest2.png",
  "/images/kidkurtha.png",
  "/images/babycostume 1.png",
] as const;

/** Lifestyle mode (merchandising + depannage visuel, pas packshot). */
export const LIFESTYLE_IMAGES = [
  "/images/portrait-shopping-react.png",
  "/images/attractive_woman.png",
] as const;

/** Bagagerie : seule image sac du depot. */
export const BAG_IMAGES = [
  "/images/547953_9C2ST_8746_001_082_0000_Light-Gucci-Savoy-medium-duffle-bag 1.png",
  "/images/portrait-shopping-react.png",
] as const;

/**
 * Pool historique conserve pour compatibilite d'import uniquement.
 * Ne plus l'utiliser pour assigner des visuels : preferer les listes
 * curees ci-dessus. Contenu restreint aux visuels mode/sport verifies.
 */
export const MOCK_IMAGE_POOL = [
  ...APPAREL_IMAGES,
  ...KIDS_APPAREL_IMAGES,
  ...LIFESTYLE_IMAGES,
  BAG_IMAGES[0],
] as const;
