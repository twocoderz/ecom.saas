import MainContent from "@/components/main/MainContent";
import Link from "next/link";

export default function Developers() {
  const developers = [
    {
      name: "Jean Dupont",
      role: "Développeur Full Stack",
      description: "Expert en React, Next.js et Node.js avec 8 ans d'expérience.",
      image: "/images/developer1.jpg",
    },
    {
      name: "Marie Lefèvre",
      role: "Développeuse Mobile",
      description: "Spécialiste en Flutter et développement d'applications iOS/Android.",
      image: "/images/developer2.jpg",
    },
    {
      name: "Pierre Martin",
      role: "Architecte Logiciel",
      description: "Conçoit des solutions évolutives pour des projets complexes.",
      image: "/images/developer3.jpg",
    },
  ];

  return (
    <MainContent>
      <section className="bg-white p-6 rounded-sm shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">
          Nos Développeurs
        </h1>
        <p className="text-gray-600 mb-6">
          Rencontrez notre équipe talentueuse de développeurs, passionnés par la création de solutions numériques innovantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {developers.map((developer, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-sm shadow-sm flex items-start gap-4"
            >
              <img
                src={developer.image}
                alt={developer.name}
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
        <div className="mt-6 text-center">
          <Link
            href="/contact"
            className="inline-block bg-[#4F46E5] text-white px-4 py-2 rounded-sm hover:bg-blue-600"
          >
            Rejoignez notre équipe
          </Link>
        </div>
      </section>
    </MainContent>
  );
}