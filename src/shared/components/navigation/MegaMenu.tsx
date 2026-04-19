/**
 * Menu categories desktop.
 * Repere JD : barre horizontale dense avec categories de niveau 1.
 */
export function MegaMenu() {
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
    <nav className="mt-p8">
      <ul className="flex items-center justify-between pb-2 text-xs font-medium text-white">
        {items.map((item) => (
          <li key={item}>
            <button
              type="button"
              className="cursor-pointer whitespace-nowrap text-white/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
