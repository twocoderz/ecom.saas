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
      <header className="glass-light backdrop-blur-md py-4 px-4 fixed top-0 left-0 w-full z-50 border-b border-slate-200/50 shadow-sm animate-fadeInDown">
        <div className="flex justify-between items-center container mx-auto max-w-7xl">
          {/* Logo avec gradient */}
          <div className="text-lg xl:text-2xl font-bold tracking-tight">
            <Link
              href="/"
              className="text-gradient hover:opacity-80 transition-opacity duration-300"
            >
              {logo}
            </Link>
          </div>

          {/* Barre de recherche (Desktop) */}
          <div className="hidden md:block w-2/5 lg:w-1/3 relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher des projets..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 text-slate-700 placeholder-slate-400 text-sm shadow-sm hover:shadow-md"
              />
              <button
                type="submit"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
              >
                <FaSearch className="text-base" />
              </button>
            </form>
          </div>

          {/* Bouton Hamburger avec animation */}
          <button
            className="md:hidden text-indigo-600 hover:text-indigo-700 focus:outline-none cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Menu Desktop - Navigation moderne */}
          <nav className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
            <Link
              href="/portfolio"
              className={`text-sm lg:text-base font-medium font-poppins px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/portfolio')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className={`text-sm lg:text-base font-medium font-poppins px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/about')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className={`text-sm lg:text-base font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
                isActive('/contact')
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white'
                  : 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-700 hover:to-indigo-600 hover:-translate-y-0.5'
              }`}
            >
              Nous contacter
            </Link>
          </nav>
        </div>
      </header>

      {/* Menu Mobile avec glassmorphism */}
      {isMenuOpen && (
        <div className="fixed top-20 left-0 w-full glass-dark z-40 shadow-2xl md:hidden animate-fadeInDown border-b border-white/10">
          <div className="p-6 flex flex-col gap-5">
            {/* Barre de recherche (Mobile) */}
            <form onSubmit={handleSearch} className="animate-fadeInUp">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher des projets..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300 text-white placeholder-slate-300 text-sm"
                />
                <button
                  type="submit"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                >
                  <FaSearch className="text-base" />
                </button>
              </div>
            </form>

            {/* Liens de navigation - Style moderne */}
            <nav className="flex flex-col space-y-2 animate-fadeInUp" style={{animationDelay: '100ms'}}>
              <Link
                href="/portfolio"
                onClick={toggleMenu}
                className={`px-4 py-3 rounded-lg transition-all duration-300 ease-out text-base font-medium ${
                  isActive('/portfolio')
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                onClick={toggleMenu}
                className={`px-4 py-3 rounded-lg transition-all duration-300 ease-out text-base font-medium ${
                  isActive('/about')
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                onClick={toggleMenu}
                className={`px-4 py-3 rounded-lg transition-all duration-300 ease-out text-base font-medium ${
                  isActive('/contact')
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-500 hover:shadow-lg'
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