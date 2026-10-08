import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { computeOrderTotals } from "../../../lib/checkout";
import { findPromoByCode } from "../../../data/api/shopApi";
import { useCartStore } from "../../../stores/useCartStore";
import { useCheckoutStore } from "../../../stores/useCheckoutStore";
import {
  checkoutCopy,
  getShippingMethod,
} from "../../../shared/data/checkout";
import { Price } from "../ui/Price";
import { ROUTE_PATHS } from "../../../config/paths";

type CartSummaryProps = {
  /** Panier : CTA vers le checkout. Checkout : recapitulatif seul. */
  mode?: "cart" | "checkout";
};

/**
 * Resume commande partage panier/checkout : sous-total, promo,
 * livraison et taxes simulees, total. Checkout simule : pas de PSP.
 */
export function CartSummary({ mode = "cart" }: CartSummaryProps) {
  const promoCode = useCartStore((s) => s.promoCode);
  const setPromoCode = useCartStore((s) => s.setPromoCode);
  const subtotal = useCartStore((s) => s.subtotal)();
  const count = useCartStore((s) => s.count)();
  const shippingMethodId = useCheckoutStore((s) => s.shippingMethodId);
  const [draft, setDraft] = useState(promoCode);
  const [message, setMessage] = useState<string | null>(null);

  const totals = useMemo(
    () =>
      computeOrderTotals({
        subtotal,
        count,
        promo: findPromoByCode(promoCode),
        promoCode,
        shippingMethodId,
      }),
    [subtotal, count, promoCode, shippingMethodId],
  );
  const shippingMethod = getShippingMethod(totals.shippingMethodId);

  const apply = () => {
    const promo = findPromoByCode(draft);
    if (!promo || promo.code.toUpperCase() !== draft.trim().toUpperCase()) {
      setMessage("Code promo inconnu.");
      return;
    }
    setPromoCode(draft);
    setMessage(promo ? "Code promo appliqué." : null);
  };

  return (
    <aside
      className="h-fit rounded-xl border border-black-10 bg-white p-4"
      aria-label="Résumé de la commande"
    >
      <h3 className="text-base font-semibold">{checkoutCopy.cartTitle}</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-black-60">
            Sous-total ({totals.count} article{totals.count > 1 ? "s" : ""})
          </dt>
          <dd className="font-semibold">
            <Price amount={totals.subtotal} />
          </dd>
        </div>
        {totals.discountApplied && (
          <div className="flex justify-between text-green-700">
            <dt>
              {checkoutCopy.discountLabel} ({totals.discountCode})
            </dt>
            <dd className="font-semibold">
              −<Price amount={totals.discount} />
            </dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-black-60">
            {checkoutCopy.shippingLabel} ({shippingMethod.name})
          </dt>
          <dd className="font-semibold">
            {totals.shippingFree || totals.shippingFee === 0 ? (
              checkoutCopy.freeShipping
            ) : (
              <Price amount={totals.shippingFee} />
            )}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-black-60">{checkoutCopy.taxesLabel}</dt>
          <dd className="font-semibold">
            <Price amount={totals.taxes} />
          </dd>
        </div>
        <div className="flex justify-between border-t border-black-10 pt-2 text-base font-bold">
          <dt>Total</dt>
          <dd>
            <Price amount={totals.total} />
          </dd>
        </div>
      </dl>

      {mode === "cart" && (
        <>
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
        </>
      )}

      {mode === "checkout" && (
        <p className="mt-3 text-xs text-black-60">
          {checkoutCopy.simulatedNotice}
        </p>
      )}
    </aside>
  );
}
