import { beforeEach, describe, expect, it } from "vitest";
import {
  selectReviewsFor,
  useReviewStore,
  type LocalReview,
} from "../useReviewStore";

const REVIEW_A: LocalReview = {
  id: "rev-a",
  shopId: "default-shop",
  productId: "prod-1001",
  author: "Awa",
  rating: 5,
  text: "Parfait",
  createdAt: "2026-01-01T00:00:00.000Z",
};

const REVIEW_B: LocalReview = {
  id: "rev-b",
  shopId: "default-shop",
  productId: "prod-1002",
  author: "Moussa",
  rating: 4,
  text: "Bien",
  createdAt: "2026-01-02T00:00:00.000Z",
};

describe("selectReviewsFor", () => {
  it("filtre par produit sans muter la source", () => {
    const source = [REVIEW_A, REVIEW_B];
    const result = selectReviewsFor(source, "prod-1001");
    expect(result).toEqual([REVIEW_A]);
    expect(source).toHaveLength(2);
  });

  it("retourne un tableau vide pour un produit sans avis", () => {
    expect(selectReviewsFor([REVIEW_A], "prod-9999")).toEqual([]);
  });
});

describe("useReviewStore", () => {
  beforeEach(() => {
    useReviewStore.setState({ reviews: [] });
  });

  it("ajoute un avis et le rend visible via le sélecteur stable", () => {
    useReviewStore.getState().addReview({
      productId: "prod-1001",
      author: "Awa",
      rating: 5,
      text: "Parfait",
    });
    const { reviews } = useReviewStore.getState();
    // Référence stable : le composant sélectionne `s.reviews` puis filtre en mémo.
    const first = useReviewStore.getState().reviews;
    const second = useReviewStore.getState().reviews;
    expect(first).toBe(second);
    expect(selectReviewsFor(reviews, "prod-1001")).toHaveLength(1);
    expect(selectReviewsFor(reviews, "prod-1002")).toHaveLength(0);
  });
});
