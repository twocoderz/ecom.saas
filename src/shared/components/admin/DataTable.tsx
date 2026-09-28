/**
 * Table admin generique (mock, sans tri serveur).
 */
export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-black-10 bg-white">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-black-10 bg-black-5 text-xs text-black-60">
            {columns.map((c) => (
              <th key={c} scope="col" className="px-4 py-2 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-black-5 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
