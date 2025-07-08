"use client";

import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ logo = "AZRATECH" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return pathname === path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/portfolio?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setIsMenuOpen(false); // ferme le menu mobile si ouvert
    }
  };

  return (
    <>
      <header className="bg-white p-4 fixed top-0 left-0 w-full z-10 shadow-sm">
        <div className="flex justify-between items-center container mx-auto">
          {/* le logo */}
          <div className="text-md xl:text-xl bg-white text-[#4F46E5] px-4 py-1 rounded-sm font-bold inter-font">
            <Link href="/">{logo}</Link>
          </div>

          {/* Barre de recherche (Desktop) */}
          <div className="hidden md:block w-1/3 relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher des projets..."
                className="w-full pl-10 pr-4 py-1 rounded-md border-none bg-[#EEF1F5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
              />
              <button 
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4F46E5] hover:text-blue-600 transition-colors duration-300"
              >
                <FaSearch className="text-sm" />
              </button>
            </form>
          </div>

          {/* Bouton Hamburger */}
          <button
            className="md:hidden text-[#4F46E5] focus:outline-none cursor-pointer"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Menu Desktop */}
          <nav className="hidden md:flex md:items-center space-x-6">
            <Link
              href="/portfolio"
              className={`text-sm lg:text-md font-medium font-poppins transition-all ease-in ${
                isActive('/portfolio') 
                  ? 'text-blue-400 underline' 
                  : 'text-[#4F46E5] hover:text-blue-400 hover:underline'
              }`}
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className={`text-sm lg:text-md font-medium font-poppins transition-all ease-in ${
                isActive('/about') 
                  ? 'text-blue-400 underline' 
                  : 'text-[#4F46E5] hover:text-blue-400 hover:underline'
              }`}
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className={`text-sm lg:text-md font-medium inline-block border-2 px-4 py-1 rounded-sm transition-colors duration-500 ease-out font-poppins ${
                isActive('/contact')
                  ? 'text-[#E1E3E7] bg-blue-500 border-blue-600'
                  : 'border-[#4F46E5] text-[#4F46E5] hover:text-[#E1E3E7] hover:bg-blue-500 hover:border-blue-600'
              }`}
            >
              Nous contacter
            </Link>
          </nav>
        </div>
      </header>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-[#5A5DE4] z-30 shadow-md md:hidden">
          <div className="p-4 flex flex-col gap-4">
            {/* Barre de recherche (Mobile) */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher des projets..."
                  className="w-full pl-10 pr-4 py-1 rounded-md border-none bg-[#EEF1F5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4F46E5] hover:text-blue-600 transition-colors duration-300"
                >
                  <FaSearch className="text-sm" />
                </button>
              </div>
            </form>

            {/* Liens de navigation */}
            <nav className="flex flex-col space-y-3">
              <Link
                href="/portfolio"
                onClick={toggleMenu}
                className={`transition-all duration-300 ease-out text-sm ${
                  isActive('/portfolio') 
                    ? 'text-white' 
                    : 'text-[#E1E3E7] hover:text-white'
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                onClick={toggleMenu}
                className={`transition-all duration-300 ease-out text-sm ${
                  isActive('/about') 
                    ? 'text-white' 
                    : 'text-[#E1E3E7] hover:text-white'
                }`}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                onClick={toggleMenu}
                className={`transition-all duration-300 ease-out text-sm ${
                  isActive('/contact') 
                    ? 'text-white' 
                    : 'text-[#E1E3E7] hover:text-white'
                }`}
              >
                Nous contacter
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}