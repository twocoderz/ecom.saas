/**
 * Carte stat admin.
 */
export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black-10 bg-white p-4">
      <p className="text-xs text-black-60">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
