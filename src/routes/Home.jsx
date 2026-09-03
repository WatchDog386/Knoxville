import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";

const testimonials = [
  {
    name: "James Ochieng",
    role: "Business Owner, Kisumu",
    text: "Knoxville completely transformed our business connectivity. Our team's productivity and engagement skyrocketed in just the first month.",
  },
  {
    name: "Grace Wanjiku",
    role: "CEO, Nairobi Tech Hub",
    text: "The quality and speed of Knoxville's fiber internet is unmatched. Our operations have never been smoother.",
  },
  {
    name: "Peter Kamau",
    role: "Head of IT, Mombasa Solutions",
    text: "We've tried dozens of ISPs. Knoxville is the only one that truly understands reliable high-speed connectivity.",
  },
];

export default function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

  const prevTestimonial = () => {
    setTestimonialIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const nextTestimonial = () => {
    setTestimonialIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  const t = testimonials[testimonialIndex];

  return (
  <div style={{ fontFamily: FONT_FAMILY }}>
  <Helmet>
        <title>Knoxfill Internet | Reliable Fiber Internet in Kenya</title>
        <meta
          name="description"
          content="Get fast, affordable, and reliable fiber internet across Kenya. Knoxfill delivers top-tier connectivity to rural and urban communities."
        />
        <meta
          property="og:title"
          content="Knoxfill Internet | Fast Fiber Internet in Kenya"
        />
        <meta
          property="og:description"
          content="Experience high-speed fiber internet by Knoxfill. Designed for homes and businesses across Kenya."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://noxfill.co.ke" />
      </Helmet>

      <style>{`
        .dark-card {
          background: #1a1a1a;
        }
      `}</style>

      <section id="hero">
        <Hero />
      </section>

        {/* Testimonials */}
        <section className="home-page-section sm:bg-white py-12 sm:py-24 w-full max-w-5xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 tracking-tight">
            What our clients are saying
          </h2>
          <p className="text-[10px] sm:text-sm font-medium text-gray-500 mb-8 sm:mb-16 max-w-lg mx-auto leading-relaxed">
            We continually strive to deliver exceptional connectivity and drive real results for our customers.
          </p>

          <div className="bg-[#0061a8] rounded-3xl shadow-lg flex flex-row items-center overflow-visible relative max-w-3xl mx-auto mt-8 sm:mt-16 p-1.5 sm:p-3">
            {/* Image side */}
            <div className="w-5/12 h-[120px] sm:h-[180px] lg:h-[280px] shrink-0 relative flex items-center justify-center">
              <img src="/testimonials.png" alt="Client" className="w-full h-auto max-h-full object-contain drop-shadow-2xl" />
              <button onClick={prevTestimonial} className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-4 sm:w-8 h-4 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200 text-gray-500 hover:text-red-500 z-20 cursor-pointer">
                <ChevronLeft className="w-2 sm:w-4 h-2 sm:h-4" />
              </button>
            </div>

            {/* Text side */}
            <div className="p-3 sm:p-8 lg:p-12 text-left flex-1 relative flex flex-col justify-center min-h-[120px] sm:min-h-[180px] lg:min-h-[250px]">
              <div className="text-white/60 mb-2 sm:mb-6">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="text-white/90 text-[9px] sm:text-sm font-medium leading-relaxed sm:leading-loose relative z-10 mb-2 sm:mb-8 pr-2 sm:pr-6">
                {t.text}
              </p>

              <div className="flex flex-col text-left border-l-2 border-white/40 pl-2 sm:pl-4 mt-auto">
                <p className="font-semibold text-white text-[9px] sm:text-sm">{t.name}</p>
                <p className="text-white/60 text-[8px] sm:text-xs font-medium mt-0.5">{t.role}</p>
              </div>

              {/* Dots indicator */}
              <div className="flex gap-1.5 mt-3 sm:mt-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                      i === testimonialIndex ? "bg-white w-3 sm:w-4" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              {/* Next Button overlapping right */}
              <button onClick={nextTestimonial} className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 w-6 sm:w-12 h-6 sm:h-12 bg-red-600 rounded-full flex items-center justify-center shadow-xl text-white hover:bg-red-700 z-20 cursor-pointer">
                <span className="font-bold leading-none transform rotate-180 flex items-center justify-center pt-0.5">
                  <ChevronLeft className="w-2 sm:w-5 h-2 sm:h-5" />
                </span>
              </button>
            </div>
</div>
        </section>
      </div>
);
}
