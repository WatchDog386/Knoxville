import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Server,
  Users,
  Wifi,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- STYLES & ASSETS ---
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const Login = () => {
  // --- STATE MANAGEMENT ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  
  const navigate = useNavigate();

  // --- API CONFIGURATION ---
  const getApiConfig = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';
    
    return {
      API_BASE_URL,
      // Remove CORS headers from frontend - they should be set by backend
      headers: {
        'Content-Type': 'application/json',
      }
    };
  };

  // --- LOGIC: AUTHENTICATION ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) verifyToken(token);
  }, []);

  const verifyToken = async (token) => {
    try {
      const { API_BASE_URL, headers } = getApiConfig();
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          ...headers
        },
      });
      
      if (response.ok) {
        navigate('/dashboard');
      } else {
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Token verification error:', err);
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
      const { API_BASE_URL, headers } = getApiConfig();
      
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password }),
        // Remove credentials: 'include' unless you need cookies
        // mode: 'cors' is default, no need to specify
      });

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response format: ${text}`);
      }

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message || `Login failed with status: ${response.status}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Unable to connect to server. Please check your connection and try again.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Remove the health check since endpoint doesn't exist
  // Or create a simple connectivity test
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { API_BASE_URL } = getApiConfig();
        // Just test if the domain is reachable, don't check specific endpoint
        const response = await fetch(`${API_BASE_URL}`, {
          method: 'GET',
        });
        
        if (!response.ok) {
          console.warn('Backend connection test failed:', response.status);
        }
      } catch (error) {
        console.warn('Backend may be offline:', error.message);
      }
    };

    // Only test in development
    if (import.meta.env.DEV) {
      testConnection();
    }
  }, []);

  // --- RENDER ---
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-[#F0F4F8] p-4 relative overflow-hidden"
      style={{ fontFamily: FONT_FAMILY }}
    >
      {/* Background Subtle Pattern (Desktop Only) */}
      <div className="hidden md:block absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* MAIN CARD CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[1050px] min-h-[600px] bg-white rounded-2xl md:rounded-[32px] shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row overflow-hidden relative z-10 border border-white/50"
      >
        
        {/* LEFT PANEL: FORM ONLY */}
        <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center relative bg-white z-20">
          
          <div className="max-w-sm mx-auto w-full">
            {/* Logo Area */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#015B97] to-[#003d66] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/10">
                K
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">Knoxville</span>
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 mb-8">Enter your credentials to access the admin portal.</p>

            {/* Environment Indicator */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                <div className={`w-2 h-2 rounded-full ${
                  import.meta.env.VITE_API_BASE_URL?.includes('localhost') 
                    ? 'bg-orange-500' 
                    : 'bg-green-500'
                }`} />
                <span className="text-xs font-medium text-slate-600">
                  {import.meta.env.VITE_API_BASE_URL?.includes('localhost') 
                    ? 'Development Mode' 
                    : 'Production Mode'}
                </span>
              </div>
            </div>

            {/* Error State */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <div className={`relative group transition-all duration-200 ${focusedInput === 'email' ? 'text-[#015B97]' : 'text-slate-400'}`}>
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 pointer-events-none transition-colors" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-slate-800 placeholder-slate-400 font-medium
                      ${focusedInput === 'email' ? 'border-[#015B97] bg-white ring-4 ring-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  <button type="button" className="text-xs font-bold text-[#015B97] hover:underline" tabIndex="-1">
                    Forgot?
                  </button>
                </div>
                <div className={`relative group transition-all duration-200 ${focusedInput === 'password' ? 'text-[#015B97]' : 'text-slate-400'}`}>
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 pointer-events-none transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    className={`w-full pl-12 pr-12 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-slate-800 placeholder-slate-400 font-medium
                      ${focusedInput === 'password' ? 'border-[#015B97] bg-white ring-4 ring-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                    placeholder="Enter password"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-[#015B97] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 mt-2 bg-[#015B97] hover:bg-[#004a7c] text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-900/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs text-slate-400 font-medium">
                Protected by reCAPTCHA and subject to the Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: VISUALS */}
        <div className="hidden md:flex w-[55%] relative overflow-hidden bg-slate-900 flex-col items-center justify-center p-12 text-white">
            
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#013a63] to-[#0f172a] z-0" />
            
            {/* Abstract Mesh Grid */}
            <div className="absolute inset-0 z-0 opacity-20" 
                 style={{ 
                   backgroundImage: `linear-gradient(#4f85e6 1px, transparent 1px), linear-gradient(90deg, #4f85e6 1px, transparent 1px)`, 
                   backgroundSize: '40px 40px',
                   transform: 'perspective(500px) rotateX(20deg) scale(1.5) translateY(-50px)'
                 }}>
            </div>

            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />

            {/* CONTENT: High-End Dashboard Graphic */}
            <div className="relative z-10 w-full max-w-md">
              
              {/* Floating Cards Container */}
              <div className="relative">
                
                {/* Main Glass Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl relative z-20"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Activity className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">System Status</h3>
                        <p className="text-xs text-blue-200/70">Real-time monitoring</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wide">Stable</span>
                    </div>
                  </div>

                  {/* Mock Charts/Data */}
                  <div className="space-y-4">
                    {/* Bandwidth Usage */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 text-blue-100/80">
                        <span>Bandwidth Usage</span>
                        <span>78%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '78%' }}
                          transition={{ delay: 0.8, duration: 1 }}
                          className="h-full bg-gradient-to-r from-blue-400 to-cyan-300" 
                        />
                      </div>
                    </div>
                    {/* Server Load */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 text-blue-100/80">
                        <span>Server Load</span>
                        <span>42%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '42%' }}
                          transition={{ delay: 1, duration: 1 }}
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-300" 
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Widget 1: Security */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -right-12 -top-8 bg-[#0f172a]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl z-30 w-40 hidden lg:block"
                >
                  <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
                  <div className="text-xs font-semibold text-white">Firewall Active</div>
                  <div className="text-[10px] text-slate-400">0 Threats detected</div>
                </motion.div>

                 {/* Floating Widget 2: Active Users */}
                 <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute -left-8 -bottom-6 bg-[#0f172a]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl z-30 w-48 hidden lg:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">1,240</div>
                      <div className="text-[10px] text-slate-400">Active Connections</div>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Text Content */}
              <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold mb-3">Control Center</h2>
                <p className="text-blue-200/70 text-sm leading-relaxed max-w-xs mx-auto">
                  Manage your entire infrastructure from a single, secure point of entry.
                </p>
              </div>

            </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;