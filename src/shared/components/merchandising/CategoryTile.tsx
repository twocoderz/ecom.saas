/**
 * Category shortcut tile.
 * JD mapping: "shop by category" quick entry cards.
 */
export function CategoryTile({ name }: { name: string }) {
  return (
    <button
      type="button"
      className="p-4 text-black-80 text-xs font-bold rounded-full cursor-pointer border border-black-30 hover:border-black-80 transition-all duration-300"
    >
      {name}
    </button>
  );
}
