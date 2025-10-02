import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { Wifi, Clock, HardHat, CheckCircle, Zap } from "lucide-react";

// RISA-inspired colors
const RISA_BLUE = "#015B97";
const RISA_LIGHT_BLUE = "#3288e6";
const RISA_WHITE = "#ffffff";

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
    <div className="min-h-screen bg-white">
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
        className="relative w-full overflow-hidden py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url('https://itel.com/wp-content/uploads/2015/09/iStock_000012499607_XXXLarge-1024x576.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '70vh'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

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
                style={{ backgroundColor: RISA_BLUE, color: RISA_WHITE }}
              >
                Professional Connectivity
              </div>

              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                style={{ fontFamily: '"adobe-garamond-pro", "Poppins", sans-serif' }}
              >
                Unlimited <span style={{ color: RISA_LIGHT_BLUE }}>Internet</span> For Your Home
              </h1>

              {/* ✅ Paragraph with RISA font */}
              <p
                className="text-base md:text-lg mb-6 opacity-90 max-w-lg"
                style={{ fontFamily: '"adobe-garamond-pro", "Poppins", sans-serif' }}
              >
                Enjoy Unlimited internet for your home with Knoxville Technologies Home fibre plans. Perfect for streaming, gaming, and working from home Fibre.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* ✅ View Plans Button - Blue Hover */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('plans-section').scrollIntoView({ behavior: 'smooth' })}
                  className="font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
                  style={{
                    backgroundColor: RISA_WHITE,
                    color: RISA_BLUE,
                    borderRadius: '50px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = RISA_BLUE;
                    e.target.style.color = RISA_WHITE;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = RISA_WHITE;
                    e.target.style.color = RISA_BLUE;
                  }}
                >
                  View Plans
                </motion.button>

                {/* ✅ View Coverage Button - Blue Hover */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/coverage")}
                  className="font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
                  style={{
                    backgroundColor: 'transparent',
                    color: RISA_WHITE,
                    border: `2px solid ${RISA_WHITE}`,
                    borderRadius: '50px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = RISA_BLUE;
                    e.target.style.borderColor = RISA_BLUE;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = RISA_WHITE;
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: RISA_BLUE }}
            >
              Internet <span style={{ color: RISA_LIGHT_BLUE }}>Plans</span>
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-700"
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
                  className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? RISA_WHITE : '',
                    color: activeTab === tab.id ? RISA_BLUE : '',
                    border: activeTab === tab.id ? `1px solid ${RISA_BLUE}` : 'none'
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold" style={{ color: RISA_BLUE }}>
                      {plan.name}
                    </h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{ backgroundColor: `${RISA_BLUE}10`, color: RISA_BLUE }}
                    >
                      {plan.speed}
                    </span>
                  </div>
                  <p className="text-2xl font-bold mb-4" style={{ color: RISA_BLUE }}>
                    {plan.price}
                  </p>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full font-bold py-3 rounded-full transition-all"
                    style={{
                      backgroundColor: RISA_BLUE,
                      color: RISA_WHITE,
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg mb-8">All our packages come with:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Clock className="w-5 h-5" />, label: "24/7 Support" },
              { icon: <HardHat className="w-5 h-5" />, label: "Same-day Installation" },
              { icon: <Zap className="w-5 h-5" />, label: "<5ms gaming latency" },
              { icon: <Wifi className="w-5 h-5" />, label: "Free Installation" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${RISA_BLUE}10` }}
                >
                  <span style={{ color: RISA_BLUE }}>{item.icon}</span>
                </div>
                <span className="text-gray-700 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Features */}
      {activeTab !== "home" && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h3
              className="text-2xl font-bold text-center mb-10"
              style={{ color: RISA_BLUE }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Business Solutions Features
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "SLA Guarantee", desc: "99.9% uptime with compensation for downtime" },
                { title: "Dedicated Support", desc: "Priority technical support with direct line" },
                { title: "IP Telephony", desc: "VoIP phone systems with multiple extensions" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: RISA_BLUE }}
                  >
                    <span className="text-white text-lg font-bold">{i + 1}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2" style={{ color: RISA_BLUE }}>
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Connection Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold" style={{ color: RISA_BLUE }}>
                Get {selectedPlan?.name}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
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
                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      className="w-full px-3 py-2.5 bg-gray-50 border rounded-md focus:outline-none focus:ring-1"
                      style={{ borderColor: RISA_BLUE }}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium mb-1">Connection Type</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-md cursor-not-allowed"
                    value={formData.connectionType}
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 border rounded-full text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2.5 text-white rounded-full flex items-center font-bold"
                  style={{ backgroundColor: RISA_BLUE, borderRadius: '50px' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.062c-.545 0-1-.448-1-1s.445-1 1-1c.552 0 1 .448 1 1s-.443 1-1 1m4 0c-.545 0-1-.448-1-1s.445-1 1-1c.552 0 1 .448 1 1s-.443 1-1 1m2.005 9.644c-.366-.01-1.422-.361-2.053-.616l-.086-.035c-.487-.199-1.153-.473-1.623-.762-.543-.333-.915-.669-1.279-1.141-.432-.561-.757-1.236-.964-1.821l-.013-.034c-.309-.84-.175-1.579.024-2.192l-.013-.034c.099-.24.26-.624.26-.624s-.159-.397-.198-.606c-.04-.209-.05-.359-.099-.568-.05-.208-.248-.52-.446-.669-.198-.149-.471-.258-.97-.258-.322 0-.644.025-.966.074-.309.05-.619.124-.929.198-.396.099-1.108.347-1.564.644-.447.297-.828.694-1.04 1.141-.223.471-.347 1.033-.347 1.702 0 .669.124 1.379.471 2.118l.013.034c.396.941 1.104 2.06 1.806 2.809.744.793 1.678 1.416 2.488 1.821l.074.037c.669.322 1.847.793 2.379.941.396.112.828.174 1.213.174.57 0 1.074-.062 1.49-.211.446-.16.832-.471 1.104-.941.272-.471.347-1.033.248-1.604-.074-.458-.322-.907-.644-1.191a1.49 1.49 0 00-.793-.347c-.124-.025-.223-.033-.322-.033" />
                  </svg>
                  Send via WhatsApp
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/254726818938"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>
    </div>
  );
};

// ✅ Critical: Export as default
export default Hero;