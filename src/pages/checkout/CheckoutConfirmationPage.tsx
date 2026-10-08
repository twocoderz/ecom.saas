import { Link, Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { formatPrice } from "../../lib/currency";
import { getMockOrderById } from "../../data/api/shopApi";
import { useCheckoutStore } from "../../stores/useCheckoutStore";
import { checkoutCopy, getShippingMethod } from "../../shared/data/checkout";
import { Container } from "../../shared/components/layout/Container";
import { CheckoutStepper } from "../../shared/components/checkout/CheckoutStepper";
import { Price } from "../../shared/components/ui/Price";

/**
 * Etape finale : confirmation avec numero de commande reel (mock
 * persiste) + recapitulatif. Rejouable apres refresh via `lastOrderId`.
 * Sans commande : retour au panier.
 */
export function CheckoutConfirmationPage() {
  const lastOrderId = useCheckoutStore((s) => s.lastOrderId);
  const order = lastOrderId ? getMockOrderById(lastOrderId) : null;

  if (!order) {
    return <Navigate to={ROUTE_PATHS.cart} replace />;
  }

  const shippingMethod = getShippingMethod(
    order.shippingMethodId ?? "standard",
  );

  return (
    <Container>
      <div className="mx-auto max-w-2xl space-y-6 py-8">
        <CheckoutStepper current="confirmation" />

        <section
          aria-label="Confirmation de commande"
          className="rounded-xl border border-black-10 bg-white p-6 text-center"
        >
          <p
            aria-hidden="true"
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-xl font-bold text-white"
          >
            ✓
          </p>
          <h1 className="mt-3 text-2xl font-bold">
            Merci pour votre commande !
          </h1>
          <p className="mt-2 text-sm text-black-70">
            Commande <strong className="text-black">{order.id}</strong> — Total{" "}
            <Price amount={order.total} />. Un e-mail récapitulatif a été envoyé
            à {order.email ?? "votre adresse"} (simulé).
          </p>
          <p className="mt-1 text-xs text-black-60">
            {checkoutCopy.simulatedNotice}
          </p>
        </section>

        <section
          aria-label="Récapitulatif"
          className="rounded-xl border border-black-10 bg-white p-6"
        >
          <h2 className="text-base font-bold">Récapitulatif</h2>
          <ul className="mt-3 divide-y divide-black-10 text-sm">
            {order.lines.map((line, index) => (
              <li
                key={`${line.product_id}-${index}`}
                className="flex justify-between gap-3 py-2"
              >
                <span>
                  {line.name}{" "}
                  <span className="text-black-60">× {line.qty}</span>
                </span>
                <span className="font-semibold">
                  <Price amount={line.unit_price * line.qty} />
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-black-60">Sous-total</dt>
              <dd className="font-semibold">
                <Price amount={order.subtotal ?? order.total} />
              </dd>
            </div>
            {(order.discount ?? 0) > 0 && (
              <div className="flex justify-between text-green-700">
                <dt>Remise ({order.discountCode})</dt>
                <dd className="font-semibold">
                  −<Price amount={order.discount ?? 0} />
                </dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-black-60">
                Livraison ({shippingMethod.name})
              </dt>
              <dd className="font-semibold">
                {(order.shippingFee ?? 0) === 0 ? (
                  checkoutCopy.freeShipping
                ) : (
                  <Price amount={order.shippingFee ?? 0} />
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black-60">{checkoutCopy.taxesLabel}</dt>
              <dd className="font-semibold">
                <Price amount={order.taxes ?? 0} />
              </dd>
            </div>
            <div className="flex justify-between border-t border-black-10 pt-2 text-base font-bold">
              <dt>Total payé</dt>
              <dd>
                <Price amount={order.total} />
              </dd>
            </div>
          </dl>
          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-black-5 p-3">
              <p className="font-bold">Livraison</p>
              <p className="mt-1 text-black-70">
                {order.customerName}
                <br />
                {order.addressLine}, {order.city}
                <br />
                {shippingMethod.name} — {shippingMethod.delay}
              </p>
            </div>
            <div className="rounded-lg bg-black-5 p-3">
              <p className="font-bold">Paiement</p>
              <p className="mt-1 text-black-70">
                {formatPrice(order.total)} via {order.paymentMethod} (simulé)
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            to={ROUTE_PATHS.home}
            className="rounded-md bg-black px-4 py-3 text-center text-sm font-bold text-white hover:bg-black-80"
          >
            {checkoutCopy.continueShopping}
          </Link>
          <Link
            to={ROUTE_PATHS.orderTracking}
            className="rounded-md border border-black-20 px-4 py-3 text-center text-sm font-semibold hover:border-black"
          >
            Suivre ma commande
          </Link>
          <Link
            to={ROUTE_PATHS.accountOrders}
            className="rounded-md border border-black-20 px-4 py-3 text-center text-sm font-semibold hover:border-black"
          >
            Mes commandes
          </Link>
        </div>
      </div>
    </Container>
  );
}
