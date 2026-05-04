import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { 
  Target, Lightbulb, Users, Shield, Zap, ChevronRight, 
  CheckCircle2, Globe, X,
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

// New Images List - Updated with WhatsApp images
const galleryImages = [
  "WhatsApp Image 2026-05-04 at 3.54.44 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 3.55.11 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 3.55.35 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 3.56.53 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 3.56.54 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 3.56.55 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.42 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.45 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.54 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.55 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.56 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.57 PM.jpeg"
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
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: FONT_FAMILY, fontWeight: 950, letterSpacing: '-0.02em' }}>
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

          {/* GRID LAYOUT - Staggered masonry-like layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[160px] md:auto-rows-[180px]">

            {/* 1. HERO VIDEO - Large left feature (spans majority of width) */}
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              onClick={() => openLightbox('video', '/VID-20251201-WA0004.mp4')}
              className="md:col-span-7 md:row-span-2 relative group rounded-none overflow-hidden bg-slate-900 cursor-pointer border border-slate-200"
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
                <source src="/VID-20251201-WA0004.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                <h3 className="text-white font-bold text-lg leading-tight">Field Operations</h3>
                <p className="text-slate-300 text-xs mt-1">Live footage from our deployment sites.</p>
              </div>
            </motion.div>

            {/* 2. STAT CARD - Top-right accent */}
            <motion.div 
              className="md:col-span-3 bg-[#015B97] rounded-none p-6 flex flex-col justify-between group hover:bg-[#014a7a] transition-colors text-white"
            >
               <Activity className="w-8 h-8 opacity-50 mb-4" />
               <div>
                 <h4 className="text-4xl font-extrabold">100%</h4>
                 <p className="text-xs text-blue-200 mt-1 uppercase tracking-widest">Dedication</p>
               </div>
            </motion.div>

            {/* 3. DYNAMIC IMAGE GALLERY - assign explicit spans for staggered layout */}
            {galleryImages.map((img, index) => {
              // Map indices to span sizes to create the staggered layout similar to the reference
              let spanClass = "md:col-span-2 md:row-span-1";
              if (index === 0) spanClass = "md:col-span-5 md:row-span-1"; // wide card on top-right
              else if (index === 1) spanClass = "md:col-span-4 md:row-span-2"; // tall card below the wide one
              else if (index === 2) spanClass = "md:col-span-3 md:row-span-1";
              else if (index === 3) spanClass = "md:col-span-3 md:row-span-1";
              else if (index === 4) spanClass = "md:col-span-4 md:row-span-1";

              // Encode spaces in filename
              const encodedImg = encodeURIComponent(img);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => openLightbox('image', `/${encodedImg}`)}
                  className={`relative group rounded-none overflow-hidden bg-slate-200 cursor-pointer border border-slate-200 ${spanClass}`}
                >
                  <div className="absolute inset-0 z-10 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                  <img 
                    src={`/${encodedImg}`} 
                    alt={`Project gallery ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </motion.div>
              );
            })}

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