/**
 * Pagination partagee PLP / recherche.
 */
export function Pagination({
  page,
  totalPages,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: {
  page: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <nav
      aria-label="Pagination produits"
      className="flex items-center justify-between rounded-xl border border-black-10 bg-white px-4 py-3"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="rounded-md border border-black-20 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:border-black-80"
      >
        Précédent
      </button>
      <p className="text-sm text-black-70" aria-live="polite">
        Page {page} / {totalPages}
      </p>
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className="rounded-md border border-black-20 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:border-black-80"
      >
        Suivant
      </button>
    </nav>
  );
}
