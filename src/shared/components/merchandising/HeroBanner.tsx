/**
 * Campaign hero block.
 * JD mapping: top rotating campaign banners on homepage.
 */
export function HeroBanner() {
  return (
    <div className="rounded-2xl bg-black p-10 text-white">
      <p className="text-sm uppercase tracking-wide text-white/70">
        Hero campagne
      </p>
      <h2 className="mt-2 text-3xl font-bold">Zone hero principale</h2>
      <p className="mt-2 text-white/80">
        A utiliser pour drop, promo saisonniere, ou collection phare.
      </p>
    </div>
  );
}
