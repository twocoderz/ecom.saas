import teamData from "@/data/team.json";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Team() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20">
        Notre Équipe
      </span>
      
      <h2 className="text-3xl sm:text-4xl font-bold font-display text-white text-center">
        Les <span className="text-gradient">talents</span> derrière twocoderz
      </h2>
      
      <p className="text-gray-400 text-center max-w-2xl">
        Notre équipe réunit des experts passionnés en développement, design et gestion de projet, 
        dédiés à concrétiser vos idées.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full mt-8">
        {teamData.map((member, index) => (
          <div 
            key={index} 
            className="card-premium p-6 flex items-center gap-4 group hover:border-emerald-500/30 transition-colors"
          >
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-emerald-400">
                {member.name.charAt(0)}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {member.name}
              </h3>
              <p className="text-emerald-400 text-sm mb-3">{member.role}</p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                  <FaGithub className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
