import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1e3a8a] text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-poppins">AZRATECH</h3>
            <p className="text-gray-300 mb-4">
              Experts en développement web et mobile. Transformons vos idées en solutions innovantes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4 mb-4">
              <Link
                href="https://twitter.com"
                className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com"
                className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </Link>
            </div>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#1e3a8a] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2025 AZRATECH - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
