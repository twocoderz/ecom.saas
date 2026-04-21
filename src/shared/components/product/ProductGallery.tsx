import { useMemo, useState } from "react";
import type { ProductImage } from "../../../types";

type ProductGalleryProps = {
  productName: string;
  images: ProductImage[];
};

/**
 * Product media gallery.
 * JD mapping: PDP left column with image/video carousel.
 */
export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const sortedImages = useMemo(
    () => [...images].sort((left, right) => left.sort_order - right.sort_order),
    [images],
  );

  const [selectedImageId, setSelectedImageId] = useState<string | null>(
    sortedImages[0]?.id ?? null,
  );

  const selectedImage =
    sortedImages.find((image) => image.id === selectedImageId) ??
    sortedImages[0];

  if (!selectedImage) {
    return (
      <div className="rounded-xl border border-black/10 p-4">
        <p className="text-sm text-black/70">
          Aucune image produit disponible.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-black/10 p-4">
      <div className="space-y-3">
        <div className="aspect-square overflow-hidden rounded-lg border border-black/10 bg-black/5">
          <img
            src={selectedImage.url}
            alt={selectedImage.alt || productName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {sortedImages.slice(0, 8).map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedImageId(image.id)}
              className="overflow-hidden rounded-md border border-black/10"
              aria-label={`Voir image ${image.sort_order}`}
            >
              <img
                src={image.url}
                alt={image.alt || productName}
                className="aspect-square h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
