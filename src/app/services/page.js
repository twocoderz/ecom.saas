import Link from "next/link";
import servicesData from "@/data/services.json";
import { FaArrowRight, FaGlobe, FaMobileAlt, FaTools, FaWrench } from "react-icons/fa";

const iconMap = {
  "🌐": FaGlobe,
  "📱": FaMobileAlt,
  "🛠️": FaTools,
  "🔧": FaWrench,
};

const serviceColors = [
  { gradient: "from-emerald-500 to-cyan-500", glow: "shadow-emerald-500/20" },
  { gradient: "from-cyan-500 to-blue-500", glow: "shadow-cyan-500/20" },
  { gradient: "from-purple-500 to-pink-500", glow: "shadow-purple-500/20" },
  { gradient: "from-amber-500 to-orange-500", glow: "shadow-amber-500/20" },
];

export const metadata = {
  title: "Services - twocoderz",
  description: "Découvrez nos services de développement web et mobile premium.",
};

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
            Nos Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Solutions digitales
            <span className="text-gradient"> complètes</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            De la conception au déploiement, nous accompagnons votre transformation digitale
            avec des services adaptés à vos besoins.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || FaGlobe;
            const colors = serviceColors[index % serviceColors.length];
            
            return (
              <div
                key={index}
                className="group card-premium card-glow p-8 lg:p-10 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-6 shadow-lg ${colors.glow} group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold font-display text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                  {service.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-sm">Fonctionnalité premium {item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-emerald-400 font-medium group/link"
                >
                  <span className="group-hover/link:underline">En savoir plus</span>
                  <FaArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>

                {/* Hover Border Effect */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${colors.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Notre <span className="text-gradient">processus</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une méthodologie éprouvée pour garantir le succès de vos projets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Découverte", desc: "Analyse de vos besoins et objectifs" },
              { step: "02", title: "Conception", desc: "Design et architecture de la solution" },
              { step: "03", title: "Développement", desc: "Codage et itérations agiles" },
              { step: "04", title: "Livraison", desc: "Déploiement et support continu" },
            ].map((item, index) => (
              <div key={index} className="card-premium p-6 text-center group hover:border-emerald-500/30 transition-colors">
                <div className="text-4xl font-bold font-display text-gradient mb-4">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="card-premium p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
              Prêt à démarrer votre projet ?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Démarrer un projet
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
