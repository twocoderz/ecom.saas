"use client";

import MainContent from "../../components/main/MainContent";
import AboutIntro from "./components/AboutIntro";
// import Services from "./components/Services";
import Team from "./components/Team";
import CallToAction from "./components/CallToAction"

export default function About() {
  return (
    <MainContent>
      <section className="flex flex-col gap-8 items-center">
        <AboutIntro />
        {/* <Services /> */}
        <Team />
        <CallToAction />
      </section>
    </MainContent>
  );
}