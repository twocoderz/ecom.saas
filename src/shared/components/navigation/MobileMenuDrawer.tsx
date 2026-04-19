import { useState } from "react";
import { Link } from "react-router-dom";
import { CaretDownIcon, CaretUpIcon } from "../../icons";
import { navMenuItems } from "../../data/NavMenu";

/**
 * Tiroir de navigation mobile.
 * Repere JD : version compacte du mega menu avec accordions niveau 2.
 */
type MobileMenuDrawerProps = {
  id: string;
  onClose: () => void;
};

export function MobileMenuDrawer({ id, onClose }: MobileMenuDrawerProps) {
  const [openId, setOpenId] = useState<string>(navMenuItems[0]?.id ?? "");

  const toggleSection = (itemId: string) => {
    setOpenId((prev) => (prev === itemId ? "" : itemId));
  };

  return (
    <aside
      id={id}
      className="rounded-md border border-black/10 bg-white p-p3 shadow-lg"
      aria-label="Menu mobile"
    >
      <div className="mb-p2 flex items-center justify-between border-b border-black/10 pb-p2">
        <p className="text-sm font-semibold text-black-80">Menu</p>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-black-80 underline"
        >
          Fermer
        </button>
      </div>

      <nav>
        <ul className="grid gap-p2">
          {navMenuItems.map((item) => {
            const isOpen = openId === item.id;
            const sectionId = `mobile-menu-section-${item.id}`;

            return (
              <li
                key={item.id}
                className="rounded-sm border border-black/10 px-p2 py-p2"
              >
                <div className="flex items-center justify-between gap-p2">
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="text-sm font-semibold text-black-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleSection(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={sectionId}
                    aria-label={
                      isOpen ? `Fermer ${item.label}` : `Ouvrir ${item.label}`
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-sm text-black-80 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    {isOpen ? (
                      <CaretUpIcon className="h-4 w-4" />
                    ) : (
                      <CaretDownIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {isOpen && (
                  <ul
                    id={sectionId}
                    className="mt-p2 grid gap-p2 border-t border-black/10 pt-p2"
                  >
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          to={child.href}
                          onClick={onClose}
                          className="block text-sm text-black-70 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
