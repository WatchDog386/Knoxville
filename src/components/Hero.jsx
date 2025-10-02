import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { Wifi, Clock, HardHat, CheckCircle, Zap, X } from "lucide-react";

// 🔥 NEW Professional Color Palette
const BRAND_BLACK = "#121212";
const BRAND_DARK = "#1e1e1e";
const BRAND_RED = "#e53935";
const BRAND_ORANGE = "#fb8c00";
const BRAND_LIGHT = "#f5f5f5";
const BRAND_WHITE = "#ffffff";

// Font stack
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const plans = [
  {
    name: "Basic Plan",
    price: "Ksh 1,500",
    speed: "6Mbps",
    image: "/basicp.jpg",
    features: ["Great for browsing", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Essential Plan",
    price: "Ksh 1,999",
    speed: "10Mbps",
    image: "/essentialp.jpg",
    features: ["Streaming & Social Media", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Family Plan",
    price: "Ksh 2,499",
    speed: "15Mbps",
    image: "/familyp.jpg",
    features: ["Work from Home", "Streaming", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Smart Home Plan",
    price: "Ksh 2,999",
    speed: "20Mbps",
    image: "/streaming.jpg",
    features: ["Multiple Devices", "Low Latency", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Pro Streamer Plan",
    price: "Ksh 3,999",
    speed: "25Mbps",
    image: "/pros.jpg",
    features: ["Heavy Streaming", "Gaming Ready", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Ultra Plan",
    price: "Ksh 4,999",
    speed: "30Mbps",
    image: "/back.webp",
    features: ["High-Speed Everything", "Gaming & 4K", "24/7 Support", "Free Installation"],
    type: "home"
  },
  {
    name: "Business Basic",
    price: "Ksh 8,000",
    speed: "50Mbps",
    image: "/image.webp",
    features: ["5 IP phones", "3 Static IPs", "Priority support", "99.5% uptime"],
    type: "business"
  },
  {
    name: "Business Plus",
    price: "Ksh 15,000",
    speed: "100Mbps",
    image: "/internet1.webp",
    features: ["10 IP phones", "5 Static IPs", "Dedicated line", "99.9% uptime"],
    type: "business"
  },
  {
    name: "Enterprise",
    price: "Custom",
    speed: "500Mbps+",
    image: "/enterprise2.jpg",
    features: ["Unlimited IP phones", "10+ Static IPs", "SLA guarantee", "24/7 monitoring"],
    type: "enterprise"
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

      {/* Hero Section */}
      <section
        className="relative w-full overflow-hidden py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url('https://itel.com/wp-content/uploads/2015/09/iStock_000012499607_XXXLarge-1024x576.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh'
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
              <div
                className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full"
                style={{ backgroundColor: BRAND_RED, color: BRAND_WHITE }}
              >
                High-Speed Connectivity
              </div>

              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                style={{ fontFamily: '"adobe-garamond-pro", "Poppins", sans-serif' }}
              >
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
                  style={{
                    backgroundColor: BRAND_WHITE,
                    color: BRAND_BLACK,
                    borderRadius: '50px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = BRAND_RED;
                    e.target.style.color = BRAND_WHITE;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = BRAND_WHITE;
                    e.target.style.color = BRAND_BLACK;
                  }}
                >
                  View Plans
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/coverage")}
                  className="font-bold py-2 px-5 rounded-full text-sm transition-all"
                  style={{
                    backgroundColor: 'transparent',
                    color: BRAND_WHITE,
                    border: `2px solid ${BRAND_WHITE}`,
                    borderRadius: '50px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = BRAND_ORANGE;
                    e.target.style.borderColor = BRAND_ORANGE;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = BRAND_WHITE;
                  }}
                >
                  View Coverage
                </motion.button>
              </div>
            </motion.div>
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
                    activeTab === tab.id
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
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
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold" style={{ color: BRAND_BLACK }}>
                      {plan.name}
                    </h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{ backgroundColor: `${BRAND_ORANGE}20`, color: BRAND_ORANGE }}
                    >
                      {plan.speed}
                    </span>
                  </div>
                  <p className="text-xl font-bold mb-3" style={{ color: BRAND_RED }}>
                    {plan.price}
                  </p>
                  <ul className="space-y-2 mb-5 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm" style={{ color: BRAND_BLACK }}>
                        <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full font-bold py-2.5 rounded-full text-sm transition-all"
                    style={{
                      backgroundColor: BRAND_RED,
                      color: BRAND_WHITE,
                      borderRadius: '50px'
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
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${BRAND_ORANGE}20` }}
                >
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