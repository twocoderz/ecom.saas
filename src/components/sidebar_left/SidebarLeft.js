import Link from "next/link";
import { FaRegFolder, FaCode, FaMobileAlt, FaShieldAlt, FaLaptopCode } from "react-icons/fa";
import projectsData from "../../data/projects.json";

export default function SidebarLeft() {
  const projectCount = projectsData.length;

  return (
    <aside className="bg-white mt-6 md:mt-0 p-6 rounded-sm shadow-sm">
      {/* Texte de bienvenue */}
      <div className="mb-6 flex flex-col gap-4 items-start">
        <p className="text-gray-800 text-lg md:text-xl lg:text-3xl xl:text-4xl font-bold font-poppins">
          AZRATECH : Vitrine de {projectCount} projets web et mobiles incroyables
        </p>
        <Link
          href="/contact"
          className="text-sm font-medium mt-4 inline-block bg-[#4F46E5] text-white px-4 py-1 rounded-sm hover:bg-blue-600"
        >
          Nous contacter
        </Link>
      </div>

      {/* Liens de navigation */}
      <nav className="flex flex-col gap-4">
        <Link
          href="/portfolio"
          className="text-sm lg:text-base block text-gray-700 hover:text-blue-600 flex gap-2 md:flex-row items-center hover:underline"
        >
          <FaRegFolder className="text-sm lg:text-lg" />
          Portfolio
        </Link>
        <Link
          href="/web"
          className="text-sm lg:text-base block text-gray-700 hover:text-blue-600 flex gap-2 md:flex-row items-center hover:underline"
        >
          <FaCode className="text-sm lg:text-lg" />
          Projets Web
        </Link>
        <Link
          href="/mobile"
          className="text-sm lg:text-base block text-gray-700 hover:text-blue-600 flex gap-2 md:flex-row items-center hover:underline"
        >
          <FaMobileAlt className="text-sm lg:text-lg" />
          Applications Mobiles
        </Link>
        <Link
          href="/services"
          className="text-sm lg:text-base block text-gray-700 hover:text-blue-600 flex gap-2 md:flex-row items-center hover:underline"
        >
          <FaShieldAlt className="text-sm lg:text-lg" />
          Services
        </Link>
        <Link
          href="/developers"
          className="text-sm lg:text-base block text-gray-700 hover:text-blue-600 flex gap-2 md:flex-row items-center hover:underline"
        >
          <FaLaptopCode className="text-sm lg:text-lg" />
          Développeurs
        </Link>
      </nav>
    </aside>
  );
}