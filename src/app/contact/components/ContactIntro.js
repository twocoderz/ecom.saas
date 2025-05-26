import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactIntro() {
  return (
    <div className="flex flex-col items-center mb-4">
      <p className="text-sm font-medium md:text-md text-gray-600 mb-4 text-center">
        Vous avez un projet web ou mobile ? Contactez-nous pour une solution sur
        mesure !
      </p>
      <div className="flex space-x-4">
        <Link
          href="https://twitter.com"
          className="inline-block bg-gray-100 hover:bg-[#4F46E5] rounded-full border border-2 border-gray-300 transition-all duration-400 ease-in"
          aria-label="Twitter"
        >
          <FaTwitter className="w-8 h-8 p-2 text-[#4F46E5] hover:text-[#E1E3E7]" />
        </Link>
        <Link
          href="https://linkedin.com"
          className="inline-block bg-gray-100 hover:bg-[#4F46E5] rounded-full border border-2 border-gray-300 transition-all duration-400 ease-in"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-8 h-8 p-2 text-[#4F46E5] hover:text-[#E1E3E7]" />
        </Link>
        <Link
          href="https://github.com"
          className="inline-block bg-gray-100 hover:bg-[#4F46E5] rounded-full border border-2 border-gray-300 transition-all duration-400 ease-in" // Ajout important pour la mise en page
          aria-label="GitHub"
        >
          <FaGithub className="w-8 h-8 p-2 text-[#4F46E5] hover:text-[#E1E3E7]" />
        </Link>
      </div>
    </div>
  );
}
