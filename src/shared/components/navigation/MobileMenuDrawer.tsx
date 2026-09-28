import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../branding/Logo";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "../../icons";
import { navMenuItems } from "../../data/NavMenu";

/**
 * Menu mobile façon JD : plein écran, header noir, navigation drill-down
 * Niveau 0 = catégories, Niveau 1 = sections, Niveau 2 = liens directs.
 * Pas de bloc promo / visuel (choix produit).
 */
type MobileMenuDrawerProps = {
  id: string;
  onClose: () => void;
};

function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) =>
      word.length === 0 ? word : word[0].toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export function MobileMenuDrawer({ id, onClose }: MobileMenuDrawerProps) {
  const [stack, setStack] = useState<string[]>([]);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const level1 = useMemo(
    () => navMenuItems.find((item) => item.id === stack[0]) ?? null,
    [stack],
  );
  const level2 = useMemo(
    () => level1?.sections.find((section) => section.id === stack[1]) ?? null,
    [level1, stack],
  );

  const depth = stack.length;
  const headerTitle =
    depth === 0
      ? null
      : depth === 1
        ? (level1?.label ?? "")
        : toTitleCase(level2?.title ?? level1?.label ?? "");

  const push = (entryId: string) => {
    setStack((prev) => [...prev, entryId]);
  };

  const pop = () => {
    setStack((prev) => prev.slice(0, -1));
  };

  // Focus : Retour quand on descend, X quand on remonte à la racine.
  useEffect(() => {
    if (depth === 0) {
      closeButtonRef.current?.focus();
    } else {
      backButtonRef.current?.focus();
    }
  }, [depth]);

  // Échap : remonte d'un niveau, ou ferme à la racine.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (stack.length > 0) {
        pop();
      } else {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stack.length, onClose]);

  return (
    <aside
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menu mobile"
      className="flex h-full flex-col bg-white"
    >
      {/* Header noir façon JD */}
      <div className="relative flex h-14 shrink-0 items-center justify-between bg-black px-p4 text-white">
        {depth === 0 ? (
          <>
            <Logo />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu mobile"
              className="flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <CloseIcon className="h-6 w-6 text-white" />
            </button>
          </>
        ) : (
          <>
            <button
              ref={backButtonRef}
              type="button"
              onClick={pop}
              aria-label="Revenir au niveau précédent"
              className="flex h-10 items-center gap-p1 pr-p2 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              Retour
            </button>
            <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-base font-semibold text-white">
              {headerTitle}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu mobile"
              className="flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <CloseIcon className="h-6 w-6 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Piste coulissante : 1 panneau visible à la fois */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-250 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${depth * 100}%)` }}
        >
          {/* Niveau 0 : catégories */}
          <nav
            aria-label="Catégories"
            aria-hidden={depth !== 0}
            className="h-full min-w-full overflow-y-auto overscroll-contain"
          >
            <ul className="divide-y divide-black/10">
              {navMenuItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => push(item.id)}
                    tabIndex={depth === 0 ? 0 : -1}
                    className="flex min-h-14 w-full items-center justify-between gap-p3 px-p4 py-p3 text-left text-[15px] font-semibold text-black-80 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
                  >
                    <span>{item.label}</span>
                    <ChevronRightIcon className="h-5 w-5 shrink-0 text-black-80" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Niveau 1 : sections de la catégorie */}
          <nav
            aria-label={level1 ? `Sous-catégories ${level1.label}` : "Sous-catégories"}
            aria-hidden={depth !== 1}
            className="h-full min-w-full overflow-y-auto overscroll-contain"
          >
            {level1 && (
              <ul className="divide-y divide-black/10">
                <li>
                  <Link
                    to={level1.href}
                    onClick={onClose}
                    tabIndex={depth === 1 ? 0 : -1}
                    className="flex min-h-14 items-center px-p4 py-p3 text-[15px] font-semibold text-black-80 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
                  >
                    Tout {level1.label.toLowerCase()}
                  </Link>
                </li>
                {level1.sections.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => push(section.id)}
                      tabIndex={depth === 1 ? 0 : -1}
                      className="flex min-h-14 w-full items-center justify-between gap-p3 px-p4 py-p3 text-left text-[15px] font-semibold text-black-80 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
                    >
                      <span>{toTitleCase(section.title)}</span>
                      <ChevronRightIcon className="h-5 w-5 shrink-0 text-black-80" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </nav>

          {/* Niveau 2 : liens directs, sans chevron */}
          <nav
            aria-label={level2 ? toTitleCase(level2.title) : "Articles"}
            aria-hidden={depth !== 2}
            className="h-full min-w-full overflow-y-auto overscroll-contain"
          >
            {level2 && (
              <ul className="divide-y divide-black/10">
                {level2.links.map((child) => (
                  <li key={child.id}>
                    <Link
                      to={child.href}
                      onClick={onClose}
                      tabIndex={depth === 2 ? 0 : -1}
                      className="flex min-h-14 items-center px-p4 py-p3 text-[15px] text-black-80 hover:bg-black/5 hover:underline hover:underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>
      </div>
    </aside>
  );
}
