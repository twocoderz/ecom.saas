import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
          Bienvenue chez AZRATECH
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Experts en développement web et mobile. Transformons vos idées en solutions innovantes et performantes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="bg-white text-[#1e3a8a] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Nos Services
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1e3a8a] transition-colors duration-300"
          >
            Contactez-nous
          </Link>
        </div>
      </div>
    </section>
  );
}