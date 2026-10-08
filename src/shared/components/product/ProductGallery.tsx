import { useMemo, useRef, useState } from "react";
import type { ProductImage } from "../../../types";
import { ChevronDownIcon } from "../../icons";

type ProductGalleryProps = {
  productName: string;
  images: ProductImage[];
};

/**
 * Galerie PDP :
 * - Mobile : carrousel swipe edge-aware + dots (tactile first).
 * - Desktop (lg) : grande image hover + rail miniatures, inchangé.
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
  const mobileRailRef = useRef<HTMLDivElement | null>(null);
  const isProgrammaticScroll = useRef(false);

  const selectedIndex = Math.max(
    0,
    sortedImages.findIndex((image) => image.id === selectedImageId),
  );
  const selectedImage = sortedImages[selectedIndex];

  if (!selectedImage) {
    return (
      <div className="rounded-lg bg-surface p-4">
        <p className="text-sm text-black-70">
          Aucune image produit disponible.
        </p>
      </div>
    );
  }

  const scrollMobileTo = (index: number) => {
    const rail = mobileRailRef.current;
    if (!rail) return;
    const width = rail.clientWidth;
    isProgrammaticScroll.current = true;
    rail.scrollTo({ left: index * width, behavior: "smooth" });
    window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 350);
  };

  const selectImage = (imageId: string, options?: { scrollMobile?: boolean }) => {
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
    if (options?.scrollMobile) {
      scrollMobileTo(newIndex);
    }
  };

  const handleMobileScroll = () => {
    const rail = mobileRailRef.current;
    if (!rail || isProgrammaticScroll.current) return;
    const width = rail.clientWidth || 1;
    const index = Math.round(rail.scrollLeft / width);
    const clamped = Math.max(0, Math.min(index, sortedImages.length - 1));
    const imageId = sortedImages[clamped]?.id;
    if (imageId && imageId !== selectedImage.id) {
      setDirection(clamped > selectedIndex ? 1 : -1);
      setSelectedImageId(imageId);
    }
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Mobile : swipe plein largeur + dots. Desktop : inchangé ci-dessous. */}
      {sortedImages.length > 1 ? (
        <div className="lg:hidden">
          <div
            ref={mobileRailRef}
            onScroll={handleMobileScroll}
            className="scrollbar-none -mx-2 flex snap-x snap-mandatory overflow-x-auto px-2 sm:mx-0 sm:rounded-xs sm:px-0"
            aria-roledescription="carrousel"
            aria-label={`Galerie ${productName}`}
          >
            {sortedImages.slice(0, 8).map((image, index) => (
              <div
                key={image.id}
                className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden bg-surface sm:aspect-square sm:rounded-xs"
                role="group"
                aria-roledescription="diapositive"
                aria-label={`${index + 1} sur ${Math.min(sortedImages.length, 8)}`}
              >
                <img
                  src={image.url}
                  alt={image.alt || productName}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
          <div
            className="mt-2 flex items-center justify-center gap-1.5"
            role="tablist"
            aria-label="Choisir une image"
          >
            {sortedImages.slice(0, 8).map((image, index) => (
              <button
                key={image.id}
                type="button"
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={`Voir image ${index + 1}`}
                onClick={() => selectImage(image.id, { scrollMobile: true })}
                className={`flex h-6 min-w-[24px] items-center justify-center`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all ${
                    index === selectedIndex
                      ? "w-5 bg-black"
                      : "w-1.5 bg-black-20"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="sr-only" role="status">
            Image {selectedIndex + 1} sur {Math.min(sortedImages.length, 8)}
          </span>
        </div>
      ) : (
        <div className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-square sm:rounded-xs lg:hidden">
          <img
            src={selectedImage.url}
            alt={selectedImage.alt || productName}
            className="h-full w-full object-contain"
          />
        </div>
      )}

      {/* Desktop : grande image hover, strictement identique au comportement avant */}
      <div className="relative hidden aspect-square overflow-hidden rounded-xs bg-surface lg:block">
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
          <div className="absolute bottom-10 right-0 w-64 rounded-xs bg-white p-3 text-xs text-black-70 shadow-lg">
            Portez-le avec un jean brut et un t-shirt uni pour un look casual,
            ou avec un ensemble survêtement pour un style sportswear complet.
          </div>
        </details>
      </div>

      {/* Mobile : bouton porter en version compacte sous la galerie */}
      <details className="group lg:hidden">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-xs bg-white px-3 py-2 text-xs font-semibold shadow-sm ring-1 ring-black-10 [&::-webkit-details-marker]:hidden">
          Comment le porter
          <ChevronDownIcon
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="mt-2 w-full max-w-full rounded-xs bg-white p-3 text-xs text-black-70 shadow-sm ring-1 ring-black-10">
          Portez-le avec un jean brut et un t-shirt uni pour un look casual,
          ou avec un ensemble survêtement pour un style sportswear complet.
        </div>
      </details>

      {sortedImages.length > 1 && (
        <div
          className="scrollbar-none hidden gap-2 overflow-x-auto pb-1 lg:flex"
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
                className={`mt-6 h-20 w-20 shrink-0 overflow-hidden rounded-xs bg-surface transition-all ${
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
