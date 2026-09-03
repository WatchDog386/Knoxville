import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { 
  Target, Lightbulb, Users, Shield, Zap, ChevronRight, 
  CheckCircle2, Globe, X,
  MapPin, Activity, ArrowUpRight, Play, Maximize2, ExternalLink, ArrowLeft
} from "lucide-react";
import { CheckCircle } from "lucide-react";

// 🔥 Knoxville Brand Colors - matching home page
const PACKAGE_THEMES = [
  { name: 'blue', bg: 'bg-[#0061a8]', text: 'text-[#0061a8]', shadow: 'shadow-blue-500/40' },
  { name: 'green', bg: 'bg-[#00a651]', text: 'text-[#00a651]', shadow: 'shadow-green-500/40' },
  { name: 'orange', bg: 'bg-[#f7941d]', text: 'text-[#f7941d]', shadow: 'shadow-orange-500/40' },
  { name: 'purple', bg: 'bg-[#662d91]', text: 'text-[#662d91]', shadow: 'shadow-purple-500/40' },
  { name: 'red', bg: 'bg-[#ed1c24]', text: 'text-[#ed1c24]', shadow: 'shadow-red-500/40' },
  { name: 'cyan', bg: 'bg-[#00aeef]', text: 'text-[#00aeef]', shadow: 'shadow-cyan-500/40' },
];

const BRAND = {
  black: "#121212",
  blue: "#015B97",
  orange: "#fb8c00",
  white: "#ffffff",
  slate: "#f1f5f9"
};

const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

// Animation Variants - matching home page
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

// Latest project updates
const latestGalleryImages = [
  "update.jpeg",
  "update1.jpeg",
  "update2.jpeg",
  "update3.jpeg",
  "uppdate4.jpeg",
  "update5.jpeg",
  "update6.jpeg",
  "update7.jpeg"
];

// Existing gallery, available through View More
const galleryImages = [
  "WhatsApp Image 2026-05-04 at 3.54.44 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 3.55.11 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 3.55.35 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 3.56.53 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 3.56.54 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 3.56.55 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.42 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.56 PM (2).jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.54 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.55 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.56 PM.jpeg",
  "WhatsApp Image 2026-05-04 at 4.04.57 PM.jpeg"
];

