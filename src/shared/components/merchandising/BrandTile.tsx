/**
 * Brand shortcut tile.
 * JD mapping: "shop by brand" blocks.
 */
export function BrandTile({ brand }: { brand: string }) {
  return <article className="rounded-xl border border-black/10 p-4 font-medium">{brand}</article>
}
