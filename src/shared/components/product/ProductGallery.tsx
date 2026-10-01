import { useMemo, useState } from "react";
import type { ProductImage } from "../../../types";
import { ChevronDownIcon } from "../../icons";

type ProductGalleryProps = {
  productName: string;
  images: ProductImage[];
};

/**
 * Galerie PDP : grande image sur fond gris clair,
 * rail horizontal de miniatures, bouton "Comment le porter".
 * Sans flèches : le survol (hover) d'une miniature affiche
 * l'image en grand avec une glissade directionnelle.
 */
export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const sortedImages = useMemo(
    () => [...images].sort((left, right) => left.sort_order - right.sort_order),
    [images],
  );

  // Sans effet : si l'image sélectionnée n'est plus dans la liste
  // (ex : changement de couleur), on retombe sur la première.
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

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

  const selectImage = (imageId: string) => {
    if (imageId === selectedImage.id) {
      return;
    }
    const newIndex = sortedImages.findIndex((image) => image.id === imageId);
    if (newIndex < 0) {
      return;
    }
    // Droite -> centre si on avance, gauche -> centre si on recule.
    setDirection(newIndex > selectedIndex ? 1 : -1);
    setSelectedImageId(imageId);
  };

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f5f5f5]">
        <img
          key={selectedImage.id}
          src={selectedImage.url}
          alt={selectedImage.alt || productName}
          className={`h-full w-full object-contain ${
            direction === 1 ? "gallery-slide-right" : "gallery-slide-left"
          }`}
        />
        <details className="group absolute bottom-3 right-3">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-xs bg-white px-3 py-2 text-xs font-semibold shadow-sm hover:bg-black hover:text-white [&::-webkit-details-marker]:hidden">
            Comment le porter
            <ChevronDownIcon
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
            />
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
                onClick={() => selectImage(image.id)}
                onMouseEnter={() => selectImage(image.id)}
                onFocus={() => selectImage(image.id)}
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
