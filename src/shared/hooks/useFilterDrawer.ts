import { useCallback, useEffect, useState } from "react";

/**
 * Gere l'etat du drawer filtres et ses effets globaux (scroll lock + ESC).
 */
export function useFilterDrawer() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFilterOpen]);

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isFilterOpen]);

  const openFilters = useCallback(() => {
    setIsFilterOpen(true);
  }, []);

  const closeFilters = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  return {
    isFilterOpen,
    openFilters,
    closeFilters,
  };
}
