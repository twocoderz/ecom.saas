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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-sm shadow-sm flex flex-col md:flex-row items-center md:items-start gap-4"
            >
              <span className="text-3xl bg-[#EEF1F5] p-3 rounded-full">{service.icon}</span>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="text-sm font-medium inline-block text-[#4F46E5] hover:text-blue-600 hover:underline"
          >
            Contactez-nous pour en savoir plus
          </Link>
        </div>
      </section>
    </MainContent>
  );
}