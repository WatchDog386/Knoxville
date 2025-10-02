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

// Font stacks
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
const HANDWRITTEN_FONT = `'Dancing Script', cursive`; // ← Handwritten style

// Dynamically inject Google Fonts if not already present
const injectGoogleFont = () => {
  if (document.getElementById('google-font-dancing-script')) return;
  const link = document.createElement('link');
  link.id = 'google-font-dancing-script';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap';
  document.head.appendChild(link);
};

injectGoogleFont();

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
    <>
      {/* Top Bar */}
      <div className="hidden md:flex items-center justify-end px-6 py-2 bg-[#f8f9fa]" style={{ fontFamily: FONT_FAMILY }}>
        <div className="flex items-center space-x-3">
          <div className="relative" ref={contactRef}>
            <button
              className="px-4 py-1.5 border-2 border-[#015B97] text-[#015B97] rounded-full hover:bg-[#015B97] hover:text-white transition-colors text-sm font-medium"
              onClick={() => setIsContactOpen(!isContactOpen)}
            >
              Contact Us ▼
            </button>
            {isContactOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <a href="/contact" className="block px-4 py-2.5 text-sm text-[#565A5C] hover:bg-gray-50 hover:text-[#015B97]">Support</a>
                <a href="/contact" className="block px-4 py-2.5 text-sm text-[#565A5C] hover:bg-gray-50 hover:text-[#015B97]">Sales / General</a>
                <a href="/feedback" className="block px-4 py-2.5 text-sm text-[#565A5C] hover:bg-gray-50 hover:text-[#015B97]">Leave Feedback</a>
              </div>
            )}
          </div>
          <a
            href="tel:9499515815"
            className="px-4 py-1.5 border-2 border-[#015B97] text-[#015B97] rounded-full hover:bg-[#015B97] hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Phone size={14} />
            949 951 5815
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 md:top-[44px] left-0 w-full z-[999] transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm" : "bg-white/95 backdrop-blur-sm"
        }`}
        style={{ fontFamily: FONT_FAMILY }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Company Name Only — No Logo, Bigger Font */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <span
                  className="whitespace-nowrap"
                  style={{
                    color: RISA_BLUE, // ✅ Blue as requested
                    fontFamily: HANDWRITTEN_FONT, // ✅ Handwritten style
                    fontSize: '1.5rem', // ✅ Increased from 1.25rem → 1.5rem (24px)
                    fontWeight: 700,
                  }}
                >
                  Knoxville Technologies Home Fibre
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {menuItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>

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
                    href="tel:9499515815"
                    className="px-4 py-2.5 border-2 border-[#015B97] text-[#015B97] rounded-full text-center font-medium flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    949 951 5815
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
    </>
  );
}