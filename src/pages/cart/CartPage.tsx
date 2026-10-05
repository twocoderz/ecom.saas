import { Link } from "react-router-dom";
import { CartSummary } from "../../shared/components/checkout/CartSummary";
import { Container } from "../../shared/components/layout/Container";
import { Section } from "../../shared/components/layout/Section";
import { QuantityStepper } from "../../shared/components/ui/QuantityStepper";
import { ProductGrid } from "../../shared/components/catalog/ProductGrid";
import { Price } from "../../shared/components/ui/Price";
import { useCartStore } from "../../stores/useCartStore";
import { CartEmpty } from "./components/CartEmpty";

/**
 * Page panier : lignes reelles depuis le store + resume promo.
 */
export function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const setQty = useCartStore((s) => s.setQty);
  const removeLine = useCartStore((s) => s.removeLine);

  return (
    <Container>
      <div className="space-y-6 py-8">
        {lines.length === 0 ? (
          <div className="space-y-8 sm:space-y-10">
            <CartEmpty />
            <Section title="Tendances actuelles">
              <ProductGrid layout="rail" cardVariant="compact" />
            </Section>
            <Section title="Nos coups de cœur">
              <ProductGrid layout="rail" />
            </Section>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <section
              aria-label="Panier"
              className="divide-y divide-black-10 rounded-xl border border-black-10 bg-white"
            >
              {lines.map((line) => (
                <div
                  key={`${line.productId}-${line.variantId ?? "base"}`}
                  className="flex gap-4 p-4"
                >
                  <img
                    src={line.image}
                    alt={line.name}
                    className="h-20 w-20 shrink-0 rounded-md bg-black-5 object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {line.name}
                    </p>
                    <p className="mt-1 text-sm text-black-60">
                      <Price amount={line.unitPrice} />
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <QuantityStepper
                        qty={line.qty}
                        onChange={(qty) =>
                          setQty(line.productId, line.variantId, qty)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeLine(line.productId, line.variantId)
                        }
                        className="text-xs font-semibold text-black-60 underline hover:text-black"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-bold">
                    <Price amount={line.unitPrice * line.qty} />
                  </p>
                </div>
              ))}
            </section>
            <CartSummary />
          </div>
        )}
        {lines.length > 0 && (
          <p className="text-sm">
            <Link to="/" className="font-semibold underline">
              Continuer mes achats
            </Link>
          </p>
        )}
      </div>
    </Container>
  );
}
