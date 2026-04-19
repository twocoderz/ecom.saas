import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { navMenuItems } from "../../data/NavMenu";

/**
 * Menu categories desktop.
 * Repere JD : niveau 1 horizontal + panneau mega menu en overlay.
 */
export function MegaMenu() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = (id: string) => {
    clearCloseTimer();
    setActiveId(id);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveId(null);
    }, 180);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  const activeItem = useMemo(
    () => navMenuItems.find((item) => item.id === activeId) ?? null,
    [activeId],
  );

  return (
    <nav
      className="relative mt-p2"
      aria-label="Navigation principale desktop"
      onMouseEnter={clearCloseTimer}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        const nextFocus = event.relatedTarget as Node | null;
        if (!event.currentTarget.contains(nextFocus)) {
          scheduleClose();
        }
      }}
    >
      <ul className="flex items-center justify-between gap-p3 py-p2 text-xs font-semibold text-white">
        {navMenuItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.href}
              onMouseEnter={() => openMenu(item.id)}
              onFocus={() => openMenu(item.id)}
              className={`cursor-pointer whitespace-nowrap border-b-2 pb-p1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                item.id === activeId
                  ? "border-white text-white"
                  : "border-transparent text-white/85 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {activeItem && (
        <div
          className="absolute left-0 right-0 top-9 z-50 border border-black/15 bg-[#ececec] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-p6 px-p6 py-p4">
            <div className="grid grid-cols-4 gap-p6">
              {activeItem.sections.map((section) => (
                <section key={section.id} className="mt-4">
                  <h3 className="border-b-2 border-black/60 pb-p1 text-sm font-bold uppercase tracking-tight text-black">
                    {section.title}
                  </h3>
                  <ul className="mt-p2 grid gap-p2">
                    {section.links.map((link) => (
                      <li key={link.id}>
                        <Link
                          to={link.href}
                          className="text-xs text-black/85 transition-colors hover:text-black hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <aside className="border-l border-black/15 pl-p4">
              <Link
                to={activeItem.featured?.href ?? activeItem.href}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                {activeItem.featured?.imageSrc ? (
                  <img
                    src={activeItem.featured.imageSrc}
                    alt={
                      activeItem.featured.imageAlt ?? activeItem.featured.title
                    }
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="h-56 w-full bg-[radial-gradient(circle_at_30%_35%,#31ff7f_0%,#0f2a1d_35%,#111_100%)]" />
                )}
                <span className="mt-p2 inline-block text-base text-black underline underline-offset-2">
                  {activeItem.featured?.title ?? activeItem.label}
                </span>
              </Link>
            </aside>
          </div>
        </div>
      )}
    </nav>
  );
}
