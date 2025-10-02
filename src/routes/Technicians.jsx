import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, Mail, MapPin, Star, CheckCircle, Zap, 
  Shield, Cpu, Wifi, Calendar, ChevronDown, ChevronUp, X
} from "lucide-react";
import { useInView } from "react-intersection-observer";

// RISA Brand Colors
const RISA_BLUE = "#015B97";
const RISA_TEXT = "#565A5C";
const RISA_LIGHT_BG = "#f8f9fa";

// Font stack (Proxima Nova via Adobe Fonts)
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

// Technician Data (unchanged)
const technicians = [
  {
    id: "tech-1",
    name: "Abraham",
    role: "Chief Hardware Engineer",
    phone: "+254726818938",
    email: "ooroabraham@gmail.com",
    location: "Nairobi, Kenya",
    specialty: "hardware",
    bookUrl: "#",
    rating: 4.8,
    reviews: 42,
    skills: ["Circuit Repair", "Data Recovery", "Component Replacement", "Diagnostics"],
    bio: "Certified hardware specialist with extensive experience in component-level repairs. Passionate about restoring devices to their optimal performance.",
    stats: [
      { value: "98%", label: "Success Rate" },
      { value: "24h", label: "Avg. Response" },
      { value: "500+", label: "Devices Fixed" }
    ]
  },
  {
    id: "tech-2",
    name: "Colins",
    role: "Network Architect",
    phone: "+254768085708",
    email: "collinsominde98@gmail.com",
    location: "Nairobi, Kenya",
    specialty: "networking",
    bookUrl: "#",
    rating: 4.6,
    reviews: 36,
    skills: ["Network Setup", "Router Configuration", "Security", "Wireless Optimization"],
    bio: "Network infrastructure expert focused on creating secure, high-performance solutions for businesses of all sizes.",
    stats: [
      { value: "95%", label: "Success Rate" },
      { value: "2h", label: "Avg. Response" },
      { value: "300+", label: "Networks Built" }
    ]
  },
  {
    id: "tech-3",
    name: "Bret Gift",
    role: "Software Solutions Expert",
    phone: "+254713116766",
    email: "ggiftotieno@gmail.com",
    location: "Nairobi, Kenya",
    specialty: "software",
    bookUrl: "#",
    rating: 4.9,
    reviews: 51,
    skills: ["Software Installation", "Virus Removal", "System Optimization", "Data Migration"],
    bio: "Software troubleshooter dedicated to solving complex system issues and optimizing performance.",
    stats: [
      { value: "99%", label: "Success Rate" },
      { value: "1h", label: "Avg. Response" },
      { value: "700+", label: "Systems Optimized" }
    ]
  },
  {
    id: "tech-4",
    name: "Lameck",
    role: "Security Specialist",
    phone: "+254758018533",
    email: "lameckooro@gmail.com",
    location: "Nairobi, Kenya",
    specialty: "security",
    bookUrl: "#",
    rating: 4.7,
    reviews: 39,
    skills: ["Security Audits", "Firewall Setup", "Encryption", "Threat Analysis"],
    bio: "Cybersecurity professional committed to protecting your digital assets with cutting-edge solutions.",
    stats: [
      { value: "97%", label: "Success Rate" },
      { value: "4h", label: "Avg. Response" },
      { value: "200+", label: "Systems Secured" }
    ]
  }
];

const specialties = [
  { icon: <Cpu className="w-6 h-6" />, name: "Hardware", color: RISA_BLUE },
  { icon: <Wifi className="w-6 h-6" />, name: "Networking", color: "#6B46C1" },
  { icon: <Zap className="w-6 h-6" />, name: "Software", color: "#047857" },
  { icon: <Shield className="w-6 h-6" />, name: "Security", color: "#B45309" }
];

