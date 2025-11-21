import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { 
  Phone, Mail, MapPin, Star, CheckCircle, Zap, 
  Shield, Cpu, Wifi, ChevronDown, ChevronUp, X,
  Users, Award, Clock, Wrench, MessageCircle
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/Navbar";

// Font stack
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

// Colors & Themes
const COLORS = {
  blue: "#015B97",
  orange: "#fb8c00",
  slate: "#F8FAFC",
  dark: "#0f172a"
};

const TECH_THEMES = [
  { bg: 'bg-[#015B97]', light: 'bg-blue-50', text: 'text-[#015B97]' },
  { bg: 'bg-[#fb8c00]', light: 'bg-orange-50', text: 'text-[#fb8c00]' },
  { bg: 'bg-[#10b981]', light: 'bg-emerald-50', text: 'text-[#10b981]' },
  { bg: 'bg-[#8b5cf6]', light: 'bg-violet-50', text: 'text-[#8b5cf6]' },
];

// Technician Data
const technicians = [
  {
    id: "tech-1",
    name: "Abraham O.",
    role: "Hardware Engineer",
    phone: "+254726818938",
    email: "ooroabraham@gmail.com",
    location: "Nairobi, KE",
    rating: 4.9,
    reviews: 42,
    skills: ["Circuit Repair", "Data Recovery", "Diagnostics"],
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // Placeholder
    bio: "Certified hardware specialist with extensive experience in component-level repairs. Passionate about restoring devices to their optimal performance.",
    stats: [{ value: "98%", label: "Success" }, { value: "500+", label: "Fixed" }]
  },
  {
    id: "tech-2",
    name: "Collins O.",
    role: "Network Architect",
    phone: "+254768085708",
    email: "collinsominde98@gmail.com",
    location: "Nairobi, KE",
    rating: 4.8,
    reviews: 36,
    skills: ["Network Setup", "Router Config", "Security"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Network infrastructure expert focused on creating secure, high-performance solutions for businesses of all sizes.",
    stats: [{ value: "95%", label: "Uptime" }, { value: "300+", label: "Setups" }]
  },
  {
    id: "tech-3",
    name: "Bret Gift",
    role: "Software Expert",
    phone: "+254713116766",
    email: "ggiftotieno@gmail.com",
    location: "Nairobi, KE",
    rating: 4.9,
    reviews: 51,
    skills: ["Installation", "Optimization", "Migration"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Software troubleshooter dedicated to solving complex system issues and optimizing performance.",
    stats: [{ value: "99%", label: "Speed" }, { value: "700+", label: "Optimized" }]
  },
  {
    id: "tech-4",
    name: "Lameck O.",
    role: "Security Specialist",
    phone: "+254758018533",
    email: "lameckooro@gmail.com",
    location: "Nairobi, KE",
    rating: 4.7,
    reviews: 39,
    skills: ["Audits", "Firewalls", "Encryption"],
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Cybersecurity professional committed to protecting your digital assets with cutting-edge solutions.",
    stats: [{ value: "97%", label: "Secure" }, { value: "200+", label: "Audits" }]
  }
];

const specialties = [
  { icon: <Cpu className="w-6 h-6" />, name: "Hardware", desc: "Repairs & Upgrades" },
  { icon: <Wifi className="w-6 h-6" />, name: "Network", desc: "Infrastructure" },
  { icon: <Zap className="w-6 h-6" />, name: "Software", desc: "Optimization" },
  { icon: <Shield className="w-6 h-6" />, name: "Security", desc: "Protection" }
];

const faqs = [
  { q: "How quickly can you respond?", a: "We guarantee a response within 15 minutes during business hours." },
  { q: "Do you offer maintenance contracts?", a: "Yes, we provide flexible maintenance packages tailored to your needs." },
  { q: "What areas do you serve?", a: "We provide services throughout Nairobi, Kiambu, and surrounding environs." }
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

// --- SUB-COMPONENTS ---

const TechHero = () => (
  <section className="relative w-full overflow-hidden bg-slate-900 pb-32">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
        alt="Technicians" 
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/95"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="text-center max-w-3xl"
       >
         <span className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-500/20 border border-blue-500 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            Expert Support
         </span>
         <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
           Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Elite Team</span>
         </h1>
         <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
           Certified professionals ready to solve your most complex technical challenges.
         </p>
       </motion.div>
    </div>

    {/* Wavy Separator */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px] sm:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-slate-50"></path>
        </svg>
    </div>
  </section>
);

const TechnicianCard = ({ tech, index, onClick }) => {
  const theme = TECH_THEMES[index % TECH_THEMES.length];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="relative bg-white rounded-[2rem] shadow-xl border border-white hover:border-blue-100 transition-all duration-300 flex flex-col overflow-visible group cursor-pointer h-full"
      onClick={onClick}
    >
      {/* 1. Curved Colored Header */}
      <div className={`${theme.bg} h-32 rounded-t-[2rem] rounded-bl-[3rem] relative overflow-hidden`}>
         <div className="absolute top-0 right-0 p-4 opacity-20">
            <Wrench className="w-16 h-16 text-white" />
         </div>
      </div>

      {/* 2. Floating Avatar */}
      <div className="absolute top-16 left-6 z-10">
         <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100">
            <img src={tech.image} alt={tech.name} className="w-full h-full object-cover" />
         </div>
      </div>

      {/* 3. Action Button (Floating on Right) */}
      <div className="absolute top-24 right-6 z-20">
         <button className={`w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-slate-50 group-hover:scale-110 transition-transform ${theme.text}`}>
            <MessageCircle className="w-6 h-6" />
         </button>
      </div>

      {/* 4. Content */}
      <div className="pt-12 px-6 pb-6 flex flex-col flex-grow">
         <div>
            <h3 className="text-xl font-bold text-slate-800">{tech.name}</h3>
            <p className={`${theme.text} text-sm font-bold uppercase tracking-wider mb-3`}>{tech.role}</p>
            
            <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
               <MapPin className="w-4 h-4" /> {tech.location}
               <span className="w-1 h-1 bg-slate-300 rounded-full mx-1"></span>
               <Star className="w-4 h-4 text-yellow-400 fill-current" /> {tech.rating}
            </div>
         </div>

         <div className="flex flex-wrap gap-2 mb-6">
            {tech.skills.slice(0, 3).map((skill, i) => (
               <span key={i} className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${theme.light} ${theme.text}`}>
                  {skill}
               </span>
            ))}
         </div>

         <div className="mt-auto border-t border-slate-100 pt-4 flex justify-between items-center">
            {tech.stats.map((stat, i) => (
               <div key={i} className="text-center">
                  <p className="font-bold text-slate-800">{stat.value}</p>
                  <p className="text-[10px] text-slate-400 uppercase">{stat.label}</p>
               </div>
            ))}
         </div>
      </div>
    </motion.div>
  );
};

const TechnicianModal = ({ tech, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-[2rem] max-w-2xl w-full overflow-hidden shadow-2xl relative"
      onClick={e => e.stopPropagation()}
    >
       <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10">
          <X className="w-5 h-5 text-slate-600" />
       </button>

       <div className="flex flex-col md:flex-row">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/3 bg-slate-50 p-8 flex flex-col items-center text-center border-r border-slate-100">
             <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                <img src={tech.image} alt={tech.name} className="w-full h-full object-cover" />
             </div>
             <h2 className="text-xl font-bold text-slate-800">{tech.name}</h2>
             <p className="text-[#015B97] text-xs font-bold uppercase mb-4">{tech.role}</p>
             <a 
               href={`https://wa.me/${tech.phone.replace(/\D/g, '')}`}
               target="_blank" rel="noreferrer"
               className="w-full py-3 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
             >
                <MessageCircle className="w-4 h-4" /> Chat Now
             </a>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-2/3 p-8">
             <h3 className="text-lg font-bold text-slate-800 mb-2">About</h3>
             <p className="text-slate-600 text-sm leading-relaxed mb-6">{tech.bio}</p>

             <h3 className="text-lg font-bold text-slate-800 mb-2">Expertise</h3>
             <div className="grid grid-cols-2 gap-3 mb-6">
                {tech.skills.map((skill, i) => (
                   <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500" /> {skill}
                   </div>
                ))}
             </div>

             <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center">
                {tech.stats.map((stat, i) => (
                   <div key={i} className="text-center flex-1">
                      <p className="text-xl font-extrabold text-[#015B97]">{stat.value}</p>
                      <p className="text-[10px] text-blue-400 uppercase font-bold">{stat.label}</p>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </motion.div>
  </motion.div>
);

const Technicians = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: FONT_FAMILY }}>
      <Helmet>
        <title>Experts | Knoxville Internet</title>
      </Helmet>

      <Navbar />
      <TechHero />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20 pb-20">
        
        {/* --- STATS STRIP (Floating Dashboard) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 mb-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
           {[
             { label: "Experts", value: "15+", icon: <Users className="w-5 h-5 text-blue-500" /> },
             { label: "Projects", value: "1k+", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
             { label: "Response", value: "15m", icon: <Clock className="w-5 h-5 text-orange-500" /> },
             { label: "Rating", value: "4.9", icon: <Star className="w-5 h-5 text-yellow-500" /> },
           ].map((stat, i) => (
             <div key={i} className="flex items-center gap-4 border-r last:border-0 border-slate-100">
                <div className="p-3 bg-slate-50 rounded-2xl">{stat.icon}</div>
                <div>
                   <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{stat.label}</p>
                </div>
             </div>
           ))}
        </motion.div>

        {/* --- SPECIALTIES --- */}
        <div className="mb-20">
           <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800">Technical Specialties</h2>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialties.map((spec, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -5 }}
                   className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all text-center group"
                 >
                    <div className="w-14 h-14 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-[#015B97] mb-4 group-hover:scale-110 transition-transform">
                       {spec.icon}
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{spec.name}</h3>
                    <p className="text-slate-500 text-sm">{spec.desc}</p>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* --- TECHNICIANS GRID (Dribbble Style) --- */}
        <div className="mb-20">
           <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-800">Meet The Team</h2>
              <p className="text-slate-500 mt-2">Click on a profile to view details and book.</p>
           </div>

           <motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
           >
              {technicians.map((tech, i) => (
                 <TechnicianCard 
                   key={tech.id} 
                   tech={tech} 
                   index={i} 
                   onClick={() => setSelectedTech(tech)} 
                 />
              ))}
           </motion.div>
        </div>

        {/* --- FAQ SECTION --- */}
        <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-lg border border-slate-100 p-8 md:p-12">
           <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Common Questions</h2>
           <div className="space-y-4">
              {faqs.map((faq, i) => (
                 <div key={i} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="flex justify-between items-center w-full text-left font-bold text-slate-700 py-2"
                    >
                       {faq.q}
                       {activeFaq === i ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    <AnimatePresence>
                       {activeFaq === i && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm text-slate-500 leading-relaxed overflow-hidden"
                          >
                             <p className="pt-2 pb-2">{faq.a}</p>
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              ))}
           </div>
        </div>

      </div>

      <AnimatePresence>
        {selectedTech && <TechnicianModal tech={selectedTech} onClose={() => setSelectedTech(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Technicians;