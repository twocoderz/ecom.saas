import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../shared/components/branding/Logo";
import { ROUTE_PATHS } from "../../config/paths";

/**
 * Mot de passe oublie : saisie e-mail + confirmation simulee (sans backend).
 */
export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    setSent(true);
  };

  return (
    <div className="bg-white">
      <header className="flex justify-center border-b border-black-10 py-4">
        <Logo />
      </header>
      <div className="mx-auto w-full max-w-md px-4 py-8 sm:py-10">
        <h1 className="text-xl font-bold text-black">MOT DE PASSE OUBLIÉ</h1>
        {sent ? (
          <div className="mt-6 rounded-md border border-black-10 p-4" role="status">
            <p className="text-sm">
              Si un compte existe pour <strong>{email.trim()}</strong>, un lien
              de réinitialisation vient d'être envoyé (simulé, sans backend).
            </p>
            <Link
              to={ROUTE_PATHS.auth}
              className="mt-4 inline-block text-sm font-semibold underline underline-offset-2"
            >
              Retour à la connexion
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-6">
            <p className="text-sm text-black-60">
              Saisissez votre e-mail : nous vous enverrons un lien de
              réinitialisation.
            </p>
            <label htmlFor="forgot-email" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              placeholder="Adresse e-mail"
              aria-invalid={error}
              className={`mt-4 w-full rounded-xs border bg-white px-3 py-3 text-sm ${
                error ? "border-danger" : "border-black-30"
              }`}
            />
            {error && (
              <p className="mt-1.5 text-xs font-semibold text-danger" role="alert">
                Veuillez saisir une adresse e-mail valide.
              </p>
            )}
            <button
              type="submit"
              className="mt-4 w-full cursor-pointer rounded-xs bg-primary px-4 py-3 text-sm font-bold text-black hover:brightness-95"
            >
              ENVOYER LE LIEN
            </button>
            <p className="mt-4 text-sm">
              <Link to={ROUTE_PATHS.auth} className="underline hover:text-black">
                Retour à la connexion
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
