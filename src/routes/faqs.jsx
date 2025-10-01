import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  CreditCard,
  Settings,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// RISA-inspired colors
const RISA_BLUE = "#015B97";
const RISA_LIGHT_BLUE = "#3288e6";
const RISA_WHITE = "#ffffff";

const faqsData = {
  "Account Management": {
    icon: <User className="w-5 h-5" style={{ color: RISA_BLUE }} />,
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
    icon: <CreditCard className="w-5 h-5" style={{ color: RISA_BLUE }} />,
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
    icon: <Settings className="w-5 h-5" style={{ color: RISA_BLUE }} />,
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
    icon: <HelpCircle className="w-5 h-5" style={{ color: RISA_BLUE }} />,
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
    <div className="bg-white">
      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: RISA_BLUE }}>
              Knoxville Tech Ltd – Self-Care Portal
            </h2>
            <p className="text-gray-600 mt-3">
              Manage your account, services, and get support 24/7
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(faqsData).map(([key, { icon }]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(key);
                  setOpenIndex(null);
                  setSearch("");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                  activeCategory === key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor: activeCategory === key ? RISA_BLUE : '',
                  color: activeCategory === key ? RISA_WHITE : '',
                }}
              >
                {icon}
                <span className="text-sm">{key}</span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-10">
            <input
              type="text"
              placeholder={`Search ${activeCategory} FAQs...`}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2"
              style={{ borderColor: RISA_BLUE, boxShadow: `0 0 0 2px ${RISA_BLUE}20` }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* FAQ List */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <AnimatePresence mode="wait">
              {filteredFaqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full p-5 text-left flex justify-between items-center"
                  >
                    <h3 className="text-base font-semibold text-gray-900">{faq.question}</h3>
                    <motion.span
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      className="text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="px-5 pb-5 text-gray-700 text-sm"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section — NO GAP before footer */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: RISA_BLUE }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Still Need Help?
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our support team is ready to assist you. Reach out via phone, email, or WhatsApp for fast, friendly service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-white">
              <Phone className="h-8 w-8 mb-2" />
              <p className="font-medium">Call Us</p>
              <a
                href="tel:+254726818938"
                className="text-blue-200 hover:text-white underline"
              >
                +254 726 818 938
              </a>
            </div>
            <div className="flex flex-col items-center text-white">
              <Mail className="h-8 w-8 mb-2" />
              <p className="font-medium">Email Us</p>
              <a
                href="mailto:support@knoxville.co.ke"
                className="text-blue-200 hover:text-white underline"
              >
                support@knoxville.co.ke
              </a>
            </div>
            <div className="flex flex-col items-center text-white">
              <FaWhatsapp className="h-8 w-8 mb-2" />
              <p className="font-medium">WhatsApp</p>
              <a
                href="https://wa.me/254726818938"
                className="text-blue-200 hover:text-white underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat Now
              </a>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('hero').scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 px-6 py-3 rounded-full font-bold text-blue-700 hover:bg-blue-100 transition"
            style={{
              backgroundColor: RISA_WHITE,
            }}
          >
            Go to Homepage
          </motion.button>
        </div>
      </section>
    </div>
  );
}