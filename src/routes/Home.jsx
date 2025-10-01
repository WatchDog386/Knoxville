import React from "react";
import { Helmet } from "react-helmet-async";

import Hero from "../components/Hero";

import Services from "./Services";
import Faqs from "./faqs";


export default function Home() {
  return (
    <>
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
        {/* <meta property="og:image" content="https://noxfill.co.ke/assets/og-image.webp" /> */}
      </Helmet>

      <section id="hero">
        <Hero />
      </section>

      
        
      

      <section id="services">
        <Services />
      </section>

      <section id="faq">
        <Faqs />
      </section>

      
        
      
    </>
  );
}
