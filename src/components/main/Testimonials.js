"use client";

import { useEffect, useRef, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "CEO, TechStart",
    content: "twocoderz a transformé notre vision en réalité. Leur expertise technique et leur créativité ont dépassé toutes nos attentes. Un partenaire de confiance pour tous nos projets digitaux.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jean-Pierre Martin",
    role: "Directeur Marketing, InnovCorp",
    content: "L'équipe de twocoderz est exceptionnelle. Réactifs, professionnels et toujours à l'écoute. Notre application mobile a connu un succès immédiat grâce à leur travail de qualité.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophie Bernard",
    role: "Fondatrice, EcoStyle",
    content: "Collaborer avec twocoderz a été une expérience formidable. Ils ont su comprendre nos besoins et livrer une solution parfaitement adaptée à notre activité. Je les recommande vivement !",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#0a0f1c] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20">
            Témoignages
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-6">
            Ce que disent nos
            <span className="text-gradient"> clients</span>
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <FaQuoteLeft className="w-6 h-6 text-white" />
            </div>

            {/* Testimonial Card */}
            <div className="card-premium p-8 sm:p-12 pt-16 text-center">
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-8 font-light">
                &ldquo;{testimonials[activeIndex].content}&rdquo;
              </p>

              {/* Author */}
              <div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-emerald-400">
                    {testimonials[activeIndex].name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-emerald-400 text-sm">
                  {testimonials[activeIndex].role}
                </p>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 h-2 bg-emerald-500 rounded-full"
                      : "w-2 h-2 bg-gray-600 rounded-full hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Client Logos */}
        <div className={`mt-20 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-widest">
            Ils nous font confiance
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-50">
            {["TechStart", "InnovCorp", "EcoStyle", "DataFlow", "CloudMax"].map((company) => (
              <span key={company} className="text-2xl font-bold text-gray-600 hover:text-gray-400 transition-colors">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
