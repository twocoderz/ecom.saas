/**
 * Note produit façon JD : étoiles + compteur d'avis.
 */
export function RatingStars({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: number;
}) {
  const safeRating = Math.max(0, Math.min(5, rating));
  return (
    <span
      className="inline-flex items-center gap-1"
      role="img"
      aria-label={`Noté ${safeRating} sur 5${reviewCount != null ? ` (${reviewCount} avis)` : ""}`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < Math.round(safeRating);
        return (
          <svg
            key={index}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`h-3.5 w-3.5 ${filled ? "fill-black text-black" : "fill-black-10 text-black-10"}`}
          >
            <path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9 2.9-6z" />
          </svg>
        );
      })}
      {reviewCount != null && (
        <span className="ml-1 text-xs text-black-60">({reviewCount})</span>
      )}
    </span>
  );
}
