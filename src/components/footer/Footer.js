import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white pt-16 pb-8 mt-20 overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-20"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-amber-500"></div>
      <div className="absolute -top-20 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 font-poppins text-gradient bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              AZRATECH
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Experts en développement web et mobile. Transformons vos idées en solutions innovantes.
            </p>
            {/* Badge */}
            <div className="inline-block glass-light backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium border border-white/30">
              🚀 Innovation First
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-cyan-500 rounded-full"></span>
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="group inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/services" className="group inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="group inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-amber-500 rounded-full"></span>
              Services
            </h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                Développement Web
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Applications Mobile
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Consulting Technique
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Maintenance & Support
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-indigo-500 rounded-full"></span>
              Suivez-nous
            </h4>
            <div className="flex gap-3 mb-6">
              <Link
                href="https://twitter.com"
                className="group relative w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 border border-white/10 hover:border-cyan-400/50"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="group relative w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 border border-white/10 hover:border-indigo-400/50"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
              </Link>
              <Link
                href="https://github.com"
                className="group relative w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 border border-white/10 hover:border-slate-400/50"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
              </Link>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Nous contacter
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Copyright & Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; 2025 AZRATECH - Tous droits réservés
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <span className="text-slate-600">•</span>
            <Link href="#" className="hover:text-white transition-colors">Conditions d&apos;utilisation</Link>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Créé avec <span className="text-red-400">❤️</span> par l&apos;équipe AZRATECH
          </p>
        </div>
      </div>
    </footer>
  );
}
