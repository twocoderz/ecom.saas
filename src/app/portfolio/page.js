import { Suspense } from "react";
import PortfolioList from "./PortfolioList";

export const metadata = {
  title: "Portfolio - twocoderz",
  description: "Découvrez nos réalisations web et mobile. Des projets innovants et performants.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20">
            Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Nos <span className="text-gradient">réalisations</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Découvrez une sélection de nos projets les plus récents.
            Chaque réalisation reflète notre engagement envers l'excellence.
          </p>
        </div>

        {/* Portfolio Content */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-gray-400 font-medium">Chargement des projets...</p>
            </div>
          }
        >
          <PortfolioList />
        </Suspense>
      </div>
    </div>
  );
}
