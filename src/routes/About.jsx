import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { 
  Target, Lightbulb, Users, Shield, Zap, ChevronRight, 
  CheckCircle2, Globe, Wifi, Menu, X,
  MapPin, Activity, ArrowUpRight, Play, Maximize2, ExternalLink, ArrowLeft
} from "lucide-react";

// 🔥 Knoxville Brand Colors
const BRAND = {
  black: "#121212",
  blue: "#015B97",      // Primary Blue
  orange: "#fb8c00",    // Primary Orange
  white: "#ffffff",
  slate: "#f1f5f9"
};

const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const values = [
  { 
    icon: <Shield className="w-6 h-6 text-white" />, 
    title: "Integrity", 
    description: "We conduct our business with uncompromising honesty, transparency, and ethical practices.",
    color: "bg-[#015B97]"
  },
  { 
    icon: <Lightbulb className="w-6 h-6 text-white" />, 
    title: "Innovation", 
    description: "We embrace creativity to deliver cutting-edge fiber solutions for evolving digital needs.",
    color: "bg-[#fb8c00]"
  },
  { 
    icon: <Zap className="w-6 h-6 text-white" />, 
    title: "Excellence", 
    description: "We strive for the highest standards in speed, stability, and customer support.",
    color: "bg-purple-600"
  },
  { 
    icon: <Users className="w-6 h-6 text-white" />, 
    title: "Collaboration", 
    description: "We believe in teamwork to achieve shared success with our clients and communities.",
    color: "bg-emerald-600"
  },
];

