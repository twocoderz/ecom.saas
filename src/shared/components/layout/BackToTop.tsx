import { useEffect, useState } from "react";
import { ChevronUpIcon } from "../../icons";

/**
 * Bouton retour en haut façon JD (apparaît après scroll).
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Retour en haut"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-black-20 bg-white text-black shadow-md transition-colors hover:bg-black hover:text-white"
    >
      <ChevronUpIcon className="h-5 w-5" />
    </button>
  );
}
