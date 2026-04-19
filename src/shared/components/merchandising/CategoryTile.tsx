/**
 * Category shortcut tile.
 * JD mapping: "shop by category" quick entry cards.
 */
export function CategoryTile({ name }: { name: string }) {
  return <article className="rounded-xl border border-black/10 p-4 font-medium">{name}</article>
}
