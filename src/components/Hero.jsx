// Hero.jsx - FINAL VERSION (Black Text in Headers)
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { Wifi, Clock, HardHat, CheckCircle, Zap, X, Smartphone, ChevronRight, Star, Shield, Mail } from "lucide-react";

// Hero Slides
const heroSlides = [
  {
    backgroundImage: "https://itel.com/wp-content/uploads/2015/09/iStock_000012499607_XXXLarge-1024x576.jpg",
    title: "Unlimited <span style='color: #fb8c00;'>Internet</span> For Your Home",
    description: "Enjoy unlimited internet for your home with fast, reliable fibre connectivity.",
    tag: "High-Speed Connectivity",
    ctaText: "View Plans",
    secondaryCtaText: "View Coverage"
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Business <span style='color: #fb8c00;'>Solutions</span> That Scale",
    description: "Enterprise-grade connectivity with dedicated support and 99.9% uptime guarantee.",
    tag: "Enterprise Ready",
    ctaText: "Business Plans",
    secondaryCtaText: "Contact Sales"
  },
  {
    backgroundImage: "https://media.istockphoto.com/id/1494073880/photo/a-man-holding-icon-virtual-24-7-support-services-for-worldwide-nonstop-and-full-time.jpg?s=612x612&w=0&k=20&c=4YF-otaX3n8OiPOC4L_-_pAX1ibayzdvpkK1Ih2-p50=",
    title: "We Offer <span style='color: #fb8c00;'> customer</span> 24/7 care services",
    description: "We Offer 24/7 customer care services.",
    tag: "Premium Service",
    ctaText: "Explore Plans",
    secondaryCtaText: "Check Speed"
  }
];

// 🔥 ANIMATED PACKAGE THEMES
const PACKAGE_THEMES = [
  { name: 'blue', bg: 'bg-[#0061a8]', text: 'text-[#0061a8]', shadow: 'shadow-blue-500/40' },
  { name: 'green', bg: 'bg-[#00a651]', text: 'text-[#00a651]', shadow: 'shadow-green-500/40' },
  { name: 'orange', bg: 'bg-[#f7941d]', text: 'text-[#f7941d]', shadow: 'shadow-orange-500/40' },
  { name: 'purple', bg: 'bg-[#662d91]', text: 'text-[#662d91]', shadow: 'shadow-purple-500/40' },
  { name: 'red', bg: 'bg-[#ed1c24]', text: 'text-[#ed1c24]', shadow: 'shadow-red-500/40' },
  { name: 'cyan', bg: 'bg-[#00aeef]', text: 'text-[#00aeef]', shadow: 'shadow-cyan-500/40' },
];

