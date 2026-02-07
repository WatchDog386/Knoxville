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
    <footer className="relative bg-[#015B97] text-white font-sans overflow-hidden">
      
      {/* --- Background Wave Pattern (Subtle) --- */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM43.26 0c6.272 1.747 11.157 2 16.74 2C78.748 2 85.633.785 92.715 0h-6.335c-4.633.689-9.328 1.218-14.62 1.218-6.916 0-11.938-.71-18.5-2h-6.335zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px auto'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-8 md:pt-12 pb-2 sm:pb-8">
        {/* Desktop: Full 4-column grid | Mobile: Stacked 1-column */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10">
          
          {/* 1. BRAND COLUMN */}
          <div className="space-y-3 sm:space-y-6">
            <div>
              <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white">Knoxville Technologies</h3>
              {/* Orange Underline Accent */}
              <div className="h-0.5 w-14 sm:w-20 bg-[#FF8C00] mt-1.5 sm:mt-3 rounded-full"></div>
            </div>
            <p className="text-blue-100 leading-relaxed text-[11px] sm:text-sm">
              Connecting Kenya with reliable, high-speed fiber internet. We bridge the gap between rural and urban connectivity with affordable solutions.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3">
              <SocialIcon href="https://facebook.com" icon={<FaFacebookF />} />
              <SocialIcon href="https://tiktok.com" icon={<FaTiktok />} />
              <SocialIcon href="https://whatsapp.com" icon={<FaWhatsapp />} />
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <AccordionSection title="Quick Links">
              <ul className="space-y-2 sm:space-y-3">
                <FooterLink to="/" label="Home" />
                <FooterLink to="/about" label="About Us" />
                <FooterLink to="/services" label="Services" />
                <FooterLink to="/coverage" label="Coverage Map" />
                <FooterLink to="/contact" label="Contact" />
              </ul>
          </AccordionSection>

          {/* 3. SERVICES */}
          <AccordionSection title="Our Services">
              <ul className="space-y-2 sm:space-y-3">
                <ServiceItem label="Home Fiber" />
                <ServiceItem label="Business Internet" />
                <ServiceItem label="Enterprise Solutions" />
                <ServiceItem label="CCTV Installation" />
              </ul>
          </AccordionSection>

          {/* 4. CONTACT INFO */}
          <AccordionSection title="Get in Touch">
              <ul className="space-y-3 sm:space-y-5">
                <li className="flex items-start gap-2 sm:gap-3 text-blue-100 text-xs sm:text-sm group">
                   <div className="mt-0.5 sm:mt-1 p-1.5 sm:p-2 bg-white/10 rounded-full group-hover:bg-[#FF8C00] transition-colors shrink-0">
                     <FaMapMarkerAlt className="text-white text-[10px] sm:text-xs" />
                   </div>
                   <span className="leading-relaxed">LuckySummer, Behind Naivas Supermarket, Nairobi, Kenya</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-blue-100 text-xs sm:text-sm group">
                   <div className="p-1.5 sm:p-2 bg-white/10 rounded-full group-hover:bg-[#FF8C00] transition-colors shrink-0">
                     <FaPhoneAlt className="text-white text-[10px] sm:text-xs" />
                   </div>
                   <a href="tel:+254726818938" className="hover:text-white transition">+254 726 818 938</a>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-blue-100 text-xs sm:text-sm group">
                   <div className="p-1.5 sm:p-2 bg-white/10 rounded-full group-hover:bg-[#FF8C00] transition-colors shrink-0">
                     <FaEnvelope className="text-white text-[10px] sm:text-xs" />
                   </div>
                   <a href="mailto:support@knoxville.co.ke" className="hover:text-white transition">support@knoxville.co.ke</a>
                </li>
              </ul>
          </AccordionSection>
        </div>

        {/* MOBILE VERSION: Compact accordion-style footer */}
        <div className="md:hidden space-y-1">
          {/* 1. Mobile Brand */}
          <div className="pb-2 border-b border-blue-400/20">
            <h3 className="text-base font-bold text-white">Knoxville Technologies</h3>
            <div className="h-0.5 w-10 bg-[#FF8C00] mt-1 rounded-full"></div>
          </div>

          {/* 2. Mobile Quick Links */}
          <AccordionSection title="Quick Links">
            <ul className="space-y-1">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/services" label="Services" />
            </ul>
          </AccordionSection>

          {/* 3. Mobile Services */}
          <AccordionSection title="Services">
            <ul className="space-y-1">
              <ServiceItem label="Home Fiber" />
              <ServiceItem label="Business Internet" />
            </ul>
          </AccordionSection>

          {/* 4. Mobile Contact */}
          <AccordionSection title="Contact">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-blue-100 text-xs group">
                <div className="p-1 bg-white/10 rounded-full group-hover:bg-[#FF8C00] transition-colors shrink-0">
                  <FaPhoneAlt className="text-white text-[9px]" />
                </div>
                <a href="tel:+254726818938" className="hover:text-white transition">+254 726 818 938</a>
              </li>
              <li className="flex items-center gap-2 text-blue-100 text-xs group">
                <div className="p-1 bg-white/10 rounded-full group-hover:bg-[#FF8C00] transition-colors shrink-0">
                  <FaEnvelope className="text-white text-[9px]" />
                </div>
                <a href="mailto:support@knoxville.co.ke" className="hover:text-white transition truncate text-[10px]">support@knoxville.co.ke</a>
              </li>
            </ul>
          </AccordionSection>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-2 sm:mt-16 pt-2 sm:pt-8 border-t border-blue-400/20 flex flex-col gap-1 sm:gap-0 md:flex-row justify-between items-center">
          <p className="text-[9px] sm:text-sm text-blue-200">
            © {new Date().getFullYear()} Knoxville Technologies.
          </p>
          <div className="flex gap-2 sm:gap-6 text-[9px] sm:text-xs text-blue-200">
            <a href="/privacy" className="hover:text-white hover:underline transition">Privacy</a>
            <a href="/terms" className="hover:text-white hover:underline transition">Terms</a>
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