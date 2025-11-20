import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
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
import Navbar from "../components/Navbar";

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

export default function ServicesPage() {
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

      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden bg-slate-900">
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
            <span className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-500/20 border border-blue-500 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Our Expertise
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">What We Offer</h2>
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
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2rem] shadow-xl border border-white hover:border-blue-100 hover:shadow-2xl transition-all duration-500 flex flex-col overflow-visible relative group"
                >
                  {/* 1. COLORED HEADER (Curved) */}
                  <div className={`${theme.bg} h-40 rounded-t-[2rem] rounded-bl-[4rem] relative flex items-center justify-center overflow-hidden transition-transform duration-500`}>
                    {/* Decorative background circle */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    
                    {/* Icon with gentle float animation */}
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="text-white z-10"
                    >
                      {service.icon}
                    </motion.div>
                  </div>

                  {/* 2. FLOATING BUTTON (Sits on curve) */}
                  <div className="absolute top-32 right-8 z-20">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-14 h-14 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center shadow-lg ${theme.text}`}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* 3. BODY CONTENT */}
                  <div className="p-8 pt-6 flex flex-col flex-grow">
                    <h3 className={`text-xl font-bold mb-3 ${theme.text}`}>
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="w-full h-px bg-slate-100 mb-6" />

                    <ul className="space-y-3 mb-6 flex-grow">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-500 font-medium group-hover:text-slate-700 transition-colors">
                          <div className={`mt-0.5 mr-3 p-1 rounded-full bg-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all`}>
                             <Check className={`w-3 h-3 ${theme.text}`} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl text-sm font-bold border-2 border-slate-100 text-slate-600 hover:text-white hover:border-transparent transition-all duration-300 group-hover:${theme.bg} group-hover:shadow-lg`}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need a Custom Solution?</h2>
            <p className="text-slate-300 text-lg mb-8">
              We understand that every business is unique. Contact our expert consultants for a tailored infrastructure assessment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-bold shadow-lg hover:shadow-blue-500/40 transition-all"
              >
                Get a Quote
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-slate-900 transition-all"
              >
                Contact Sales
              </motion.button>
            </div>
         </div>
      </section>

    </div>
  );
}