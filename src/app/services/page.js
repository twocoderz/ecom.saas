import MainContent from "@/components/main/MainContent";
import Link from "next/link";
import servicesData from "@/data/services.json";

export default function Services() {
  return (
    <MainContent>
      <section className="p-6 w-full text-center">
        <h1 className="lg:text-3xl text-2xl font-bold text-gray-800 mb-6 font-poppins">
          Nos Services
        </h1>
        <p className="text-gray-600 mb-6">
          Chez AZRATECH, nous offrons une gamme complète de services pour transformer vos idées en solutions numériques performantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <span className="text-4xl bg-[#1e3a8a] text-white p-4 rounded-full mb-4">{service.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 font-poppins">
                  {service.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="text-sm font-medium inline-block text-[#1e3a8a] hover:text-blue-600 hover:underline"
          >
            Contactez-nous pour en savoir plus
          </Link>
        </div>
      </section>
    </MainContent>
  );
}