const stats = [
  { value: "1000+", label: "Devices Repaired" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
  { value: "15min", label: "Average Response" }
];

const testimonials = [
  {
    id: 1,
    name: "John D.",
    company: "Tech Solutions Ltd",
    content: "The team at Knoxville completely transformed our network infrastructure. Their expertise and professionalism were beyond our expectations.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah M.",
    company: "Innovate Africa",
    content: "Prompt response and efficient service. Our security systems are now more robust thanks to Knoxville's comprehensive solutions.",
    rating: 5
  },
  {
    id: 3,
    name: "Thomas K.",
    company: "DataSecure Inc",
    content: "Their hardware specialists recovered critical data we thought was lost forever. Truly exceptional technical skills and customer service.",
    rating: 4
  }
];

const faqs = [
  {
    question: "How quickly can you respond to service requests?",
    answer: "We guarantee a response within 15 minutes during business hours, and our average onsite arrival time is under 2 hours in major urban areas."
  },
  {
    question: "Do you offer ongoing maintenance contracts?",
    answer: "Yes, we provide flexible maintenance packages tailored to your business needs, including 24/7 monitoring and priority response."
  },
  {
    question: "What areas do you serve?",
    answer: "We provide services throughout Kenya with a focus on Nairobi, Mombasa, and Kisumu. Enterprise solutions are available across East Africa."
  },
  {
    question: "How do you ensure data security during repairs?",
    answer: "All our technicians follow strict security protocols, and we offer signed NDAs for sensitive operations. Client data remains confidential at all times."
  }
];

const TechnicianCard = ({ tech, onClick }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold" style={{ color: RISA_BLUE }}>{tech.name}</h3>
          <p className="text-sm" style={{ color: RISA_TEXT }}>{tech.role}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tech.skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: `${RISA_BLUE}10`, color: RISA_BLUE }}
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-1 text-sm" style={{ color: RISA_TEXT }}>
            <MapPin className="w-3.5 h-3.5" />
            <span>{tech.location}</span>
          </div>
          
          <a
            href={`https://wa.me/${tech.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-green-600 rounded-full"
            style={{ backgroundColor: '#22c55e' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.515 5.392 1.521 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const TechnicianModal = ({ tech, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative border"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" style={{ color: RISA_TEXT }} />
          </button>
          
          <div className="grid lg:grid-cols-3 h-full">
            <div className="lg:col-span-1 bg-gray-50 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4" style={{ backgroundColor: RISA_BLUE }}>
                  {tech.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h2 className="text-xl font-bold" style={{ color: RISA_BLUE }}>{tech.name}</h2>
                <p className="text-sm" style={{ color: RISA_TEXT }}>{tech.role}</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(tech.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-sm mt-1" style={{ color: RISA_TEXT }}>{tech.rating} ({tech.reviews} reviews)</p>
              </div>
            </div>
            
            <div className="lg:col-span-2 p-6 overflow-y-auto">
              <div className="flex border-b border-gray-200 mb-6">
                {['overview', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-medium text-sm capitalize ${
                      activeTab === tab 
                        ? `text-[${RISA_BLUE}] border-b-2 border-[${RISA_BLUE}]` 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: RISA_BLUE }}>About {tech.name.split(' ')[0]}</h3>
                    <p className="text-sm mt-2" style={{ color: RISA_TEXT }}>{tech.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: RISA_BLUE }}>Expertise</h3>
                    <div className="mt-2 space-y-2">
                      {tech.skills.map((skill, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm" style={{ color: RISA_TEXT }}>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: RISA_BLUE }}>Performance</h3>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {tech.stats.map((stat, index) => (
                        <div key={index} className="bg-gray-50 rounded p-3 text-center">
                          <p className="font-bold" style={{ color: RISA_BLUE }}>{stat.value}</p>
                          <p className="text-xs" style={{ color: RISA_TEXT }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: RISA_BLUE }}>Contact</h3>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Phone className="w-4 h-4" style={{ color: RISA_BLUE }} />
                        <span className="text-sm" style={{ color: RISA_TEXT }}>{tech.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Mail className="w-4 h-4" style={{ color: RISA_BLUE }} />
                        <span className="text-sm" style={{ color: RISA_TEXT }}>{tech.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded p-4">
                    <div className="flex items-center gap-4">
                      <p className="text-3xl font-bold" style={{ color: RISA_BLUE }}>{tech.rating}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(tech.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mt-2" style={{ color: RISA_TEXT }}>{tech.reviews} reviews</p>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="bg-gray-50 rounded p-4">
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="font-medium" style={{ color: RISA_TEXT }}>
                              {review === 1 ? 'John D.' : review === 2 ? 'Sarah M.' : 'Thomas K.'}
                            </p>
                            <div className="flex mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < (review === 1 ? 5 : review === 2 ? 4 : 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm" style={{ color: RISA_TEXT }}>
                          {review === 1 
                            ? `${tech.name} provided exceptional service. My device was repaired faster than expected and works perfectly now. Highly recommend!`
                            : review === 2
                            ? `Good service overall. There was a slight delay in parts delivery but the technician kept me informed throughout the process.`
                            : `Absolutely brilliant work! Fixed an issue that two other technicians couldn't figure out. Will definitely use again.`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const StatCard = ({ value, label, index }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg p-5 border border-gray-200"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <p className="text-2xl font-bold" style={{ color: RISA_BLUE }}>{value}</p>
      <p className="text-sm" style={{ color: RISA_TEXT }}>{label}</p>
    </motion.div>
  );
};

