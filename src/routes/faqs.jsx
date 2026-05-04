import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  User,
  CreditCard,
  Settings,
  HelpCircle,
  Phone,
  Mail,
  Search,
  ChevronDown,
  Home,
  Rocket,
  Link as LinkIcon,
  DollarSign,
  Headphones
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar"; // Ensure this path is correct for your project

// Font stack
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

// Brand Colors (Vuma-style Red/Orange + Knoxville Blue)
const BRAND = {
  red: "#FF2400",       // The vivid red/orange from previous hero
  blue: "#015B97",      // The Knoxville blue
  dark: "#0f172a",      // Slate 900
  light: "#f8fafc"      // Slate 50
};

// Hero Feature Data (The images/cards you wanted)
const features = [
  {
    title: "Blazing Fast Speeds",
    icon: <Rocket className="w-6 h-6 text-[#FF2400]" />,
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Reliable Connection",
    icon: <LinkIcon className="w-6 h-6 text-[#FF2400]" />,
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Affordable Plans",
    icon: <DollarSign className="w-6 h-6 text-[#FF2400]" />,
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "24/7 Support",
    icon: <Headphones className="w-6 h-6 text-[#FF2400]" />,
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80",
  }
];

// FAQ Data
const faqsData = {
  "Account Management": {
    icon: <User className="w-5 h-5" />,
    items: [
      {
        question: "How do I create a self-care account?",
        answer: (
          <div className="space-y-3 text-slate-600">
            <p>To create your self-care account:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Visit our self-care portal at knoxvilletechnologies.com</li>
              <li>Click on 'Get Started'</li>
              <li>Enter your details as prompted</li>
              <li>Create a password and verify your identity via SMS</li>
              <li>Complete your profile details</li>
            </ol>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-blue-700">
              <p>Note: Your account number can be found on your invoice or by contacting customer care.</p>
            </div>
          </div>
        ),
      },
      {
        question: "I forgot my password. How can I reset it?",
        answer: (
          <div className="space-y-3 text-slate-600">
            <p>Password reset options:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Click 'Forgot Password' on the login page</li>
              <li>Enter your registered email or phone number</li>
              <li>Follow the OTP verification process</li>
              <li>Set a new strong password</li>
            </ul>
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-sm text-orange-800">
              <p>Security Tip: Use a combination of letters, numbers and special characters.</p>
            </div>
          </div>
        ),
      },
      {
        question: "How do I update my account information?",
        answer: (
          <div className="space-y-3 text-slate-600">
            <p>To update your account details:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Log in to your self-care account</li>
              <li>Go to 'Profile Settings'</li>
              <li>Edit the information you want to change</li>
              <li>Save your changes</li>
            </ol>
          </div>
        ),
      },
    ],
  },
  "Billing & Payments": {
    icon: <CreditCard className="w-5 h-5" />,
    items: [
      {
        question: "How can I view my current bill?",
        answer: (
          <div className="space-y-3 text-slate-600">
            <p>View your bill through:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Self-care portal dashboard</li>
              <li>Email notifications (if subscribed)</li>
              <li>Mobile app under 'Billing' section</li>
            </ul>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-sm text-purple-700">
              <p>Tip: Enable auto-notifications to receive bills directly to your email.</p>
            </div>
          </div>
        ),
      },
      {
        question: "What payment methods are available?",
        answer: (
          <div className="space-y-3 text-slate-600">
            <p>We accept multiple payment options:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm">
                <h4 className="font-bold text-slate-800 mb-2">Online Payments</h4>
                <ul className="space-y-1">
                  <li>• M-Pesa paybill: 4136553</li>
                  <li>• Credit/Debit Cards</li>
                  <li>• Bank Transfer</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm">
                <h4 className="font-bold text-slate-800 mb-2">Offline Payments</h4>
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
          <div className="space-y-3 text-slate-600">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Log in to your self-care account</li>
              <li>Navigate to 'Payment Methods'</li>
              <li>Select 'Set Up Auto-Pay'</li>
              <li>Choose your preferred payment method</li>
            </ol>
          </div>
        ),
      },
    ],
  },
  "Service Management": {
    icon: <Settings className="w-5 h-5" />,
    items: [
      {
        question: "How do I upgrade my internet package?",
        answer: (
          <div className="space-y-3 text-slate-600">
            <ul className="list-disc pl-5 space-y-2">
              <li>Through self-care portal under 'Packages'</li>
              <li>Via mobile app by selecting new package</li>
              <li>By contacting customer support</li>
            </ul>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-blue-700">
              <p>Changes take effect immediately or at next billing cycle based on selection.</p>
            </div>
          </div>
        ),
      },
      {
        question: "Can I temporarily suspend my service?",
        answer: (
          <div className="space-y-3 text-slate-600">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Minimum suspension period: 7 days</li>
              <li>Maximum suspension period: 90 days</li>
              <li>Reduced monthly charges during suspension</li>
            </ol>
          </div>
        ),
      },
      {
        question: "How do I report service issues?",
        answer: (
          <div className="space-y-3 text-slate-600">
             <p>Use our Live Chat (24/7) or submit a ticket via the portal.</p>
          </div>
        ),
      },
    ],
  },
  "Technical Support": {
    icon: <HelpCircle className="w-5 h-5" />,
    items: [
      {
        question: "What should I do if my internet is down?",
        answer: (
          <div className="space-y-3 text-slate-600">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check all cable connections</li>
              <li>Restart your router/modem</li>
              <li>Check for service alerts in your area</li>
            </ol>
            <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-sm text-red-700">
              <p>Emergency: Call 0726896562 for immediate assistance.</p>
            </div>
          </div>
        ),
      },
      {
        question: "How do I optimize my Wi-Fi connection?",
        answer: (
          <div className="space-y-3 text-slate-600">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm">
                <h4 className="font-bold mb-2">Placement</h4>
                <ul className="space-y-1">
                  <li>• Central location</li>
                  <li>• Elevated position</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm">
                <h4 className="font-bold mb-2">Settings</h4>
                <ul className="space-y-1">
                  <li>• 5GHz for speed</li>
                  <li>• 2.4GHz for range</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        question: "How do I connect multiple devices?",
        answer: (
           <p className="text-slate-600">Standard routers support 10-15 devices. For larger homes, we recommend upgrading to a mesh system.</p>
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
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: FONT_FAMILY }}>
      <Helmet>
        <title>FAQs & Support | Knoxville Internet</title>
      </Helmet>

      <Navbar />

      {/* ================= HERO SECTION (Vuma/Knoxville Hybrid) ================= */}
      <section className="relative w-full pt-32 pb-48 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <span className="text-[#FF2400] font-extrabold tracking-wider uppercase text-sm bg-white/5 px-4 py-1 rounded-full border border-white/10 backdrop-blur-md">
               Support Center
             </span>
             <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-white leading-tight">
               Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2400] to-orange-500">Questions</span>
             </h1>
             <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto font-light">
               Find quick answers to common questions about your Knoxville Internet service.
             </p>
           </motion.div>
        </div>

        {/* Wavy Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
           <svg className="relative block w-[calc(100%+1.3px)] h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50"></path>
           </svg>
        </div>
      </section>

      {/* ================= FEATURE CARDS (Overlapping Hero) ================= */}
      <section className="relative z-30 -mt-32 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100"
              >
                <div className="h-24 overflow-hidden relative">
                   <img src={feature.img} alt={feature.title} className="w-full h-full object-cover opacity-80" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4 text-center relative">
                  <div className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center mx-auto -mt-9 mb-3 relative z-10">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">{feature.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT (Sidebar + FAQs) ================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                  <div className="px-5 py-4 bg-slate-100 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800">Categories</h3>
                  </div>
                  <div className="p-2 space-y-1">
                    {Object.entries(faqsData).map(([key, { icon }]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setActiveCategory(key);
                          setOpenIndex(null);
                          setSearch("");
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-sm font-medium ${
                          activeCategory === key
                            ? "bg-[#FF2400] text-white shadow-md"
                            : "text-slate-600 hover:bg-slate-50 hover:text-[#FF2400]"
                        }`}
                      >
                        <span className={activeCategory === key ? "text-white" : "text-[#FF2400]"}>
                            {icon}
                        </span>
                        <span>{key}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 p-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={`Search in ${activeCategory}...`}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF2400]/20"
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
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 ${
                            openIndex === i 
                            ? 'border-[#FF2400] shadow-md ring-1 ring-[#FF2400]/10' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(openIndex === i ? null : i)}
                          className="w-full p-6 text-left flex justify-between items-center"
                        >
                          <h3 className={`text-base font-bold pr-4 transition-colors ${
                              openIndex === i ? 'text-[#FF2400]' : 'text-slate-800'
                          }`}>
                              {faq.question}
                          </h3>
                          <motion.span
                            animate={{ rotate: openIndex === i ? 180 : 0 }}
                            className={`flex-shrink-0 ${openIndex === i ? 'text-[#FF2400]' : 'text-slate-400'}`}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {openIndex === i && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-6 border-t border-slate-100 pt-4">
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
                      className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300"
                    >
                      <Search className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                      <p className="text-slate-600 font-medium">No results found for "{search}"</p>
                      <p className="text-sm text-slate-400">Try different keywords or browse other categories</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden relative"
          >
             {/* Background Glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2400] opacity-10 blur-[80px] rounded-full pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-10 blur-[80px] rounded-full pointer-events-none" />

            <div className="px-6 py-8 md:py-10 text-center relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                Still Need Help?
              </h3>
              <p className="text-slate-400 mb-8">
                Our dedicated support team is here to assist you 24/7
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-white/10 pb-8">
                {/* Phone */}
                <div className="text-center group">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#FF2400] transition-colors duration-300">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1 text-white">Call Us</h4>
                  <a href="tel:+254726818938" className="text-sm font-medium text-slate-300 hover:text-white transition-colors block">+254 726 818 938</a>
                </div>

                {/* Email */}
                <div className="text-center group">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#FF2400] transition-colors duration-300">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1 text-white">Email Us</h4>
                  <a href="mailto:support@knoxville.co.ke" className="text-sm font-medium text-slate-300 hover:text-white transition-colors block">support@knoxville.co.ke</a>
                </div>

                {/* WhatsApp */}
                <div className="text-center group">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300">
                    <FaWhatsapp className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1 text-white">WhatsApp</h4>
                  <a href="https://wa.me/254726818938" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-300 hover:text-white transition-colors block">Chat Now</a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Back to Homepage
                </button>
                
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-8 py-3 rounded-full font-bold text-sm border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  Back to Top
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}