// Hotspot Colors
const HOTSPOT_COLORS = [
  { bg: "linear-gradient(135deg, #d4af37 0%, #b8860b 100%)", text: "#ffffff" },
  { bg: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", text: "#ffffff" },
  { bg: "linear-gradient(135deg, #c62828 0%, #b71c1c 100%)", text: "#ffffff" },
  { bg: "linear-gradient(135deg, #ef6c00 0%, #e65100 100%)", text: "#ffffff" },
  { bg: "linear-gradient(135deg, #d97706 0%, #b45309 100%)", text: "#ffffff" },
];

const plans = [
  {
    name: "Basic Plan",
    price: "Ksh 1,500",
    speed: "6Mbps",
    image: "https://images.pexels.com/photos/7606061/pexels-photo-7606061.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    features: [
        "Uncapped **6Mbps** Fibre Speed", 
        "Ideal for **1-2 users** (Web browsing & email)", 
        "Standard **WiFi Router** Included", 
        "Reliable 24/7 Technical Support", 
        "Zero-Cost **Standard Installation**"
    ],
    type: "home",
    isPopular: false
  },
  {
    name: "Essential Plan",
    price: "Ksh 1,999",
    speed: "10Mbps",
    image: "https://www.safes.so/wp-content/uploads/2022/11/Can-Parental-Controls-See-Private-Browsing.jpg",
    features: ["Streaming & Social Media", "24/7 Support", "Free Installation"],
    type: "home",
    isPopular: false
  },
  {
    name: "Family Plan",
    price: "Ksh 2,499",
    speed: "15Mbps",
    image: "https://www.shutterstock.com/image-photo/gadgets-addiction-young-black-family-600nw-2015527172.jpg",
    features: ["Work from Home", "Streaming", "24/7 Support", "Free Installation"],
    type: "home",
    isPopular: true 
  },
  {
    name: "Smart Home Plan",
    price: "Ksh 2,999",
    speed: "20Mbps",
    image: "https://media.istockphoto.com/id/1313806319/photo/happy-african-american-family-holding-and-using-personal-gadgets.jpg?s=612x612&w=0&k=20&c=VpUS6Qgrzv0vXSYlm15_gqk5ao8-zWMkaq59jepyE-Y=",
    features: ["Multiple Devices", "Low Latency", "24/7 Support", "Free Installation"],
    type: "home",
    isPopular: false
  },
  {
    name: "Pro Streamer Plan",
    price: "Ksh 3,999",
    speed: "25Mbps",
    image: "https://cheapsslsecurity.com/blog/wp-content/uploads/2021/06/cyber-security-tips-for-small-business-feature.jpg",
    features: ["Heavy Streaming", "Gaming Ready", "24/7 Support", "Free Installation"],
    type: "home",
    isPopular: false
  },
  {
    name: "Ultra Plan",
    price: "Ksh 4,999",
    speed: "30Mbps",
    image: "https://c8.alamy.com/comp/2KFB1JH/an-early-old-vintage-internet-cybercafe-cyber-cafe-in-xian-china-prc-there-are-dozens-of-screens-in-the-room-with-many-people-browsing-the-net-and-operating-them-prc-china-125-2KFB1JH.jpg",
    features: ["High-Speed Everything", "Gaming & 4K", "24/7 Support", "Free Installation"],
    type: "home",
    isPopular: false
  },
  {
    name: "Business Basic",
    price: "Ksh 8,000",
    speed: "50Mbps",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["5 IP phones", "3 Static IPs", "Priority support", "99.5% uptime"],
    type: "business",
    isPopular: false
  },
  {
    name: "Business Plus",
    price: "Ksh 15,000",
    speed: "100Mbps",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["10 IP phones", "5 Static IPs", "Dedicated line", "99.9% uptime"],
    type: "business",
    isPopular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    speed: "500Mbps+",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Unlimited IP phones", "10+ Static IPs", "SLA guarantee", "24/7 monitoring"],
    type: "enterprise",
    isPopular: false
  }
];

