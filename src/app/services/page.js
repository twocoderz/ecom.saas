import MainContent from "@/components/main/MainContent";
import Link from "next/link";
import servicesData from "@/data/services.json";

// Gradient colors for each service
const serviceColors = [
  {
    gradient: 'from-indigo-500 to-indigo-600',
    bg: 'from-indigo-50 to-indigo-100',
    border: 'border-indigo-200',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    text: 'text-indigo-600'
  },
  {
    gradient: 'from-cyan-500 to-cyan-600',
    bg: 'from-cyan-50 to-cyan-100',
    border: 'border-cyan-200',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    text: 'text-cyan-600'
  },
  {
    gradient: 'from-amber-500 to-amber-600',
    bg: 'from-amber-50 to-amber-100',
    border: 'border-amber-200',
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    text: 'text-amber-600'
  },
  {
    gradient: 'from-emerald-500 to-emerald-600',
    bg: 'from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    text: 'text-emerald-600'
  }
];

export default function Services() {
  return (
    <MainContent>
      <section className="p-6 w-full text-center">
        {/* Header Section */}
        <div className="mb-16">
          {/* Badge */}
          <div className="inline-block mb-6 animate-fadeInDown">
            <span className="glass-light backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-cyan-50 text-indigo-700 border border-indigo-200 shadow-md">
              💼 Ce que nous offrons
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 font-poppins animate-fadeInUp">
            <span className="text-gradient">Nos Services</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            Chez <span className="text-indigo-600 font-semibold">AZRATECH</span>, nous offrons une gamme complète de services pour transformer vos idées en{' '}
            <span className="relative inline-block">
              <span className="relative z-10">solutions numériques performantes</span>
              <span className="absolute bottom-1 left-0 w-full h-2 bg-cyan-200/50 -skew-y-1"></span>
            </span>
            .
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {servicesData.map((service, index) => {
            const colors = serviceColors[index % serviceColors.length];
            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${colors.bg} border ${colors.border} p-8 rounded-2xl card-hover overflow-hidden animate-fadeInUp`}
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                {/* Background decoration */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>

                {/* Icon */}
                <div className={`relative z-10 w-16 h-16 ${colors.iconBg} text-white p-4 rounded-2xl mb-6 mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center text-3xl`}>
                  {service.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h2 className={`text-xl font-bold ${colors.text} mb-4 font-poppins group-hover:scale-105 transition-transform duration-300`}>
                    {service.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                {/* Hover decoration */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${colors.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="relative max-w-2xl mx-auto mt-16 p-10 rounded-3xl bg-gradient-to-br from-slate-50 to-indigo-50 border border-indigo-100 shadow-xl animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-200/30 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Besoin d&apos;un service personnalisé ?
            </h3>
            <p className="text-slate-600 mb-6">
              Contactez-nous pour discuter de vos besoins spécifiques et découvrir comment nous pouvons vous aider.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactez-nous
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </MainContent>
  );
}