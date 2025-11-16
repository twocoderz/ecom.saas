import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative gradient-hero overflow-hidden py-24 md:py-32 lg:py-40 px-4">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-40"></div>

      {/* Decorative Floating Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>

      {/* Content */}
      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-block mb-6 animate-fadeInDown">
          <span className="glass-light px-6 py-2 rounded-full text-sm font-medium text-white border border-white/30 shadow-lg">
            🚀 Innovation & Excellence
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins mb-6 text-white leading-tight animate-fadeInUp">
          Bienvenue chez{' '}
          <span className="inline-block relative">
            <span className="relative z-10">AZRATECH</span>
            <span className="absolute bottom-2 left-0 w-full h-4 bg-amber-400/30 -skew-y-1 blur-sm"></span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-slate-100 leading-relaxed animate-fadeInUp" style={{animationDelay: '200ms'}}>
          Experts en développement web et mobile.{' '}
          <span className="text-amber-300 font-semibold">Transformons vos idées</span>{' '}
          en solutions innovantes et performantes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fadeInUp" style={{animationDelay: '400ms'}}>
          <Link
            href="/services"
            className="group relative bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Nos Services
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link
            href="/contact"
            className="group relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-xl hover:shadow-2xl"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 border-2 border-white/50 rounded-xl"></span>
            <span className="relative z-10 text-white flex items-center gap-2">
              Contactez-nous
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fadeInUp" style={{animationDelay: '600ms'}}>
          <div className="glass-light backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <div className="text-3xl md:text-4xl font-bold text-amber-300 mb-2">4+</div>
            <div className="text-sm md:text-base text-slate-200">Projets Réalisés</div>
          </div>
          <div className="glass-light backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <div className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2">100%</div>
            <div className="text-sm md:text-base text-slate-200">Satisfaction Client</div>
          </div>
          <div className="glass-light backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <div className="text-3xl md:text-4xl font-bold text-indigo-300 mb-2">2+</div>
            <div className="text-sm md:text-base text-slate-200">Développeurs Experts</div>
          </div>
          <div className="glass-light backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <div className="text-3xl md:text-4xl font-bold text-emerald-300 mb-2">24/7</div>
            <div className="text-sm md:text-base text-slate-200">Support Disponible</div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full h-16 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#f8fafc"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#f8fafc"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f8fafc"></path>
        </svg>
      </div>
    </section>
  );
}