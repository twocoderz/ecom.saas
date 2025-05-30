import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactIntro() {
  return (
    <div className="flex flex-col items-center mb-6">
      <p className="text-sm md:text-base font-medium text-gray-600 mb-4 text-center max-w-sm">
        Un projet web ou mobile ? Contactez-nous pour une solution sur mesure !
      </p>
      <div className="flex space-x-4">
        <Link
          href="https://twitter.com/azratech"
          className="inline-block bg-gray-100 hover:bg-[#4F46E5] rounded-full border-2 border-gray-300 transition-all duration-300"
          aria-label="Suivez-nous sur Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="w-8 h-8 p-2 text-[#4F46E5] hover:text-[#E1E3E7]" />
        </Link>
        <Link
          href="https://linkedin.com/company/azratech"
          className="inline-block bg-gray-100 hover:bg-[#4F46E5] rounded-full border-2 border-gray-300 transition-all duration-300"
          aria-label="Visitez notre page LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="w-8 h-8 p-2 text-[#4F46E5] hover:text-[#E1E3E7]" />
        </Link>
        <Link
          href="https://github.com/azratech"
          className="inline-block bg-gray-100 hover:bg-[#4F46E5] rounded-full border-2 border-gray-300 transition-all duration-300"
          aria-label="Consultez notre GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-8 h-8 p-2 text-[#4F46E5] hover:text-[#E1E3E7]" />
        </Link>
      </div>
    </div>
  );
}