import ContactIntro from "./components/ContactIntro";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";

export default function Contact() {
  return (
    <div className="md:col-span-2 w-full min-h-screen flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-block mb-6 animate-fadeInDown">
            <span className="glass-light backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-cyan-50 text-indigo-700 border border-indigo-200 shadow-md">
              📬 Restons en contact
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold font-poppins mb-6 animate-fadeInUp">
            <span className="text-gradient">Nous contacter</span>
          </h1>

          <ContactIntro />
        </div>

        {/* Contact Section - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Form */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-xl card-hover-glow animate-fadeInUp" style={{animationDelay: '200ms'}}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-3 font-poppins flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-cyan-500 rounded-full"></span>
                Envoyez-nous un message
              </h2>
              <p className="text-slate-600">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Right Column - Contact Info */}
          <div className="flex flex-col gap-6 animate-fadeInUp" style={{animationDelay: '300ms'}}>
            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-600 rounded-3xl p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 font-poppins flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Informations de contact
                </h3>
                <ContactInfo />
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-gradient-to-br from-slate-50 to-indigo-50 border border-indigo-100 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4 font-poppins flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Liens rapides
              </h3>
              <div className="space-y-3">
                <a href="/portfolio" className="group flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Voir notre portfolio
                </a>
                <a href="/services" className="group flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Nos services
                </a>
                <a href="/about" className="group flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  À propos de nous
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}