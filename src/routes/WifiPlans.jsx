import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wifi, Clock, HardHat, Check, Zap, ChevronRight, Shield, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

// Premium Corporate Palette
const THEME = {
  primary: "#1A365D",       // Deep Corporate Navy
  secondary: "#2D3748",     // Charcoal Gray
  background: "#F7FAFC",    // Very Light Gray
  cardBg: "#FFFFFF",        // Pure White
  border: "#E2E8F0",        // Light Gray Border
  accent: "#2B6CB0",        // Professional Blue
  muted: "#718096",         // Medium Gray
  success: "#276749",       // Deep Green
  gold: "#D69E2E",          // Accent Gold
  gradient: "linear-gradient(135deg, #1A365D 0%, #2D3748 50%, #4A5568 100%)"
};

const plans = [
  {
    name: "Essential Fiber",
    price: "Ksh 1,500",
    speed: "6Mbps",
    image: "/basicp.jpg",
    features: ["Basic Browsing & Email", "24/7 Customer Support", "Standard Installation", "Unlimited Data Usage"],
    type: "home",
    isPopular: false
  },
  {
    name: "Streamer Plan",
    price: "Ksh 1,999",
    speed: "10Mbps",
    image: "/essentialp.jpg",
    features: ["HD Video Streaming", "Social Media Optimized", "Quick Installation", "Stable Connectivity"],
    type: "home",
    isPopular: false
  },
  {
    name: "Family Premium",
    price: "Ksh 2,499",
    speed: "15Mbps",
    image: "/familyp.jpg",
    features: ["Multiple Device Support", "Work from Home Ready", "Priority Installation", "Family Entertainment"],
    type: "home",
    isPopular: true 
  },
  {
    name: "Smart Home Pro",
    price: "Ksh 2,999",
    speed: "20Mbps",
    image: "/streaming.jpg",
    features: ["4K Ultra HD Streaming", "Smart Home Integration", "Low Latency Gaming", "Professional Setup"],
    type: "home",
    isPopular: false
  },
  {
    name: "Gaming Elite",
    price: "Ksh 3,999",
    speed: "25Mbps",
    image: "/pros.jpg",
    features: ["Competitive Gaming", "Live Streaming", "Priority Technical Support", "Advanced Router"],
    type: "home",
    isPopular: false
  },
  {
    name: "Ultra Performance",
    price: "Ksh 4,999",
    speed: "30Mbps",
    image: "/back.webp",
    features: ["8K Content Ready", "Large File Transfers", "Power User Optimized", "Premium Hardware"],
    type: "home",
    isPopular: false
  },
  {
    name: "Business Starter",
    price: "Ksh 8,000",
    speed: "50Mbps",
    image: "/image.webp",
    features: ["5 IP Telephony Lines", "3 Static IP Addresses", "Priority Business Support", "99.5% Uptime SLA"],
    type: "business",
    isPopular: false
  },
  {
    name: "Business Plus",
    price: "Ksh 15,000",
    speed: "100Mbps",
    image: "/internet1.webp",
    features: ["10 IP Telephony Lines", "5 Static IP Addresses", "Dedicated Fiber Line", "99.9% Uptime Guarantee"],
    type: "business",
    isPopular: true
  },
  {
    name: "Enterprise Solution",
    price: "Custom Quote",
    speed: "500Mbps+",
    image: "/enterprise2.jpg",
    features: ["Unlimited IP Telephony", "10+ Static IP Addresses", "Service Level Agreement", "24/7 Network Monitoring"],
    type: "enterprise",
    isPopular: false
  }
];

export default function WifiPlans() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', connectionType: '' });

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setFormData(prev => ({ ...prev, connectionType: plan.name }));
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "254726818938";
    const message = `New Connection Request:%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Location:* ${formData.location}%0A*Plan:* ${formData.connectionType}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setShowForm(false);
  };

  const filteredPlans = plans.filter(plan => plan.type === activeTab);

  return (
    <div className="min-h-screen font-sans bg-gray-50" style={{ color: THEME.secondary }}>
      <Helmet>
        <title>Enterprise Fiber Solutions | Premium Connectivity</title>
      </Helmet>

      <Navbar />

      {/* Hero Section - Corporate Style */}
      <div className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight"
          >
            Enterprise-Grade
            <span className="block font-normal mt-2">Fiber Connectivity</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            Premium fiber optic solutions designed for modern homes and growing businesses. 
            Experience unparalleled reliability and speed.
          </motion.p>
        </div>
      </div>

      {/* Tabs - Corporate Design */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="inline-flex bg-gray-100 p-1 rounded-2xl border border-gray-200">
              {[
                { id: "home", label: "Residential Plans", icon: <Building2 className="w-4 h-4 mr-2" /> },
                { id: "business", label: "Business Solutions", icon: <Shield className="w-4 h-4 mr-2" /> },
                { id: "enterprise", label: "Enterprise", icon: <Wifi className="w-4 h-4 mr-2" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? "bg-white text-gray-900 shadow-md border border-gray-200" 
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/60"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Premium Cards */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  flex flex-col h-full bg-white rounded-3xl overflow-hidden
                  transition-all duration-500 hover:shadow-2xl hover:-translate-y-3
                  border border-gray-200 group
                  ${plan.isPopular ? 'ring-2 ring-gold/30 ring-offset-2 relative' : ''}
                `}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-semibold px-6 py-2 rounded-full shadow-lg z-10">
                    ⭐ RECOMMENDED
                  </div>
                )}
                
                {/* Card Header */}
                <div className="p-8 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                  </div>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Custom Quote" && (
                      <span className="text-gray-500 text-lg ml-2">/month</span>
                    )}
                  </div>
                  <div className="inline-flex items-center px-4 py-2.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold">
                    <Wifi className="w-4 h-4 mr-2" /> 
                    <span className="font-bold">{plan.speed}</span> Download Speed
                  </div>
                </div>

                {/* Image Section */}
                <div className="h-56 overflow-hidden bg-gray-300 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div> 
                  <img 
                    src={plan.image} 
                    alt={plan.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>

                {/* Features List */}
                <div className="p-8 flex-grow flex flex-col">
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-[15px] text-gray-600">
                        <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center">
                      Request Connection
                      <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Corporate Features Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Why Choose Our Enterprise Solutions?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with enterprise-grade technology and supported by industry experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Clock className="w-8 h-8" />, 
                title: "Rapid Deployment", 
                desc: "Professional installation within 24-48 hours with minimal disruption to your operations." 
              },
              { 
                icon: <Zap className="w-8 h-8" />, 
                title: "Enterprise Reliability", 
                desc: "99.9% uptime guarantee with redundant systems and enterprise-grade infrastructure." 
              },
              { 
                icon: <HardHat className="w-8 h-8" />, 
                title: "Expert Engineering", 
                desc: "Certified network engineers and 24/7 technical support for mission-critical operations." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm">
                  {React.cloneElement(item.icon)}
                </div>
                <h4 className="font-semibold text-gray-900 mb-4 text-xl">{item.title}</h4>
                <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Modal Form */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200"
            >
              <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Request Professional Consultation</h3>
                  <p className="text-sm text-gray-500 mt-1">Selected Plan: {selectedPlan?.name}</p>
                </div>
                <button 
                  onClick={() => setShowForm(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">Phone</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Email address"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">Business/Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    required 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Company name or location"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span>Schedule Professional Consultation</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}