const hotspotPlans = [
  { name: "1 Hour", price: "10", duration: "1hr", devices: "1 Device", features: ["Fast browsing", "Socials"] },
  { name: "2 Hours", price: "20", duration: "2hrs", devices: "1 Device", features: ["Streaming", "Socials"] },
  { name: "12 Hours", price: "30", duration: "12hrs", devices: "1 Device", features: ["Full day", "Gaming"] },
  { name: "1 Day", price: "40", duration: "1 day", devices: "1 Device", features: ["Full day", "Gaming"] },
  { name: "Weekly", price: "250", duration: "week", devices: "2 Devices", features: ["7 days", "HD stream"] },
  { name: "Monthly Solo", price: "800", duration: "month", devices: "1 Device", features: ["30 days", "Priority"] },
  { name: "Monthly X2", price: "1200", duration: "month", devices: "2 Devices", features: ["30 days", "Priority"] }
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

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    location: '', 
    connectionType: '',
    planName: '',
    planSpeed: '',
    planPrice: 0
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    // Extract numeric price from plan.price (e.g., "Ksh 1,500" -> 1500)
    const priceMatch = plan.price.match(/[\d,]+/);
    const numericPrice = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0;
    setFormData(prev => ({ 
      ...prev, 
      connectionType: plan.name,
      planName: plan.name,
      planSpeed: plan.speed,
      planPrice: numericPrice
    }));
    setShowForm(true);
  };

  const handleHotspotSelect = () => {
    window.open("https://wifisys.knoxvillesys.co.ke", "_blank");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "254726818938";
    // Format the message to match the expected structure for the invoice system
    const message = `KNOXVILLE TECHNOLOGIES LIMITED - INTERNET CONNECTION REQUEST%0A%0ACUSTOMER DETAILS:%0AName: ${formData.name}%0APhone: ${formData.phone}%0ALocation: ${formData.location}%0AEmail: ${formData.email}%0A%0ASELECTED PLAN:%0APlan: ${formData.planName}%0ASpeed: ${formData.planSpeed}%0APrice: Ksh ${formData.planPrice}/month`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setShowForm(false);
  };

  const filteredPlans = plans.filter(plan => plan.type === activeTab);

  useEffect(() => {
    if (showForm) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [showForm]);

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Knoxville Internet | Unlimited Connectivity</title>
      </Helmet>
      
      <style>{`
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          background: linear-gradient(-45deg, #f8fafc, #f1f5f9, #e2e8f0);
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>

      {/* ================= HERO SECTION (RESPONSIVE HEIGHT) ================= */}
      {/* Mobile: h_[45vh] (Even smaller for compact app feel) */}
      {/* Laptop/Large: lg:h_[85vh] (Extended down) */}
      <section className="relative w-full overflow-hidden bg-black h-[45vh] md:h-[75vh] lg:h-[85vh]">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {heroSlides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={currentSlide}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Content Container centered within the responsive height */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="text-center w-full max-w-4xl px-4">
            <motion.div
              key={currentSlide}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <span className="inline-block mb-2 sm:mb-4 px-3 sm:px-4 py-0.5 sm:py-1 text-[9px] sm:text-xs font-bold uppercase tracking-widest rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg animate-pulse">
                {heroSlides[currentSlide].tag}
              </span>
              <h1 
                className="text-lg sm:text-2xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 leading-snug sm:leading-tight drop-shadow-2xl" 
                dangerouslySetInnerHTML={{ __html: heroSlides[currentSlide].title }}
              />
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center px-2 sm:px-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('plans-section').scrollIntoView({ behavior: 'smooth' })}
                  className="font-bold py-1.5 sm:py-3 px-5 sm:px-8 rounded-full text-xs sm:text-base transition-all bg-white text-black hover:bg-gray-100"
                >
                  {heroSlides[currentSlide].ctaText}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= PLANS SECTION ================= */}
      <section id="plans-section" className="py-5 md:py-20 animate-gradient-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-3 md:mb-12">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-4 text-slate-800"
            >
              Packages Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">You</span>
            </motion.h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-6 md:mb-12 overflow-x-auto px-2">
            <div className="inline-flex rounded-full bg-white/50 backdrop-blur-md border border-white/50 p-1 sm:p-1.5 shadow-lg">
              {[
                { id: "home", label: "Home Fiber" },
                { id: "business", label: "Business" },
                { id: "enterprise", label: "Enterprise" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id 
                    ? "bg-slate-800 text-white shadow-md scale-105" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <motion.div 
            className="flex overflow-x-auto snap-x snap-mandatory pb-6 gap-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <AnimatePresence mode="popLayout">
            {filteredPlans.map((plan, index) => {
              const theme = PACKAGE_THEMES[index % PACKAGE_THEMES.length];
              
              return (
                <motion.div
                  key={plan.name}
                  variants={cardVariants}
                  className={`
                    min-w-[75vw] sm:min-w-[45vw] md:min-w-0 snap-center
                    relative bg-white rounded-[1.2rem] overflow-hidden flex flex-col h-full group shadow-lg
                    hover:shadow-2xl transition-all duration-500 border
                    ${plan.isPopular ? 'border-orange-400 ring-2 ring-orange-100/50' : 'border-white'}
                  `}
                  whileHover={{ y: -5 }}
                >
                  {/* IMAGE SECTION */}
                  <div className="relative h-24 sm:h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img 
                        src={plan.image} 
                        alt={plan.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
                      />
                      {plan.isPopular && (
                          <motion.div 
                            initial={{ scale: 0 }} animate={{ scale: 1 }} 
                            className="absolute top-3 right-3 z-20"
                          >
                            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
                                <Star className="w-2.5 h-2.5 fill-current" /> POPULAR
                            </span>
                          </motion.div>
                      )}
                  </div>

                  {/* COLORED HEADER (TEXT CHANGED TO BLACK) */}
                  <div className={`${theme.bg} p-2.5 sm:p-4 relative overflow-hidden rounded-bl-[2rem] transition-colors duration-300`}>
                      <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                      
                      {/* HEADER TEXT IS NOW BLACK */}
                      <h3 className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-black mb-0.5">{plan.name}</h3>
                      <div className="flex items-baseline gap-1.5">
                          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-black">{plan.speed}</h2>
                          <span className="text-black/80 text-[8px] sm:text-xs font-semibold">Speed</span>
                      </div>
                  </div>

                  {/* BODY SECTION */}
                  <div className="p-2.5 sm:p-4 pt-2 sm:pt-3 flex flex-col flex-grow bg-white relative">
                      <div className="mb-2 sm:mb-4 flex items-end">
                        <span className={`text-base sm:text-xl font-bold ${theme.text} group-hover:scale-105 transition-transform origin-left`}>
                          {plan.price}
                        </span>
                        <span className="text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase mb-1 ml-1">/month</span>
                      </div>

                      <div className="w-full h-px bg-slate-100 mb-2 sm:mb-4" />

                      <ul className="space-y-1 sm:space-y-2 mb-2 sm:mb-4 flex-grow">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-[10px] sm:text-xs text-slate-600 font-medium group-hover:text-slate-800 transition-colors">
                            <CheckCircle className={`w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0 ${theme.text}`} />
                            {/* Allow bolding in features via dangerouslySetInnerHTML if needed, or just text */}
                            <span dangerouslySetInnerHTML={{ __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          </li>
                        ))}
                      </ul>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => handlePlanSelect(plan)}
                        className={`
                          w-full py-2 sm:py-2.5 rounded-full font-bold text-[10px] sm:text-xs flex items-center justify-center gap-2 transition-all duration-300 text-white shadow-md
                          ${theme.bg} ${theme.shadow} hover:brightness-110 hover:shadow-lg
                        `}
                      >
                        Get Connected <ChevronRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                      </motion.button>
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ================= HOTSPOT SECTION (CLEAN BACKGROUND) ================= */}
      <section id="hotspot-section" className="py-12 sm:py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-orange-500 font-bold tracking-wider text-[10px] sm:text-xs uppercase">On The Go?</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mt-2 mb-3 sm:mb-4 text-slate-900">
              Mobile <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Hotspot</span> Zones
            </h2>
          </div>

          {/* Updated Grid for Mobile/Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 max-w-6xl mx-auto px-1">
            {hotspotPlans.map((plan, index) => {
              const color = HOTSPOT_COLORS[index % HOTSPOT_COLORS.length];
              // Make the last item span full width on small screens if it's the odd one out (7th item)
              const isLastItem = index === hotspotPlans.length - 1;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, translateY: -5 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`
                    relative overflow-hidden rounded-2xl flex flex-col cursor-pointer shadow-md hover:shadow-xl
                    ${isLastItem ? 'col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 mx-auto w-full sm:w-auto' : ''}
                  `}
                  style={{ 
                    background: color.bg,
                    minHeight: '100px'
                  }}
                  onClick={handleHotspotSelect}
                >
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Wifi size={40} className="text-white rotate-12" />
                  </div>

                  <div className="p-3 flex flex-col h-full justify-between relative z-10">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                         <h3 className="text-xs font-bold text-white drop-shadow-md">{plan.name}</h3>
                         <span className="text-[9px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">
                           {plan.duration}
                         </span>
                      </div>
                      <p className="text-lg font-bold text-white drop-shadow-md tracking-tight">Ksh {plan.price}</p>
                    </div>

                    <div className="mt-2">
                        <button className="w-full bg-white text-black/80 text-[10px] uppercase font-bold py-1.5 rounded-lg hover:bg-white/90 transition-colors shadow-sm">
                            Select
                        </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= MODAL FORM ================= */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Quick Connect</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <p className="text-xs text-slate-500">Requesting: <span className="text-blue-600 font-bold">{selectedPlan?.name}</span></p>
                    </div>
                </div>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {[
                  { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                  { name: "phone", label: "Phone Number", type: "tel", placeholder: "07..." },
                  { name: "location", label: "Location / Estate", type: "text", placeholder: "e.g. Westlands" }
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      value={formData[field.name]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
                
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-green-500/30 hover:brightness-105 transition-all flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(to right, #25D366, #128C7E)' }}
                  >
                    <FaWhatsapp className="text-xl" />
                    Start WhatsApp Chat
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/254726818938"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-bounce-slow"
        style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </a>
    </div>
  );
};

export default Hero;