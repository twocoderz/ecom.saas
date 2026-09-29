import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { applyPromo } from "../../../lib/currency";
import { findPromoByCode } from "../../../data/api/shopApi";
import { useCartStore } from "../../../stores/useCartStore";
import { Price } from "../ui/Price";
import { ROUTE_PATHS } from "../../../config/paths";

/**
 * Resume commande partage panier/checkout : sous-total, promo, total.
 * Checkout simule : pas de PSP, CTA vers /checkout/information.
 */
export function CartSummary() {
  const lines = useCartStore((s) => s.lines);
  const promoCode = useCartStore((s) => s.promoCode);
  const setPromoCode = useCartStore((s) => s.setPromoCode);
  const subtotal = useCartStore((s) => s.subtotal)();
  const [draft, setDraft] = useState(promoCode);
  const [message, setMessage] = useState<string | null>(null);

  const result = useMemo(
    () => applyPromo(subtotal, findPromoByCode(promoCode), promoCode),
    [subtotal, promoCode],
  );

  const apply = () => {
    const promo = findPromoByCode(draft);
    if (!promo || promo.code.toUpperCase() !== draft.trim().toUpperCase()) {
      setMessage("Code promo inconnu.");
      return;
    }
    setPromoCode(draft);
    setMessage("Code promo appliqué.");
  };

  return (
    <aside className="h-fit rounded-xl border border-black-10 bg-white p-4">
      <h3 className="text-base font-semibold">Total</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-black-60">Sous-total ({lines.length})</dt>
          <dd className="font-semibold">
            <Price amount={subtotal} />
          </dd>
        </div>
        {result.applied && (
          <div className="flex justify-between text-green-700">
            <dt>Remise ({result.code})</dt>
            <dd className="font-semibold">
              −<Price amount={result.discountAmount} />
            </dd>
          </div>
        )}
        <div className="flex justify-between border-t border-black-10 pt-2 text-base font-bold">
          <dt>Total</dt>
          <dd>
            <Price amount={result.totalAfterDiscount} />
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex gap-2">
        <label htmlFor="cart-promo" className="sr-only">
          Code promo
        </label>
        <input
          id="cart-promo"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Code promo (ex: BUNDLE10)"
          className="min-w-0 flex-1 rounded-md border border-black-20 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={apply}
          className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black-80"
        >
          Appliquer
        </button>
      </div>
      {message && (
        <p className="mt-2 text-xs text-black-60" role="status">
          {message}
        </p>
      )}

      <Link
        to={ROUTE_PATHS.checkoutInfo}
        className="mt-4 block rounded-md bg-black px-4 py-3 text-center text-sm font-semibold text-white hover:bg-black-80"
      >
        Passer commande
      </Link>
    </aside>
  );
}