export default function AboutPage() {
  // --- STATE FOR LIGHTBOX ---
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showMoreGallery, setShowMoreGallery] = useState(false);
  const [coreValueSlide, setCoreValueSlide] = useState(0);

  // Auto-advance core values carousel on mobile
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const timer = setInterval(() => {
      setCoreValueSlide((prev) => (prev + 1) % values.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
      <section className="relative w-full overflow-hidden h-[30vh] sm:h-[38vh] md:h-[65vh] lg:h-[75vh] flex items-center justify-center">
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
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-12 bg-[#fb8c00]"></div>
              <span className="text-[#fb8c00] font-semibold tracking-widest uppercase text-sm">Who We Are</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white mb-4 leading-tight" style={{ fontFamily: FONT_FAMILY }}>
              Empowering Kenya <br /> Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fb8c00] to-orange-400">Connectivity</span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
              Reliable fibre that keeps homes, businesses, and communities connected.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CORPORATE BIO ================= */}
      <section className="home-page-section py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-4">The Knoxville Story</h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed max-w-xl">
                <p>
                  <strong className="text-[#015B97]">Knoxville Technologies</strong> delivers fast, reliable, and affordable internet across Kenya.
                </p>
                <p>
                  We connect homes and businesses with dependable service and local support.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[1.2rem] overflow-hidden flex flex-col h-full group border border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-500 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-[1.2rem]"><CheckCircle2 className="w-5 h-5 text-[#015B97]" /></div>
                    <span className="font-semibold text-slate-800">Licensed ISP</span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[1.2rem] overflow-hidden flex flex-col h-full group border border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-500 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-[1.2rem]"><CheckCircle2 className="w-5 h-5 text-[#fb8c00]" /></div>
                    <span className="font-semibold text-slate-800">24/7 Local Support</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute top-0 right-0 w-2/3 h-full bg-[#015B97]/5 rounded-[1.2rem] -z-10 transform translate-x-8 -translate-y-8"></div>
              <video controls muted className="rounded-[1.2rem] shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70 w-full object-cover h-[320px] md:h-[380px] bg-slate-900" poster="/about.jpg">
                <source src="/tech2.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO / IMPACT SECTION (SHARP EDGES + NEW IMAGES) ================= */}
      <section className="home-page-section py-12 md:py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
            <div>
              <span className="text-[#015B97] font-semibold tracking-widest uppercase text-xs">Our Work</span>
              <h2 className="text-2xl md:text-3xl font-light text-slate-900 mt-2">
                Impact in <span className="text-[#fb8c00]">Action</span>
              </h2>
            </div>
            <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <Maximize2 className="w-4 h-4" /> Click to view full details
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-5">

            {/* 1. HERO VIDEO - Large left feature (spans majority of width) */}
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              onClick={() => openLightbox('video', '/VID-20251201-WA0004.mp4')}
              className="col-span-2 md:col-span-2 relative group rounded-[1.2rem] overflow-hidden bg-slate-900 cursor-pointer border border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-500 aspect-[16/7]"
              whileHover={{ y: -5 }}
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
              className="col-span-2 md:col-span-2 bg-[#015B97] rounded-[1.2rem] p-5 flex flex-col justify-between group hover:bg-[#014a7a] transition-colors text-white min-h-[130px] shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-500"
              whileHover={{ y: -5 }}
            >
               <Activity className="w-8 h-8 opacity-50 mb-4" />
               <div>
                 <h4 className="text-4xl font-extrabold">100%</h4>
                 <p className="text-xs text-blue-200 mt-1 uppercase tracking-widest">Dedication</p>
               </div>
            </motion.div>

            {/* 3. LATEST IMAGE GALLERY */}
            {latestGalleryImages.map((img, index) => {
              // Encode spaces in filename
              const encodedImg = encodeURIComponent(img);

              const theme = PACKAGE_THEMES[index % PACKAGE_THEMES.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => openLightbox('image', `/${encodedImg}`)}
                  className="relative group rounded-[1.2rem] overflow-hidden bg-slate-200 cursor-pointer border border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-500 aspect-[4/3]"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 z-10 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-3 right-3 z-20">
                    <span className={`${theme.bg} text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg`}>
                      Latest
                    </span>
                  </div>
                  <img 
                    src={`/${encodedImg}`} 
                    alt={`Latest project update ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </motion.div>
              );
            })}

            {showMoreGallery && galleryImages.map((img, index) => {
              const encodedImg = encodeURIComponent(img);
              const theme = PACKAGE_THEMES[index % PACKAGE_THEMES.length];

              return (
                <motion.div
                  key={`existing-${index}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => openLightbox('image', `/${encodedImg}`)}
                  className="relative group rounded-[1.2rem] overflow-hidden bg-slate-200 cursor-pointer border border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-500 aspect-[4/3]"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 z-10 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-3 right-3 z-20">
                    <span className={`${theme.bg} text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg`}>
                      Gallery
                    </span>
                  </div>
                  <img
                    src={`/${encodedImg}`}
                    alt={`Existing project gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </motion.div>
              );
            })}

          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowMoreGallery((visible) => !visible)}
              className="w-full sm:w-auto px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base text-white shadow-md bg-[#015B97] hover:brightness-110 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {showMoreGallery ? "Show Less" : "View More"}
              <ChevronRight className={`w-5 h-5 transition-transform ${showMoreGallery ? "rotate-90" : ""}`} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="home-page-section py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <motion.div 
              whileHover={{ y: -5 }} className="bg-white rounded-[1.2rem] overflow-hidden flex flex-col h-full group border border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-500 p-6 md:p-8"
            >
              <div className="w-12 h-12 bg-[#015B97] rounded-[1.2rem] flex items-center justify-center mb-4 shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To empower businesses and communities through reliable, innovative digital infrastructure.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }} className="bg-white rounded-[1.2rem] overflow-hidden flex flex-col h-full group border border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-500 p-6 md:p-8"
            >
              <div className="w-12 h-12 bg-[#fb8c00] rounded-[1.2rem] flex items-center justify-center mb-4 shadow-lg">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the catalyst for Kenya's digital revolution, connecting people, businesses, and ideas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="home-page-section py-14 md:py-18 bg-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <span className="text-[#fb8c00] font-semibold tracking-wider uppercase text-sm">Our Culture</span>
            <h2 className="text-2xl md:text-3xl font-light mt-3">Core Values</h2>
            <div className="w-20 h-1 bg-[#fb8c00] mx-auto mt-6 rounded-[1.2rem]"></div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => {
              const theme = PACKAGE_THEMES[index % PACKAGE_THEMES.length];
              return (
                <motion.div key={index} variants={fadeUp} className={`p-6 rounded-[1.2rem] border border-white/10 hover:bg-white/10 transition-all duration-300 group ${theme.bg}`} whileHover={{ y: -5 }}>
                  <div className="w-10 h-10 bg-white/20 rounded-[1.2rem] flex items-center justify-center mb-4 shadow-lg">{value.icon}</div>
                  <h3 className="text-lg font-bold mb-2 text-white">{value.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: Carousel/Slideshow */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={coreValueSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative"
              >
                {(() => {
                  const value = values[coreValueSlide];
                  const theme = PACKAGE_THEMES[coreValueSlide % PACKAGE_THEMES.length];
                  return (
                    <motion.div
                      className={`p-6 rounded-[1.2rem] border border-white/10 ${theme.bg}`}
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-[1.2rem] flex items-center justify-center mb-4 shadow-lg">{value.icon}</div>
                      <h3 className="text-lg font-bold mb-2 text-white">{value.title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{value.description}</p>
                    </motion.div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Dot navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {values.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCoreValueSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === coreValueSlide ? 'bg-[#fb8c00] w-6' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="home-page-section py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-5">Ready to experience the difference?</h2>
<div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <a href="/contact" className="px-8 py-3.5 bg-[#015B97] hover:bg-blue-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300">Get Connected</a>
              <a href="/coverage" className="px-8 py-3.5 bg-white hover:bg-slate-50 text-[#015B97] border-2 border-[#015B97] rounded-full font-bold hover:bg-[#015B97] hover:text-white transition-all duration-300">Check Coverage</a>
            </div>
        </div>
      </section>
    </div>
  );
}