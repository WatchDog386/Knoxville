import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { Wifi, Clock, HardHat, CheckCircle, Zap, X, Smartphone } from "lucide-react";

// 🔥 Professional Color Palette
const BRAND_BLACK = "#121212";
const BRAND_DARK = "#1e1e1e";
const BRAND_RED = "#e53935";
const BRAND_ORANGE = "#fb8c00";
const BRAND_LIGHT = "#f5f5f5";
const BRAND_WHITE = "#ffffff";
const BRAND_BLUE = "#015B97";
// ✅ Hotspot-specific warm colors
const HOTSPOT_COLORS = [
  { bg: "linear-gradient(135deg, #d4af37 0%, #b8860b 100%)", text: "#ffffff" }, // Golden
  { bg: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", text: "#ffffff" }, // Green
  { bg: "linear-gradient(135deg, #c62828 0%, #b71c1c 100%)", text: "#ffffff" }, // Red
  { bg: "linear-gradient(135deg, #ef6c00 0%, #e65100 100%)", text: "#ffffff" }, // Orange
  { bg: "linear-gradient(135deg, #d97706 0%, #b45309 100%)", text: "#ffffff" }, // Amber
];

// Font stack
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const plans = [
  {
    name: "Basic Plan",
    price: "Ksh 1,500",
    speed: "6Mbps",
    image: "https://images.pexels.com/photos/7606061/pexels-photo-7606061.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    features: ["Great for browsing", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Essential Plan",
    price: "Ksh 1,999",
    speed: "10Mbps",
    image: "https://www.safes.so/wp-content/uploads/2022/11/Can-Parental-Controls-See-Private-Browsing.jpg",
    features: ["Streaming & Social Media", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Family Plan",
    price: "Ksh 2,499",
    speed: "15Mbps",
    image: "https://www.shutterstock.com/image-photo/gadgets-addiction-young-black-family-600nw-2015527172.jpg",
    features: ["Work from Home", "Streaming", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Smart Home Plan",
    price: "Ksh 2,999",
    speed: "20Mbps",
    image: "https://media.istockphoto.com/id/1313806319/photo/happy-african-american-family-holding-and-using-personal-gadgets.jpg?s=612x612&w=0&k=20&c=VpUS6Qgrzv0vXSYlm15_gqk5ao8-zWMkaq59jepyE-Y=",
    features: ["Multiple Devices", "Low Latency", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Pro Streamer Plan",
    price: "Ksh 3,999",
    speed: "25Mbps",
    image: "https://cheapsslsecurity.com/blog/wp-content/uploads/2021/06/cyber-security-tips-for-small-business-feature.jpg",
    features: ["Heavy Streaming", "Gaming Ready", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Ultra Plan",
    price: "Ksh 4,999",
    speed: "30Mbps",
    image: "https://c8.alamy.com/comp/2KFB1JH/an-early-old-vintage-internet-cybercafe-cyber-cafe-in-xian-china-prc-there-are-dozens-of-screens-in-the-room-with-many-people-browsing-the-net-and-operating-them-prc-china-125-2KFB1JH.jpg",
    features: ["High-Speed Everything", "Gaming & 4K", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Business Basic",
    price: "Ksh 8,000",
    speed: "50Mbps",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["5 IP phones", "3 Static IPs", "Priority support", "99.5% uptime"],
    type: "business"
  },
  {
    name: "Business Plus",
    price: "Ksh 15,000",
    speed: "100Mbps",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["10 IP phones", "5 Static IPs", "Dedicated line", "99.9% uptime"],
    type: "business"
  },
  {
    name: "Enterprise",
    price: "Custom",
    speed: "500Mbps+",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Unlimited IP phones", "10+ Static IPs", "SLA guarantee", "24/7 monitoring"],
    type: "enterprise"
  }
];

// ✅ 5 Hotspot Plans (NO images needed) - LINKS REMOVED
const hotspotPlans = [
  {
    name: "2 Hours",
    price: "15",
    duration: "2hrs",
    devices: "1 Device",
    features: ["Fast browsing", "Social media access", "Email checking"],
    // link: "http://wifi.optimassys.co.ke/index.php?_route=main" - REMOVED
  },
  {
    name: "12 Hours",
    price: "30",
    duration: "12hrs",
    devices: "1 Device",
    features: ["Extended browsing", "Streaming music", "Social media"],
    // link: "http://wifi.optimassys.co.ke/index.php?_route=main" - REMOVED
  },
  {
    name: "1 Day",
    price: "40",
    duration: "1 day",
    devices: "1 Device",
    features: ["Full day access", "Standard streaming", "Online gaming"],
    // link: "http://wifi.optimassys.co.ke/index.php?_route=main" - REMOVED
  },
  {
    name: "Weekly",
    price: "250",
    duration: "week",
    devices: "2 Devices",
    features: ["7 days unlimited", "HD streaming", "Multiple devices"],
    // link: "http://wifi.optimassys.co.ke/index.php?_route=main" - REMOVED
  },
  {
    name: "Monthly Single",
    price: "610",
    duration: "month",
    devices: "1 Device",
    features: ["30 days access", "Priority bandwidth", "24/7 support"],
    // link: "http://wifi.optimassys.co.ke/index.php?_route=main" - REMOVED
  }
];

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
    connectionType: ''
  });

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setFormData(prev => ({
      ...prev,
      connectionType: plan.name
    }));
    setShowForm(true);
  };

  // ✅ HOTSPOT FUNCTIONALITY DISABLED - No redirection
  const handleHotspotSelect = (plan) => {
    // 🔴 DISABLED: window.open(plan.link, '_blank');
    // Instead, open the contact form for hotspot plans too
    setSelectedPlan(plan);
    setFormData(prev => ({
      ...prev,
      connectionType: `Hotspot - ${plan.name}`
    }));
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "254726818938";
    const message = `New Connection Request:%0A%0A` +
                   `*Name:* ${formData.name}%0A` +
                   `*Phone:* ${formData.phone}%0A` +
                   `*Email:* ${formData.email}%0A` +
                   `*Location:* ${formData.location}%0A` +
                   `*Connection Type:* ${formData.connectionType}%0A%0A` +
                   `I would like to get connected!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      connectionType: ''
    });
    setShowForm(false);
    setSelectedPlan(null);
  };

  const filteredPlans = plans.filter(plan => plan.type === activeTab);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: FONT_FAMILY }}>
      <Helmet>
        <title>Knoxville Internet | Unlimited Home Fibre & Business Plans</title>
        <meta
          name="description"
          content="Knoxville Internet - Reliable and fast fibre internet for your home and business. Explore our affordable packages with 24/7 support and free installation."
        />
        <link rel="stylesheet" href="https://use.typekit.net/hus3mie.css" />
      </Helmet>

      {/* Hero Section — Extended height */}
      <section
        className="relative w-full overflow-hidden py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url('https://itel.com/wp-content/uploads/2015/09/iStock_000012499607_XXXLarge-1024x576.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '70vh' // 👈 Extended from 60vh → 70vh
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white"
            >
              <div className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: BRAND_RED, color: BRAND_WHITE }}>
                High-Speed Connectivity
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: '"adobe-garamond-pro", "Poppins", sans-serif' }}>
                Unlimited <span style={{ color: BRAND_ORANGE }}>Internet</span> For Your Home
              </h1>
              <p className="text-base md:text-lg mb-6 text-white max-w-lg" style={{ opacity: 0.95 }}>
                Enjoy unlimited internet for your home with fast, reliable fibre connectivity—perfect for streaming, gaming, and working from home.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('plans-section').scrollIntoView({ behavior: 'smooth' })}
                  className="font-bold py-2 px-5 rounded-full text-sm transition-all"
                  style={{ backgroundColor: BRAND_WHITE, color: BRAND_BLACK, borderRadius: '50px' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = BRAND_RED; e.target.style.color = BRAND_WHITE; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = BRAND_WHITE; e.target.style.color = BRAND_BLACK; }}
                >
                  View Plans
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/coverage")}
                  className="font-bold py-2 px-5 rounded-full text-sm transition-all"
                  style={{ backgroundColor: 'transparent', color: BRAND_WHITE, border: `2px solid ${BRAND_WHITE}`, borderRadius: '50px' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = BRAND_ORANGE; e.target.style.borderColor = BRAND_ORANGE; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = BRAND_WHITE; }}
                >
                  View Coverage
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Plans Section */}
      <section id="plans-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: BRAND_BLACK }}
            >
              Internet <span style={{ color: BRAND_RED }}>Plans</span>
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg"
              style={{ color: BRAND_BLACK }}
            >
              Fast, reliable, and unlimited fibre connectivity for home and business
            </motion.p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              {[
                { id: "home", label: "Home Plans" },
                { id: "business", label: "Business Plans" },
                { id: "enterprise", label: "Enterprise" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id ? "bg-white text-red-600 shadow-sm" : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? BRAND_WHITE : '',
                    color: activeTab === tab.id ? BRAND_RED : BRAND_BLACK,
                    border: activeTab === tab.id ? `1px solid ${BRAND_RED}` : 'none'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="h-40 overflow-hidden">
                  <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold" style={{ color: BRAND_BLACK }}>{plan.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: `${BRAND_ORANGE}20`, color: BRAND_ORANGE }}>{plan.speed}</span>
                  </div>
                  <p className="text-xl font-bold mb-3" style={{ color: BRAND_BLUE }}>{plan.price}</p>
                  <ul className="space-y-2 mb-5 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm" style={{ color: BRAND_BLACK }}>
                        <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {/* 👇 BUTTON COLOR CHANGED TO BLUE */}
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full font-bold py-2.5 rounded-full text-sm transition-all"
                    style={{ backgroundColor: BRAND_BLUE, color: BRAND_WHITE, borderRadius: '50px' }}
                  >
                    Get Connected
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 Hotspot Packages — NO IMAGES & DISABLED REDIRECTION */}
      <section id="hotspot-section" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: BRAND_BLACK }}
            >
              Mobile <span style={{ color: "#d4af37" }}>Hotspot</span> Packages
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base"
              style={{ color: BRAND_BLACK }}
            >
              Pay-as-you-go internet for on-the-go connectivity
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {hotspotPlans.map((plan, index) => {
              const color = HOTSPOT_COLORS[index % HOTSPOT_COLORS.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  style={{ height: '100%' }}
                >
                  {/* ❌ NO IMAGE — removed */}
                  <div className="p-3 flex flex-col flex-grow" style={{ background: color.bg }}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-bold" style={{ color: color.text }}>
                        {plan.name}
                      </h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: color.text }}>
                        {plan.duration}
                      </span>
                    </div>
                    <p className="text-base font-bold mb-1" style={{ color: color.text }}>
                      Ksh {plan.price}
                    </p>
                    <ul className="space-y-1 mb-2 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-[11px]" style={{ color: color.text }}>
                          <Smartphone className="w-2.5 h-2.5 mr-1 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleHotspotSelect(plan)}
                      className="w-full font-bold py-1.5 rounded-full text-[11px] transition-all"
                      style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: color.text }}
                    >
                      Contact for Purchase
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base mb-6" style={{ color: BRAND_BLACK, fontWeight: 600 }}>
            All plans include:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Clock className="w-4 h-4" />, label: "24/7 Support" },
              { icon: <HardHat className="w-4 h-4" />, label: "Same-day Installation" },
              { icon: <Zap className="w-4 h-4" />, label: "<5ms latency" },
              { icon: <Wifi className="w-4 h-4" />, label: "Free Installation" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${BRAND_ORANGE}20` }}>
                  <span style={{ color: BRAND_ORANGE }}>{item.icon}</span>
                </div>
                <span className="text-sm" style={{ color: BRAND_BLACK }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Features */}
      {activeTab !== "home" && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h3
              className="text-xl font-bold text-center mb-8"
              style={{ color: BRAND_BLACK }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Business Solutions Features
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "SLA Guarantee", desc: "99.9% uptime with compensation" },
                { title: "Dedicated Support", desc: "Priority technical support" },
                { title: "IP Telephony", desc: "VoIP with multiple extensions" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-50 p-5 rounded-lg border border-gray-200"
                >
                  <h4 className="font-bold mb-1" style={{ color: BRAND_RED }}>{item.title}</h4>
                  <p className="text-sm" style={{ color: BRAND_BLACK }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold" style={{ color: BRAND_RED }}>
                  Get {selectedPlan?.name}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                  {[
                    { name: "name", label: "Full Name *", type: "text", required: true },
                    { name: "phone", label: "Phone Number *", type: "tel", required: true },
                    { name: "email", label: "Email Address", type: "email", required: false },
                    { name: "location", label: "Location *", type: "text", required: true }
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-1" style={{ color: BRAND_BLACK }}>{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        className="w-full px-3 py-2 bg-gray-50 border rounded-md focus:outline-none"
                        style={{ borderColor: BRAND_RED }}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: BRAND_BLACK }}>Connection Type</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                      value={formData.connectionType}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-sm rounded-full"
                    style={{ color: BRAND_BLACK }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 text-white rounded-full text-sm font-bold"
                    style={{ backgroundColor: BRAND_RED }}
                  >
                    Send via WhatsApp
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/254726818938"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white text-xl" />
      </a>
    </div>
  );
};

export default Hero;