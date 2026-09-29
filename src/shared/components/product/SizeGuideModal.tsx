import { useEffect } from "react";

const SHOE_ROWS: Array<[string, string, string, string]> = [
  ["40", "25,0 cm", "UK 6", "US 7"],
  ["41", "25,7 cm", "UK 7", "US 8"],
  ["42", "26,0 cm", "UK 7.5", "US 8.5"],
  ["42,5", "26,4 cm", "UK 8", "US 9"],
  ["43", "26,7 cm", "UK 8.5", "US 9.5"],
  ["44", "27,1 cm", "UK 9", "US 10"],
  ["44,5", "27,5 cm", "UK 9.5", "US 10.5"],
  ["45", "27,9 cm", "UK 10", "US 11"],
];

const TEXTILE_ROWS: Array<[string, string, string]> = [
  ["XS", "86-91 cm", "63-68 cm"],
  ["S", "91-97 cm", "68-74 cm"],
  ["M", "97-104 cm", "74-81 cm"],
  ["L", "104-112 cm", "81-89 cm"],
  ["XL", "112-120 cm", "89-97 cm"],
];

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
      aria-label="Guide des tailles"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Guide des tailles</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le guide des tailles"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black-5"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-black-70">
          Mesurez votre pied en fin de journée. Si vous hésitez entre deux
          tailles, prenez la plus grande.
        </p>

        <h3 className="mt-4 text-sm font-semibold">Chaussures (EU)</h3>
        <table className="mt-2 w-full text-left text-xs">
          <thead>
            <tr className="text-black-60">
              <th scope="col" className="py-1 pr-2">EU</th>
              <th scope="col" className="py-1 pr-2">Longueur du pied</th>
              <th scope="col" className="py-1 pr-2">UK</th>
              <th scope="col" className="py-1">US</th>
            </tr>
          </thead>
          <tbody>
            {SHOE_ROWS.map(([eu, foot, uk, us]) => (
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
          Textile (tour de poitrine / tour de taille)
        </h3>
        <table className="mt-2 w-full text-left text-xs">
          <thead>
            <tr className="text-black-60">
              <th scope="col" className="py-1 pr-2">Taille</th>
              <th scope="col" className="py-1 pr-2">Poitrine</th>
              <th scope="col" className="py-1">Taille</th>
            </tr>
          </thead>
          <tbody>
            {TEXTILE_ROWS.map(([size, chest, waist]) => (
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
