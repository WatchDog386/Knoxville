import React from "react";
import { motion } from "framer-motion";
import {
  FaNetworkWired,
  FaShieldAlt,
  FaCloud,
  FaServer,
  FaWifi,
  FaGlobe,
} from "react-icons/fa";
import { Helmet } from "react-helmet";

// RISA Color Palette
const RISA_BLUE = "#015B97";
const RISA_LIGHT_BLUE = "#3288e6";
const RISA_WHITE = "#ffffff";

// Services Data
const services = [
  {
    id: "network",
    title: "Network Infrastructure",
    description:
      "Design, implementation and management of robust network solutions for businesses of all sizes.",
    icon: <FaNetworkWired className="text-4xl" />,
    features: [
      "Structured cabling solutions",
      "Wireless network deployment",
      "Network security implementation",
      "Performance optimization",
    ],
  },
  {
    id: "security",
    title: "Security Solutions",
    description:
      "Comprehensive cybersecurity measures to protect your digital assets and infrastructure.",
    icon: <FaShieldAlt className="text-4xl" />,
    features: [
      "Firewall implementation",
      "Intrusion detection systems",
      "Security audits",
      "Data protection",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Services",
    description:
      "Scalable cloud computing solutions to enhance your business operations and flexibility.",
    icon: <FaCloud className="text-4xl" />,
    features: [
      "Cloud migration",
      "Hybrid cloud solutions",
      "Cloud security",
      "24/7 monitoring",
    ],
  },
  {
    id: "data-center",
    title: "Data Center Solutions",
    description:
      "Enterprise-grade data center services with maximum uptime and reliability.",
    icon: <FaServer className="text-4xl" />,
    features: [
      "Colocation services",
      "Disaster recovery",
      "Data backup solutions",
      "Infrastructure management",
    ],
  },
  {
    id: "isp",
    title: "ISP Services",
    description:
      "High-speed internet connectivity solutions for businesses and residential areas.",
    icon: <FaWifi className="text-4xl" />,
    features: [
      "Fiber optic connectivity",
      "Wireless broadband",
      "Dedicated internet access",
      "Bandwidth management",
    ],
  },
  {
    id: "consulting",
    title: "IT Consulting",
    description:
      "Expert technology consulting to align your IT strategy with business goals.",
    icon: <FaGlobe className="text-4xl" />,
    features: [
      "Technology roadmap",
      "IT infrastructure assessment",
      "Digital transformation",
      "Vendor management",
    ],
  },
];

// Service Card — Redesigned to match RISA
function ServiceCard({ service, index }) {
  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        className="flex justify-center items-center h-32"
        style={{ backgroundColor: `${RISA_BLUE}08` }} // Very light blue tint
      >
        <div
          className="p-4 rounded-full"
          style={{ backgroundColor: RISA_BLUE }}
        >
          <span className="text-white">{service.icon}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3
          className="text-xl font-bold mb-3"
          style={{ color: RISA_BLUE }}
        >
          {service.title}
        </h3>
        <p className="text-gray-700 mb-4 text-sm flex-grow">
          {service.description}
        </p>
        <ul className="space-y-2">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start text-sm">
              <span className="text-blue-600 mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Hero Section — Matches Index.jsx
function ServicesHero() {
  return (
    <motion.section
      className="relative py-16 md:py-20 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            style={{ color: RISA_BLUE }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our <span style={{ color: RISA_LIGHT_BLUE }}>Services</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Comprehensive network infrastructure solutions tailored to your business needs
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}

// Services Section
function AllServices() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold mb-4"
            style={{ color: RISA_BLUE }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What We Offer
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We provide end-to-end network infrastructure solutions that drive business growth and digital transformation.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function ServicesPage() {
  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ 
        fontFamily: '"Poppins", "Helvetica Neue", Arial, sans-serif',
        fontSize: '14px'
      }}
    >
      <Helmet>
        <title>Services | Knoxville Internet</title>
        <meta
          name="description"
          content="Explore Knoxville's professional services: ISP, network infrastructure, cloud solutions, security, data center, and IT consulting."
        />
      </Helmet>

      <style>{`
        html { font-size: 14px; }
        h1, h2, h3, h4, h5, h6 { font-weight: 700; line-height: 1.2; }
        p, li { line-height: 1.6; margin-top: 0; margin-bottom: 1rem; }
      `}</style>

      <ServicesHero />
      <AllServices />
    </div>
  );
}