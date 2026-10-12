import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_SHOP_ID } from "../types";

/**
 * Avis clients rediges en local (sans backend), persistes par boutique.
 * Les compteurs/notes mock (`productRatings`, `mockReviewCount`) restent
 * le socle ; les avis saisis s'y ajoutent et survivent au refresh.
 */
export type LocalReview = {
  id: string;
  shopId?: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  createdAt: string;
};

type ReviewState = {
  reviews: LocalReview[];
  addReview: (input: {
    productId: string;
    author: string;
    rating: number;
    text: string;
  }) => void;
};

/**
 * Sélecteur pur hors-store : filtre sans créer de nouvelle référence
 * dans le sélecteur Zustand (évite la boucle infinie useSyncExternalStore).
 */
export function selectReviewsFor(
  reviews: LocalReview[],
  productId: string,
): LocalReview[] {
  return reviews.filter((review) => review.productId === productId);
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      reviews: [],
      addReview: (input) =>
        set((state) => ({
          reviews: [
            ...state.reviews,
            {
              id: `rev-${Date.now().toString(36)}-${state.reviews.length}`,
              shopId: DEFAULT_SHOP_ID,
              createdAt: new Date().toISOString(),
              ...input,
            },
          ],
        })),
    }),
    {
      name: `ecom-${DEFAULT_SHOP_ID}-reviews`,
      partialize: (state) => ({ reviews: state.reviews }),
    },
  ),
);
