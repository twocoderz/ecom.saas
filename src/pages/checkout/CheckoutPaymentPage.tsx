import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { formatPrice } from "../../lib/currency";
import {
  computeOrderTotals,
  validatePayment,
  type PaymentDetails,
} from "../../lib/checkout";
import { createMockOrder, findPromoByCode } from "../../data/api/shopApi";
import { useCartStore } from "../../stores/useCartStore";
import { useCheckoutStore } from "../../stores/useCheckoutStore";
import {
  PaymentMethods,
  type PaymentMethodId,
} from "../../shared/components/product/PaymentMethods";
import { checkoutCopy, getShippingMethod } from "../../shared/data/checkout";
import { CheckoutStepLayout } from "./components/CheckoutStepLayout";
import { Field } from "./components/CheckoutFields";

/**
 * Etape 3 : paiement 100 % simule (Mixx / Flooz / Visa / Cash),
 * aucun appel reseau. Valide puis cree la commande mock, vide le
 * panier et bascule vers la confirmation.
 */
export function CheckoutPaymentPage() {
  const navigate = useNavigate();
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal)();
  const count = useCartStore((s) => s.count)();
  const promoCode = useCartStore((s) => s.promoCode);
  const clear = useCartStore((s) => s.clear);

  const information = useCheckoutStore((s) => s.information);
  const shippingMethodId = useCheckoutStore((s) => s.shippingMethodId);
  const storedMethod = useCheckoutStore((s) => s.paymentMethod);
  const storedDetails = useCheckoutStore((s) => ({
    payerPhone: s.payerPhone,
    cardNumber: s.cardNumber,
    cardExpiry: s.cardExpiry,
  }));
  const setPaymentMethod = useCheckoutStore((s) => s.setPaymentMethod);
  const setPaymentDetails = useCheckoutStore((s) => s.setPaymentDetails);
  const setLastOrderId = useCheckoutStore((s) => s.setLastOrderId);

  const [method, setMethod] = useState<PaymentMethodId>(storedMethod);
  const [details, setDetails] = useState<PaymentDetails>({
    payerPhone: storedDetails.payerPhone || information.phone,
    cardNumber: storedDetails.cardNumber,
    cardExpiry: storedDetails.cardExpiry,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof PaymentDetails, string>>
  >({});

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

  const set = (key: keyof PaymentDetails, value: string) =>
    setDetails((prev) => ({ ...prev, [key]: value }));

  const handlePay = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validatePayment(method, details);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const order = createMockOrder({
      lines,
      subtotal: totals.subtotal,
      discount: totals.discount,
      discountCode: totals.discountCode,
      shippingFee: totals.shippingFee,
      shippingMethodId: totals.shippingMethodId,
      taxes: totals.taxes,
      total: totals.total,
      customerName: `${information.firstName} ${information.lastName}`.trim(),
      email: information.email,
      phone: information.phone,
      addressLine: information.address,
      city: information.city,
      country: information.country,
      paymentMethod: method,
    });

    setPaymentMethod(method);
    setPaymentDetails(details);
    clear();
    setLastOrderId(order.id);
    navigate(ROUTE_PATHS.checkoutConfirmation);
  };

  return (
    <CheckoutStepLayout step="paiement" title="Paiement">
      <form
        onSubmit={handlePay}
        noValidate
        className="space-y-5 rounded-xl border border-black-10 bg-white p-4 sm:p-6"
      >
        <PaymentMethods selected={method} onSelect={setMethod} />

        {(method === "mixx" || method === "flooz") && (
          <Field
            id="pay-phone"
            label={
              method === "mixx"
                ? "Numéro Mixx by Yas à débiter (simulé)"
                : "Numéro Flooz à débiter (simulé)"
            }
            error={errors.payerPhone}
            input={{
              type: "tel",
              value: details.payerPhone,
              autoComplete: "tel",
              placeholder: "+221 77 000 00 00",
              onChange: (e) => set("payerPhone", e.target.value),
            }}
          />
        )}

        {method === "visa" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="pay-card"
              label="Numéro de carte (simulé)"
              error={errors.cardNumber}
              input={{
                inputMode: "numeric",
                value: details.cardNumber,
                autoComplete: "cc-number",
                placeholder: "4242 4242 4242 4242",
                onChange: (e) => set("cardNumber", e.target.value),
              }}
            />
            <Field
              id="pay-expiry"
              label="Expiration MM/AA"
              error={errors.cardExpiry}
              input={{
                value: details.cardExpiry,
                autoComplete: "cc-exp",
                placeholder: "12/28",
                onChange: (e) => set("cardExpiry", e.target.value),
              }}
            />
          </div>
        )}

        {method === "cash" && (
          <p className="rounded-lg bg-black-5 p-3 text-sm text-black-70">
            Vous paierez {formatPrice(totals.total)} en espèces à la{" "}
            {shippingMethod.id === "retrait"
              ? "retrait en magasin"
              : "livraison"}
            .
          </p>
        )}

        <p className="text-xs text-black-60">{checkoutCopy.simulatedNotice}</p>

        <button
          type="submit"
          className="w-full rounded-md bg-black px-4 py-3 text-sm font-bold text-white hover:bg-black-80 sm:w-auto sm:px-8"
        >
          Payer {formatPrice(totals.total)} (simulé)
        </button>
      </form>
    </CheckoutStepLayout>
  );
}
