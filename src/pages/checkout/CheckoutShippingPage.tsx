import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { formatPrice } from "../../lib/currency";
import {
  SHIPPING_METHODS,
  checkoutCopy,
  type ShippingMethodId,
} from "../../shared/data/checkout";
import { useCheckoutStore } from "../../stores/useCheckoutStore";
import { Price } from "../../shared/components/ui/Price";
import { CheckoutStepLayout } from "./components/CheckoutStepLayout";

/**
 * Etape 2 : mode de livraison simule (frais + franco affiches).
 */
export function CheckoutShippingPage() {
  const navigate = useNavigate();
  const stored = useCheckoutStore((s) => s.shippingMethodId);
  const setShippingMethodId = useCheckoutStore((s) => s.setShippingMethodId);
  const [selected, setSelected] = useState<ShippingMethodId>(stored);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShippingMethodId(selected);
    navigate(ROUTE_PATHS.checkoutPayment);
  };

  return (
    <CheckoutStepLayout step="livraison" title="Livraison">
      <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-xl border border-black-10 bg-white p-4 sm:p-6"
      >
        <div
          className="space-y-2"
          role="radiogroup"
          aria-label="Mode de livraison"
        >
          {SHIPPING_METHODS.map((method) => {
            const isActive = selected === method.id;
            return (
              <button
                key={method.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setSelected(method.id)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xs border p-3 text-left transition-colors sm:p-4 ${
                  isActive
                    ? "border-black"
                    : "border-black-10 hover:border-black-40"
                }`}
              >
                <span className="flex-1">
                  <span className="block text-[15px] font-bold sm:text-md">
                    {method.name}
                  </span>
                  <span className="block text-sm text-black-70">
                    {method.delay}
                    {method.freeFrom !== null && method.freeFrom > 0
                      ? ` — offerte dès ${formatPrice(method.freeFrom)}`
                      : ""}
                  </span>
                </span>
                <span className="text-sm font-bold">
                  {method.fee === 0 ? (
                    checkoutCopy.freeShipping
                  ) : (
                    <Price amount={method.fee} />
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    isActive ? "border-black" : "border-black-20"
                  }`}
                >
                  {isActive && (
                    <span className="h-2.5 w-2.5 rounded-full bg-black" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-black px-4 py-3 text-sm font-bold text-white hover:bg-black-80 sm:w-auto sm:px-8"
        >
          Continuer vers le paiement
        </button>
      </form>
    </CheckoutStepLayout>
  );
}
