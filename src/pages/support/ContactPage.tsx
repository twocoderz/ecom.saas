import { useState } from "react";
import { contactChannels } from "../../shared/data/support";
import { Container } from "../../shared/components/layout/Container";
import { PageHeader } from "../../shared/components/layout/PageHeader";

/**
 * Contact : canaux reels + formulaire simule (confirmation locale).
 */
export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Indiquez votre nom.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Adresse e-mail invalide.");
      return;
    }
    if (message.trim().length < 10) {
      setError("Décrivez votre demande en 10 caractères minimum.");
      return;
    }
    setError(null);
    setSent(true);
  };

  return (
    <Container>
      <div className="mx-auto max-w-3xl space-y-6 py-8">
        <PageHeader title={contactChannels.title} subtitle={contactChannels.intro} />

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl border border-black-10 bg-white p-4">
            <dt className="font-bold">E-mail</dt>
            <dd className="mt-1">
              <a href={`mailto:${contactChannels.email}`} className="underline underline-offset-2">
                {contactChannels.email}
              </a>
            </dd>
          </div>
          <div className="rounded-xl border border-black-10 bg-white p-4">
            <dt className="font-bold">Téléphone</dt>
            <dd className="mt-1">{contactChannels.phone}</dd>
          </div>
          <div className="rounded-xl border border-black-10 bg-white p-4">
            <dt className="font-bold">WhatsApp</dt>
            <dd className="mt-1">{contactChannels.whatsapp}</dd>
          </div>
          <div className="rounded-xl border border-black-10 bg-white p-4">
            <dt className="font-bold">Horaires & adresse</dt>
            <dd className="mt-1">
              {contactChannels.hours}
              <br />
              {contactChannels.address}
            </dd>
          </div>
        </dl>

        {sent ? (
          <p className="rounded-xl border border-black-10 bg-white p-4 text-sm" role="status">
            Merci {name.trim()} ! Votre message a bien été enregistré (simulé) :
            on vous répond sous 24 h ouvrées sur {email.trim()}.
          </p>
        ) : (
          <form
            onSubmit={submit}
            noValidate
            className="space-y-3 rounded-xl border border-black-10 bg-white p-4 sm:p-6"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Nom
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
                />
              </label>
              <label className="block text-sm font-semibold">
                E-mail
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
                />
              </label>
            </div>
            <label className="block text-sm font-semibold">
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-md border border-black-20 px-3 py-2.5 text-sm font-normal"
              />
            </label>
            {error && (
              <p className="text-xs font-semibold text-danger" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-black-80"
            >
              Envoyer
            </button>
          </form>
        )}
      </div>
    </Container>
  );
}
