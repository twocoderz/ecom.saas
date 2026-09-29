import { useState } from "react";
import { mockReviewCount } from "../../../lib/reviews";
import { productRatings } from "../../../data/mock/relations";
import { ChevronDownIcon } from "../../icons";
import { RatingStars } from "../ui/RatingStars";

type ProductReviewsProps = {
  productId: string;
  productName: string;
};

/**
 * Accordéon avis façon JD, en français : note, bouton écrire un avis,
 * message vide si aucun avis détaillé.
 */
export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const rating = productRatings[productId] ?? 0;
  const reviewCount = mockReviewCount(productId);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <details
      id="avis-produit"
      className="group border-t border-black-10 py-4"
      open
    >
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold [&::-webkit-details-marker]:hidden">
        <span>
          Avis {rating.toFixed(1)}{" "}
          <span className="font-normal text-black-60">({reviewCount} avis)</span>
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="mt-3 space-y-3">
        <div className="flex items-center gap-2">
          <RatingStars rating={rating} />
          <span className="text-xs text-black-60">
            Basé sur {reviewCount} avis vérifiés
          </span>
        </div>

        {!showForm ? (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full rounded-md border border-black px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-black hover:text-white"
          >
            Écrire un avis
          </button>
        ) : (
          <form
            className="space-y-2 rounded-lg bg-black-5 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              setMessage("Merci ! Votre avis a bien été pris en compte.");
              setShowForm(false);
            }}
          >
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
        <p className="text-xs text-black-60">
          Aucun avis détaillé pour l&apos;instant. Soyez le premier à partager
          votre expérience.
        </p>
      </div>
    </details>
  );
}
