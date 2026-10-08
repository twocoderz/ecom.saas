import { useEffect } from "react";
import { CloseIcon } from "../../icons";
import {
  SHOE_SIZE_ROWS,
  TEXTILE_SIZE_ROWS,
  sizeGuideCopy,
} from "../../data/pdp";

type SizeGuideModalProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Guide des tailles FR : tableau EU/cm + textile, en modale accessible.
 */
export function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={sizeGuideCopy.title}
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">{sizeGuideCopy.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le guide des tailles"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black-5"
          >
            <CloseIcon aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-sm text-black-70">{sizeGuideCopy.intro}</p>

        <h3 className="mt-4 text-sm font-semibold">
          {sizeGuideCopy.shoesTitle}
        </h3>
        <table className="mt-2 w-full text-left text-xs">
          <thead>
            <tr className="text-black-60">
              <th scope="col" className="py-1 pr-2">
                EU
              </th>
              <th scope="col" className="py-1 pr-2">
                Longueur du pied
              </th>
              <th scope="col" className="py-1 pr-2">
                UK
              </th>
              <th scope="col" className="py-1">
                US
              </th>
            </tr>
          </thead>
          <tbody>
            {SHOE_SIZE_ROWS.map(([eu, foot, uk, us]) => (
              <tr key={eu} className="border-t border-black-10">
                <td className="py-1.5 pr-2 font-semibold">{eu}</td>
                <td className="py-1.5 pr-2">{foot}</td>
                <td className="py-1.5 pr-2">{uk}</td>
                <td className="py-1.5">{us}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-4 text-sm font-semibold">
          {sizeGuideCopy.textileTitle}
        </h3>
        <table className="mt-2 w-full text-left text-xs">
          <thead>
            <tr className="text-black-60">
              <th scope="col" className="py-1 pr-2">
                Taille
              </th>
              <th scope="col" className="py-1 pr-2">
                Poitrine
              </th>
              <th scope="col" className="py-1">
                Taille
              </th>
            </tr>
          </thead>
          <tbody>
            {TEXTILE_SIZE_ROWS.map(([size, chest, waist]) => (
              <tr key={size} className="border-t border-black-10">
                <td className="py-1.5 pr-2 font-semibold">{size}</td>
                <td className="py-1.5 pr-2">{chest}</td>
                <td className="py-1.5">{waist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
