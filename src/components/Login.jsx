import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Home, 
  ArrowRight,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

// Font stack
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check existing session
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) verifyToken(token);
  }, []);

  const verifyToken = async (token) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) navigate('/dashboard');
      else localStorage.removeItem('token');
    } catch (err) {
      localStorage.removeItem('token');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 p-4" style={{ fontFamily: FONT_FAMILY }}>
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Server Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-[#015B97]/40"></div>
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group"
      >
        <Home size={16} className="group-hover:-translate-x-1 transition-transform" /> Back Home
      </button>

      {/* FORM CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="relative z-20 w-full max-w-5xl h-auto md:h-[600px] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        
        {/* LEFT SIDE: FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-white order-2 md:order-1">
            <div className="text-center md:text-left mb-8">
                <img src="/logo4.webp" alt="Knoxville Logo" className="w-16 h-auto mb-4 mx-auto md:mx-0" />
                <h1 className="text-3xl font-extrabold text-slate-800">Hello!</h1>
                <p className="text-slate-500 mt-2">Sign in to your admin account</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-600 text-xs font-medium"
              >
                 <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                 <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Email */}
               <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <div className="bg-blue-50 p-1.5 rounded-full text-[#015B97]">
                       <Mail className="w-4 h-4" />
                     </div>
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#015B97]/20 focus:border-[#015B97] transition-all text-sm font-medium text-slate-700 placeholder-slate-400 shadow-inner"
                    placeholder="Email Address"
                    required
                  />
               </div>

               {/* Password */}
               <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <div className="bg-blue-50 p-1.5 rounded-full text-[#015B97]">
                        <Lock className="w-4 h-4" />
                     </div>
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#015B97]/20 focus:border-[#015B97] transition-all text-sm font-medium text-slate-700 placeholder-slate-400 shadow-inner"
                    placeholder="Password"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-slate-400 hover:text-[#015B97] transition-colors"
                  >
                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
               </div>

               {/* Options */}
               <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <label className="flex items-center cursor-pointer hover:text-[#015B97] transition-colors">
                     <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#015B97] focus:ring-[#015B97] mr-2" />
                     Remember me
                  </label>
                  <a href="#" className="text-[#015B97] hover:text-orange-600 transition-colors">Forgot password?</a>
               </div>

               {/* Button */}
               <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 type="submit" 
                 disabled={loading}
                 className="w-full py-4 bg-gradient-to-r from-[#015B97] to-[#004a7c] text-white rounded-full font-bold text-sm shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:shadow-none transition-all"
               >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      SIGN IN <ArrowRight className="w-4 h-4" />
                    </>
                  )}
               </motion.button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-xs text-slate-400">Don't have an account? <a href="#" className="text-[#015B97] font-bold hover:underline">Contact Admin</a></p>
            </div>
        </div>

        {/* RIGHT SIDE: WAVE + CONTENT */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-[#015B97] via-[#004a7c] to-[#003d66] flex flex-col items-center justify-center p-12 text-white overflow-hidden order-1 md:order-2">
            
            {/* Decorative Blobs */}
            <div className="absolute top-[-20%] right-[-20%] w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-orange-500/30 rounded-full blur-3xl animate-pulse"></div>

            {/* THE LIQUID WAVE SVG */}
            <div className="absolute top-0 -left-[1px] bottom-0 w-16 md:w-24 h-full z-20 hidden md:block text-white pointer-events-none">
                <svg 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none" 
                    className="h-full w-full fill-current" 
                    style={{ transform: 'scaleX(-1)' }}
                >
                    <path d="M0 0 C 50 0 50 20 30 30 C 10 40 10 60 30 70 C 50 80 50 100 0 100 Z" fill="#ffffff"/> 
                    <path d="M100,0 H0 V100 H100 V0 Z" fill="transparent" /> 
                    <path d="M0,0 C 40,20 60,40 40,60 C 20,80 40,100 0,100 Z" fill="#ffffff" transform="translate(-2,0) scale(1.5, 1)"/>
                </svg>
            </div>
            
            {/* Mobile Wave */}
            <div className="absolute -bottom-1 left-0 right-0 h-16 md:hidden z-20 text-white pointer-events-none">
               <svg viewBox="0 0 1440 320" className="w-full h-full fill-current" preserveAspectRatio="none">
                  <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
               </svg>
            </div>

            {/* Content */}
            <div className="relative z-30 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-blue-100 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-8">
                    Knoxville Technologies Admin Portal. Manage your network, users, and billing efficiently from one secure location.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-xs font-bold tracking-wider uppercase">System Operational</span>
                </div>
            </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;