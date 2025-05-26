"use client";
import MainContent from "../../components/main/MainContent";
import AboutIntro from "./components/AboutIntro";
import Services from "./components/Services";
import Team from "./components/Team";
import WhyUs from "./components/WhyUs";
import CallToAction from "./components/CallToAction";
import FastFactCard from "./components/FastFactCard";
import TeamMemberCard from "./components/TeamMemberCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation"; // Styles CSS des flèches de navigation
import "swiper/css"; // Style de base de Swiper
// 👇 Styles personnalisés pour masquer la scrollbar
import "../../styles/swiper_custom.css";

const teamMembers = [
  {
    name: "Jean Dupont",
    title: "Développeur Full-Stack",
    imageUrl: "/images/businessman3.jpg",
  },
  {
    name: "Marie Leclerc",
    title: "Développeuse Mobile",
    imageUrl: "/images/businessman4.jpg",
  },
  {
    name: "Pierre Martin",
    title: "Designer UI/UX",
    imageUrl: "/images/businessman5.jpg",
  },
  {
    name: "Marie Leclerc",
    title: "Développeuse Mobile",
    imageUrl: "/images/businessman6.jpg",
  },
  {
    name: "Pierre Martin",
    title: "Designer UI/UX",
    imageUrl: "/images/businessman1.webp",
  },
  {
    name: "Marie Leclerc",
    title: "Développeuse Mobile",
    imageUrl: "/images/businessman2.webp",
  },
];

export default function About() {
  return (
    <MainContent>
      <section className="flex flex-col gap-3 items-center">
        <AboutIntro />
        <Services />
        <div className="w-full max-w-7xl mx-auto p-4">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
              enabled: true,
            }}
            slidesPerView="auto" // Ajuste automatiquement le nombre de slides visibles
            spaceBetween={4} // Équivalent à `gap-4` (16px)
            freeMode={true} // Défilement libre (pas de snap forcé)
            className="!p-4" // Override du padding-bottom
          >
            {[
              { number: "50+", label: "projets réalisés" },
              { number: "20+", label: "clients satisfaits" },
              { number: "200+", label: "Projets web" },
              { number: "240+", label: "Projets Mobiles" },
              { number: "250+", label: "Projets Desktop" },
              { number: "210+", label: "clients satisfaits" },
              // ... autres données
            ].map((item, index) => (
              <SwiperSlide key={index} className="!w-[193px]">
                {" "}
                {/* Largeur fixe comme avant */}
                <FastFactCard number={item.number} label={item.label} />
              </SwiperSlide>
            ))}
            <div className="custom-next swiper-button-next"></div>
            <div className="custom-prev swiper-button-prev"></div>
          </Swiper>
        </div>
        <Team />
        <div className="w-full max-w-7xl mx-auto p-4">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".team-next",
              prevEl: ".team-prev",
              enabled: true,
            }}
            slidesPerView="auto"
            spaceBetween={4}
            freeMode={true}
            className="!p-4"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index} className="!w-[192px]">
                {" "}
                <TeamMemberCard {...member} />
              </SwiperSlide>
            ))}

            {/* Flèches avec classes spécifiques */}
            <div className="team-next swiper-button-next"></div>
            <div className="team-prev swiper-button-prev"></div>
          </Swiper>
        </div>
        <WhyUs />
        <CallToAction />
      </section>
    </MainContent>
  );
}
