// BlogList.jsx - REDESIGNED TO MATCH HERO.JSX STYLE
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  X,
  ChevronLeft,
  ChevronRight,
  Tag,
  Clock,
  TrendingUp,
  Share2,
  LayoutGrid,
  BookOpen,
  MessageCircle,
  Star
} from 'lucide-react';

// Recharts for Analytics Widget
import {
  BarChart, Bar, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

import Navbar from '../components/Navbar';

// --- CONSTANTS & UTILS (Matching Hero.jsx) ---

const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const calculateReadingTime = (text) => {
  if (!text) return '1 min read';
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return `${time} min read`;
};

const formatDate = (dateString) => {
  if (!dateString) return new Date().toLocaleDateString();
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// --- ANIMATION VARIANTS ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

// --- SUB-COMPONENTS ---

const SkeletonCard = () => (
  <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl h-[450px] overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
    <div className="h-48 bg-slate-200 w-full"></div>
    <div className="p-6 space-y-4">
      <div className="h-4 bg-slate-200 rounded-full w-1/3"></div>
      <div className="h-8 bg-slate-200 rounded-lg w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded-full w-full"></div>
        <div className="h-4 bg-slate-200 rounded-full w-5/6"></div>
      </div>
    </div>
  </div>
);

const ModalViewer = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
      onClick={onClose}
      style={{ fontFamily: FONT_FAMILY }}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl h-[85vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative"
      >
        {/* Sticky Header - Matches Form Header in Hero */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex justify-between items-center z-20">
             <div>
                <h3 className="text-lg font-bold text-slate-800">Article View</h3>
                <p className="text-xs text-slate-500">Reading: <span className="text-[#0061a8] font-bold">{post.title.substring(0, 30)}...</span></p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Content Scroll Area */}
        <div className="overflow-y-auto custom-scrollbar flex-grow">
          <div className="relative h-64 sm:h-80">
            <img 
              src={post.imageUrl || "https://images.unsplash.com/photo-1499750310159-5b9883e73975?auto=format&fit=crop&w=1920&q=80"} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8">
               <span className="inline-block px-3 py-1 mb-3 bg-[#fb8c00] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                  {post.category || 'Article'}
               </span>
               <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
                 {post.title}
               </h1>
            </div>
          </div>

          <div className="p-8 md:p-10">
             {/* Meta Data */}
             <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm font-bold mb-8 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0061a8]">
                      <User size={14} />
                   </div>
                   <span>{post.author?.email?.split('@')[0] || 'Knoxville Team'}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Calendar size={16} className="text-[#fb8c00]" />
                   <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Clock size={16} className="text-[#fb8c00]" />
                   <span>{calculateReadingTime(post.content)}</span>
                </div>
             </div>

            <div className="prose prose-lg prose-slate max-w-none 
              prose-headings:font-bold prose-headings:text-slate-900 
              prose-p:text-slate-600 prose-p:leading-loose 
              prose-a:text-[#0061a8] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-xl">
              {post.content.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PostCard = ({ post, onClick }) => (
  <motion.div 
    variants={cardVariants}
    whileHover={{ y: -10 }}
    onClick={() => onClick(post)}
    className="bg-white rounded-[2rem] overflow-hidden flex flex-col h-full group shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-white cursor-pointer relative"
  >
    {/* Image Section */}
    <div className="relative h-56 overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
       <img 
         src={post.imageUrl || "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80"} 
         alt={post.title} 
         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
       />
       <div className="absolute top-4 right-4 z-20">
          <span className="bg-gradient-to-r from-[#fb8c00] to-orange-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
             {post.category || 'Update'}
          </span>
       </div>
    </div>

    {/* Content Section */}
    <div className="p-6 pt-4 flex flex-col flex-grow bg-white relative">
        <div className="flex items-center gap-2 mb-3">
             <Calendar className="w-3 h-3 text-[#0061a8]" />
             <span className="text-slate-400 text-xs font-bold uppercase">{formatDate(post.publishedAt || post.createdAt)}</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-800 mb-3 leading-tight group-hover:text-[#0061a8] transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow font-medium">
          {post.content}
        </p>

        <div className="w-full h-px bg-slate-100 mb-4" />
        
        <button className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 text-slate-600 bg-slate-50 hover:bg-[#0061a8] hover:text-white group-hover:shadow-md">
           Read Article <ArrowRight className="w-4 h-4" />
        </button>
    </div>
  </motion.div>
);

const SidebarWidget = ({ title, icon: Icon, children }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100">
    {title && (
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
         <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0061a8]">
             {Icon && <Icon size={16} />}
         </div>
         <h4 className="font-bold text-slate-800">{title}</h4>
      </div>
    )}
    {children}
  </div>
);

// --- MAIN PAGE COMPONENT ---

const BlogList = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewingBlog, setViewingBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://optimasfibre.onrender.com').trim();
        const res = await fetch(`${API_BASE_URL}/api/blog`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setBlogPosts(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogPosts([]); 
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchBlogs();
  }, []);

  const categories = useMemo(() => 
    ['all', ...new Set(blogPosts.map(p => p.category || 'General').filter(Boolean))], 
  [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.content?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                              (post.category || 'General').toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE, 
    currentPage * POSTS_PER_PAGE
  );

  const chartData = [
    { name: 'M', posts: 2 }, { name: 'T', posts: 5 }, { name: 'W', posts: 3 },
    { name: 'T', posts: 7 }, { name: 'F', posts: 4 }, { name: 'S', posts: 6 },
    { name: 'S', posts: 3 }
  ];

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]" style={{ fontFamily: FONT_FAMILY }}>
      <Helmet>
        <title>Insights | Knoxville Internet</title>
      </Helmet>

      <Navbar />

      <AnimatePresence>
        {viewingBlog && <ModalViewer post={viewingBlog} onClose={() => setViewingBlog(null)} />}
      </AnimatePresence>

      <style>{`
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          background: linear-gradient(-45deg, #f8fafc, #f1f5f9, #e2e8f0);
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>

      {/* ================= HERO SECTION (Matching Hero.jsx) ================= */}
      <section className="relative w-full overflow-hidden bg-black h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
           <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }} />
           <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
           <motion.div 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.8 }}
           >
             <span className="inline-block mb-4 px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-gradient-to-r from-[#fb8c00] to-red-600 text-white shadow-lg animate-pulse">
                Latest Updates
             </span>
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                Knoxville <span style={{ color: '#fb8c00' }}>Insights</span> & News
             </h1>
             <p className="text-lg text-slate-200 font-medium">
                Stay connected with the latest trends in high-speed fibre technology.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-20">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: BLOG GRID */}
          <div className="w-full lg:w-2/3">
             {loading ? (
                <div className="grid md:grid-cols-2 gap-8">
                   {[1, 2, 3, 4].map(n => <SkeletonCard key={n} />)}
                </div>
             ) : (
               <>
                 <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-8"
                 >
                    {currentPosts.length > 0 ? (
                       currentPosts.map((post) => (
                          <PostCard key={post._id} post={post} onClick={setViewingBlog} />
                       ))
                    ) : (
                       <div className="col-span-2 bg-white rounded-[2rem] p-10 text-center shadow-xl">
                          <div className="inline-flex bg-slate-50 p-6 rounded-full mb-4">
                             <Search className="w-8 h-8 text-slate-300" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800">No Articles Found</h3>
                          <p className="text-slate-500 mt-2">Try adjusting your search filters.</p>
                          <button 
                             onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
                             className="mt-6 px-6 py-2.5 bg-[#0061a8] text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
                          >
                             Clear Filters
                          </button>
                       </div>
                    )}
                 </motion.div>

                 {/* Pagination - Matching Buttons Style */}
                 {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 gap-3">
                       <button 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="p-3 rounded-full bg-white shadow-md text-slate-600 hover:text-[#0061a8] disabled:opacity-50 transition-all"
                       >
                          <ChevronLeft className="w-5 h-5" />
                       </button>
                       <span className="text-sm font-bold text-slate-500">Page {currentPage} of {totalPages}</span>
                       <button 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="p-3 rounded-full bg-white shadow-md text-slate-600 hover:text-[#0061a8] disabled:opacity-50 transition-all"
                       >
                          <ChevronRight className="w-5 h-5" />
                       </button>
                    </div>
                 )}
               </>
             )}
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <aside className="w-full lg:w-1/3 space-y-8 h-fit lg:sticky lg:top-28">
             
             {/* Search Widget - Matches Form Input Style */}
             <SidebarWidget>
                <div className="relative group">
                   <input 
                      type="text" 
                      placeholder="Search articles..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0061a8] focus:bg-white transition-all placeholder:text-slate-400"
                   />
                   <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-[#0061a8] transition-colors" />
                </div>
             </SidebarWidget>

             {/* Categories - Matches Hotspot Buttons Style */}
             <SidebarWidget title="Filter Topics" icon={Tag}>
                <div className="flex flex-wrap gap-2">
                   {categories.map(cat => (
                      <button 
                         key={cat}
                         onClick={() => handleCategoryChange(cat)}
                         className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                            selectedCategory === cat 
                            ? 'bg-[#0061a8] text-white shadow-lg shadow-blue-500/30' 
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-[#0061a8]'
                         }`}
                      >
                         {cat}
                      </button>
                   ))}
                </div>
             </SidebarWidget>

             {/* Analytics Widget - Dark Theme like Hero Footer/Dark sections */}
             <div className="bg-[#0f172a] p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden group">
                <div className="relative z-10">
                   <div className="flex items-center justify-between mb-8">
                      <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider"><TrendingUp className="w-4 h-4 text-[#fb8c00]" /> Activity</h4>
                   </div>
                   
                   <div className="h-40 w-full -ml-2 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={chartData}>
                            <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ borderRadius: '12px', border: 'none', background: '#1e293b', color: '#fff' }} />
                            <Bar dataKey="posts" radius={[4, 4, 0, 0]} barSize={10}>
                               {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#fb8c00' : '#0061a8'} />
                               ))}
                            </Bar>
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                   
                   <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                      <div>
                         <p className="text-xs text-slate-400 font-bold uppercase">Published</p>
                         <p className="text-2xl font-bold">{blogPosts.length}</p>
                      </div>
                      <button 
                         onClick={() => navigate('/admin/login')}
                         className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-xs transition-all backdrop-blur-sm"
                      >
                         Login
                      </button>
                   </div>
                </div>
                {/* Abstract decorative blur */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0061a8] rounded-full blur-[60px] opacity-40"></div>
             </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogList;