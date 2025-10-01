import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Wrench, Wifi, Code2, Shield, Cloud,
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaTiktok } from "react-icons/fa";

// RISA Brand Colors
const RISA_BLUE = "#015B97";
const RISA_LIGHT_BLUE = "#3288e6";

const issues = [
  { value: "hardware", label: "Hardware", icon: <Wrench className="w-8 h-8 text-yellow-500" /> },
  { value: "networking", label: "Networking", icon: <Wifi className="w-8 h-8 text-green-500" /> },
  { value: "software", label: "Software", icon: <Code2 className="w-8 h-8 text-purple-500" /> },
  { value: "security", label: "Security", icon: <Shield className="w-8 h-8 text-red-500" /> },
  { value: "webdev", label: "Web Dev", icon: <Code2 className="w-8 h-8 text-pink-500" /> },
  { value: "cloud", label: "Cloud", icon: <Cloud className="w-8 h-8 text-blue-500" /> },
];

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.issue) {
      navigate(`/technicians/${formData.issue.toLowerCase()}`);
    } else {
      navigate("/technicians");
    }
  };

  return (
    <div
      className="min-h-screen px-4 sm:px-6 pt-20 pb-16 bg-white text-gray-800"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: RISA_BLUE }}
          >
            Contact Knoxville Technologies
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Reach out to us for inquiries, support, or to visit our offices in Lucky Summer
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <h2
                className="text-2xl font-semibold mb-5"
                style={{ color: RISA_BLUE }}
              >
                Our Contact Details
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${RISA_BLUE}10` }}
                  >
                    <Phone className="w-5 h-5" style={{ color: RISA_BLUE }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <p className="text-gray-600">0726 818 938</p>
                    <p className="text-gray-600">0724 169 963</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${RISA_BLUE}10` }}
                  >
                    <Mail className="w-5 h-5" style={{ color: RISA_BLUE }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">knoxville@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${RISA_BLUE}10` }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: RISA_BLUE }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-gray-600">Lucky Summer, Ruaraka</p>
                    <p className="text-gray-600">Behind Naivas Supermarket</p>
                    <p className="text-gray-600">Thoram House, Ground Floor</p>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/254726818938"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium shadow-sm hover:shadow-md transition-all"
              style={{
                backgroundColor: '#25D366',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Chat with us on WhatsApp</span>
            </motion.a>

            {/* Social Links */}
            <div>
              <p className="font-medium text-gray-800 mb-3">Follow us</p>
              <div className="flex gap-5">
                <motion.a
                  href="https://www.facebook.com/share/1E5h7zsjFR/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-blue-600 text-2xl"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </motion.a>
                <motion.a
                  href="https://www.tiktok.com/@knoxville.home.fi"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-black text-2xl"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </motion.a>
              </div>
            </div>

            {/* Office Hours */}
            <div
              className="p-6 rounded-xl border"
              style={{ borderColor: `${RISA_BLUE}20` }}
            >
              <h3 className="font-semibold mb-3" style={{ color: RISA_BLUE }}>
                Business Hours
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-medium">8:00 AM – 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM – 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-7 rounded-xl border shadow-sm"
            style={{ borderColor: `${RISA_BLUE}20` }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-2" style={{ color: RISA_BLUE }}>
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we'll get back to you soon
            </p>

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1"
                  style={{
                    borderColor: '#ddd',
                    focus: { ringColor: RISA_BLUE },
                  }}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1"
                  style={{ borderColor: '#ddd' }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What can we help you with?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {issues.map((issue) => (
                    <motion.div
                      key={issue.value}
                      onClick={() => setFormData({ ...formData, issue: issue.value })}
                      className={`cursor-pointer p-3 rounded-lg flex flex-col items-center gap-2 border transition ${
                        formData.issue === issue.value
                          ? `border-[${RISA_BLUE}] bg-[${RISA_BLUE}08]`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {issue.icon}
                      <span className="text-sm text-center">{issue.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1"
                  style={{ borderColor: '#ddd' }}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full font-semibold py-3 px-6 rounded-full text-white transition-colors"
                style={{ backgroundColor: RISA_BLUE }}
                whileHover={{ scale: 1.02, backgroundColor: RISA_LIGHT_BLUE }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Message
              </motion.button>
            </div>
          </motion.form>
        </div>

        {/* Map Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-5" style={{ color: RISA_BLUE }}>
            Our Location in Lucky Summer
          </h2>
          <div className="rounded-xl overflow-hidden border shadow-sm" style={{ borderColor: `${RISA_BLUE}20` }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.845749464442!2d36.8701933!3d-1.241681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f172f478cf6d7%3A0x9ff70d276cc229f4!2sThoram%20House%2C%20Lucky%20Summer!5e0!3m2!1sen!2ske!4v1717140000000!5m2!1sen!2ske"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Knoxville Technologies – Thoram House, Lucky Summer"
            ></iframe>
          </div>
          <div className="mt-4 text-center text-gray-600">
            <p>Find us at Thoram House, behind Naivas Supermarket in Lucky Summer</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;