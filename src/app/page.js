import HeroSection from "../components/main/HeroSection";
import ServicesSection from "../components/main/ServicesSection";
import Testimonials from "../components/main/Testimonials";
import FeaturedProject from "../components/main/FeaturedProject";
import projectsData from "../data/projects.json";
import Link from "next/link";
import { FaArrowRight, FaRocket, FaUsers, FaAward } from "react-icons/fa";

export default function Home() {
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Choose Us Section */}
      <section className="relative py-32 bg-[#0a0f1c] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] -translate-y-1/2" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
                Pourquoi nous choisir ?
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-6">
                Une équipe passionnée à
                <span className="text-gradient"> votre service</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Chez twocoderz, nous croyons que chaque projet mérite une attention particulière.
                Notre approche combine expertise technique et créativité pour livrer des solutions qui dépassent vos attentes.
              </p>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <FaRocket className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Livraison rapide</h4>
                    <p className="text-gray-400 text-sm">Méthodologies agiles pour des délais optimisés sans compromis sur la qualité.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <FaUsers className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Équipe d&apos;experts</h4>
                    <p className="text-gray-400 text-sm">Des développeurs expérimentés passionnés par les technologies de pointe.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <FaAward className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Qualité garantie</h4>
                    <p className="text-gray-400 text-sm">Tests rigoureux et assurance qualité pour des applications performantes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
                
                {/* Main Card */}
                <div className="relative glass-card rounded-3xl p-8 h-full flex flex-col justify-center items-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                      <svg viewBox="0 0 100 100" className="w-16 h-16">
                        <text x="50" y="70" textAnchor="middle" fill="white" fontSize="60" fontWeight="bold" fontFamily="Space Grotesk">2</text>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold font-display text-white mb-2">twocoderz</h3>
                    <p className="text-emerald-400">Innovation • Excellence • Passion</p>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -top-4 -right-4 glass-card rounded-xl p-4 animate-float">
                    <div className="text-2xl font-bold text-emerald-400">50+</div>
                    <div className="text-xs text-gray-400">Projets</div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4 animate-float" style={{ animationDelay: "1s" }}>
                    <div className="text-2xl font-bold text-cyan-400">100%</div>
                    <div className="text-xs text-gray-400">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative py-32 bg-[#0a0f1c] overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[200px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20">
                Portfolio
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold font-display text-white">
                Nos réalisations
                <span className="text-gradient"> récentes</span>
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-emerald-400 font-medium mt-6 md:mt-0 hover:underline"
            >
              Voir tous les projets
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="relative py-32 bg-[#0a0f1c] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[200px]" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
              Prêt à donner vie à
              <span className="text-gradient"> votre projet ?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Discutons de vos idées et voyons comment nous pouvons vous aider à créer quelque chose d&apos;extraordinaire.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary flex items-center gap-2">
                Démarrer un projet
                <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                Voir nos réalisations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
