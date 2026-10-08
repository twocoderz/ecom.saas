import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { Container } from "../../shared/components/layout/Container";

/**
 * 500 nue (SystemLayout) : message + reessai + retour accueil.
 */
export function ErrorPage() {
  return (
    <Container>
      <section aria-label="Erreur serveur" className="mx-auto max-w-md space-y-3 py-16 text-center">
        <p className="text-5xl font-black">500</p>
        <h1 className="text-xl font-bold">Un problème est survenu</h1>
        <p className="text-sm text-black-70">
          Erreur inattendue. Réessayez dans un instant : votre panier est conservé.
        </p>
        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cursor-pointer rounded-md bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-black-80"
          >
            Réessayer
          </button>
          <Link
            to={ROUTE_PATHS.home}
            className="rounded-md border border-black-20 px-4 py-2.5 text-sm font-semibold hover:border-black"
          >
            Retour à l'accueil
          </Link>
        </div>
      </section>
    </Container>
  );
}
