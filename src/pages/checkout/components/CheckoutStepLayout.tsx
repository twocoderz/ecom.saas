import type { ReactNode } from "react";
import { CartSummary } from "../../../shared/components/checkout/CartSummary";
import {
  CheckoutStepper,
  type CheckoutStepId,
} from "../../../shared/components/checkout/CheckoutStepper";
import { Container } from "../../../shared/components/layout/Container";

/**
 * Coquille commune des etapes checkout : stepper actif + colonne
 * formulaire + recapitulatif partage.
 */
export function CheckoutStepLayout({
  step,
  title,
  children,
}: {
  step: CheckoutStepId;
  title: string;
  children: ReactNode;
}) {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <CheckoutStepper current={step} />
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          {children}
          <CartSummary mode="checkout" />
        </div>
      </div>
    </Container>
  );
}
