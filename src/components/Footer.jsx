import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTiktok, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

// Brand Colors used:
// Blue: #015B97
// Orange: #FF8C00

const AccordionSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) {
    return (
      <div>
        <h4 className="text-lg font-bold mb-6 text-white border-b border-blue-400/30 pb-2 inline-block">{title}</h4>
        <div className="space-y-3">
            {children}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-blue-400/20 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 sm:py-4 flex justify-between items-center text-left focus:outline-none"
      >
        <h4 className="text-sm sm:text-lg font-bold text-white relative">
            {title}
            {isOpen && <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#FF8C00]"></span>}
        </h4>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className={`text-[10px] sm:text-sm ${isOpen ? 'text-[#FF8C00]' : 'text-blue-300'}`} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-3 sm:pb-6 space-y-1.5 sm:space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Footer() {
  return (
    <footer
      className="relative text-white font-sans bg-white py-2 sm:py-4"
    >
      <div
        className="rounded-3xl p-1.5 sm:p-3 shadow-lg mx-2 sm:mx-4"
        style={{
          background: "#662d91",
        }}
      >
        <div className="max-w-7xl mx-auto">
        {/* Desktop: Full 4-column grid | Mobile: Stacked 1-column */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          
          {/* 1. BRAND COLUMN */}
          <div className="col-span-1 flex flex-row items-center gap-3">
            <div>
              <h3 className="text-sm font-bold tracking-tight text-white">Knoxville Technologies</h3>
              <div className="h-0.5 w-10 bg-[#FF8C00] mt-0.5 rounded-full"></div>
            </div>
            <p className="text-blue-100 leading-tight text-[11px] flex-1">
              Connecting Kenya with reliable, high-speed fiber internet.
            </p>
            <div className="flex gap-1.5">
              <SocialIcon href="https://facebook.com" icon={<FaFacebookF />} />
              <SocialIcon href="https://tiktok.com" icon={<FaTiktok />} />
              <SocialIcon href="https://whatsapp.com" icon={<FaWhatsapp />} />
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1 inline-block mb-2">Quick Links</h4>
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/services" label="Services" />
              <FooterLink to="/coverage" label="Coverage Map" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>

          {/* 3. SERVICES */}
          <div>
            <h4 className="text-sm font-bold text-white border-b border-blue-400/30 pb-1 inline-block mb-2">Our Services</h4>
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              <ServiceItem label="Home Fiber" />
              <ServiceItem label="Business Internet" />
              <ServiceItem label="Enterprise Solutions" />
              <ServiceItem label="CCTV Installation" />
            </ul>
          </div>

          {/* 4. CONTACT INFO */}
          <div>
            <h4 className="text-sm font-bold text-white border-b border-blue-400/30 pb-1 inline-block mb-2">Get in Touch</h4>
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              <li className="flex items-center gap-1.5 text-blue-100 text-xs group">
                 <div className="p-1 bg-white/10 rounded-full group-hover:bg-[#FF8C00] transition-colors shrink-0">
                   <FaMapMarkerAlt className="text-white text-[8px]" />
                 </div>
                 <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-1.5 text-blue-100 text-xs group">
                 <div className="p-1 bg-white/10 rounded-full group-hover:bg-[#FF8C00] transition-colors shrink-0">
                   <FaPhoneAlt className="text-white text-[8px]" />
                 </div>
                 <a href="tel:+254726818938" className="hover:text-white transition">+254 726 818 938</a>
              </li>
              <li className="flex items-center gap-1.5 text-blue-100 text-xs group">
                 <div className="p-1 bg-white/10 rounded-full group-hover:bg-[#FF8C00] transition-colors shrink-0">
                   <FaEnvelope className="text-white text-[8px]" />
                 </div>
                 <a href="mailto:support@knoxville.co.ke" className="hover:text-white transition">support@knoxville.co.ke</a>
              </li>
            </ul>
          </div>
        </div>

        {/* MOBILE VERSION: Compact like testimonial card */}
        <div className="md:hidden">
          <div className="flex items-center justify-center mb-1">
            <h3 className="text-[10px] font-bold text-white">Knoxville Technologies</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[9px] text-blue-100">
            <NavLink to="/" className="hover:text-white">Home</NavLink>
            <NavLink to="/about" className="hover:text-white">About</NavLink>
            <NavLink to="/services" className="hover:text-white">Services</NavLink>
            <NavLink to="/contact" className="hover:text-white">Contact</NavLink>
            <span className="text-blue-300">|</span>
            <a href="tel:+254726818938" className="hover:text-white">Call</a>
            <a href="mailto:support@knoxville.co.ke" className="hover:text-white">Email</a>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-3 pt-3 border-t border-blue-400/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[10px] sm:text-xs text-blue-200">
            © {new Date().getFullYear()} Knoxville Technologies.
          </p>
          <div className="flex gap-4 text-[10px] sm:text-xs text-blue-200">
            <a href="/privacy" className="hover:text-white hover:underline transition">Privacy</a>
            <a href="/terms" className="hover:text-white hover:underline transition">Terms</a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

// --- Helper Components ---

const SocialIcon = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-[#FF8C00] hover:border-[#FF8C00] hover:text-white text-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, label }) => (
  <li>
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 transform hover:translate-x-1 ${isActive ? 'text-[#FF8C00] font-bold' : 'text-blue-100 hover:text-white'}`
      }
    >
      {({ isActive }) => (
        <>
          {/* Small dot indicator */}
          <span className={`h-1.5 w-1.5 rounded-full transition-colors ${isActive ? 'bg-[#FF8C00]' : 'bg-blue-400/50'}`}></span>
          {label}
        </>
      )}
    </NavLink>
  </li>
);

const ServiceItem = ({ label }) => (
  <li className="flex items-center gap-2 text-blue-100 text-xs sm:text-sm hover:text-white transition-colors cursor-default">
    <MdKeyboardArrowRight className="text-[#FF8C00]" /> 
    {label}
  </li>
);