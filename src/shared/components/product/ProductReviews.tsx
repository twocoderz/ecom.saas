import { useMemo, useState } from "react";
import { mockReviewCount } from "../../../lib/reviews";
import { productRatings } from "../../../data/mock/relations";
import { useReviewStore } from "../../../stores/useReviewStore";
import { ChevronDownIcon } from "../../icons";
import { RatingStars } from "../ui/RatingStars";

type ProductReviewsProps = {
  productId: string;
  productName: string;
};

/**
 * Accordeon avis, en francais : note, avis rediges persistee en local,
 * formulaire (note + texte) dont la soumission survit au refresh.
 */
export function ProductReviews({
  productId,
  productName,
}: ProductReviewsProps) {
  const baseRating = productRatings[productId] ?? 0;
  const baseCount = mockReviewCount(productId);
  const localReviews = useReviewStore((s) => s.reviewsFor(productId));
  const addReview = useReviewStore((s) => s.addReview);

  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const { displayRating, displayCount } = useMemo(() => {
    if (localReviews.length === 0) {
      return { displayRating: baseRating, displayCount: baseCount };
    }
    const localSum = localReviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    return {
      displayRating:
        (baseRating * baseCount + localSum) / (baseCount + localReviews.length),
      displayCount: baseCount + localReviews.length,
    };
  }, [baseRating, baseCount, localReviews]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;
    addReview({
      productId,
      author: author.trim() || "Client vérifié",
      rating,
      text: trimmedText,
    });
    setText("");
    setAuthor("");
    setRating(5);
    setShowForm(false);
    setMessage("Merci ! Votre avis a bien été pris en compte.");
  };

  return (
    <details
      id="avis-produit"
      className="group border-t border-black-10 py-3 sm:py-4"
      open
    >
      <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-bold sm:text-md [&::-webkit-details-marker]:hidden">
        <span>
          Avis {displayRating.toFixed(1)}{" "}
          <span className="font-normal text-black-60">
            ({displayCount} avis)
          </span>
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="mt-3 space-y-4 sm:mt-4">
        <div className="flex items-center gap-2">
          <RatingStars rating={displayRating} />
          <span className="text-xs text-black-60">
            Basé sur {displayCount} avis vérifiés
          </span>
        </div>

        {localReviews.length > 0 && (
          <ul className="space-y-3" aria-label="Avis clients">
            {localReviews.map((review) => (
              <li key={review.id} className="rounded-lg bg-black-5 p-3 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{review.author}</span>
                  <RatingStars rating={review.rating} />
                </div>
                <p className="mt-1 text-black-80">{review.text}</p>
              </li>
            ))}
          </ul>
        )}

        {!showForm ? (
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="w-full cursor-pointer rounded-xs mt-4 border border-black px-4 py-3 min-h-[44px] text-sm font-semibold transition-colors hover:bg-black hover:text-white sm:w-50 sm:mt-6"
            >
              Écrire un avis
            </button>
          </div>
        ) : (
          <form
            className="space-y-2 rounded-lg bg-black-5 p-3"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor={`avis-auteur-${productId}`}
              className="block text-xs font-semibold"
            >
              Votre nom (optionnel)
            </label>
            <input
              id={`avis-auteur-${productId}`}
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className="w-full rounded-md border border-black-20 bg-white p-2 text-sm"
              placeholder="Ex : Awa D."
            />
            <label
              htmlFor={`avis-note-${productId}`}
              className="block text-xs font-semibold"
            >
              Votre note
            </label>
            <select
              id={`avis-note-${productId}`}
              value={rating}
              onChange={(event) => setRating(Number(event.target.value))}
              className="w-full rounded-md border border-black-20 bg-white p-2 text-sm"
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} / 5
                </option>
              ))}
            </select>
            <label
              htmlFor={`avis-${productId}`}
              className="block text-xs font-semibold"
            >
              Votre avis sur {productName}
            </label>
            <textarea
              id={`avis-${productId}`}
              required
              rows={3}
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="w-full rounded-md border border-black-20 bg-white p-2 text-sm"
              placeholder="Partagez votre expérience (taille, confort, qualité)…"
            />
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black-80"
            >
              Publier mon avis
            </button>
          </form>
        )}

        {message && (
          <p className="text-xs text-green-700" role="status">
            {message}
          </p>
        )}
        {localReviews.length === 0 && (
          <p className="text-xs text-black-60">
            Aucun avis détaillé pour l&apos;instant. Soyez le premier à partager
            votre expérience.
          </p>
        )}
      </div>
    </details>
  );
}
