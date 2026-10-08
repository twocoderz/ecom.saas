import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { Container } from "../../shared/components/layout/Container";

/**
 * 404 nue (SystemLayout : sans header/footer/newsletter) + CTA retour.
 */
export function NotFoundPage() {
  return (
    <Container>
      <section aria-label="Page introuvable" className="mx-auto max-w-md space-y-3 py-16 text-center">
        <p className="text-5xl font-black">404</p>
        <h1 className="text-xl font-bold">Page introuvable</h1>
        <p className="text-sm text-black-70">
          L'adresse demandée n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-center">
          <Link
            to={ROUTE_PATHS.home}
            className="rounded-md bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-black-80"
          >
            Retour à l'accueil
          </Link>
          <Link
            to={ROUTE_PATHS.help}
            className="rounded-md border border-black-20 px-4 py-2.5 text-sm font-semibold hover:border-black"
          >
            Centre d'aide
          </Link>
        </div>
      </section>
    </Container>
  );
}
