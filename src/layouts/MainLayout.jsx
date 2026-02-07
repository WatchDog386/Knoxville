import React from "react";
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToHashElement from "../components/ScrollToHashElement";
import ParticleBackground from "../components/ParticleBackground";

import { ThemeProvider } from "../contexts/ThemeContext";

export default function MainLayout() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ScrollToHashElement />

        <div className="relative min-h-screen w-full bg-white text-gray-900 overflow-hidden">
          {/* Background image or animation */}
          <div className="absolute inset-0 z-0">
            <ParticleBackground />
          </div>

          {/* Main content wrapper */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />

            {/* Navbar is fixed, so we need padding-top on main to prevent overlap */}
            <main className="flex-1 px-0 sm:px-0 md:px-0 pt-[52px] md:pt-[112px]">
              <Outlet />
            </main>

            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}
