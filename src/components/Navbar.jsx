// src/components/Navbar.jsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { throttle } from "lodash-es";
import { useClickOutside } from "../hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";

// RISA Brand Colors
const RISA_BLUE = "#015B97";
const RISA_TEXT = "#565A5C";
const RISA_LIGHT_BG = "#f8f9fa";

// Font stack
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const contactRef = useRef(null);

  const handleScroll = useCallback(
    throttle(() => setScrolled(window.scrollY > 10), 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useClickOutside(navRef, () => setIsOpen(false));
  useClickOutside(contactRef, () => setIsContactOpen(false));

  const currentPath = location.pathname === "/" ? "home" : location.pathname.slice(1);

  const menuItems = useMemo(() => [
    { label: "Home", route: "/", id: "home" },
    { label: "About us", route: "/about", id: "about" },
    { label: "Services", route: "/services", id: "services" },
    { 
      label: "Support", 
      id: "support",
      submenu: [
        { label: "FAQs", route: "/faq", id: "faq" },
        { label: "Technical Support", route: "/technicians", id: "technicians" },
      ]
    },
    { label: "Resources", route: "/articles", id: "articles" },
  ], []);

  const isActivePath = (item) => {
    if (item.id === "home") return currentPath === "home";
    if (item.submenu) return item.submenu.some(sub => sub.id === currentPath);
    return location.pathname === item.route;
  };

  const NavItem = ({ item }) => {
    const isActive = isActivePath(item);

    if (item.submenu) {
      return (
        <div className="relative group">
          <button
            className="relative px-4 py-2 font-medium text-base transition-colors duration-200 flex items-center gap-1"
            style={{ 
              color: isActive ? RISA_BLUE : RISA_TEXT, 
              fontFamily: FONT_FAMILY,
              borderBottom: isActive ? `2px solid ${RISA_BLUE}` : 'none'
            }}
          >
            {item.label}
            <span>▼</span>
          </button>

          <div
            className="absolute left-0 mt-2 w-screen max-w-7xl mx-auto rounded-lg bg-white shadow-xl z-50 py-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
          >
            <div className="grid grid-cols-4 gap-8 px-8">
              {item.submenu.map((sub) => (
                <NavLink
                  key={sub.id}
                  to={sub.route}
                  className={({ isActive: subActive }) =>
                    `block px-4 py-2 text-sm font-medium transition-colors ${
                      subActive ? "text-[#015B97] bg-blue-50" : "text-[#565A5C] hover:text-[#015B97] hover:bg-gray-50"
                    }`
                  }
                  style={{ fontFamily: FONT_FAMILY }}
                  onClick={() => setIsOpen(false)}
                >
                  {sub.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <NavLink
        to={item.route}
        className={({ isActive: navActive }) =>
          `relative px-4 py-2 font-medium text-base transition-colors duration-200 ${
            navActive || (item.id === "home" && currentPath === "home")
              ? "text-[#015B97] border-b-2 border-[#015B97]"
              : "text-[#565A5C] hover:text-[#015B97] hover:border-b-2 hover:border-[#015B97]"
          }`
        }
        style={{ fontFamily: FONT_FAMILY }}
        onClick={() => setIsOpen(false)}
      >
        {item.label}
      </NavLink>
    );
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-white/95 backdrop-blur-sm"
      }`}
      style={{ fontFamily: FONT_FAMILY }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="whitespace-nowrap text-[#015B97] font-bold text-lg md:text-xl"
              style={{ fontFamily: FONT_FAMILY }}
            >
              Knoxville Technologies Home Fibre
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#565A5C] hover:text-[#015B97]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="px-4 py-6 space-y-5">
              <div className="flex flex-col space-y-3 pt-2 pb-4 border-b border-gray-100">
                <button
                  className="px-4 py-2.5 border-2 border-[#015B97] text-[#015B97] rounded-full text-center font-medium"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </button>
                <a
                  href="tel:+254726818938"
                  className="px-4 py-2.5 border-2 border-[#015B97] text-[#015B97] rounded-full text-center font-medium flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  +254726818938
                </a>
              </div>

              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.submenu ? (
                    <div>
                      <div className="font-medium text-[#565A5C] text-sm mb-2">{item.label}</div>
                      <div className="pl-3 space-y-2">
                        {item.submenu.map((sub) => (
                          <NavLink
                            key={sub.id}
                            to={sub.route}
                            className={({ isActive }) =>
                              `block text-sm font-medium ${
                                isActive ? "text-[#015B97]" : "text-[#565A5C]"
                              }`
                            }
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={item.route}
                      className={({ isActive }) =>
                        `block text-base font-medium ${
                          isActive ? "text-[#015B97]" : "text-[#565A5C]"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}