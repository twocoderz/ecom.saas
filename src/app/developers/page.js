import Link from "next/link";
import developersData from "@/data/developers.json";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter, FaCode } from "react-icons/fa";

export const metadata = {
  title: "Développeurs - twocoderz",
  description: "Rencontrez notre équipe de développeurs talentueux.",
};

export default function Developers() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
            Notre Équipe
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Nos <span className="text-gradient">Développeurs</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Rencontrez notre équipe talentueuse de développeurs, passionnés par la création de solutions numériques innovantes et évolutives.
          </p>
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {developersData.map((developer, index) => (
            <div
              key={index}
              className="card-premium p-6 flex items-start gap-4 group hover:border-emerald-500/30 transition-colors"
            >
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={developer.image}
                  alt={developer.name}
                  width={80}
                  height={80}
                  className="rounded-2xl object-cover border-2 border-emerald-500/30 group-hover:border-emerald-500 transition-colors"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {developer.name}
                </h2>
                <p className="text-emerald-400 text-sm font-medium mb-2">{developer.role}</p>
                <p className="text-gray-400 text-sm mb-3">{developer.description}</p>
                
                {/* Social Links */}
                <div className="flex items-center gap-2">
                  {developer.social?.github && (
                    <a 
                      href={developer.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                  )}
                  {developer.social?.linkedin && (
                    <a 
                      href={developer.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  )}
                  {developer.social?.twitter && (
                    <a 
                      href={developer.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                    >
                      <FaTwitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Vous voulez rejoindre notre équipe ?</p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FaCode className="w-4 h-4" />
            Rejoignez-nous
          </Link>
        </div>
      </div>
    </div>
  );
}
