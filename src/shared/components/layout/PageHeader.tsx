/**
 * Reusable page heading for PLP, account, and support pages.
 * JD mapping: title bar above content grids and filters.
 */
export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="border-b border-black/10 py-6">
      <h1 className="text-3xl font-semibold text-black">{title}</h1>
      <p className="mt-2 text-sm text-black/70">{subtitle}</p>
    </header>
  )
}
