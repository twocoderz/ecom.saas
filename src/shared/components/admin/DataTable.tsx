import { useMemo, useState } from "react";

type DataTableProps = {
  columns: string[];
  rows: string[][];
  /** Lignes par page (0 = tout afficher). */
  pageSize?: number;
  /** Tri au clic sur les en-tetes (defaut : actif). */
  sortable?: boolean;
};

/**
 * Table admin generique : tri local au clic + pagination.
 * Donnees mock uniquement (aucun tri serveur).
 */
export function DataTable({ columns, rows, pageSize = 10, sortable = true }: DataTableProps) {
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    if (sortColumn === null) return rows;
    return [...rows].sort((a, b) => {
      const left = a[sortColumn] ?? "";
      const right = b[sortColumn] ?? "";
      const numeric = Number(left.replace(/[^0-9.-]/g, "")) - Number(right.replace(/[^0-9.-]/g, ""));
      const bothNumeric =
        left.replace(/[^0-9.-]/g, "") !== "" &&
        right.replace(/[^0-9.-]/g, "") !== "" &&
        Number.isFinite(numeric);
      const cmp = bothNumeric
        ? numeric
        : left.localeCompare(right, "fr");
      return cmp * sortDir;
    });
  }, [rows, sortColumn, sortDir]);

  const totalPages = pageSize > 0 ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const safePage = Math.min(page, totalPages - 1);
  const visible =
    pageSize > 0 ? sorted.slice(safePage * pageSize, safePage * pageSize + pageSize) : sorted;

  const toggleSort = (index: number) => {
    if (!sortable) return;
    setPage(0);
    if (sortColumn === index) {
      setSortDir((dir) => (dir === 1 ? -1 : 1));
    } else {
      setSortColumn(index);
      setSortDir(1);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-black-10 bg-white">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-black-10 bg-black-5 text-xs text-black-60">
            {columns.map((column, index) => (
              <th key={column} scope="col" className="px-4 py-2 font-semibold">
                {sortable ? (
                  <button
                    type="button"
                    onClick={() => toggleSort(index)}
                    aria-label={`Trier par ${column}`}
                    className="inline-flex cursor-pointer items-center gap-1 hover:text-black"
                  >
                    {column}
                    <span aria-hidden="true">
                      {sortColumn === index ? (sortDir === 1 ? "▲" : "▼") : "△"}
                    </span>
                  </button>
                ) : (
                  column
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visible.map((row, i) => (
            <tr key={i} className="border-b border-black-5 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {visible.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-black-60">
                Aucune ligne à afficher.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <nav
          aria-label="Pagination du tableau"
          className="flex items-center justify-between border-t border-black-10 px-4 py-2 text-sm"
        >
          <button
            type="button"
            disabled={safePage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="font-semibold underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
          >
            ← Précédent
          </button>
          <span className="text-black-60" role="status">
            Page {safePage + 1} / {totalPages}
          </span>
          <button
            type="button"
            disabled={safePage >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="font-semibold underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
          >
            Suivant →
          </button>
        </nav>
      )}
    </div>
  );
}
