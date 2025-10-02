import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Phone, Wifi, MapPin, HelpCircle, User, CreditCard, Settings, Mail, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 🔥 Knoxville Brand Colors
const BRAND_BLUE = "#015B97";
const BRAND_WHITE = "#ffffff";
const BRAND_LIGHT = "#f8f9fa";
const BRAND_TEXT = "#565A5C";

const CoverageMap = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Account & Billing");
  const [darkMode, setDarkMode] = useState(false);

  // Load user preference on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // ✅ All coverage areas from Optimas + your original list
  const coverageAreas = [
    ["Kasarani", "Githurai", "Ruiru", "Juja", "Thika Town"],
    ["Maragwa", "Embakasi West", "Kiambu", "Kiambaa"],
    ["Githunguri", "Kikuyu", "Dagoretti North", "Kabete", "Roysambu"],
    ["Baba Dogo", "Kasabun", "Riverside", "Seasons", "Hunters"],
    ["Gumba", "Laundry", "Lucky Summer", "Ngomongo"]
  ];

  const faqCategories = {
    "Account & Billing": {
      icon: <User className={`w-5 h-5 ${darkMode ? 'text-blue-300' : 'text-[#015B97]'}`} />,
      items: [
        {
          question: "PAYMENTS",
          answer: "Your billing cycle begins on the date you make your monthly subscription and lasts 30 days. Payments made to the wrong account should be forwarded to our customer support team for correction."
        },
        {
          question: "UPGRADES AND DOWNGRADES",
          answer: "In case of an upgrade or downgrade, kindly contact our customer care team for assistance."
        }
      ]
    },
    "Services": {
      icon: <Settings className={`w-5 h-5 ${darkMode ? 'text-blue-300' : 'text-[#015B97]'}`} />,
      items: [
        {
          question: "RELOCATION SERVICES",
          answer: "If you are moving houses or would like your router moved, contact customer support. Give 1 week notice for smooth transition. Relocation fee: Ksh 1,000."
        },
        {
          question: "ROUTER ISSUES",
          answer: "Blinking red light indicates signal loss. Contact support. If paid but no connection, reach out to our team."
        },
        {
          question: "SLOW SPEEDS",
          answer: "Multiple devices may max out bandwidth. Consider upgrading. For poor signal, contact care agents for a check."
        }
      ]
    },
    "Installation": {
      icon: <HelpCircle className={`w-5 h-5 ${darkMode ? 'text-blue-300' : 'text-[#015B97]'}`} />,
      items: [
        {
          question: "INSTALLATION CHARGES",
          answer: "FREE installation for 20Mbps+ packages. 10Mbps package requires a one-time fee of Ksh 2,000."
        }
      ]
    }
  };

  const colors = {
    primary: BRAND_BLUE,
    textPrimary: darkMode ? '#f9fafb' : BRAND_TEXT,
    bgPrimary: darkMode ? '#111827' : BRAND_WHITE,
    cardBg: darkMode ? '#1f2937' : BRAND_WHITE,
  };

  return (
    <div className={`font-sans min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 flex items-center">
                <span className={`text-2xl font-bold`} style={{ color: BRAND_BLUE }}>KNOXVILLE</span>
                <span className="text-2xl font-bold ml-1">TECHNOLOGIES</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => navigate('/')} className={`${darkMode ? 'text-gray-300 hover:text-blue-300' : 'text-gray-800 hover:text-[#015B97]'} font-medium transition-colors`}>Home</button>
              <button onClick={() => navigate('/about')} className={`${darkMode ? 'text-gray-300 hover:text-blue-300' : 'text-gray-800 hover:text-[#015B97]'} font-medium transition-colors`}>About</button>
              <button onClick={() => navigate('/coverage')} className={`${darkMode ? 'text-blue-300' : 'text-[#015B97]'} font-medium`}>Our Coverage</button>
              <button onClick={() => navigate('/contact')} className={`${darkMode ? 'text-gray-300 hover:text-blue-300' : 'text-gray-800 hover:text-[#015B97]'} font-medium transition-colors`}>Contact</button>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} transition-colors`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <a href="tel:+254726818938" className={`px-5 py-2.5 rounded-md font-medium transition-colors flex items-center ${darkMode ? 'bg-blue-500 hover:bg-blue-400 text-white' : 'bg-[#015B97] hover:bg-blue-800 text-white'}`}>
                <Phone className="w-4 h-4 mr-1" />
                0726 818 938
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://itel.com/wp-content/uploads/2015/09/iStock_000012499607_XXXLarge-1024x576.jpg)',
            height: '500px',
            filter: 'brightness(0.7)'
          }}
        ></div>

        <div className="relative z-10 flex items-center justify-center h-[500px]">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Areas We Get You Connected
            </h1>
            <div className="relative inline-block">
              <svg className="w-48 h-48 md:w-64 md:h-64 text-blue-500 absolute -top-16 left-1/2 transform -translate-x-1/2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 9.5 7 9.5s7-4.25 7-9.5c0-3.87-3.13-7-7-7zm0 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold">📶</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas Section */}
      <section className={`py-12 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-2xl font-bold text-center mb-8`} style={{ color: BRAND_BLUE }}>
            Knoxville Fibre Coverage Areas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coverageAreas.map((column, colIndex) => (
              <div key={colIndex} className="space-y-3">
                {column.map((area, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      darkMode 
                        ? 'text-gray-300 hover:text-blue-300 hover:bg-gray-800' 
                        : 'text-gray-700 hover:text-[#015B97] hover:bg-gray-50'
                    }`}
                  >
                    <Wifi className={`w-4 h-4 mr-2`} style={{ color: BRAND_BLUE }} />
                    <span className="text-sm font-medium">{area}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={`py-16 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className={`rounded-xl shadow-lg p-8 max-w-5xl mx-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className={`text-2xl font-bold mb-6 text-center`} style={{ color: BRAND_BLUE }}>
              Our Coverage Map
            </h3>
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden border-2" style={{ borderColor: BRAND_BLUE }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63821.14200482106!2d36.78668749999999!3d-1.2482205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f175b5a63350d%3A0x8175674316496788!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1715000000000"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Knoxville Fibre Coverage Map"
                className="absolute inset-0"
                loading="lazy"
              ></iframe>
            </div>
            <div className="mt-6 flex justify-center">
              <a
                href="https://www.google.com/maps/place/Nairobi,+Kenya"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-md font-medium flex items-center transition-colors ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-[#015B97] hover:bg-blue-800 text-white'
                }`}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Open Full Screen Map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-semibold uppercase tracking-wider" style={{ color: BRAND_BLUE }}>FAQ</p>
            <h2 className={`text-3xl font-bold mt-2`} style={{ color: BRAND_BLUE }}>Frequently Asked Questions</h2>
            <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: BRAND_BLUE }}></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(faqCategories).map(([key, { icon }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  activeCategory === key
                    ? `bg-blue-600 text-white shadow-lg`
                    : `bg-white text-gray-700 hover:bg-gray-100 border ${darkMode ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700' : 'border-gray-200'}`
                }`}
              >
                {icon}
                <span className="text-sm font-medium">{key}</span>
              </button>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {faqCategories[activeCategory].items.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}
                >
                  <button
                    className={`flex justify-between items-center w-full p-6 text-left font-medium text-lg hover:bg-opacity-90 transition-colors ${
                      darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-[#015B97] hover:bg-gray-50'
                    }`}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    {activeFaq === index ? (
                      <ChevronUp className={`w-5 h-5`} style={{ color: BRAND_BLUE }} />
                    ) : (
                      <ChevronDown className={`w-5 h-5`} style={{ color: BRAND_BLUE }} />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: 1, 
                          height: "auto"
                        }}
                        exit={{ 
                          opacity: 0, 
                          height: 0
                        }}
                        className={`px-6 pb-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      >
                        <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div 
            className={`mt-12 p-8 rounded-xl text-center transition-colors ${
              darkMode ? 'bg-blue-900 text-blue-100' : 'bg-[#015B97] text-white'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
            <p className="mb-6 opacity-90">Our support team is available 24/7 to assist you</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+254726818938" 
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  darkMode 
                    ? 'bg-blue-400 text-gray-900 hover:bg-blue-300' 
                    : 'bg-white hover:bg-blue-100 text-[#015B97]'
                }`}
              >
                <Phone className="w-4 h-4" />
                Call Support: 0726 818 938
              </a>
              <a 
                href="mailto:support@knoxvilletechnologies.com" 
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  darkMode 
                    ? 'border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900' 
                    : 'border border-white text-white hover:bg-white hover:text-[#015B97]'
                }`}
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 bg-gradient-to-br ${darkMode ? 'from-blue-900 to-blue-800' : 'from-[#015B97] to-[#014a7a]'}`} style={{ color: BRAND_WHITE }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Blazing-Fast Internet with Knoxville Fibre!</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Reliable, high-speed internet for your home or business. Connect with us today!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a 
              href="tel:+254726818938" 
              className={`px-8 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center ${
                darkMode ? 'bg-white text-[#015B97] hover:bg-gray-200' : 'bg-white text-[#015B97] hover:bg-gray-100'
              }`}
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Us Now
            </a>
            <a 
              href="#coverage-map" 
              className={`px-8 py-4 rounded-md font-bold text-lg border-2 border-white text-white hover:bg-white hover:text-[#015B97] transition-colors flex items-center justify-center`}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Check Coverage
            </a>
          </div>
          
          <p className="text-lg">
            📲 Call us: <a href="tel:+254726818938" className="underline font-semibold">0726 818 938</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default CoverageMap;