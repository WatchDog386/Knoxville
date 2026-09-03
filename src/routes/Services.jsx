import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
Network,
ShieldCheck,
Cloud,
Server,
Wifi,
Briefcase,
Check,
ChevronRight,
ArrowRight
} from "lucide-react";

// Font stack
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

// 🔥 SERVICE THEMES (Vuma Style)
const SERVICE_THEMES = [
  { name: 'blue', bg: 'bg-[#0061a8]', text: 'text-[#0061a8]', shadow: 'shadow-blue-500/30' },     // Network
  { name: 'red', bg: 'bg-[#ed1c24]', text: 'text-[#ed1c24]', shadow: 'shadow-red-500/30' },       // Security
  { name: 'cyan', bg: 'bg-[#00aeef]', text: 'text-[#00aeef]', shadow: 'shadow-cyan-500/30' },     // Cloud
  { name: 'slate', bg: 'bg-slate-800', text: 'text-slate-800', shadow: 'shadow-slate-500/30' },    // Data Center
  { name: 'orange', bg: 'bg-[#f7941d]', text: 'text-[#f7941d]', shadow: 'shadow-orange-500/30' }, // ISP
  { name: 'green', bg: 'bg-[#00a651]', text: 'text-[#00a651]', shadow: 'shadow-green-500/30' },   // Consulting
];

// Services Data
const services = [
  {
    id: "network",
    title: "Network Infrastructure",
    description: "Design, implementation and management of robust network solutions.",
    icon: <Network className="w-12 h-12" />,
    features: ["Structured cabling", "Wireless deployment", "Security integration", "Optimization"],
  },
  {
    id: "security",
    title: "Cyber Security",
    description: "Comprehensive measures to protect your digital assets and infrastructure.",
    icon: <ShieldCheck className="w-12 h-12" />,
    features: ["Firewall implementation", "Intrusion detection", "Security audits", "Data protection"],
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    description: "Scalable cloud computing to enhance business operations and flexibility.",
    icon: <Cloud className="w-12 h-12" />,
    features: ["Cloud migration", "Hybrid solutions", "Cloud security", "24/7 monitoring"],
  },
  {
    id: "data-center",
    title: "Data Center",
    description: "Enterprise-grade data center services with maximum uptime reliability.",
    icon: <Server className="w-12 h-12" />,
    features: ["Colocation services", "Disaster recovery", "Data backup", "Infrastructure mgmt"],
  },
  {
    id: "isp",
    title: "ISP Services",
    description: "High-speed internet connectivity solutions for businesses and residential.",
    icon: <Wifi className="w-12 h-12" />,
    features: ["Fiber optic", "Wireless broadband", "Dedicated internet", "Bandwidth control"],
  },
  {
    id: "consulting",
    title: "IT Consulting",
    description: "Expert technology consulting to align IT strategy with business goals.",
    icon: <Briefcase className="w-12 h-12" />,
    features: ["Technology roadmap", "Infrastructure audit", "Digital transform", "Vendor mgmt"],
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: FONT_FAMILY }}>
      <Helmet>
        <title>Services | Knoxville Internet</title>
        <meta name="description" content="Explore Knoxville's professional services: ISP, network infrastructure, cloud solutions, security, data center, and IT consulting." />
      </Helmet>

      <style>{`
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          background: linear-gradient(-45deg, #f8fafc, #eff6ff, #f0fdf4, #fff7ed);
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>

{/* ================= HERO SECTION ================= */}
      <section className="relative w-full overflow-hidden h-[30vh] sm:h-[38vh] md:h-[65vh] lg:h-[75vh] flex items-center justify-center bg-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Technology Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-500/20 border border-blue-500 text-blue-400 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
              Our Expertise
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight" style={{ fontFamily: FONT_FAMILY }}>
              Solutions Built for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">The Future</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Comprehensive network infrastructure and digital services tailored to drive your business growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES GRID (Vuma Style) ================= */}
      <section className="py-20 animate-gradient-bg relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-800">What We Offer</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">End-to-end technology solutions designed for reliability and performance.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service, index) => {
              // Assign colors based on index
              const theme = SERVICE_THEMES[index % SERVICE_THEMES.length];

              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className={`relative bg-white rounded-[1.2rem] overflow-hidden flex flex-col h-full group border border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-500 ${theme.bg}`}
                >
                  {/* 1. IMAGE/ICON SECTION */}
                  <div className="relative h-32 overflow-hidden border-b border-slate-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center z-10 text-white"
                    >
                      {service.icon}
                    </motion.div>
                    <div className="absolute top-3 right-3 z-20">
                      <span className={`${theme.bg} text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg`}>
                        Service
                      </span>
                    </div>
                  </div>

                  {/* 2. COLORED HEADER */}
                  <div className={`${theme.bg} p-4 relative overflow-hidden rounded-bl-[2rem] transition-colors duration-300`}>
                    <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                    
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1">{service.title}</h3>
                    <p className="text-white/90 text-xs leading-relaxed max-w-xs">{service.description}</p>
                  </div>

                  {/* 3. BODY SECTION */}
                  <div className="p-4 pt-3 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50 relative">
                    <div className="w-full h-px bg-slate-100 mb-4" />

                    <ul className="space-y-2 mb-4 flex-grow">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-xs text-slate-600 font-medium group-hover:text-slate-800 transition-colors">
                          <Check className={`w-3.5 h-3.5 mr-2 mt-0.5 flex-shrink-0 ${theme.text}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      className={`w-full py-2 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 text-white shadow-md ${theme.bg} ${theme.shadow} hover:brightness-110 hover:shadow-lg`}
                    >
                      Learn More <ChevronRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

{/* ================= CTA SECTION ================= */}
      <section className="home-page-section py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-2xl md:text-3xl font-light text-white mb-5">Need a Custom Solution?</h2>
           <p className="text-slate-300 text-lg mb-8">
             We understand that every business is unique. Contact our expert consultants for a tailored infrastructure assessment.
           </p>
           <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => navigate('/contact')}
               className="px-8 py-3.5 bg-[#015B97] hover:bg-blue-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
             >
               Get a Quote
             </motion.button>
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => navigate('/contact')}
               className="px-8 py-3.5 bg-white hover:bg-slate-50 text-[#015B97] border-2 border-[#015B97] rounded-full font-bold hover:bg-[#015B97] hover:text-white transition-all duration-300"
             >
               Contact Sales
             </motion.button>
           </div>
        </div>
      </section>

    </div>
  );
}