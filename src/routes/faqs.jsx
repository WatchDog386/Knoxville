import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  CreditCard,
  Settings,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Search,
  ChevronDown,
  Home
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// 🔥 Knoxville Brand Colors (from Hero.jsx)
const BRAND_BLACK = "#121212";
const BRAND_DARK = "#1e1e1e";
const BRAND_RED = "#e53935";
const BRAND_ORANGE = "#fb8c00";
const BRAND_LIGHT = "#f5f5f5";
const BRAND_WHITE = "#ffffff";
const BRAND_BLUE = "#015B97"; // Primary Knoxville blue

// Font stack (matches Hero.jsx)
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const faqsData = {
  "Account Management": {
    icon: <User className="w-5 h-5" style={{ color: BRAND_BLUE }} />,
    items: [
      {
        question: "How do I create a self-care account?",
        answer: (
          <div className="space-y-3">
            <p>To create your self-care account:</p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Visit our self-care portal at knoxvilletechnologies.com</li>
              <li>Click on 'Get Started'</li>
              <li>Enter your details as prompted</li>
              <li>Create a password and verify your identity via SMS</li>
              <li>Complete your profile details</li>
            </ol>
            <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm text-blue-700">
              <p>Note: Your account number can be found on your invoice or by contacting customer care.</p>
            </div>
          </div>
        ),
      },
      {
        question: "I forgot my password. How can I reset it?",
        answer: (
          <div className="space-y-3">
            <p>Password reset options:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Click 'Forgot Password' on the login page</li>
              <li>Enter your registered email or phone number</li>
              <li>Follow the OTP verification process</li>
              <li>Set a new strong password</li>
            </ul>
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-sm text-yellow-800">
              <p>Security Tip: Use a combination of letters, numbers and special characters for your password.</p>
            </div>
          </div>
        ),
      },
      {
        question: "How do I update my account information?",
        answer: (
          <div className="space-y-3">
            <p>To update your account details:</p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Log in to your self-care account</li>
              <li>Go to 'Profile Settings'</li>
              <li>Edit the information you want to change</li>
              <li>Save your changes</li>
            </ol>
            <div className="bg-green-50 p-3 rounded border border-green-200 text-sm text-green-800">
              <p>Important: Some changes may require verification for security purposes.</p>
            </div>
          </div>
        ),
      },
    ],
  },
  "Billing & Payments": {
    icon: <CreditCard className="w-5 h-5" style={{ color: BRAND_BLUE }} />,
    items: [
      {
        question: "How can I view my current bill?",
        answer: (
          <div className="space-y-3">
            <p>View your bill through:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Self-care portal dashboard</li>
              <li>Email notifications (if subscribed)</li>
              <li>Mobile app under 'Billing' section</li>
            </ul>
            <div className="bg-purple-50 p-3 rounded border border-purple-200 text-sm text-purple-700">
              <p>Tip: Enable auto-notifications to receive bills directly to your email.</p>
            </div>
          </div>
        ),
      },
      {
        question: "What payment methods are available?",
        answer: (
          <div className="space-y-3">
            <p>We accept multiple payment options:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded border border-green-200 text-sm text-green-700">
                <h4 className="font-medium mb-2">Online Payments</h4>
                <ul className="space-y-1">
                  <li>• M-Pesa paybill: 4136553</li>
                  <li>• Credit/Debit Cards</li>
                  <li>• Bank Transfer</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-blue-200 text-sm text-blue-700">
                <h4 className="font-medium mb-2">Offline Payments</h4>
                <ul className="space-y-1">
                  <li>• Knoxville Payment Centers</li>
                  <li>• Authorized Agents</li>
                  <li>• Bank Deposit</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        question: "How do I set up auto-pay?",
        answer: (
          <div className="space-y-3">
            <p>To enable auto-payments:</p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Log in to your self-care account</li>
              <li>Navigate to 'Payment Methods'</li>
              <li>Select 'Set Up Auto-Pay'</li>
              <li>Choose your preferred payment method</li>
              <li>Set payment threshold and confirm</li>
            </ol>
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-sm text-yellow-800">
              <p>Note: You'll receive notifications before each auto-payment is processed.</p>
            </div>
          </div>
        ),
      },
    ],
  },
  "Service Management": {
    icon: <Settings className="w-5 h-5" style={{ color: BRAND_BLUE }} />,
    items: [
      {
        question: "How do I upgrade my internet package?",
        answer: (
          <div className="space-y-3">
            <p>Package upgrade options:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Through self-care portal under 'Packages'</li>
              <li>Via mobile app by selecting new package</li>
              <li>By contacting customer support</li>
            </ul>
            <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm text-blue-700">
              <p>Changes take effect immediately or at next billing cycle based on your selection.</p>
            </div>
          </div>
        ),
      },
      {
        question: "Can I temporarily suspend my service?",
        answer: (
          <div className="space-y-3">
            <p>Service suspension options:</p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Minimum suspension period: 7 days</li>
              <li>Maximum suspension period: 90 days</li>
              <li>Reduced monthly charges during suspension</li>
              <li>Reactivate anytime through self-care</li>
            </ol>
            <div className="bg-purple-50 p-3 rounded border border-purple-200 text-sm text-purple-700">
              <p>Note: Equipment must remain connected during suspension.</p>
            </div>
          </div>
        ),
      },
      {
        question: "How do I report service issues?",
        answer: (
          <div className="space-y-3">
            <p>Service issue reporting channels:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-red-50 p-3 rounded border border-red-200 text-sm text-red-700">
                <h4 className="font-medium mb-2">Self-Service</h4>
                <ul className="space-y-1">
                  <li>• Online troubleshooting</li>
                  <li>• Service status check</li>
                  <li>• Ticket submission</li>
                </ul>
              </div>
              <div className="bg-green-50 p-3 rounded border border-green-200 text-sm text-green-700">
                <h4 className="font-medium mb-2">Support</h4>
                <ul className="space-y-1">
                  <li>• Live chat (24/7)</li>
                  <li>• Phone support</li>
                  <li>• Technician dispatch</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  "Technical Support": {
    icon: <HelpCircle className="w-5 h-5" style={{ color: BRAND_BLUE }} />,
    items: [
      {
        question: "What should I do if my internet is down?",
        answer: (
          <div className="space-y-3">
            <p>First troubleshooting steps:</p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Check all cable connections</li>
              <li>Restart your router/modem</li>
              <li>Check for service alerts in your area</li>
              <li>Run speed test from self-care portal</li>
              <li>Submit trouble ticket if issue persists</li>
            </ol>
            <div className="bg-red-50 p-3 rounded border border-red-200 text-sm text-red-700">
              <p>Emergency: Call 0726896562 for immediate assistance with outages.</p>
            </div>
          </div>
        ),
      },
      {
        question: "How do I optimize my Wi-Fi connection?",
        answer: (
          <div className="space-y-3">
            <p>Wi-Fi optimization tips:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm text-blue-700">
                <h4 className="font-medium mb-2">Placement</h4>
                <ul className="space-y-1">
                  <li>• Central location</li>
                  <li>• Elevated position</li>
                  <li>• Away from interference</li>
                </ul>
              </div>
              <div className="bg-green-50 p-3 rounded border border-green-200 text-sm text-green-700">
                <h4 className="font-medium mb-2">Settings</h4>
                <ul className="space-y-1">
                  <li>• 5GHz for speed</li>
                  <li>• 2.4GHz for range</li>
                  <li>• Channel optimization</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        question: "How do I connect multiple devices?",
        answer: (
          <div className="space-y-3">
            <p>Device connection options:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Standard routers support 10-15 devices</li>
              <li>Upgrade to mesh system for larger homes</li>
              <li>Use wired connections for stationary devices</li>
              <li>Enable guest network for visitors</li>
            </ul>
            <div className="bg-purple-50 p-3 rounded border border-purple-200 text-sm text-purple-700">
              <p>Tip: Monitor connected devices through self-care portal.</p>
            </div>
          </div>
        ),
      },
    ],
  },
};

export default function Faqs() {
  const [activeCategory, setActiveCategory] = useState("Account Management");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqsData[activeCategory].items.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: FONT_FAMILY }}>
      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-sm" style={{ color: BRAND_BLUE }}>
              <Home className="w-4 h-4" />
              <span>Support Center</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND_BLACK }}>
              Frequently Asked Questions
            </h1>
            <p className="text-lg" style={{ color: BRAND_BLACK }}>
              Find quick answers to common questions about your Knoxville Internet service
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div 
                className="rounded-lg border overflow-hidden"
                style={{ borderColor: BRAND_BLUE }}
              >
                <div 
                  className="px-4 py-3"
                  style={{ backgroundColor: BRAND_BLUE, color: BRAND_WHITE }}
                >
                  <h3 className="font-semibold text-sm">Categories</h3>
                </div>
                <div className="bg-white p-4 space-y-2">
                  {Object.entries(faqsData).map(([key, { icon }]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveCategory(key);
                        setOpenIndex(null);
                        setSearch("");
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors text-sm font-medium ${
                        activeCategory === key
                          ? "text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      style={{
                        backgroundColor: activeCategory === key ? BRAND_BLUE : '',
                      }}
                    >
                      {icon}
                      <span>{key}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="bg-white rounded-lg border mb-6" style={{ borderColor: BRAND_BLUE }}>
                <div className="relative">
                  <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                  />
                  <input
                    type="text"
                    placeholder={`Search in ${activeCategory}...`}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white placeholder-gray-500 focus:outline-none"
                    style={{ 
                      borderColor: BRAND_BLUE,
                      borderWidth: '1px'
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
                        style={{ borderColor: '#e5e7eb' }}
                      >
                        <button
                          onClick={() => setOpenIndex(openIndex === i ? null : i)}
                          className="w-full p-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                          style={{ color: BRAND_BLACK }}
                        >
                          <h3 className="text-base font-medium pr-4">{faq.question}</h3>
                          <motion.span
                            animate={{ rotate: openIndex === i ? 180 : 0 }}
                            className="text-gray-500 flex-shrink-0"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {openIndex === i && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-5 pb-5"
                              style={{ color: BRAND_BLACK }}
                            >
                              <div className="pt-3 border-t" style={{ borderColor: '#e5e7eb' }}>
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="text-gray-400 mb-2">
                        <Search className="w-12 h-12 mx-auto" />
                      </div>
                      <p className="text-gray-600">No results found for "{search}"</p>
                      <p className="text-sm text-gray-500 mt-1">Try different keywords or browse the categories</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — Matches Hero.jsx styling */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl border overflow-hidden"
            style={{ borderColor: BRAND_BLUE }}
          >
            <div 
              className="px-6 py-5 text-center"
              style={{ backgroundColor: BRAND_BLUE, color: BRAND_WHITE }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-1">
                Still Need Help?
              </h3>
              <p className="text-blue-100 text-base">
                Our dedicated support team is here to assist you
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Phone */}
                <div className="text-center">
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${BRAND_BLUE}10` }}
                  >
                    <Phone className="h-5 w-5" style={{ color: BRAND_BLUE }} />
                  </div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: BRAND_BLACK }}>Call Us</h4>
                  <a
                    href="tel:+254726818938"
                    className="text-sm font-medium block"
                    style={{ color: BRAND_BLUE }}
                  >
                    +254 726 818 938
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Mon-Sun, 24/7</p>
                </div>

                {/* Email */}
                <div className="text-center">
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${BRAND_BLUE}10` }}
                  >
                    <Mail className="h-5 w-5" style={{ color: BRAND_BLUE }} />
                  </div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: BRAND_BLACK }}>Email Us</h4>
                  <a
                    href="mailto:support@knoxville.co.ke"
                    className="text-sm font-medium block"
                    style={{ color: BRAND_BLUE }}
                  >
                    support@knoxville.co.ke
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Response within 2 hours</p>
                </div>

                {/* WhatsApp */}
                <div className="text-center">
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${BRAND_BLUE}10` }}
                  >
                    <FaWhatsapp className="h-5 w-5" style={{ color: BRAND_BLUE }} />
                  </div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: BRAND_BLACK }}>WhatsApp</h4>
                  <a
                    href="https://wa.me/254726818938"
                    className="text-sm font-medium block"
                    style={{ color: BRAND_BLUE }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat Now
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Instant messaging</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-2.5 rounded-full font-medium text-sm flex items-center justify-center gap-1.5"
                  style={{
                    backgroundColor: BRAND_BLUE,
                    color: BRAND_WHITE,
                    borderRadius: '50px'
                  }}
                >
                  <Home className="w-3.5 h-3.5" />
                  Back to Homepage
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-6 py-2.5 rounded-full font-medium text-sm border"
                  style={{
                    borderColor: BRAND_BLUE,
                    color: BRAND_BLUE,
                    backgroundColor: 'transparent',
                    borderRadius: '50px'
                  }}
                >
                  Back to Top
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}