/**
 * Tiroir de navigation mobile.
 * Repere JD : version compacte du mega menu avec categories et actions rapides.
 */
type MobileMenuDrawerProps = {
  id: string;
  onClose: () => void;
};

export function MobileMenuDrawer({ id, onClose }: MobileMenuDrawerProps) {
  const items = [
    "New Arrivals",
    "Men",
    "Women",
    "Kids",
    "Clothing",
    "Accessories",
    "Sale",
    "Brands",
    "Sneaker Releases",
  ];

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
          {items.map((item) => (
            <li key={item}>
              <button
                type="button"
                className="w-full cursor-pointer rounded-sm px-p2 py-p2 text-left text-sm font-medium text-black-80 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
