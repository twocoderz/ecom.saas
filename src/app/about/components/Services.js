import Link from "next/link";
import projectsData from "@/data/projects.json";

export default function Services() {
  const projectCount = projectsData.length;

  return (
    <div className="flex flex-col gap-4 items-center">
      <Link href="/services" className="group">
        <h2 className="text-lg md:text-xl xl:text-3xl font-bold font-poppins text-[#1e3a8a] text-center hover:text-blue-600 transition-colors duration-200">
          Nos services
        </h2>
        <span className="sr-only">En savoir plus sur nos services</span>
      </Link>
      <ul className="list-disc list-inside text-gray-600 font-semibold text-base space-y-2">
        <li>Plateformes e-commerce</li>
        <li>Applications de réservation</li>
        <li>Sites vitrines</li>
        <li>Solutions métiers sur mesure</li>
      </ul>
      <p className="text-base font-medium text-gray-600 text-center max-w-2xl">
        {projectCount} projets réalisés.
      </p>
    </div>
  );
}