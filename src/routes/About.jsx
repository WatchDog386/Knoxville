import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

// 🔥 Knoxville Brand Colors (from Hero.jsx)
const BRAND_BLACK = "#121212";
const BRAND_DARK = "#1e1e1e";
const BRAND_RED = "#e53935";
const BRAND_ORANGE = "#fb8c00";
const BRAND_LIGHT = "#f5f5f5";
const BRAND_WHITE = "#ffffff";
const BRAND_BLUE = "#015B97"; // Primary Knoxville blue

// Font stack (matches Hero.jsx)
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const values = [
  { title: "Integrity", description: "We conduct our business with honesty, transparency, and ethical practices." },
  { title: "Innovation", description: "We embrace creativity to deliver cutting-edge solutions for evolving needs." },
  { title: "Excellence", description: "We strive for the highest standards in all our services and products." },
  { title: "Collaboration", description: "We believe in teamwork to achieve shared success with clients and partners." },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ fontFamily: FONT_FAMILY }}
    >
      <Helmet>
        <title>About Knoxville | Fibre Internet Provider</title>
        <meta
          name="description"
          content="Learn about Knoxville Internet — our mission, vision, values, and commitment to delivering world-class fibre connectivity across Kenya."
        />
      </Helmet>

      <Navbar />

      {/* Hero Section — Matches Hero.jsx styling */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative py-16 md:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              style={{ color: BRAND_BLUE }}
            >
              About Knoxville
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed"
            >
              Pioneering digital solutions that transform businesses and empower communities
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Knoxville Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: BRAND_BLUE }}
              >
                What to Know About Knoxville
              </h2>
              <p className="text-gray-700 mb-4">
                Founded by an experienced team from some of the biggest telecommunication brands,
                <strong> Knoxville</strong> offers simple, affordable access to its
                <strong> full-fibre</strong> network so everyone in the community can benefit,
                regardless of income, technical knowledge or age.
              </p>
              <p className="text-gray-700">
                <strong>Knoxville</strong> delivers the fastest broadband in the outskirts of Nairobi and Kiambu,
                enabling homes, businesses, public services, and community groups to experience life-changing
                <strong> full-fibre</strong> connectivity.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center"
            >
              <img
                src="/group2.jpg"
                alt="Knoxville Team"
                className="rounded-xl shadow-xl max-w-full h-auto"
                style={{ maxWidth: '500px' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
              style={{ color: BRAND_BLUE }}
            >
              Our Purpose
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving innovation through purpose-led solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <h3
                className="text-2xl font-bold mb-5"
                style={{ color: BRAND_BLUE }}
              >
                Our Mission
              </h3>
              <p className="text-gray-700 mb-5">
                To empower businesses and communities through reliable, innovative digital infrastructure that enables growth and creates opportunities.
              </p>
              <ul className="space-y-2">
                {["Deliver cutting-edge solutions", "Maintain uncompromising quality", "Foster sustainable digital ecosystems"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <h3
                className="text-2xl font-bold mb-5"
                style={{ color: BRAND_ORANGE }}
              >
                Our Vision
              </h3>
              <p className="text-gray-700 mb-5">
                To be the catalyst for Africa's digital revolution, connecting people, businesses, and ideas through world-class infrastructure and services.
              </p>
              <ul className="space-y-2">
                {["Bridge the digital divide", "Enable next-generation technologies", "Create lasting economic impact"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
              style={{ color: BRAND_BLUE }}
            >
              Our Core Values
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The foundation of everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg text-center border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: BRAND_BLUE }}>
                  {value.title}
                </h3>
                <p className="text-gray-700 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Section — Dark Blue Background */}
      <section
        className="py-20"
        style={{ backgroundColor: BRAND_BLUE }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ color: BRAND_WHITE }}
          >
            Knoxville Bio
          </motion.h2>
          {[
            "Knoxville Technologies is a Kenyan ISP focused on delivering ultra-fast, reliable, and affordable internet to underserved and developing regions. We deploy high-capacity fiber-optic infrastructure to enable digital inclusion and bridge the connectivity gap in urban and peri-urban communities.",
            "Our team is comprised of professionals with a deep understanding of network design, deployment, and service delivery. We believe everyone deserves access to world-class connectivity, regardless of location or income level.",
            "Knoxville aims to be the backbone of digital transformation by supporting education, innovation, and enterprise through better broadband. We are committed to empowering homes and businesses with seamless access to information, communication, and opportunity."
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-lg mb-5 leading-relaxed"
              style={{ color: BRAND_WHITE }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </section>
    </div>
  );
}