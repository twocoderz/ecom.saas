import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../config/paths";

export type CheckoutStepId =
  | "informations"
  | "livraison"
  | "paiement"
  | "confirmation";

const STEPS: Array<{ id: CheckoutStepId; label: string; to: string | null }> = [
  { id: "informations", label: "Informations", to: ROUTE_PATHS.checkoutInfo },
  { id: "livraison", label: "Livraison", to: ROUTE_PATHS.checkoutShipping },
  { id: "paiement", label: "Paiement", to: ROUTE_PATHS.checkoutPayment },
  { id: "confirmation", label: "Confirmation", to: null },
];

/**
 * Indicateur de progression du tunnel : etape courante (`aria-current`),
 * etapes terminees cliquables (retour en arriere), suivantes non liees.
 */
export function CheckoutStepper({ current }: { current: CheckoutStepId }) {
  const currentIndex = STEPS.findIndex((step) => step.id === current);

  return (
    <nav aria-label="Progression de la commande">
      <ol className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
        {STEPS.map((step, index) => {
          const position = index + 1;
          const isCurrent = step.id === current;
          const isDone = index < currentIndex;

          return (
            <li
              key={step.id}
              className={
                isCurrent
                  ? "font-bold text-black"
                  : isDone
                    ? "text-black-80"
                    : "text-black-40"
              }
            >
              <span aria-hidden="true">{position}. </span>
              {isCurrent ? (
                <span aria-current="step">{step.label}</span>
              ) : isDone && step.to ? (
                <Link
                  to={step.to}
                  className="underline underline-offset-2 hover:text-black"
                >
                  {step.label}
                </Link>
              ) : (
                <span aria-disabled="true">{step.label}</span>
              )}
              {index < STEPS.length - 1 && (
                <span aria-hidden="true" className="ml-3 text-black-20">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
