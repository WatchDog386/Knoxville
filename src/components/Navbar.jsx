import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Headphones, Menu, Phone, MapPin, Wrench, X, ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  {
    label: "Support",
    links: [
      { label: "FAQs", to: "/faq", description: "Frequently asked questions and guides." },
      { label: "Tech Support", to: "/technicians", description: "Professional technical assistance." },
      { label: "Coverage Map", to: "/coverage", description: "Check our service coverage areas." },
    ],
  },
];

const phoneTiles = [
  { phone: "+254 724 169 963", location: "Nairobi, KE" },
  { phone: "+254 726 818 938", location: "24/7 Support" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setActiveMegaMenu(null);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <>
      <div className={`fixed inset-0 top-[112px] bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 pointer-events-none ${activeMegaMenu ? "opacity-100" : "opacity-0"}`} />

      <header className="w-full">
        {/* Top Bar - hidden on mobile */}
        <div className="hidden lg:block bg-[#1e2532]">
          <div className="mx-auto flex h-16 max-w-[1700px] items-center justify-between px-4 lg:px-8">
            {/* Brand - hidden on mobile */}
            <NavLink to="/" className="hidden lg:flex items-center no-underline">
              <span className="text-white text-[16px] lg:text-[20px] font-light tracking-tight leading-none" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Knoxville Technologies Ltd.
              </span>
            </NavLink>

            {/* Phone Numbers - Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              {phoneTiles.map((tile) => (
                <a key={tile.phone} href={`tel:${tile.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 no-underline">
                  <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white flex-shrink-0">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[13px] font-semibold text-white leading-tight">{tile.phone}</div>
                    <div className="text-[10px] text-gray-300 flex items-center gap-1 leading-tight">
                      <MapPin className="h-2.5 w-2.5" /> {tile.location}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#1e3a5f] relative">
            <div className="mx-auto flex min-h-[64px] max-w-[1700px] items-center justify-between px-4 lg:px-8 relative z-50">
            {/* Brand - visible on mobile in bottom bar */}
            <NavLink to="/" className="lg:hidden flex items-center no-underline">
              <span className="text-red-500 text-[14px] font-light tracking-tight leading-none" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Knoxville Technologies Ltd.
              </span>
            </NavLink>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-5 h-full">
              {NAV_ITEMS.map((item) =>
                item.links ? (
                  <div
                    key={item.label}
                    onMouseEnter={() => setActiveMegaMenu(item.label)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                    className="flex items-center h-full py-4 lg:py-0"
                  >
                    <button className="text-white text-[11px] font-semibold flex items-center gap-1 uppercase tracking-[0.05em] focus:outline-none cursor-pointer h-full">
                      {item.label}
                      <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activeMegaMenu === item.label ? "rotate-180" : ""}`} />
                    </button>

                    {/* Mega Menu Dropdown */}
                    <div
                      className={`absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-50 cursor-default transition-all duration-200 origin-top ${
                        activeMegaMenu === item.label ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
                      }`}
                    >
                      <div className="mx-auto max-w-[1700px] px-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 max-w-[1000px] mx-auto">
                          {item.links.map((link) => {
                            const Icon = link.label === "Tech Support" ? Wrench : link.label === "Coverage Map" ? MapPin : Headphones;
                            return (
                              <NavLink
                                key={link.to}
                                to={link.to}
                                className="group flex gap-4 p-4 rounded-xl no-underline transition-all duration-300 hover:bg-gray-50/80"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                <div className="mt-1 flex-shrink-0">
                                  <Icon className="w-5 h-5 text-gray-500 transition-colors duration-300 group-hover:text-[#be232a]" strokeWidth={2} />
                                </div>
                                <div className="flex flex-col">
                                  <h3 className="text-[15px] font-semibold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-[#be232a]">{link.label}</h3>
                                  <p className="text-[13px] text-gray-500 leading-snug">{link.description}</p>
                                </div>
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `text-white/90 hover:text-white text-[11px] font-semibold no-underline flex items-center gap-1 uppercase tracking-[0.05em] h-full ${isActive ? "text-red-400" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Contact Us Button - Desktop */}
            <div className="hidden lg:flex items-center">
              <NavLink
                to="/contact"
                className="bg-[#e0292e] text-white text-[11px] font-semibold no-underline flex items-center gap-1.5 tracking-[0.05em] px-4 py-2 rounded-md hover:bg-[#c42428] transition-colors"
              >
                CONTACT US
                <ArrowRight className="h-4 w-4" />
              </NavLink>
            </div>

            {/* Mobile Menu Button - in bottom bar */}
            <button
              type="button"
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 text-white"
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
            <div className="mx-auto max-w-[1700px] py-4 px-4 flex flex-col gap-4">
              {phoneTiles.map((tile) => (
                <a key={tile.phone} href={`tel:${tile.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg no-underline">
                  <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center text-white flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-base font-semibold text-gray-900">{tile.phone}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {tile.location}
                    </div>
                  </div>
                </a>
              ))}

              <div className="border-t border-gray-200 pt-4 mt-2">
                {NAV_ITEMS.map((item) =>
                  item.links ? (
                    <div key={item.label} className="border-b border-gray-100">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="w-full py-3 text-sm font-semibold text-gray-800 uppercase flex items-center justify-between hover:text-red-600"
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                      </button>
                      {openDropdown === item.label && (
                        <div className="flex flex-col pb-2">
                          {item.links.map((link) => (
                            <NavLink
                              key={link.to}
                              to={link.to}
                              className="block py-2 pl-4 text-sm text-gray-600 hover:text-red-600 no-underline"
                              onClick={() => setIsOpen(false)}
                            >
                              {link.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className="block py-3 text-sm font-semibold text-gray-800 hover:text-red-600 no-underline border-b border-gray-100 uppercase"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  )
                )}
                <NavLink
                  to="/contact"
                  className="mt-4 bg-red-600 text-white inline-flex h-11 items-center justify-center px-6 text-sm font-semibold rounded-lg no-underline w-full"
                  onClick={() => setIsOpen(false)}
                >
                  CONTACT US
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}