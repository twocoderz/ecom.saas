import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../shared/components/branding/Logo";
import { useAuthStore } from "../../stores/useAuthStore";
import { ROUTE_PATHS } from "../../config/paths";

/**
 * Page de connexion autonome (sans header ni footer) : e-mail seul,
 * CTA couleur primaire, puis bloc inscription. Démo sans backend :
 * test@shop.com ou admin@shop.admin pour tester /admin.
 */
export function AuthPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const signIn = useAuthStore((s) => s.signIn);
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setEmailError(true);
      return;
    }
    signIn(email);
    navigate(ROUTE_PATHS.accountDashboard);
  };

  const focusEmail = () => {
    emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    emailRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="bg-white">
      <header className="flex justify-center border-b border-black-10 py-4">
        <Logo />
      </header>

      <div className="mx-auto w-full max-w-md px-4 py-8 text-center sm:py-10">
        <h1 className="text-xl font-bold text-black">SE CONNECTER</h1>
        <p className="mt-2 text-sm max-w-xs mx-auto text-black-60">
          Accédez à votre compte et profitez de tous vos avantages.
        </p>

        {user ? (
          <section className="mt-6 rounded-md border border-black-10 p-4">
            <p className="text-sm">
              Connecté en tant que <strong>{user.email}</strong> ({user.role}).
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to={ROUTE_PATHS.accountDashboard}
                className="flex min-h-[44px] items-center justify-center rounded-xs bg-primary px-4 py-3 text-sm font-bold text-black transition-all hover:brightness-95"
              >
                Accéder à mon compte
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="min-h-[44px] cursor-pointer rounded-xs border border-black px-4 py-3 text-sm font-bold transition-colors hover:bg-black hover:text-white"
              >
                Se déconnecter
              </button>
            </div>
          </section>
        ) : (
          <form onSubmit={submit} noValidate className="mt-6 text-left">
            <label htmlFor="auth-email" className="sr-only">
              Adresse e-mail
            </label>
            <input
              ref={emailRef}
              id="auth-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              placeholder="Adresse e-mail"
              aria-invalid={emailError}
              className={`w-full rounded-xs border bg-white px-3 py-3 text-sm text-black placeholder:text-black-60 ${
                emailError ? "border-danger" : "border-black-30"
              }`}
            />
            {emailError && (
              <p
                className="mt-1.5 text-xs font-semibold text-danger"
                role="alert"
              >
                Veuillez saisir une adresse e-mail valide.
              </p>
            )}
            <button
              type="submit"
              className="mt-4 flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-xs bg-primary px-4 py-3 text-sm font-bold text-black transition-all hover:brightness-95"
            >
              CONTINUER
            </button>
            <p className="mt-4 text-xs leading-relaxed text-black-60">
              Ce site est protégé par reCAPTCHA et la{" "}
              <Link
                to={ROUTE_PATHS.privacyPolicy}
                className="underline hover:text-black"
              >
                Politique de confidentialité
              </Link>{" "}
              ainsi que les{" "}
              <Link
                to={ROUTE_PATHS.terms}
                className="underline hover:text-black"
              >
                Conditions d&apos;utilisation
              </Link>{" "}
              de Google s&apos;appliquent.
            </p>
          </form>
        )}
      </div>

      {!user && (
        <section className="border-t border-black-10">
          <div className="mx-auto w-full max-w-md px-4 py-8 text-center sm:py-10">
            <h2 className="text-lg font-bold text-black">
              PAS ENCORE DE COMPTE&nbsp;?
            </h2>
            <p className="mt-2 text-sm max-w-sm mx-auto text-black-60">
              Créez votre compte dès aujourd&apos;hui et commencez à cumuler.
              <br />
              Gagnez 10 points pour chaque 1&nbsp;000&nbsp;F dépensé.
            </p>
            <button
              type="button"
              onClick={focusEmail}
              className="mt-8 flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-[2px] border border-black bg-white px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
            >
              S&apos;INSCRIRE
            </button>
            <p className="mt-4 text-sm">
              <Link
                to={ROUTE_PATHS.help}
                className="underline hover:text-black"
              >
                En savoir plus
              </Link>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
