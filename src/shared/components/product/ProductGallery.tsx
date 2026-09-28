import { useMemo, useState } from "react";
import type { ProductImage } from "../../../types";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";

type ProductGalleryProps = {
  productName: string;
  images: ProductImage[];
};

/**
 * Galerie PDP : image principale + flèches + miniatures avec état actif.
 */
export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const sortedImages = useMemo(
    () => [...images].sort((left, right) => left.sort_order - right.sort_order),
    [images],
  );

  const [selectedImageId, setSelectedImageId] = useState<string | null>(
    sortedImages[0]?.id ?? null,
  );

  const selectedIndex = Math.max(
    0,
    sortedImages.findIndex((image) => image.id === selectedImageId),
  );
  const selectedImage = sortedImages[selectedIndex];

  if (!selectedImage) {
    return (
      <div className="rounded-xl border border-black-10 bg-white p-4">
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
    <div className="rounded-xl border border-black-10 bg-white p-4">
      <div className="space-y-3">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-black-10 bg-black-5">
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
                className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-sm hover:bg-black hover:text-white"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(selectedIndex + 1)}
                aria-label="Image suivante"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-sm hover:bg-black hover:text-white"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
              <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white">
                {selectedIndex + 1} / {sortedImages.length}
              </span>
            </>
          )}
        </div>

        {sortedImages.length > 1 && (
          <div className="grid grid-cols-4 gap-2" role="tablist" aria-label="Miniatures produit">
            {sortedImages.slice(0, 8).map((image, index) => {
              const isActive = image.id === selectedImage.id;
              return (
                <button
                  key={image.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedImageId(image.id)}
                  className={`overflow-hidden rounded-md border-2 transition-colors ${
                    isActive ? "border-black" : "border-black-10 hover:border-black-40"
                  }`}
                  aria-label={`Voir image ${index + 1}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || productName}
                    loading="lazy"
                    className="aspect-square h-full w-full bg-black-5 object-contain"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
