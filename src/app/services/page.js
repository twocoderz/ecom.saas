import MainContent from "@/components/main/MainContent";
import Link from "next/link";
import servicesData from "@/data/services.json";

export default function Services() {
  return (
    <MainContent>
      <section className="bg-white p-6 rounded-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">
          Nos Services
        </h1>
        <p className="text-gray-600 mb-6">
          Chez AZRATECH, nous offrons une gamme complète de services pour transformer vos idées en solutions numériques performantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service, index) => (
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