"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    services: [
      { label: "Développement Web", href: "/web" },
      { label: "Applications Mobile", href: "/mobile" },
      { label: "Consulting", href: "/services" },
      { label: "Maintenance", href: "/services" },
    ],
    company: [
      { label: "À propos", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Équipe", href: "/developers" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Confidentialité", href: "#" },
      { label: "Conditions", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/107447199/", label: "LinkedIn", color: "hover:text-blue-500" },
    { icon: FaGithub, href: "https://github.com/twocoderz", label: "GitHub", color: "hover:text-white" },
  ];

  return (
    <footer className="relative bg-[#0a0f1c] border-t border-white/5">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.jpeg"
                  alt="twocoderz logo"
                  width={40}
                  height={40}
                  className="rounded-xl object-cover"
                />
              </div>
              <span className="text-xl font-bold font-display text-gradient">
                twocoderz
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Agence de développement web et mobile premium. Nous créons des expériences digitales exceptionnelles.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:aziamadjicrepin@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors">
                <FaEnvelope className="w-4 h-4" />
                <span>aziamadjicrepin@gmail.com</span>
              </a>
              <a href="tel:+22879812087" className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors">
                <FaPhone className="w-4 h-4" />
                <span>+228 79 81 20 87</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>Lomé, Togo</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} twocoderz. Tous droits réservés.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 ${social.color} hover:bg-white/10 transition-all duration-300`}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300"
            aria-label="Retour en haut"
          >
            <FaArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
