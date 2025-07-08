import MainContent from "@/components/main/MainContent";
import { Suspense } from "react";
import PortfolioList from "./PortfolioList";

export default function PortfolioPage() {
  return (
    <MainContent>
      <section className="bg-white p-6 rounded-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">
          Notre Portfolio
        </h1>
        <p className="text-gray-600 mb-6">
          Découvrez notre collection complète de projets web et mobiles, conçus pour répondre aux besoins variés de nos clients.
        </p>
        <Suspense fallback={<div>Chargement...</div>}>
          <PortfolioList />
        </Suspense>
      </section>
    </MainContent>
  );
}