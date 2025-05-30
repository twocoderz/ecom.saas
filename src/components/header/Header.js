"use client";

import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function Header({ logo = "AZRATECH" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-[#E1E3E7] p-4 fixed top-0 left-0 w-full z-10 shadow-sm">
        <div className="flex justify-between items-center container mx-auto">
          {/* Logo */}
          <div className="text-md xl:text-lg bg-[#010100] text-[#E1E3E7] px-4 py-1 rounded-sm font-bold inter-font">
            <Link href="/">{logo}</Link>
          </div>

          {/* Barre de recherche */}
          <div className="hidden md:block w-1/3 relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-3 py-1 rounded-sm border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500"
            />
            <FaSearch className="absolute left-3 top-2 text-gray-500" />
          </div>

          {/* Bouton Hamburger et icone de fermeture pour (mobile) */}
          <button
            className="md:hidden text-gray-500 focus:outline-none cursor-pointer"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              // Icône de fermeture (croix)
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Icône menu hamburger
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Menu Desktop (a l'interieur du header fixe) */}
          <nav className="hidden md:flex md:items-center space-x-6">
            <Link
              href="/portfolio"
              className="text-sm lg:text-base text-[#4F46E5] font-medium hover:text-blue-400 hover:underline  font-poppins transition-all ease-in"
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className="text-sm lg:text-base text-[#4F46E5] font-medium hover:text-blue-400 hover:underline  font-poppins transition-all ease-in"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-sm lg:text-base font-medium inline-block border-2 border-[#4F46E5] text-[#4F46E5] px-4 py-1 rounded-sm hover:text-[#E1E3E7] hover:bg-blue-500 hover:border-blue-600 transition-colors duration-500 ease-out font-poppins"
            >
              Nous contacter
            </Link>
          </nav>
        </div>
      </header>
      {/* Menu Mobile (en dehors du header fixe) */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-[#5A5DE4] z-30 shadow-md md:hidden">
          <nav className="p-4 flex flex-col space-y-3">
            <Link
              href="/portfolio"
              onClick={toggleMenu}
              className="text-[#E1E3E7] hover:text-white transition-all duration-300 ease-out"
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              onClick={toggleMenu}
              className="text-[#E1E3E7] hover:text-white transition-all duration-800 ease-in"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="text-[#E1E3E7] hover:text-white transition-all duration-800 ease-in"
            >
              Nous contacter
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