const SpecialtyCard = ({ icon, name, color, index }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg p-5 border border-gray-200"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${color}20` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <h3 className="font-bold" style={{ color: RISA_BLUE }}>{name}</h3>
      <p className="text-sm mt-1" style={{ color: RISA_TEXT }}>
        {name === "Hardware" 
          ? "Component-level repairs"
          : name === "Networking"
          ? "Infrastructure setup"
          : name === "Software"
          ? "System troubleshooting"
          : "Digital threat protection"}
      </p>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg p-5 border border-gray-200"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
    >
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-sm italic mb-3" style={{ color: RISA_TEXT }}>"{testimonial.content}"</p>
      <div>
        <p className="font-bold" style={{ color: RISA_BLUE }}>{testimonial.name}</p>
        <p className="text-sm" style={{ color: RISA_TEXT }}>{testimonial.company}</p>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ faq, index, isOpen, toggle }) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      className="border-b border-gray-200 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={toggle}
        style={{ color: RISA_TEXT, fontFamily: FONT_FAMILY }}
      >
        <h3 className="font-medium">{faq.question}</h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" style={{ color: RISA_BLUE }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color: RISA_TEXT }} />
        )}
      </button>
      {isOpen && (
        <motion.div
          className="mt-3 text-sm"
          style={{ color: RISA_TEXT }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {faq.answer}
        </motion.div>
      )}
    </motion.div>
  );
};

const Technicians = () => {
  const { issue } = useParams();
  const techSectionRef = useRef(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  
  useEffect(() => {
    if (techSectionRef.current) {
      techSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [issue]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      ref={techSectionRef}
      className="min-h-screen bg-white"
      style={{ fontFamily: FONT_FAMILY }}
    >
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: RISA_BLUE }}>
            Elite Technical Experts
          </h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: RISA_TEXT }}>
            Meet our certified professionals ready to solve your most complex technical challenges with precision and expertise.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <StatCard key={index} value={stat.value} label={stat.label} index={index} />
          ))}
        </div>

        {/* Specialties */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: RISA_BLUE }}>
            Our Specialties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => (
              <SpecialtyCard 
                key={index} 
                icon={specialty.icon} 
                name={specialty.name} 
                color={specialty.color} 
                index={index} 
              />
            ))}
          </div>
        </div>

        {/* Technicians */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: RISA_BLUE }}>
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicians.map((tech) => (
              <TechnicianCard 
                key={tech.id} 
                tech={tech} 
                onClick={() => setSelectedTech(tech)}
              />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: RISA_BLUE }}>
            Client Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: RISA_BLUE }}>
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                index={index}
                isOpen={openIndex === index}
                toggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTech && (
          <TechnicianModal 
            tech={selectedTech} 
            onClose={() => setSelectedTech(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Technicians;