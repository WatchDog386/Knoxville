import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookSquare, FaTiktok, FaWhatsapp } from "react-icons/fa";

// RISA-inspired colors
const RISA_BLUE = "#015B97";
const RISA_WHITE = "#ffffff";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative bg-white text-gray-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold" style={{ color: RISA_BLUE }}>
              Knoxville Technologies
            </h4>
            <p className="mt-3 text-sm text-gray-700 max-w-xs">
              Providing reliable fiber internet across Kenya. We connect rural and urban areas with affordable, high-speed solutions.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/share/1E5h7zsjFR/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition"
                aria-label="Facebook"
              >
                <FaFacebookSquare size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@knoxville.home.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition"
                aria-label="TikTok"
              >
                <FaTiktok size={20} />
              </a>
              <a
                href="https://wa.me/254726818938"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-green-600 transition"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wider" style={{ color: RISA_BLUE }}>
              Quick Links
            </h5>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "FAQ", path: "/faq" },
                { label: "Contact", path: "/contact" }
              ].map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-sm text-gray-700 hover:text-blue-600 transition ${isActive ? "font-medium" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wider" style={{ color: RISA_BLUE }}>
              Contact
            </h5>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@knoxville.co.ke"
                  className="hover:text-blue-600 underline underline-offset-2"
                >
                  support@knoxville.co.ke
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+254726818938"
                  className="hover:text-blue-600 underline underline-offset-2"
                >
                  +254 726 818 938
                </a>
              </li>
              <li>Location:LuckySummer Behind Naivas Supermarket</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wider" style={{ color: RISA_BLUE }}>
              Services
            </h5>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>Home Fiber Plans</li>
              <li>Business Internet</li>
              <li>Enterprise Solutions</li>
              <li>24/7 Technical Support</li>
              <li>Free Installation</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wider" style={{ color: RISA_BLUE }}>
              Support
            </h5>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>
                <a href="/coverage" className="hover:text-blue-600 underline underline-offset-2">
                  Coverage Checker
                </a>
              </li>
              <li>
                <a href="/plans" className="hover:text-blue-600 underline underline-offset-2">
                  View All Plans
                </a>
              </li>
              <li>
                <a href="https://wa.me/254726818938" className="hover:text-blue-600 underline underline-offset-2">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Bottom */}
        <div className="text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Knoxville Technologies. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}