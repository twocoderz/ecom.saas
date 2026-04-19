import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { navMenuItems } from "../../data/NavMenu";

/**
 * Menu categories desktop.
 * Repere JD : niveau 1 horizontal + panneau niveau 2 au survol/focus.
 */
export function MegaMenu() {
  const [activeId, setActiveId] = useState<string>(navMenuItems[0]?.id ?? "");

  const activeItem = useMemo(
    () => navMenuItems.find((item) => item.id === activeId) ?? navMenuItems[0],
    [activeId],
  );

  return (
    <nav
      className="mt-p2"
      aria-label="Navigation principale desktop"
      onMouseLeave={() => setActiveId(navMenuItems[0]?.id ?? "")}
    >
      <ul className="flex items-center justify-between gap-p3 py-p2 text-xs font-semibold text-white">
        {navMenuItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.href}
              onMouseEnter={() => setActiveId(item.id)}
              onFocus={() => setActiveId(item.id)}
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
        <div className="border-t border-white/20 py-p3">
          <div className="flex items-start gap-p8">
            <p className="min-w-28 text-xs font-semibold uppercase tracking-wide text-white/80">
              {activeItem.label}
            </p>
            <ul className="grid grid-cols-2 gap-x-p6 gap-y-p2">
              {activeItem.children.map((child) => (
                <li key={child.id}>
                  <Link
                    to={child.href}
                    className="text-sm text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