// New Images List
const galleryImages = [
  "IMG-20251201-WA0006.jpg", "IMG-20251201-WA0007.jpg", "IMG-20251201-WA0008.jpg",
  "IMG-20251201-WA0009.jpg", "IMG-20251201-WA0010.jpg", "IMG-20251201-WA0011.jpg",
  "IMG-20251201-WA0012.jpg", "IMG-20251201-WA0015.jpg", "IMG-20251201-WA0018.jpg",
  "IMG-20251201-WA0019.jpg", "IMG-20251201-WA0020.jpg", "IMG-20251201-WA0021.jpg",
  "IMG-20251201-WA0022.jpg"
];

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- NAVBAR ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 font-sans" style={{ fontFamily: FONT_FAMILY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-[#015B97] rounded-none flex items-center justify-center">
               <Wifi className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Knoxville<span className="text-[#fb8c00]">.</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Coverage'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-600 hover:text-[#015B97] transition-colors"
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="px-5 py-2.5 bg-[#015B97] hover:bg-blue-700 text-white text-sm font-bold rounded-none transition-all shadow-lg shadow-blue-900/10">
              Get Connected
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-[#015B97] p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function AboutPage() {
  // --- STATE FOR LIGHTBOX ---
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Helper function to open the lightbox
  const openLightbox = (type, src) => {
    setSelectedMedia({ type, src });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans" style={{ fontFamily: FONT_FAMILY }}>
      <Helmet>
        <title>About Us | Knoxville Technologies</title>
        <meta name="description" content="Knoxville Technologies - Empowering Kenya through connectivity." />
      </Helmet>

      <Navbar />

      {/* ================= LIGHTBOX OVERLAY (ZOOM VIEW) ================= */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            {/* TOP BAR: BACK BUTTON & CLOSE */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
               {/* Back Button */}
               <button 
                  onClick={() => setSelectedMedia(null)}
                  className="flex items-center gap-2 text-white font-semibold hover:text-[#fb8c00] transition-colors group"
               >
                  <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20">
                     <ArrowLeft className="w-5 h-5" />
                  </div>
                  <span>Back to Portfolio</span>
               </button>

               {/* Close Icon (Secondary) */}
               <button 
                  onClick={() => setSelectedMedia(null)}
                  className="text-white/50 hover:text-white transition-colors"
               >
                  <X className="w-8 h-8" />
               </button>
            </div>

            {/* Content Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} 
            >
              {selectedMedia.type === 'video' ? (
                <video 
                  src={selectedMedia.src} 
                  controls 
                  autoPlay 
                  className="max-w-full max-h-[80vh] shadow-2xl border border-white/10"
                />
              ) : (
                <img 
                  src={selectedMedia.src} 
                  alt="Full View" 
                  className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            poster="/about.jpg" 
          >
            <source src="/tech.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-[#fb8c00]"></div>
              <span className="text-[#fb8c00] font-bold tracking-widest uppercase text-sm">Who We Are</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Empowering Kenya <br /> Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fb8c00] to-orange-400">Connectivity</span>
            </h1>
            <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
              We are more than an ISP. We are the bridge to the digital future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CORPORATE BIO ================= */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Knoxville Story</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-[#015B97]">Knoxville Technologies</strong> is a premier Kenyan Internet Service Provider focused on delivering ultra-fast, reliable, and affordable internet.
                </p>
                <p>
                  From the heart of Nairobi to peri-urban communities, we are committed to empowering homes and businesses with seamless access to information.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-none"><CheckCircle2 className="w-5 h-5 text-[#015B97]" /></div>
                  <span className="font-semibold text-slate-800">Licensed ISP</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-none"><CheckCircle2 className="w-5 h-5 text-[#fb8c00]" /></div>
                  <span className="font-semibold text-slate-800">24/7 Local Support</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute top-0 right-0 w-2/3 h-full bg-[#015B97]/5 rounded-none -z-10 transform translate-x-8 -translate-y-8"></div>
              <video controls muted className="rounded-none shadow-2xl w-full object-cover h-[500px] bg-slate-900" poster="/about.jpg">
                <source src="/tech2.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO / IMPACT SECTION (SHARP EDGES + NEW IMAGES) ================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
              <span className="text-[#015B97] font-bold tracking-widest uppercase text-xs">Our Work</span>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-2">
                Impact in <span className="text-[#fb8c00]">Action</span>
              </h2>
            </div>
            <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <Maximize2 className="w-4 h-4" /> Click to view full details
            </p>
          </div>

          {/* GRID LAYOUT - Using auto-fit for dynamic image loading */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:auto-rows-[200px]">
            
            {/* 1. HERO VIDEO - Spans 2x2 */}
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              onClick={() => openLightbox('video', '/knox.mp4')}
              className="md:col-span-2 md:row-span-2 relative group rounded-none overflow-hidden bg-slate-900 cursor-pointer border border-slate-200"
            >
              <div className="absolute top-0 left-0 w-full p-4 z-20 flex justify-between items-start">
                 <div className="bg-red-600 px-2 py-1 text-white text-[10px] font-bold uppercase tracking-wider rounded-none">
                    Featured Project
                 </div>
              </div>
              <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-none border border-white/40">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
              <video 
                autoPlay muted loop playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                poster="/knox1.jpg"
              >
                <source src="/knox.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                <h3 className="text-white font-bold text-lg leading-tight">Field Operations</h3>
                <p className="text-slate-300 text-xs mt-1">Live footage from our deployment sites.</p>
              </div>
            </motion.div>

            {/* 2. STAT CARD - Spans 1x1 */}
            <motion.div 
               className="bg-[#015B97] rounded-none p-6 flex flex-col justify-between group hover:bg-[#014a7a] transition-colors text-white"
            >
               <Activity className="w-8 h-8 opacity-50 mb-4" />
               <div>
                 <h4 className="text-4xl font-extrabold">100%</h4>
                 <p className="text-xs text-blue-200 mt-1 uppercase tracking-widest">Dedication</p>
               </div>
            </motion.div>

            {/* 3. DYNAMIC IMAGE GALLERY */}
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openLightbox('image', `/${img}`)}
                className={`relative group rounded-none overflow-hidden bg-slate-200 cursor-pointer border border-slate-200 ${
                   // Make every 4th image span 2 rows for visual variety if desired, else 1x1
                   index % 5 === 0 ? "md:row-span-2" : "md:row-span-1"
                }`}
              >
                <div className="absolute inset-0 z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <Maximize2 className="w-6 h-6 text-white" />
                </div>
                <img 
                  src={`/${img}`} 
                  alt={`Project gallery ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }} className="bg-slate-50 p-10 rounded-none border border-slate-100 shadow-sm"
            >
              <div className="w-14 h-14 bg-[#015B97] rounded-none flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To empower businesses and communities through reliable, innovative digital infrastructure.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }} className="bg-slate-50 p-10 rounded-none border border-slate-100 shadow-sm"
            >
              <div className="w-14 h-14 bg-[#fb8c00] rounded-none flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the catalyst for Kenya's digital revolution, connecting people, businesses, and ideas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#fb8c00] font-bold tracking-wider uppercase text-sm">Our Culture</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Core Values</h2>
            <div className="w-20 h-1 bg-[#fb8c00] mx-auto mt-6 rounded-none"></div>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeUp} className="bg-white/5 backdrop-blur-sm p-8 rounded-none border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className={`${value.color} w-12 h-12 rounded-none flex items-center justify-center mb-6 shadow-lg`}>{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to experience the difference?</h2>
           <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
             <a href="/contact" className="px-8 py-3.5 bg-[#015B97] hover:bg-blue-700 text-white rounded-none font-bold shadow-lg">Get Connected</a>
             <a href="/coverage" className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-none font-bold">Check Coverage</a>
           </div>
        </div>
      </section>
    </div>
  );
}