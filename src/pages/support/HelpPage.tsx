import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { helpFaq } from "../../shared/data/support";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";

/**
 * Centre d'aide : FAQ reelle + acces suivi, livraison, contact.
 */
export function HelpPage() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl space-y-6 py-8">
        <PageHeader
          title="Aide / FAQ"
          subtitle="Les réponses aux questions les plus fréquentes."
        />
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            to={ROUTE_PATHS.orderTracking}
            className="rounded-md border border-black-20 px-3 py-2 font-semibold hover:border-black"
          >
            Suivre ma commande
          </Link>
          <Link
            to={ROUTE_PATHS.shippingReturns}
            className="rounded-md border border-black-20 px-3 py-2 font-semibold hover:border-black"
          >
            Livraison & retours
          </Link>
          <Link
            to={ROUTE_PATHS.contact}
            className="rounded-md border border-black-20 px-3 py-2 font-semibold hover:border-black"
          >
            Nous contacter
          </Link>
        </div>
        <div className="divide-y divide-black-10 rounded-xl border border-black-10 bg-white">
          {helpFaq.map((item) => (
            <details key={item.question} className="group px-4 py-3">
              <summary className="cursor-pointer list-none font-bold [&::-webkit-details-marker]:hidden">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-black-70">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Container>
  );
}
