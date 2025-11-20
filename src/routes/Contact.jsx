import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  Phone,
  Mail,
  MapPin,
  Wifi,
  Code2,
  Shield,
  Cloud,
  Server,
  Monitor,
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaTiktok } from "react-icons/fa";

// Brand Colors
const BRAND = {
  blue: "#015B97",
  orange: "#FF8C00",
  slate: "#f8fafc",
  text: "#334155",
  white: "#ffffff"
};

const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const issues = [
  { value: "hardware", label: "Hardware Repair", icon: <Monitor className="w-6 h-6" /> },
  { value: "networking", label: "Internet / WiFi", icon: <Wifi className="w-6 h-6" /> },
  { value: "software", label: "Software Issue", icon: <Code2 className="w-6 h-6" /> },
  { value: "security", label: "CCTV / Security", icon: <Shield className="w-6 h-6" /> },
  { value: "cloud", label: "Server / Cloud", icon: <Cloud className="w-6 h-6" /> },
  { value: "other", label: "General Inquiry", icon: <Server className="w-6 h-6" /> },
];

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issue: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      if (formData.issue) {
        navigate(`/technicians/${formData.issue.toLowerCase()}`);
      } else {
        navigate("/technicians");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16" style={{ fontFamily: FONT_FAMILY }}>
      <Helmet>
        <title>Contact Us | Knoxville Technologies</title>
        <meta name="description" content="Get in touch with Knoxville Technologies for support, inquiries, or visit our offices in Lucky Summer, Nairobi." />
      </Helmet>

      {/* ================= HEADER SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#FF8C00] font-bold tracking-wider uppercase text-sm">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-slate-900">
            We're here to <span className="text-[#015B97]">help</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you have a question about our plans, need technical support, or just want to say hello, our team is ready to answer all your questions.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* ================= LEFT: CONTACT INFO SIDEBAR ================= */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Info Cards */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 space-y-6">
                
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#015B97]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Call Us</h3>
                    <p className="text-sm text-slate-500 mb-1">Mon-Fri from 8am to 5pm</p>
                    <a href="tel:+254726818938" className="block font-semibold text-[#015B97] hover:underline">0726 818 938</a>
                    <a href="tel:+254724169963" className="block font-semibold text-[#015B97] hover:underline">0724 169 963</a>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#FF8C00]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Email Us</h3>
                    <p className="text-sm text-slate-500 mb-1">Speak to our friendly team</p>
                    <a href="mailto:support@knoxville.co.ke" className="font-semibold text-[#015B97] hover:underline">support@knoxville.co.ke</a>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Visit Us</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Thoram House, Ground Floor<br />
                      Behind Naivas Supermarket<br />
                      Lucky Summer, Nairobi
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Bar */}
              <div className="bg-slate-50 p-4 flex justify-center gap-6">
                <a href="#" className="text-slate-400 hover:text-[#1877F2] transition-colors"><FaFacebook size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-black transition-colors"><FaTiktok size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-[#25D366] transition-colors"><FaWhatsapp size={20} /></a>
              </div>
            </div>

            {/* WhatsApp CTA Card */}
            <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/20 w-24 h-24 rounded-full blur-xl"></div>
               <h3 className="font-bold text-lg mb-2">Need Instant Help?</h3>
               <p className="text-white/90 text-sm mb-4">Chat with our support team directly on WhatsApp.</p>
               <a 
                 href="https://wa.me/254726818938" 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex items-center justify-center gap-2 w-full bg-white text-[#128C7E] font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors"
               >
                 <FaWhatsapp size={20} /> Start Chat
               </a>
            </div>
          </motion.div>

          {/* ================= RIGHT: CONTACT FORM ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#015B97] focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#015B97] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Issue Selector Grid */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">What can we help you with?</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {issues.map((item) => (
                      <div 
                        key={item.value}
                        onClick={() => setFormData(prev => ({ ...prev, issue: item.value }))}
                        className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 flex flex-col items-center justify-center text-center gap-2 ${
                          formData.issue === item.value 
                            ? 'bg-[#015B97] border-[#015B97] text-white shadow-md transform scale-105' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-[#015B97] hover:bg-slate-50'
                        }`}
                      >
                        <div className={formData.issue === item.value ? 'text-white' : 'text-[#FF8C00]'}>
                          {item.icon}
                        </div>
                        <span className="text-xs font-bold">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Area */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Your Message</label>
                  <textarea 
                    name="message"
                    rows="4"
                    placeholder="Please describe your issue or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#015B97] focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#015B97] hover:bg-[#004a7c] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      Send Message <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ================= MAP SECTION ================= */}
        <div className="mt-20">
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-[400px] w-full relative"
          >
            {/* Google Maps Embed for Lucky Summer Area */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.486603994728!2d36.89458295!3d-1.24789665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f15a6d63806c1%3A0x90e2251976805509!2sLucky%20Summer%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1708445678910!5m2!1sen!2ske" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Knoxville Location"
            ></iframe>
            
            {/* Map Overlay Card */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs hidden md:block border border-slate-200">
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 bg-[#FF8C00] rounded-lg flex items-center justify-center text-white">
                   <MapPin className="w-4 h-4" />
                 </div>
                 <span className="font-bold text-slate-900">Our Location</span>
               </div>
               <p className="text-xs text-slate-600">
                 Lucky Summer Estate, Nairobi.<br/>
                 We are located at Thoram House.
               </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Contact;