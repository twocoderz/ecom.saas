import MainContent from "@/components/main/MainContent";
import Link from "next/link";
import developersData from "@/data/developers.json";
import Image from "next/image"; // Ajout de l'import

export default function Developers() {
  return (
    <MainContent>
      <section className="p-6 w-full text-center">
        <h1 className="lg:text-3xl text-2xl font-bold text-gray-800 mb-6 font-poppins">
          Nos Développeurs
        </h1>
        <p className="text-gray-600 mb-6">
          Rencontrez notre équipe talentueuse de développeurs, passionnés par la création de solutions numériques innovantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {developersData.map((developer, index) => (
            <div
              key={index}
              className="bg-gray-50 p-10 rounded-sm shadow-sm flex flex-col md:flex-row items-start gap-4"
            >
              <Image
                src={developer.image}
                alt={developer.name}
                width={96} // 24px * 4 (taille de base en pixels)
                height={96} // 24px * 4
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {developer.name}
                </h2>
                <p className="text-gray-600 font-medium">{developer.role}</p>
                <p className="text-gray-600">{developer.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="text-sm font-medium inline-block text-[#4F46E5] hover:text-blue-600 hover:underline" 
          >
            Rejoignez notre équipe
          </Link>
        </div>
      </section>
    </MainContent>
  );
}