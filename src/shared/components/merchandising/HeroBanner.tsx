import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buildPlpPath } from "../../../lib/slug";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";

type HeroSlide = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaTo: string;
};

const SLIDES: HeroSlide[] = [
  {
    id: "celebrate-her",
    imageSrc: "/images/attractive_woman.png",
    imageAlt: "Femme portant une tenue sportswear New Balance.",
    title: "Celebrate Her",
    subtitle: "Must-have styles for Mom, ready to gift.",
    ctaLabel: "Shop Now",
    ctaTo: buildPlpPath("t-shirts"),
  },
  {
    id: "street-ready",
    imageSrc: "/images/pexels.jpg",
    imageAlt: "Haut sportswear pour collection street.",
    title: "Street Ready",
    subtitle: "Fresh drops for everyday movement.",
    ctaLabel: "Shop Now",
    ctaTo: buildPlpPath("lifestyle-shoes"),
  },
  {
    id: "run-faster",
    imageSrc:
      "/images/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png",
    imageAlt: "Look sport masculin pour sorties actives.",
    title: "Run Faster",
    subtitle: "Performance picks to level up your pace.",
    ctaLabel: "Shop Now",
    ctaTo: buildPlpPath("running-shoes"),
  },
];

/**
 * Campaign hero block.
 */
export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const activeSlide = SLIDES[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % SLIDES.length);
  };

  return (
    <article
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative h-55 md:h-85 mt-2">
        <img
          src={activeSlide.imageSrc}
          alt={activeSlide.imageAlt}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Slide precedente"
          className="absolute left-3 cursor-pointer top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black-80 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-80 focus-visible:ring-offset-2"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Slide suivante"
          className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black-80 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-80 focus-visible:ring-offset-2"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="px-4 py-4 text-center sm:px-8">
        <h2 className="text-2xl font-bold text-black-80">
          {activeSlide.title}
        </h2>
        <p className="text-sm font-normal text-black/80 mb-8">
          {activeSlide.subtitle}
        </p>
        <div>
          <Link
            to={activeSlide.ctaTo}
            className="inline-flex min-w-57.5 items-center justify-center rounded-full border border-black-50 px-10 py-3 text-sm font-medium text-black-80 transition-colors hover:border-black-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-80 focus-visible:ring-offset-2"
          >
            {activeSlide.ctaLabel}
          </Link>
        </div>
        <div
          className="flex items-center justify-center gap-2 mt-4"
          role="tablist"
          aria-label="Pagination hero"
        >
          {SLIDES.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                role="tab"
                aria-label={`Aller au slide ${index + 1}`}
                aria-current={isActive}
                className={`h-2 w-2 rounded-full transition-colors ${
                  isActive ? "bg-black" : "bg-black/20"
                }`}
              />
            );
          })}
        </div>
      </div>
    </article>
  );
}
