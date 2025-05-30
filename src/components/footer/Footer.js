import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#E1E3E7] p-6 mt-8">
      <div className="container mx-auto flex flex-col gap-4 md:flex-row justify-between items-center">
        {/* Copyright */}
        <p className="text-sm md:text-base">
          &copy; 2025 AZRATECH - Tous droits réservés
        </p>

        {/* Liens réseaux sociaux */}
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

        {/* Lien Contact */}
        <Link
          href="/contact"
          className="text-sm font-medium inline-block bg-[#4F46E5] text-white px-4 py-1 rounded-sm hover:bg-blue-600"
        >
          Nous contacter
        </Link>
      </div>
    </footer>
  );
}
