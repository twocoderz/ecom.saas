import { useEffect, useMemo, useState } from "react";
import type { ProductImage } from "../../../types";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";

type ProductGalleryProps = {
  productName: string;
  images: ProductImage[];
};

/**
 * Galerie PDP façon JD : grande image sur fond gris clair,
 * rail horizontal de miniatures, compteur et bouton "Comment le porter".
 */
export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const sortedImages = useMemo(
    () => [...images].sort((left, right) => left.sort_order - right.sort_order),
    [images],
  );

  const [selectedImageId, setSelectedImageId] = useState<string | null>(
    sortedImages[0]?.id ?? null,
  );

  useEffect(() => {
    setSelectedImageId(sortedImages[0]?.id ?? null);
  }, [sortedImages]);

  const selectedIndex = Math.max(
    0,
    sortedImages.findIndex((image) => image.id === selectedImageId),
  );
  const selectedImage = sortedImages[selectedIndex];

  if (!selectedImage) {
    return (
      <div className="rounded-lg bg-[#f5f5f5] p-4">
        <p className="text-sm text-black-70">
          Aucune image produit disponible.
        </p>
      </div>
    );
  }

  const goTo = (index: number) => {
    const total = sortedImages.length;
    const next = ((index % total) + total) % total;
    setSelectedImageId(sortedImages[next]?.id ?? null);
  };

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f5f5f5]">
        <img
          src={selectedImage.url}
          alt={selectedImage.alt || productName}
          className="h-full w-full object-contain"
        />
        {sortedImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(selectedIndex - 1)}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors hover:bg-black hover:text-white"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(selectedIndex + 1)}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors hover:bg-black hover:text-white"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
        <details className="group absolute bottom-3 right-3">
          <summary className="cursor-pointer list-none rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm hover:bg-black hover:text-white [&::-webkit-details-marker]:hidden">
            Comment le porter
            <span aria-hidden="true"> ⌄</span>
          </summary>
          <div className="absolute bottom-10 right-0 w-64 rounded-lg bg-white p-3 text-xs text-black-70 shadow-lg">
            Portez-le avec un jean brut et un t-shirt uni pour un look casual,
            ou avec un ensemble survêtement pour un style sportswear complet.
          </div>
        </details>
      </div>

      {sortedImages.length > 1 && (
        <div
          className="scrollbar-none flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Miniatures produit"
        >
          {sortedImages.slice(0, 8).map((image, index) => {
            const isActive = image.id === selectedImage.id;
            return (
              <button
                key={image.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Voir image ${index + 1}`}
                onClick={() => setSelectedImageId(image.id)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-md bg-[#f5f5f5] transition-all ${
                  isActive
                    ? "ring-2 ring-black ring-offset-1"
                    : "opacity-80 hover:opacity-100 hover:ring-1 hover:ring-black-40"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt || productName}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
