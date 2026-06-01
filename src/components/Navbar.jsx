import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe, Headphones, Home, Menu, Phone, User, Wrench, X } from "lucide-react";

const MENU_ITEMS = [
  { label: "Home", route: "/", icon: <Home size={16} /> },
  { label: "About Us", route: "/about", icon: <Wrench size={16} /> },
  { label: "Services", route: "/services", icon: <Wrench size={16} /> },
  {
    label: "Support",
    route: "/faq",
    icon: <Headphones size={16} />,
    submenu: [
      { label: "FAQs", route: "/faq" },
      { label: "Tech Support", route: "/technicians" },
      { label: "Coverage Map", route: "/coverage" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setHoveredMenu(null);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[999]">
      <div className="border-b border-[#1b4c8d] bg-[#1f4f8f] text-white">
        <div className="mx-auto flex h-12 max-w-[1700px] items-center justify-between px-4 text-[13px] font-semibold sm:px-6 lg:px-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/95">
              <span className="text-[#ff8a00]">•</span>
              <span>Nairobi, KE</span>
            </div>
            <a href="tel:+254726818938" className="hidden sm:flex items-center gap-2 text-white/95 transition-colors hover:text-[#ff8a00]">
              <Phone size={14} />
              <span>0726818938</span>
            </a>
          </div>


        </div>
      </div>

      <div className={`bg-white transition-all duration-300 ${scrolled ? "shadow-[0_12px_32px_rgba(15,23,42,0.08)]" : ""}`}>
        <div className="mx-auto flex h-[72px] max-w-[1700px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/logo4.webp" alt="Knoxville" className="h-11 w-11 rounded-full object-contain" />
            <div className="leading-none">
              <div className="text-[11px] uppercase tracking-[0.45em] text-slate-800">Knoxville</div>
              <div className="text-2xl font-light tracking-[-0.06em] text-[#1f4f8f]">technologies ltd<span className="text-[#ff8a00]">.</span></div>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-12 text-[15px] font-semibold text-[#1f4f8f] lg:flex">
            {MENU_ITEMS.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => item.submenu && setHoveredMenu(item.label)} onMouseLeave={() => item.submenu && setHoveredMenu(null)}>
                {item.submenu ? (
                  <>
                    <button className={`flex items-center gap-2 py-2 transition-colors ${hoveredMenu === item.label ? "text-[#ff7a00]" : "text-[#1f4f8f] hover:text-[#ff7a00]"}`}>
                      <span className="text-[#ff7a00]">{item.icon}</span>
                      <span>{item.label}</span>
                      <ChevronDown size={15} className={`transition-transform ${hoveredMenu === item.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {hoveredMenu === item.label && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2">
                          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
                            {item.submenu.map((subItem) => (
                              <NavLink key={subItem.route} to={subItem.route} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#1f4f8f]">
                                <span className="text-[#ff7a00]">•</span>
                                <span>{subItem.label}</span>
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <NavLink to={item.route} className={({ isActive }) => `flex items-center gap-2 py-2 transition-colors ${isActive ? "text-[#ff7a00]" : "text-[#1f4f8f] hover:text-[#ff7a00]"}`}>
                    <span className="text-[#ff7a00]">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                )}
              </div>
            ))}
          </nav>



          <button onClick={() => setIsOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-[#1f4f8f] lg:hidden" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button type="button" aria-label="Close menu backdrop" className="fixed inset-0 z-[1000] bg-slate-950/55 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} />

            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 24, stiffness: 220 }} className="fixed right-0 top-0 z-[1001] h-full w-[88%] max-w-sm overflow-y-auto bg-white shadow-2xl lg:hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <img src="/logo4.webp" alt="Knoxville" className="h-10 w-10 rounded-full object-contain" />
                  <div>
                    <div className="text-sm font-bold text-[#1f4f8f]">Knoxville</div>
                    <div className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Menu</div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100" aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-1 px-4 py-5">
                {MENU_ITEMS.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-100 p-2">
                    <NavLink to={item.route} className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold text-[#1f4f8f] hover:bg-slate-50">
                      <span className="text-[#ff7a00]">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                    {item.submenu && (
                      <div className="space-y-1 pb-2 pl-10 pr-2">
                        {item.submenu.map((subItem) => (
                          <NavLink key={subItem.route} to={subItem.route} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#1f4f8f]">
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}


              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
