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
    title: "Célébrez-la",
    subtitle: "Les indispensables pour la fête des mères, prêts à offrir.",
    ctaLabel: "Acheter",
    ctaTo: buildPlpPath("t-shirts"),
  },
  {
    id: "street-ready",
    imageSrc: "/images/pexels.jpg",
    imageAlt: "Haut sportswear pour collection street.",
    title: "Prêt pour la rue",
    subtitle: "Les nouveautés pour bouger au quotidien.",
    ctaLabel: "Acheter",
    ctaTo: buildPlpPath("lifestyle-shoes"),
  },
  {
    id: "run-faster",
    imageSrc: "/images/portrait-shopping-react.png",
    imageAlt: "Look sport masculin pour sorties actives.",
    title: "Courez plus vite",
    subtitle: "Sélection performance pour booster votre rythme.",
    ctaLabel: "Acheter",
    ctaTo: buildPlpPath("running-shoes"),
  },
];

/**
 * Hero plein écran façon JD : image de fond, texte superposé, CTA.
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

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % SLIDES.length);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Campagnes à la une"
      className="relative w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative h-[420px] md:h-[520px]">
        {SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={slide.imageSrc}
                alt={slide.imageAlt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            </div>
          );
        })}

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-8">
            {SLIDES.map((slide, index) =>
              index === activeIndex ? (
                <div key={slide.id} className="max-w-xl text-white">
                  <h2 className="text-4xl font-bold uppercase leading-none tracking-tight md:text-6xl">
                    {slide.title}
                  </h2>
                  <p className="mt-2 text-sm font-normal text-white/85 md:text-base">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.ctaTo}
                    className="mt-4 inline-flex min-w-50 items-center justify-center rounded-full bg-white px-10 py-3 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {slide.ctaLabel}
                  </Link>
                </div>
              ) : null,
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Slide précédente"
          className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-2 text-black-80 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Slide suivante"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-2 text-black-80 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <div
          className="absolute bottom-4 right-4 flex items-center gap-2 md:right-8"
          role="tablist"
          aria-label="Pagination hero"
        >
          <span className="mr-1 text-xs font-semibold text-white/80">
            {activeIndex + 1} / {SLIDES.length}
          </span>
          {SLIDES.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                role="tab"
                aria-selected={isActive}
                aria-label={`Aller au slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  isActive ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
