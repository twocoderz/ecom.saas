import { Link } from "react-router-dom";

/**
 * Category shortcut tile.
 * JD mapping: "shop by category" quick entry cards.
 */
export function CategoryTile({ name, to }: { name: string; to: string }) {
  return (
    <Link
      to={to}
      className="inline-flex min-w-max items-center justify-center rounded-full border border-black-30 px-6 py-3 text-xs font-bold text-black-80 transition-all duration-200 hover:border-black-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-80 focus-visible:ring-offset-2"
    >
      {name}
    </Link>
  );
}
