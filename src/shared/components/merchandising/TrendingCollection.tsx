/**
 * Horizontal list section wrapper.
 */

export function TrendingCollection() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-black-5 p-8 rounded-md">
        <img
          src="/images/coding_laptop.png"
          alt="coding laptop image"
          className="w-48 h-48"
        />
      </div>
      <h3 className="text-black-80 text-lg font-bold">Mac Book Pro</h3>
    </div>
  );
}
