import MainContent from "@/components/main/MainContent";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      title: "Développement Web",
      description: "Création de sites web modernes, responsives et optimisés pour le SEO, allant des vitrines aux plateformes e-commerce complexes.",
      icon: "🌐",
    },
    {
      title: "Développement Mobile",
      description: "Conception d'applications mobiles natives et hybrides pour iOS et Android, avec une attention particulière à l'expérience utilisateur.",
      icon: "📱",
    },
    {
      title: "Consulting Technique",
      description: "Accompagnement dans la stratégie numérique, l'architecture logicielle et l'optimisation des performances.",
      icon: "🛠️",
    },
    {
      title: "Maintenance et Support",
      description: "Services de maintenance pour assurer la sécurité, la mise à jour et la performance continue de vos projets.",
      icon: "🔧",
    },
  ];

  return (
    <MainContent>
      <section className="bg-white p-6 rounded-sm shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">
          Nos Services
        </h1>
        <p className="text-gray-600 mb-6">
          Chez AZRATECH, nous offrons une gamme complète de services pour transformer vos idées en solutions numériques performantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-sm shadow-sm flex items-start gap-4"
            >
              <span className="text-3xl">{service.icon}</span>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/contact"
            className="inline-block bg-[#4F46E5] text-white px-4 py-2 rounded-sm hover:bg-blue-600"
          >
            Contactez-nous pour en savoir plus
          </Link>
        </div>
      </section>
    </MainContent>
  );
}