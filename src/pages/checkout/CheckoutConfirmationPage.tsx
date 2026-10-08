import { Link, Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { getMockOrderById } from "../../data/api/shopApi";
import { useCheckoutStore } from "../../stores/useCheckoutStore";
import { checkoutCopy } from "../../shared/data/checkout";
import { Container } from "../../shared/components/layout/Container";
import { CheckoutStepper } from "../../shared/components/checkout/CheckoutStepper";
import { OrderDetailView } from "../../shared/components/account/OrderDetailView";
import { Price } from "../../shared/components/ui/Price";

/**
 * Etape finale : confirmation avec numero de commande reel (mock
 * persiste) + recapitulatif partage. Rejouable apres refresh via
 * `lastOrderId`. Sans commande : retour au panier.
 */
export function CheckoutConfirmationPage() {
  const lastOrderId = useCheckoutStore((s) => s.lastOrderId);
  const order = lastOrderId ? getMockOrderById(lastOrderId) : null;

  if (!order) {
    return <Navigate to={ROUTE_PATHS.cart} replace />;
  }

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
          <h1 className="mt-3 text-2xl font-bold">Merci pour votre commande !</h1>
          <p className="mt-2 text-sm text-black-70">
            Commande <strong className="text-black">{order.id}</strong> — Total{" "}
            <Price amount={order.total} />. Un e-mail récapitulatif a été envoyé
            à {order.email ?? "votre adresse"} (simulé).
          </p>
          <p className="mt-1 text-xs text-black-60">
            {checkoutCopy.simulatedNotice}
          </p>
        </section>

        <OrderDetailView order={order} />

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
