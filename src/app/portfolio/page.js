import MainContent from "@/components/main/MainContent";
import { Suspense } from "react";
import PortfolioList from "./PortfolioList";

export default function PortfolioPage() {
  return (
    <MainContent>
      <section className="p-6 w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-block mb-6 animate-fadeInDown">
            <span className="glass-light backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-cyan-50 text-indigo-700 border border-indigo-200 shadow-md">
              💼 Nos Réalisations
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 animate-fadeInUp">
            Notre <span className="text-gradient">Portfolio</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{animationDelay: '100ms'}}>
            Découvrez notre collection complète de projets{' '}
            <span className="relative inline-block">
              <span className="relative z-10">web et mobiles</span>
              <span className="absolute bottom-1 left-0 w-full h-2 bg-indigo-200/50 -skew-y-1"></span>
            </span>
            , conçus pour répondre aux besoins variés de nos clients.
          </p>
        </div>

        {/* Portfolio Content */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-slate-600 font-medium">Chargement des projets...</p>
            </div>
          }
        >
          <PortfolioList />
        </Suspense>
      </section>
    </MainContent>
  );
}