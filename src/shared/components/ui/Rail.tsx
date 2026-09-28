import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";

export function Rail({
  children,
  itemSelector,
  ariaLabel,
  alignItems = "stretch",
}: {
  children: ReactNode;
  itemSelector: string;
  ariaLabel: string;
  alignItems?: "start" | "stretch";
}) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setCanLeft(rail.scrollLeft > 4);
    setCanRight(rail.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    update();
    const rail = railRef.current;
    if (!rail) return;
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, children]);

  const scrollByCard = (dir: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    const first = rail.querySelector<HTMLElement>(itemSelector);
    const amount = (first?.offsetWidth ?? 300) + 16;
    rail.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const arrowClass = (enabled: boolean) =>
    `absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black-20 bg-white text-black shadow-sm transition-all duration-100 sm:flex ${
      enabled ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-35"
    }`;

  return (
    <div className="relative">
      <div
        ref={railRef}
        aria-label={ariaLabel}
        className={`scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 ${
          alignItems === "start" ? "items-start" : "items-stretch"
        }`}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label="Faire défiler vers la gauche"
        onClick={() => scrollByCard("left")}
        disabled={!canLeft}
        className={`${arrowClass(canLeft)} left-2 hover:bg-black hover:text-white`}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Faire défiler vers la droite"
        onClick={() => scrollByCard("right")}
        disabled={!canRight}
        className={`${arrowClass(canRight)} right-2 hover:bg-black hover:text-white`}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
