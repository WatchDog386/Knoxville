import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Phone, 
  ChevronDown, 
  Globe, 
  Shield, 
  Cpu, 
  BookOpen, 
  Zap,
  Mail,
  User,
  FileText
} from "lucide-react";

// Brand Colors
const BRAND = {
  blue: "#015B97",
  darkBlue: "#004270",
  orange: "#FF8C00",
  text: "#334155",
  slate: "#f8fafc"
};

const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

// -----------------------------------------------
// UPDATED MENU: "Resources" removed → replaced with Blog
// -----------------------------------------------
const MENU_ITEMS = [
  { label: "Home", route: "/", id: "home" },
  { label: "About Us", route: "/about", id: "about" },
  { label: "Services", route: "/services", id: "services" },

  {
    label: "Support", 
    id: "support",
    submenu: [
      { label: "FAQs", route: "/faq", icon: <BookOpen size={18} />, desc: "Common questions answered" },
      { label: "Tech Support", route: "/technicians", icon: <Cpu size={18} />, desc: "Get technical assistance" },
      { label: "Coverage Map", route: "/coverage", icon: <Globe size={18} />, desc: "Check availability" },
    ]
  },

  // REPLACED "Resources" → NEW BLOG LINK
  { label: "Blog", route: "/blogs", id: "blogs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className="fixed top-0 left-0 w-full z-[999]" 
      style={{ fontFamily: FONT_FAMILY }}
    >
      {/* ================= TOP UTILITY BAR ================= */}
      <div className={`bg-[#004270] text-white transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-10 opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center text-xs font-medium tracking-wide">
          
          {/* LEFT CONTACTS */}
          <div className="flex items-center gap-6">
            <a href="tel:+254726818938" className="flex items-center gap-2 hover:text-[#FF8C00] transition-colors">
              <Phone size={14} /> <span>+254 726 818 938</span>
            </a>

            <a href="mailto:support@knoxville.co.ke" className="hidden sm:flex items-center gap-2 hover:text-[#FF8C00] transition-colors">
              <Mail size={14} /> <span>support@knoxville.co.ke</span>
            </a>
          </div>

          {/* RIGHT - UPDATED → ADMIN PORTAL */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/login"
              className="flex items-center gap-2 hover:text-[#FF8C00] transition-colors"
            >
              <User size={14} /> <span>Admin Portal</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div 
        className={`relative transition-all duration-300 border-b ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-slate-200" 
            : "bg-white py-4 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#015B97] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <Zap size={24} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 leading-none tracking-tight">Knoxville</span>
              <span className="text-[10px] font-bold text-[#FF8C00] uppercase tracking-widest">Technologies</span>
            </div>
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            {MENU_ITEMS.map((item) => (
              <div 
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                {/* DROPDOWN ITEM */}
                {item.submenu ? (
                  <>
                    <button 
                      className={`flex items-center gap-1 font-semibold text-sm transition-colors py-2 ${
                        hoveredMenu === item.id 
                          ? "text-[#015B97]" 
                          : "text-slate-600 hover:text-[#015B97]"
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${hoveredMenu === item.id ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {hoveredMenu === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 z-50"
                        >
                          <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-2">
                            {item.submenu.map((sub) => (
                              <NavLink
                                key={sub.route}
                                to={sub.route}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                              >
                                <div className="text-slate-400">{sub.icon}</div>
                                <div>
                                  <p className="text-sm font-bold text-slate-700">{sub.label}</p>
                                  <p className="text-xs text-slate-500">{sub.desc}</p>
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  /* REGULAR NAV LINK */
                  <NavLink
                    to={item.route}
                    className={({ isActive }) =>
                      `text-sm font-semibold transition-colors relative py-2 ${
                        isActive ? "text-[#015B97]" : "text-slate-600 hover:text-[#015B97]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden lg:flex items-center gap-4">
            <NavLink 
              to="/contact"
              className="px-6 py-2.5 bg-[#FF8C00] hover:bg-[#e67e00] text-white text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get Connected
            </NavLink>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] lg:hidden"
            />

            {/* DRAWER PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-[1001] lg:hidden overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#015B97] rounded-lg flex items-center justify-center text-white">
                      <Zap size={18} fill="currentColor" />
                    </div>
                    <span className="font-bold text-slate-900">Knoxville</span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* LINKS */}
                <div className="flex-1 space-y-2">
                  {MENU_ITEMS.map((item) => (
                    <div key={item.id} className="border-b border-slate-50 pb-2 last:border-0">
                      {item.submenu ? (
                        <div className="py-2">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                            {item.label}
                          </div>
                          <div className="space-y-1 pl-2">
                            {item.submenu.map((sub) => (
                              <NavLink
                                key={sub.route}
                                to={sub.route}
                                className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
                              >
                                <div className="text-slate-400">{sub.icon}</div>
                                {sub.label}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <NavLink
                          to={item.route}
                          className="block p-3 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                        >
                          {item.label}
                        </NavLink>
                      )}
                    </div>
                  ))}
                </div>

                {/* FOOTER ACTIONS */}
                <div className="mt-6 space-y-3 pt-6 border-t border-slate-100">
                  
                  {/* BUTTON */}
                  <NavLink 
                    to="/contact"
                    className="flex items-center justify-center w-full py-3.5 bg-[#FF8C00] text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all"
                  >
                    Get Connected Now
                  </NavLink>

                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="tel:+254726818938"
                      className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Phone size={16} /> Call
                    </a>

                    {/* UPDATED → LOGIN = ADMIN PORTAL */}
                    <NavLink 
                      to="/login"
                      className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <User size={16} /> Admin Portal
                    </NavLink>
                  </div>

                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
