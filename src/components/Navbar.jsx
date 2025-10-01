import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, ShoppingCart, Phone } from "lucide-react";
import { throttle } from "lodash-es";
import { useClickOutside } from "../hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";

// RISA Brand Colors
const RISA_BLUE = "#015B97";
const RISA_TEXT = "#565A5C";
const RISA_LIGHT_BG = "#f8f9fa";

// Font stack (Proxima Nova via Adobe Fonts)
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
    { label: "WIFI Plans", route: "/wifiplans", id: "wifiplans" },
    { 
      label: "Support", 
      id: "support",
      submenu: [
        { label: "FAQs", route: "/faq", id: "faq" },
        { label: "Contact Us", route: "/contact", id: "contact" },
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
            className="relative px-4 py-2 font-medium text-sm transition-colors duration-200 flex items-center gap-1"
            style={{ color: isActive ? RISA_BLUE : RISA_TEXT, fontFamily: FONT_FAMILY }}
          >
            {item.label}
            <span>▼</span>
          </button>

          {/* Mega Menu - Full width like RISA */}
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
          `relative px-4 py-2 font-medium text-sm transition-colors duration-200 ${
            navActive || (item.id === "home" && currentPath === "home")
              ? "text-[#015B97]"
              : "text-[#565A5C] hover:text-[#015B97]"
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
      {/* Top Bar - RISA style */}
      <div className="hidden md:flex items-center justify-end px-4 py-2 bg-[#f8f9fa] text-sm font-medium" style={{ fontFamily: FONT_FAMILY }}>
        <div className="flex items-center space-x-4">
          {/* Contact Dropdown */}
          <div className="relative" ref={contactRef}>
            <button
              className="px-4 py-1.5 border border-[#015B97] text-[#015B97] rounded-full hover:bg-[#015B97] hover:text-white transition-colors text-sm font-medium"
              onClick={() => setIsContactOpen(!isContactOpen)}
            >
              Contact Us ▼
            </button>
            {isContactOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <a href="/contact" className="block px-4 py-2 text-sm text-[#565A5C] hover:bg-gray-50 hover:text-[#015B97]">Support</a>
                <a href="/contact" className="block px-4 py-2 text-sm text-[#565A5C] hover:bg-gray-50 hover:text-[#015B97]">Sales/General</a>
                <a href="/feedback" className="block px-4 py-2 text-sm text-[#565A5C] hover:bg-gray-50 hover:text-[#015B97]">Leave Feedback</a>
              </div>
            )}
          </div>
          {/* Phone */}
          <a
            href="tel:9499515815"
            className="px-4 py-1.5 border border-[#015B97] text-[#015B97] rounded-full hover:bg-[#015B97] hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <Phone size={14} />
            949 951 5815
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 md:top-[40px] left-0 w-full z-[999] transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm" : "bg-white/95 backdrop-blur-sm"
        }`}
        style={{ fontFamily: FONT_FAMILY }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="text-xl font-bold" style={{ color: RISA_BLUE }}>
              Knoxville Technologies
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              {menuItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
              <a
                href="/login"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#565A5C] hover:text-[#015B97] transition-colors"
              >
                <User size={16} />
                LOGIN
              </a>
              <a
                href="/buy"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#565A5C] hover:text-[#015B97] transition-colors"
              >
                <ShoppingCart size={16} />
                BUY
              </a>
              <a
                href="/try"
                className="ml-4 px-6 py-2 bg-[#015B97] text-white text-sm font-semibold rounded-full hover:bg-[#014a7a] transition-colors"
              >
                TRY NOW
              </a>
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
                {/* Top bar actions on mobile */}
                <div className="flex flex-col space-y-3 pt-2 pb-4 border-b border-gray-100">
                  <button className="px-4 py-2.5 border border-[#015B97] text-[#015B97] rounded-full text-center font-medium">
                    Contact Us
                  </button>
                  <a
                    href="tel:9499515815"
                    className="px-4 py-2.5 border border-[#015B97] text-[#015B97] rounded-full text-center font-medium flex items-center justify-center gap-2"
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
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <a href="/login" className="block text-[#565A5C] font-medium" onClick={() => setIsOpen(false)}>
                    LOGIN
                  </a>
                  <a href="/buy" className="block text-[#565A5C] font-medium" onClick={() => setIsOpen(false)}>
                    BUY
                  </a>
                  <a
                    href="/try"
                    className="inline-block w-full text-center py-2.5 bg-[#015B97] text-white font-semibold rounded-full hover:bg-[#014a7a]"
                    onClick={() => setIsOpen(false)}
                  >
                    TRY NOW
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}