/**
 * Etat vide partage pour listings.
 */
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-black-10 bg-white p-6 text-sm text-black-60">
      {message}
    </div>
  );
}
