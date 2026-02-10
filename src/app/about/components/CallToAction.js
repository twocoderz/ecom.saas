import Link from "next/link";
import { FaRocket, FaArrowRight } from "react-icons/fa";

export default function CallToAction() {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-16 mb-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-cyan-600 p-12 shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6 items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
            <FaRocket className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-white font-display">
            Prêt à démarrer votre projet ?
          </h3>

          {/* Description */}
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            Vous avez un projet en tête ? Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons transformer vos idées en réalité.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Nous contacter
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              Voir nos projets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
