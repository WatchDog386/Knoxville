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
    backgroundImage: "https://img.magnific.com/free-photo/african-family-spending-time-together_53876-6.jpg",
    title: "Unlimited <span style='color: #fb8c00;'>Internet</span> For Your Home",
    description: "Fast, reliable fibre for your home.",
    tag: "High-Speed",
    ctaText: "View Plans",
    secondaryCtaText: "View Coverage"
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Business <span style='color: #fb8c00;'>Solutions</span> That Scale",
    description: "Enterprise-grade connectivity. 99.9% uptime.",
    tag: "Enterprise",
    ctaText: "Business Plans",
    secondaryCtaText: "Contact Sales"
  },
  {
    backgroundImage: "https://media.istockphoto.com/id/1494073880/photo/a-man-holding-icon-virtual-24-7-support-services-for-worldwide-nonstop-and-full-time.jpg?s=612x612&w=0&k=20&c=4YF-otaX3n8OiPOC4L_-_pAX1ibayzdvpkK1Ih2-p50=",
    title: "We're Here <span style='color: #fb8c00;'>24/7</span>",
    description: "Support whenever you need it.",
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

// Navbar / Brand font (used across header/nav)
const NAV_FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const plans = [
  {
    name: "Basic Plan",
    price: "Ksh 1,500",
    speed: "15Mbps",
    image: "https://images.pexels.com/photos/7606061/pexels-photo-7606061.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    features: [
        "Uncapped **15Mbps** Fibre Speed", 
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
    speed: "25Mbps",
    image: "https://www.safes.so/wp-content/uploads/2022/11/Can-Parental-Controls-See-Private-Browsing.jpg",
    features: ["Streaming & Social Media", "24/7 Support", "Free Installation"],
    type: "home",
    isPopular: false
  },
  {
    name: "Family Plan",
    price: "Ksh 2,499",
    speed: "35Mbps",
    image: "https://www.shutterstock.com/image-photo/gadgets-addiction-young-black-family-600nw-2015527172.jpg",
    features: ["Work from Home", "Streaming", "24/7 Support", "Free Installation"],
    type: "home",
    isPopular: true 
  },
  {
    name: "Smart Home Plan",
    price: "Ksh 2,999",
    speed: "40Mbps",
    image: "https://media.istockphoto.com/id/1313806319/photo/happy-african-american-family-holding-and-using-personal-gadgets.jpg?s=612x612&w=0&k=20&c=VpUS6Qgrzv0vXSYlm15_gqk5ao8-zWMkaq59jepyE-Y=",
    features: ["Multiple Devices", "Low Latency", "24/7 Support", "Free Installation"],
    type: "home",
    isPopular: false
  },
  {
    name: "Pro Streamer Plan",
    price: "Ksh 3,999",
    speed: "50Mbps",
    image: "https://cheapsslsecurity.com/blog/wp-content/uploads/2021/06/cyber-security-tips-for-small-business-feature.jpg",
    features: ["Heavy Streaming", "Gaming Ready", "24/7 Support", "Free Installation"],
    type: "home",
    isPopular: false
  },
  {
    name: "Ultra Plan",
    price: "Ksh 4,999",
    speed: "70Mbps",
    image: "https://c8.alamy.com/comp/2KFB1JH/an-early-old-vintage-internet-cybercafe-cyber-cafe-in-xian-china-prc-there-are-dozens-of-screens-in-the-room-with-many-people-browsing-the-net-and-operating-them-prc-china-125-2KFB1JH.jpg",
    features: ["High-Speed Everything", "Gaming & 4K", "24/7 Support", "Free Installation"],
    type: "home",
    isPopular: false
  },
  
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

const hotspotHighlights = [
  {
    icon: Clock,
    title: "Real Time Access",
    description:
      "Hotspot packages refresh instantly so you only see active sessions and available bundles.",
  },
  {
    icon: Shield,
    title: "Verified Coverage",
    description:
      "Packages are mapped to trusted service zones for a cleaner, safer connection experience.",
  },
  {
    icon: Mail,
    title: "Stay Updated",
    description:
      "Get plan alerts, offers, and service updates delivered straight to your inbox.",
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

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("home");
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    <>
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
      <section className="relative w-full overflow-hidden h-[30vh] sm:h-[38vh] md:h-[65vh] lg:h-[75vh]">
        <div className="absolute inset-0">
          <AnimatePresence mode="popLayout">
            {heroSlides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={currentSlide}
                  className="absolute inset-0"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{ backgroundImage: `url('${slide.backgroundImage}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                >
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
              <span className="inline-block mb-2 sm:mb-4 px-3 sm:px-4 py-0.5 sm:py-1 text-[9px] sm:text-xs font-semibold uppercase tracking-wide rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg animate-pulse">
                {heroSlides[currentSlide].tag}
              </span>
              <h1 
                className="text-lg sm:text-2xl md:text-5xl lg:text-6xl font-light tracking-tight mb-2 sm:mb-3 leading-snug sm:leading-tight drop-shadow-2xl text-white" 
                dangerouslySetInnerHTML={{ __html: heroSlides[currentSlide].title }}
              />
              <p className="text-white/90 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 max-w-xl mx-auto drop-shadow-lg font-medium">
                {heroSlides[currentSlide].description}
              </p>
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

      {/* ================= OUR COVERAGE ================= */}
      <section className="relative w-full py-16 sm:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute left-[-10%] top-[20%] w-[60%] h-[80%] bg-red-100/50 rounded-r-[100px] border-r-8 border-slate-200/80 -z-10 transform -rotate-6"></div>
        <div className="absolute right-0 bottom-0 w-[40%] h-[60%] bg-red-100/60 rounded-tl-full blur-3xl -z-10 opacity-70"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="max-w-md z-10 pl-3 sm:pl-6">
            <h2 className="text-xl sm:text-4xl font-light text-gray-900 mb-3 sm:mb-6 tracking-tight leading-tight"> Our Coverage </h2>
            <p className="text-gray-600 font-medium text-[9px] sm:text-sm leading-relaxed">
              Knoxville provides high-speed fiber internet
              <br />
              tailored for the specific requirements
              <br />
              of homes and businesses across Kenya.
            </p>
          </div>

          <div className="relative flex flex-row gap-2 sm:gap-6 z-10 justify-center items-center">
            <div className="w-full sm:w-[280px] bg-green-500 rounded-[16px] sm:rounded-[32px] p-2 sm:p-8 pb-3 sm:pb-10 text-center shadow-lg transform sm:-translate-y-8 z-20">
              <h3 className="text-white font-semibold mb-2 sm:mb-6 text-[7px] sm:text-[15px]">Home Fiber</h3>
              <div className="w-6 sm:w-14 h-6 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-6 shadow-md text-white">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <p className="text-white/90 text-[6px] sm:text-xs leading-relaxed font-semibold mb-2 sm:mb-10 px-1 sm:px-4">
                Fast, reliable fiber connectivity designed for modern households.
              </p>
            </div>

            <div className="w-full sm:w-[260px] bg-pink-500 rounded-[16px] sm:rounded-[32px] p-2 sm:p-8 pb-3 sm:pb-10 text-center shadow-lg z-10 sm:-ml-12 pt-3 sm:pt-10 sm:mt-16">
              <h3 className="text-white font-semibold mb-2 sm:mb-6 text-[7px] sm:text-[15px]">Business Solutions</h3>
              <div className="w-5 sm:w-12 h-5 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-6 shadow-md text-white">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 8l6.5 4.5L5.5 16 3 15.5 1.5 17l4 3.5 3.5 4 1.5-1.5-.5-2.5 3.5-3.5 8.2 6.5c.4.2.8.2 1.1-.1l1.2-1.2c.4-.4.1-.8-.1-1.1z" />
                </svg>
              </div>
              <p className="text-white/90 text-[6px] sm:text-xs leading-relaxed font-medium mb-2 sm:mb-10 px-1 sm:px-4">
                Enterprise-grade internet with dedicated support and 99.9% uptime.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute right-1/4 top-[20%] flex flex-col gap-8 opacity-20">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-red-400 ml-12"></div>
        </div>
      </section>

      {/* ================= PLANS SECTION ================= */}
      <section id="plans-section" className="py-5 md:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
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
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-6 w-full"
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
                    relative bg-white rounded-[1.2rem] overflow-hidden flex flex-col h-full group
                    border border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/70
                    hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-500
                    ${plan.isPopular ? 'border-orange-400 ring-orange-100/60' : ''}
                  `}
                  whileHover={{ y: -5 }}
                >
                  {/* IMAGE SECTION */}
                  <div className="relative h-14 sm:h-28 md:h-32 overflow-hidden border-b border-slate-100">
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
                  <div className={`${theme.bg} p-2.5 sm:p-3 relative overflow-hidden rounded-bl-[2rem] transition-colors duration-300`}>
                      <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                      
                      {/* HEADER TEXT IS NOW BLACK */}
                      <h3 className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-black mb-0.5">{plan.name}</h3>
                      <div className="flex items-baseline gap-1.5">
                          <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-black">{plan.speed}</h2>
                          <span className="text-black/80 text-[8px] sm:text-xs font-semibold">Speed</span>
                      </div>
                  </div>

                  {/* BODY SECTION */}
                   <div className="p-2 sm:p-3 pt-2 sm:pt-2.5 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50 relative">
                      <div className="mb-1 sm:mb-3 flex items-end">
                        <span className={`text-sm sm:text-lg font-bold ${theme.text} group-hover:scale-105 transition-transform origin-left`}>
                          {plan.price}
                        </span>
                        <span className="text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase mb-1 ml-1">/month</span>
                      </div>

                      <div className="w-full h-px bg-slate-100 mb-1 sm:mb-3" />

                      <div
                        className={`overflow-hidden transition-all duration-300 ${expandedCards[plan.name] ? 'max-h-96' : 'max-h-0'}`}
                      >
                        <ul className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start text-[10px] sm:text-xs text-slate-600 font-medium group-hover:text-slate-800 transition-colors">
                              <CheckCircle className={`w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0 ${theme.text}`} />
                              <span dangerouslySetInnerHTML={{ __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </li>
                          ))}
                        </ul>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.03 }}
                          onClick={() => handlePlanSelect(plan)}
                          className={`
                            w-full py-1.5 sm:py-2 rounded-full font-bold text-[10px] sm:text-xs flex items-center justify-center gap-2 transition-all duration-300 text-white shadow-md
                            ${theme.bg} ${theme.shadow} hover:brightness-110 hover:shadow-lg
                          `}
                        >
                          Get Connected <ChevronRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                        </motion.button>
                      </div>

                      <button
                        onClick={() => setExpandedCards(prev => ({ ...prev, [plan.name]: !prev[plan.name] }))}
                        className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {expandedCards[plan.name] ? '▲ Show Less' : '▼ View Features'}
                      </button>
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ================= HOTSPOT SECTION (CARDS WITH CAROUSEL ON MOBILE) ================= */}
      {(() => {
        const [currentSlide, setCurrentSlide] = React.useState(0);
        React.useEffect(() => {
          if (window.innerWidth < 768) {
            const timer = setInterval(() => {
              setCurrentSlide((prev) => (prev + 1) % 3);
            }, 3000);
            return () => clearInterval(timer);
          }
        }, []);
        const carouselCards = [
          { ...hotspotHighlights[0], solidBg: "bg-[#00a651]", iconCardBg: "bg-green-100", iconColor: "text-[#00a651]", titleColor: "text-[#00a651]", accentBar: "bg-[#00a651]" },
          { ...hotspotHighlights[1], solidBg: "bg-[#ed1c24]", iconCardBg: "bg-red-100", iconColor: "text-[#ed1c24]", titleColor: "text-[#ed1c24]", accentBar: "bg-[#ed1c24]" },
          { ...hotspotHighlights[2], solidBg: "bg-[#662d91]", iconCardBg: "bg-purple-100", iconColor: "text-[#662d91]", titleColor: "text-[#662d91]", accentBar: "bg-[#662d91]" },
        ];

        return (
          <section className="relative overflow-hidden py-16 sm:py-24 bg-white">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
              {/* Desktop: 3-column grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6">
                {carouselCards.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55, delay: index * 0.08 }}
                      className={`${item.solidBg} rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow text-white`}
                    >
                      <div className="mb-4 sm:mb-6 flex justify-center">
                        <div className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/30 shadow-md`}>
                          <Icon className={`h-7 w-7 sm:h-8 sm:w-8 text-white`} strokeWidth={2} />
                        </div>
                      </div>
                      <h3 className="mb-2 sm:mb-4 text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-white/80">{item.description}</p>
                      <div className="mt-4 sm:mt-6 h-1 w-12 sm:w-16 mx-auto rounded-full bg-white/40" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile: carousel */}
              <div className="md:hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className={`${carouselCards[currentSlide].solidBg} rounded-2xl p-6 text-center shadow-lg text-white`}
                  >
                    {(() => {
                      const item = carouselCards[currentSlide];
                      const Icon = item.icon;
                      return (
                        <>
                          <div className="mb-4 flex justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/30 shadow-md">
                              <Icon className="h-7 w-7 text-white" strokeWidth={2} />
                            </div>
                          </div>
                          <h3 className="mb-3 text-lg font-bold text-white">{item.title}</h3>
                          <p className="text-sm leading-6 text-white/80">{item.description}</p>
                          <div className="mt-5 h-1 w-12 mx-auto rounded-full bg-white/40" />
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>

                {/* Dot navigation */}
                <div className="flex justify-center gap-2 mt-5">
                  {carouselCards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i === currentSlide ? 'bg-gray-800 w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ================= WHY CHOOSE KNOXVILLE ================= */}
      <section className="relative w-full py-16 sm:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute left-[-10%] top-[20%] w-[60%] h-[80%] bg-red-100/50 rounded-r-[100px] border-r-8 border-slate-200/80 -z-10 transform -rotate-6"></div>
        <div className="absolute right-0 bottom-0 w-[40%] h-[60%] bg-red-100/60 rounded-tl-full blur-3xl -z-10 opacity-70"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="relative h-[180px] sm:h-[300px] lg:h-[450px] w-full flex justify-center items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] sm:w-[260px] lg:w-[380px] h-[160px] sm:h-[260px] lg:h-[380px] bg-red-100/80 rounded-full z-0"></div>
            <div className="relative z-20 w-full h-full flex items-center justify-center">
              <img src="/why.png" className="w-full h-auto max-h-full object-contain drop-shadow-2xl" alt="Why Choose Knoxville" />
            </div>
          </div>

          <div>
<h2 className="text-xl sm:text-3xl lg:text-5xl font-light text-gray-900 leading-[1.1] mb-6 sm:mb-12 tracking-tight">
 Why Choose Knoxville?
</h2>

            <div className="space-y-4 sm:space-y-8">
              <div className="flex gap-2 sm:gap-4 items-start">
                <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-xl bg-[#0061a8] flex items-center justify-center shrink-0 text-white mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-[11px] sm:text-lg mb-1">Tailored for You</h3>
<p className="text-gray-600 text-[8px] sm:text-sm leading-relaxed max-w-sm">
        We don't just provide internet; we craft connectivity solutions specifically for your needs.
      </p>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-4 items-start">
                <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-xl bg-[#00a651] flex items-center justify-center shrink-0 text-white mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-[11px] sm:text-lg mb-1">Proven Reliability</h3>
<p className="text-gray-600 text-[8px] sm:text-sm leading-relaxed max-w-sm">
        Our infrastructure is designed to maximize uptime and deliver consistent performance.
      </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOTSPOT PACKAGES ================= */}
      {(() => {
        const [hotspotSlide, setHotspotSlide] = React.useState(0);
        React.useEffect(() => {
          const timer = setInterval(() => {
            setHotspotSlide((prev) => (prev + 1) % Math.ceil(hotspotPlans.length / 2));
          }, 3500);
          return () => clearInterval(timer);
        }, []);

        const pairs = [];
        for (let i = 0; i < hotspotPlans.length; i += 2) {
          pairs.push(hotspotPlans.slice(i, i + 2));
        }

        return (
          <section className="relative overflow-hidden py-10 sm:py-24 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                  Mobile <span className="text-[#ff6b35]">Hotspot</span> Zones
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mt-3">Instant internet on the go — pick your bundle</p>
              </div>

              {/* Desktop: all pairs visible in a grid */}
              <div className="hidden md:flex flex-wrap justify-center gap-4">
                {hotspotPlans.map((plan, index) => {
                  const theme = PACKAGE_THEMES[index % PACKAGE_THEMES.length];
                  const Icon = [Wifi, Zap, Smartphone, Clock, Star, Shield, Mail][index % 7];
                  return (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.04 }}
                      whileHover={{ y: -4 }}
                      onClick={handleHotspotSelect}
                      className={`${theme.bg} rounded-2xl flex flex-col items-center text-center cursor-pointer w-[calc(25%-1rem)] py-4 px-3 shadow-md hover:shadow-lg transition-all duration-300 text-white`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center mb-2">
                        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1">{plan.name}</h4>
                      <span className="text-lg font-extrabold text-white">Ksh {plan.price}</span>
                      <div className="flex items-center gap-1.5 text-[9px] text-white/70 font-medium mt-1.5 mb-2">
                        <span className="bg-white/20 px-2 py-0.5 rounded-full">{plan.duration}</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded-full">{plan.devices}</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-1">
                        {plan.features.map((f, i) => (
                          <span key={i} className="text-[8px] text-white/80 bg-white/15 px-2 py-0.5 rounded-full">{f}</span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile: carousel showing pairs */}
              <div className="md:hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hotspotSlide}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3 justify-center"
                  >
                    {pairs[hotspotSlide].map((plan) => {
                      const planIndex = hotspotPlans.indexOf(plan);
                      const theme = PACKAGE_THEMES[planIndex % PACKAGE_THEMES.length];
                      const Icon = [Wifi, Zap, Smartphone, Clock, Star, Shield, Mail][planIndex % 7];
                      return (
                        <div
                          key={plan.name}
                          onClick={handleHotspotSelect}
                          className={`${theme.bg} rounded-2xl flex flex-col items-center text-center cursor-pointer w-[calc(50%-0.375rem)] py-4 px-2.5 shadow-md text-white`}
                        >
                          <div className="w-9 h-9 rounded-xl bg-white/30 flex items-center justify-center mb-2">
                            <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                          </div>
                          <h4 className="text-[9px] font-bold uppercase tracking-wider text-white/80 mb-0.5">{plan.name}</h4>
                          <span className="text-base font-extrabold text-white">Ksh {plan.price}</span>
                          <div className="flex items-center gap-1 text-[8px] text-white/70 font-medium mt-1 mb-1.5">
                            <span className="bg-white/20 px-1.5 py-0.5 rounded-full">{plan.duration}</span>
                            <span className="bg-white/20 px-1.5 py-0.5 rounded-full">{plan.devices}</span>
                          </div>
                          <div className="flex flex-wrap justify-center gap-1">
                            {plan.features.map((f, i) => (
                              <span key={i} className="text-[7px] text-white/80 bg-white/15 px-1.5 py-0.5 rounded-full">{f}</span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Dot navigation */}
                <div className="flex justify-center gap-2 mt-5">
                  {pairs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHotspotSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i === hotspotSlide ? 'bg-gray-800 w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

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
    </>
  );
};

export default Hero;