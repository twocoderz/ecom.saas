/**
 * Compteur d'avis mock déterministe (stable par produit, sans backend).
 */
export function mockReviewCount(productId: string): number {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = (hash * 31 + productId.charCodeAt(i)) % 997;
  }
  return 3 + (hash % 240);
}
