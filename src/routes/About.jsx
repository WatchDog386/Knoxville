import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { 
  Target, 
  Lightbulb, 
  Users, 
  Shield, 
  Zap, 
  ChevronRight, 
  CheckCircle2,
  TrendingUp,
  Globe
} from "lucide-react";

// 🔥 Knoxville Brand Colors
const BRAND = {
  black: "#121212",
  blue: "#015B97",      // Primary Blue
  orange: "#fb8c00",    // Primary Orange
  white: "#ffffff",
  slate: "#f1f5f9"
};

// Font stack
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
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans" style={{ fontFamily: FONT_FAMILY }}>
      <Helmet>
        <title>About Us | Knoxville Technologies</title>
        <meta name="description" content="Learn about Knoxville Internet — our mission, vision, values, and commitment to delivering world-class fibre connectivity." />
      </Helmet>

      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/about.jpg" 
            alt="Knoxville Team Meeting" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
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
              We are more than an ISP. We are the bridge to the digital future, connecting homes and businesses to a world of opportunity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CORPORATE BIO (Redesigned for Readability) ================= */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                The Knoxville Story
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-[#015B97]">Knoxville Technologies</strong> is a premier Kenyan Internet Service Provider focused on delivering ultra-fast, reliable, and affordable internet to underserved and developing regions.
                </p>
                <p>
                  Founded by a team of telecommunication experts, we deploy high-capacity fiber-optic infrastructure to bridge the digital divide. We believe that reliable internet is not a luxury—it is a fundamental utility that enables education, innovation, and economic growth.
                </p>
                <p>
                  From the heart of Nairobi to peri-urban communities, we are committed to empowering homes and businesses with seamless access to information. We don't just provide a connection; we provide a partnership.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-[#015B97]" />
                  </div>
                  <span className="font-semibold text-slate-800">Licensed ISP</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-[#fb8c00]" />
                  </div>
                  <span className="font-semibold text-slate-800">24/7 Local Support</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Visual/Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute top-0 right-0 w-2/3 h-full bg-[#015B97]/5 rounded-3xl -z-10 transform translate-x-8 -translate-y-8"></div>
              <img 
                src="/job.jpg"
                alt="Knoxville Engineers"
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
              {/* Floating Card */}
              <div className="absolute bottom-8 left-[-20px] bg-white p-6 rounded-xl shadow-xl border-l-4 border-[#fb8c00] max-w-xs hidden md:block">
                <p className="text-slate-900 font-bold text-lg">Community First</p>
                <p className="text-slate-500 text-sm">Connecting over 5,000+ homes and businesses.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#015B97] rounded-2xl flex items-center justify-center mb-6 rotate-3">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                To empower businesses and communities through reliable, innovative digital infrastructure that enables growth and creates opportunities for everyone, regardless of location.
              </p>
              <ul className="space-y-2">
                {['Bridge the digital divide', 'Enable economic growth', 'Provide affordable access'].map((item, i) => (
                   <li key={i} className="flex items-center text-sm text-slate-700">
                     <ChevronRight className="w-4 h-4 text-[#fb8c00] mr-2" /> {item}
                   </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#fb8c00] rounded-2xl flex items-center justify-center mb-6 -rotate-3">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                To be the catalyst for Kenya's digital revolution, connecting people, businesses, and ideas through world-class fiber infrastructure and exceptional service.
              </p>
              <ul className="space-y-2">
                {['Pan-African connectivity', 'Smart community enabler', 'Innovation leader'].map((item, i) => (
                   <li key={i} className="flex items-center text-sm text-slate-700">
                     <ChevronRight className="w-4 h-4 text-[#015B97] mr-2" /> {item}
                   </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#fb8c00] font-bold tracking-wider uppercase text-sm">Our Culture</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Core Values</h2>
            <div className="w-20 h-1 bg-[#fb8c00] mx-auto mt-6 rounded-full"></div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {value.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to experience the difference?</h2>
           <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
             Join thousands of happy customers who trust Knoxville for their daily connectivity needs.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href="/contact" className="px-8 py-3.5 bg-[#015B97] hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-blue-900/20">
               Get Connected
             </a>
             <a href="/coverage" className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-full font-bold transition-all">
               Check Coverage
             </a>
           </div>
        </div>
      </section>
    </div>
  );
}