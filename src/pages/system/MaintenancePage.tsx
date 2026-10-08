import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../config/paths";
import { Container } from "../../shared/components/layout/Container";

/**
 * Maintenance nue (SystemLayout) : message + retour accueil.
 */
export function MaintenancePage() {
  return (
    <Container>
      <section aria-label="Maintenance en cours" className="mx-auto max-w-md space-y-3 py-16 text-center">
        <p className="text-5xl font-black">🛠</p>
        <h1 className="text-xl font-bold">Maintenance en cours</h1>
        <p className="text-sm text-black-70">
          La boutique revient très vite. Vos données locales (panier, compte)
          sont conservées dans votre navigateur.
        </p>
        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cursor-pointer rounded-md bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-black-80"
          >
            Vérifier le retour
          </button>
          <Link
            to={ROUTE_PATHS.help}
            className="rounded-md border border-black-20 px-4 py-2.5 text-sm font-semibold hover:border-black"
          >
            Contacter le support
          </Link>
        </div>
      </section>
    </Container>
  );
}
