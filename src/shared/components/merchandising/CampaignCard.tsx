/**
 * Reusable campaign tile.
 * JD mapping: image + title cards used for seasonal content modules.
 */
export function CampaignCard({ title }: { title: string }) {
  return <article className="rounded-xl border border-black/10 p-4 text-sm text-black/80">{title}</article>
}
