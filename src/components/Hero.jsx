import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { Wifi, Clock, HardHat, CheckCircle, Zap, X, Star, Shield, TrendingUp } from "lucide-react";

// New Professional Color Palette: Black, Red, Orange
const PRIMARY_BLACK = "#000000";
const PRIMARY_RED = "#DC2626"; // A professional red
const PRIMARY_ORANGE = "#EA580C"; // A professional orange
const SECONDARY_ORANGE = "#FDBA74"; // Lighter orange for accents
const LIGHT_BG = "#F8FAFC";
const WHITE = "#FFFFFF";
const TEXT_DARK = "#1F2937";
const TEXT_LIGHT = "#6B7280";

// Handwritten font style
const HANDWRITTEN_FONT = `'Dancing Script', cursive`;

const plans = [
  {
    name: "Basic Plan",
    price: "Ksh 1,500",
    speed: "6Mbps",
    image: "/basicp.jpg",
    features: ["Great for browsing", "24/7 Support", "Free Installation"],
    type: "home",
    popular: false
  },
  {
    name: "Essential Plan",
    price: "Ksh 1,999",
    speed: "10Mbps",
    image: "/essentialp.jpg",
    features: ["Streaming & Social Media", "24/7 Support", "Free Installation"],
    type: "home",
    popular: false
  },
  {
    name: "Family Plan",
    price: "Ksh 2,499",
    speed: "15Mbps",
    image: "/familyp.jpg",
    features: ["Work from Home", "Streaming", "24/7 Support", "Free Installation"],
    type: "home",
    popular: true
  },
  {
    name: "Smart Home Plan",
    price: "Ksh 2,999",
    speed: "20Mbps",
    image: "/streaming.jpg",
    features: ["Multiple Devices", "Low Latency", "24/7 Support", "Free Installation"],
    type: "home",
    popular: false
  },
  {
    name: "Pro Streamer Plan",
    price: "Ksh 3,999",
    speed: "25Mbps",
    image: "/pros.jpg",
    features: ["Heavy Streaming", "Gaming Ready", "24/7 Support", "Free Installation"],
    type: "home",
    popular: false
  },
  {
    name: "Ultra Plan",
    price: "Ksh 4,999",
    speed: "30Mbps",
    image: "/back.webp",
    features: ["High-Speed Everything", "Gaming & 4K", "24/7 Support", "Free Installation"],
    type: "home",
    popular: false
  },
  {
    name: "Business Basic",
    price: "Ksh 8,000",
    speed: "50Mbps",
    image: "/image.webp",
    features: ["5 IP phones", "3 Static IPs", "Priority support", "99.5% uptime"],
    type: "business",
    popular: false
  },
  {
    name: "Business Plus",
    price: "Ksh 15,000",
    speed: "100Mbps",
    image: "/internet1.webp",
    features: ["10 IP phones", "5 Static IPs", "Dedicated line", "99.9% uptime"],
    type: "business",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    speed: "500Mbps+",
    image: "/enterprise2.jpg",
    features: ["Unlimited IP phones", "10+ Static IPs", "SLA guarantee", "24/7 monitoring"],
    type: "enterprise",
    popular: false
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

  // Dynamically inject Google Fonts
  useEffect(() => {
    if (document.getElementById('google-font-dancing-script')) return;
    const link = document.createElement('link');
    link.id = 'google-font-dancing-script';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap';
    document.head.appendChild(link);
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setFormData(prev => ({
      ...prev,
      connectionType: plan.name
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
    <div className="min-h-screen bg-white" style={{ fontFamily: `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` }}>
      <Helmet>
        <title>Knoxville Internet | Unlimited Home Fibre & Business Plans</title>
        <meta
          name="description"
          content="Knoxville Internet - Reliable and fast fibre internet for your home and business. Explore our affordable packages with 24/7 support and free installation."
        />
        <link rel="stylesheet" href="https://use.typekit.net/hus3mie.css" />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative w-full overflow-hidden py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(220, 38, 38, 0.3)), url('https://itel.com/wp-content/uploads/2015/09/iStock_000012499607_XXXLarge-1024x576.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white"
            >
              <div
                className="inline-block mb-4 px-4 py-2 text-xs font-bold rounded-full border-2"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: WHITE,
                  borderColor: PRIMARY_ORANGE
                }}
              >
                ⚡ Professional Connectivity
              </div>

              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                style={{ fontFamily: '"adobe-garamond-pro", "Poppins", sans-serif' }}
              >
                Unlimited <span style={{ color: PRIMARY_ORANGE }}>Internet</span> For Your Home
              </h1>

              <p className="text-base md:text-lg mb-6 text-white max-w-lg" style={{ opacity: 0.95 }}>
                Enjoy unlimited internet for your home with fast, reliable fibre connectivity—perfect for streaming, gaming, and working from home.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('plans-section').scrollIntoView({ behavior: 'smooth' })}
                  className="font-bold py-3 sm:py-3 px-8 sm:px-8 rounded-lg text-sm transition-all w-full sm:w-auto text-center shadow-lg"
                  style={{
                    backgroundColor: PRIMARY_RED,
                    color: WHITE,
                    borderRadius: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = PRIMARY_ORANGE;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = PRIMARY_RED;
                  }}
                >
                  View Plans
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/coverage")}
                  className="font-bold py-3 sm:py-3 px-8 sm:px-8 rounded-lg text-sm transition-all w-full sm:w-auto text-center border-2 shadow-lg"
                  style={{
                    backgroundColor: 'transparent',
                    color: WHITE,
                    borderColor: WHITE,
                    borderRadius: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = WHITE;
                    e.target.style.color = PRIMARY_BLACK;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = WHITE;
                  }}
                >
                  View Coverage
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Happy Customers", icon: <TrendingUp className="w-6 h-6" /> },
              { number: "99.9%", label: "Uptime Guarantee", icon: <Shield className="w-6 h-6" /> },
              { number: "24/7", label: "Support", icon: <Clock className="w-6 h-6" /> },
              { number: "0", label: "Hidden Fees", icon: <CheckCircle className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full" style={{ backgroundColor: PRIMARY_RED }}>
                    <span style={{ color: WHITE }}>{stat.icon}</span>
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: PRIMARY_ORANGE }}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ 
                color: PRIMARY_BLACK,
                fontFamily: HANDWRITTEN_FONT,
                fontSize: '2.5rem',
                fontWeight: 700
              }}
            >
              Internet <span style={{ color: PRIMARY_RED }}>Plans</span>
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg"
              style={{ color: TEXT_DARK }}
            >
              Fast, reliable, and unlimited fibre connectivity for home and business
            </motion.p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-lg bg-gray-100 p-1 border-2" style={{ borderColor: PRIMARY_ORANGE }}>
              {[
                { id: "home", label: "Home Plans" },
                { id: "business", label: "Business Plans" },
                { id: "enterprise", label: "Enterprise" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-md text-sm font-bold transition-colors ${
                    activeTab === tab.id
                      ? "text-white shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? PRIMARY_RED : '',
                    color: activeTab === tab.id ? WHITE : TEXT_DARK,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`bg-white rounded-xl border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col relative ${
                  plan.popular ? 'ring-2 ring-orange-400 transform scale-105' : 'border-gray-200'
                }`}
                style={{
                  borderColor: plan.popular ? PRIMARY_ORANGE : '#E5E7EB'
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                    <Star className="w-3 h-3 inline mr-1" />
                    MOST POPULAR
                  </div>
                )}
                
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 
                      className="text-lg font-bold" 
                      style={{ 
                        color: PRIMARY_BLACK,
                        fontFamily: HANDWRITTEN_FONT,
                        fontSize: '1.4rem'
                      }}
                    >
                      {plan.name}
                    </h3>
                    <span
                      className="text-xs px-3 py-1 rounded-full font-bold border"
                      style={{ 
                        backgroundColor: `${PRIMARY_RED}10`, 
                        color: PRIMARY_RED,
                        borderColor: PRIMARY_RED
                      }}
                    >
                      {plan.speed}
                    </span>
                  </div>
                  <p 
                    className="text-2xl font-bold mb-4" 
                    style={{ 
                      color: PRIMARY_RED,
                      fontFamily: HANDWRITTEN_FONT,
                      fontSize: '1.8rem'
                    }}
                  >
                    {plan.price}
                    <span className="text-sm font-normal text-gray-600">/month</span>
                  </p>
                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm" style={{ color: TEXT_DARK }}>
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: PRIMARY_ORANGE }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full font-bold py-3 rounded-lg text-sm transition-all shadow-lg"
                    style={{
                      backgroundColor: plan.popular ? PRIMARY_ORANGE : PRIMARY_RED,
                      color: WHITE,
                    }}
                  >
                    Get Connected
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: PRIMARY_BLACK }}
          >
            Why Choose <span style={{ color: PRIMARY_RED }}>Knoxville</span>?
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: "Reliable Connection", 
                description: "99.9% uptime guarantee with redundant systems"
              },
              { 
                icon: <Zap className="w-8 h-8" />, 
                title: "Lightning Fast", 
                description: "Fibre-optic technology for ultra-fast speeds"
              },
              { 
                icon: <Clock className="w-8 h-8" />, 
                title: "24/7 Support", 
                description: "Round-the-clock technical support team"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-orange-200 transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY_RED}10` }}>
                  <span style={{ color: PRIMARY_RED }}>{feature.icon}</span>
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ color: PRIMARY_BLACK }}>{feature.title}</h4>
                <p className="text-sm" style={{ color: TEXT_LIGHT }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <p 
            className="text-base mb-8 font-bold" 
            style={{ 
              color: PRIMARY_BLACK,
              fontSize: '1.1rem'
            }}
          >
            ✅ All plans include:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Clock className="w-5 h-5" />, label: "24/7 Support" },
              { icon: <HardHat className="w-5 h-5" />, label: "Same-day Installation" },
              { icon: <Zap className="w-5 h-5" />, label: "<5ms latency" },
              { icon: <Wifi className="w-5 h-5" />, label: "Free Installation" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-md"
                  style={{ backgroundColor: PRIMARY_RED }}
                >
                  <span style={{ color: WHITE }}>{item.icon}</span>
                </div>
                <span className="text-sm font-medium" style={{ color: TEXT_DARK }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Features (if needed) */}
      {activeTab !== "home" && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-center mb-12"
              style={{ 
                color: PRIMARY_BLACK,
                fontFamily: HANDWRITTEN_FONT,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Business Solutions <span style={{ color: PRIMARY_RED }}>Features</span>
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-8">
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
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:border-orange-200 transition-all"
                >
                  <h4 
                    className="font-bold text-lg mb-3" 
                    style={{ 
                      color: PRIMARY_BLACK,
                      fontFamily: HANDWRITTEN_FONT,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-sm" style={{ color: TEXT_LIGHT }}>{item.desc}</p>
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
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-2"
              style={{ borderColor: PRIMARY_ORANGE }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 
                  className="text-lg font-bold" 
                  style={{ 
                    color: PRIMARY_BLACK,
                    fontFamily: HANDWRITTEN_FONT,
                    fontSize: '1.4rem'
                  }}
                >
                  Get {selectedPlan?.name}
                </h3>
                <button 
                  onClick={() => setShowForm(false)} 
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {[
                    { name: "name", label: "Full Name *", type: "text", required: true },
                    { name: "phone", label: "Phone Number *", type: "tel", required: true },
                    { name: "email", label: "Email Address", type: "email", required: false },
                    { name: "location", label: "Location *", type: "text", required: true }
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-1" style={{ color: TEXT_DARK }}>{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        className="w-full px-3 py-2 bg-gray-50 border-2 rounded-lg focus:outline-none transition-colors"
                        style={{ borderColor: TEXT_LIGHT, focus: { borderColor: PRIMARY_ORANGE } }}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: TEXT_DARK }}>Connection Type</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg font-medium"
                      style={{ color: PRIMARY_RED }}
                      value={formData.connectionType}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-sm rounded-lg border-2 font-medium transition-colors"
                    style={{ 
                      borderColor: TEXT_LIGHT, 
                      color: TEXT_DARK,
                      hover: { borderColor: PRIMARY_RED, color: PRIMARY_RED }
                    }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 text-white rounded-lg text-sm font-bold shadow-lg"
                    style={{ backgroundColor: PRIMARY_RED }}
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        style={{ backgroundColor: PRIMARY_RED }}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>
    </div>
  );
};

export default Hero;