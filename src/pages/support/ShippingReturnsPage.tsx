import { returnsPolicy, shippingPolicy } from "../../shared/data/support";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";

/**
 * Politiques livraison & retours : contenu reel, aligne sur les
 * methodes et frais du checkout.
 */
export function ShippingReturnsPage() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl space-y-8 py-8">
        <PageHeader
          title="Livraison et retours"
          subtitle="Délais, frais et conditions, sans surprise."
        />
        <section aria-label="Livraison" className="space-y-3">
          <h2 className="text-xl font-bold">Livraison</h2>
          {shippingPolicy.map((item) => (
            <article key={item.title} className="rounded-xl border border-black-10 bg-white p-4">
              <h3 className="font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-black-70">{item.body}</p>
            </article>
          ))}
        </section>
        <section aria-label="Retours" className="space-y-3">
          <h2 className="text-xl font-bold">Retours</h2>
          {returnsPolicy.map((item) => (
            <article key={item.title} className="rounded-xl border border-black-10 bg-white p-4">
              <h3 className="font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-black-70">{item.body}</p>
            </article>
          ))}
        </section>
      </div>
    </Container>
  );
}
