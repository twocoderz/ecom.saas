import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import { FaHeadset } from "react-icons/fa";

export const metadata = {
  title: "Contact - twocoderz",
  description: "Contactez twocoderz pour discuter de votre projet web ou mobile.",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Parlons de votre <span className="text-gradient">projet</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous ou contactez-nous directement.
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        {/* Contact Section - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Form */}
          <div className="card-premium p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-display text-white mb-3 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full" />
                Envoyez-nous un message
              </h2>
              <p className="text-gray-400">
                Remplissez le formulaire et nous vous répondrons rapidement.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Right Column - Contact Info */}
          <div className="flex flex-col gap-6">
            {/* Contact Info Card */}
            <div className="card-premium p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold font-display text-white mb-6 flex items-center gap-3">
                  <FaHeadset className="w-6 h-6 text-emerald-400" />
                  Informations de contact
                </h3>
                <ContactInfo />
              </div>
            </div>

            {/* Quick Response Card */}
            <div className="card-premium p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Réponse rapide</h4>
              <p className="text-gray-400 text-sm">
                Nous répondons généralement sous 24 heures ouvrées.
              </p>
            </div>

            {/* Working Hours Card */}
            <div className="card-premium p-8">
              <h4 className="text-lg font-bold text-white mb-4">Heures de travail</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Lundi - Vendredi</span>
                  <span className="text-white">9h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Samedi</span>
                  <span className="text-white">10h - 14h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dimanche</span>
                  <span className="text-emerald-400">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
