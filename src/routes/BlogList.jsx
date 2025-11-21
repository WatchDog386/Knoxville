import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  ArrowRight, 
  ChevronLeft,
  PlusCircle,
  Tag,
  Clock,
  TrendingUp,
  Share2
} from 'lucide-react';

// Recharts (Kept for Analytics)
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import Navbar from '../components/Navbar';

// Font stack
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// --- SUB-COMPONENTS ---

const BlogDetailViewer = ({ blogPost, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-50"
      style={{ fontFamily: FONT_FAMILY }}
    >
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-4 flex justify-between items-center shadow-sm">
         <button 
           onClick={onClose}
           className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
         >
           <ChevronLeft className="w-5 h-5" /> Back
         </button>
         <span className="font-bold text-slate-800 hidden sm:block truncate max-w-xs">{blogPost.title}</span>
         <div className="w-20"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
         <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-10 h-[50vh] relative">
            <img 
              src={blogPost.imageUrl || "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80"} 
              alt={blogPost.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
               <span className="px-4 py-1.5 bg-[#fb8c00] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 inline-block">
                 {blogPost.category || 'Featured'}
               </span>
               <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-4">
                 {blogPost.title}
               </h1>
               <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
                  <span className="flex items-center gap-2"><User className="w-4 h-4" /> {blogPost.author?.email || 'Knoxville Team'}</span>
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(blogPost.publishedAt || post.createdAt).toLocaleDateString()}</span>
               </div>
            </div>
         </div>

         <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-lg border border-slate-100">
            <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
                {blogPost.content.split('\n').map((paragraph, i) => (
                   <p key={i} className="mb-6">{paragraph}</p>
                ))}
            </div>
         </div>
      </div>
    </motion.div>
  );
};

const FeaturedCard = ({ post, onClick }) => (
  <div 
    onClick={() => onClick(post)}
    className="relative w-full h-[450px] rounded-[2rem] overflow-hidden shadow-xl cursor-pointer group mb-12"
  >
    <div className="absolute inset-0">
      <img 
        src={post.imageUrl || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} 
        alt="Featured" 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#015B97]/90 via-slate-900/40 to-transparent"></div>
    </div>
    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-[#fb8c00] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Featured
        </span>
        <span className="text-slate-200 text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" /> 5 min read
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-[#fb8c00] transition-colors">
        {post.title}
      </h2>
      <p className="text-slate-200 text-sm md:text-base line-clamp-2 mb-6">
        {post.content}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold">
           K
        </div>
        <div className="text-white text-sm">
           <p className="font-bold">{post.author?.email || 'Knoxville Editor'}</p>
           <p className="text-white/60 text-xs">{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  </div>
);

const BlogList = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewingBlog, setViewingBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://optimasfibre.onrender.com').trim();
        const res = await fetch(`${API_BASE_URL}/api/blog`);
        const data = await res.json();
        setBlogPosts(data.data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || (post.category || 'General').toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0]; // Use first post as featured
  const remainingPosts = filteredPosts.filter(p => p._id !== featuredPost?._id);
  const categories = ['all', ...new Set(blogPosts.map(post => post.category || 'General').filter(Boolean))];

  // Pagination logic for remaining posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = remainingPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(remainingPosts.length / postsPerPage);

  // Analytics Data
  const analyticsData = useMemo(() => {
    const trendData = [
      { name: 'Jan', posts: 4 }, { name: 'Feb', posts: 3 }, { name: 'Mar', posts: 6 },
      { name: 'Apr', posts: 8 }, { name: 'May', posts: 5 }, { name: 'Jun', posts: blogPosts.length }
    ];
    return { trendData };
  }, [blogPosts]);

  if (viewingBlog) {
    return <BlogDetailViewer blogPost={viewingBlog} onClose={() => setViewingBlog(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]" style={{ fontFamily: FONT_FAMILY }}>
      <Helmet>
        <title>Insights | Knoxville Internet</title>
        <meta name="description" content="Latest news, technology updates, and insights from Knoxville." />
      </Helmet>

      <Navbar />

      {/* ================= HEADER SECTION ================= */}
      <div className="bg-white pt-28 pb-12 border-b border-slate-100">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#fb8c00] font-bold text-sm tracking-widest uppercase mb-2">Our Blog</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Knoxville Insights</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
               Explore the latest stories, expert tips, and company news.
            </p>
         </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {loading ? (
           <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-[#015B97] border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
           <>
             {/* FEATURED POST */}
             {featuredPost && <FeaturedCard post={featuredPost} onClick={setViewingBlog} />}

             <div className="flex flex-col lg:flex-row gap-12">
                
                {/* === MAIN GRID === */}
                <div className="w-full lg:w-2/3">
                   <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                         <span className="w-2 h-8 bg-[#015B97] rounded-full"></span>
                         Latest Articles
                      </h3>
                   </div>

                   <motion.div 
                     variants={containerVariants}
                     initial="hidden"
                     animate="visible"
                     className="grid md:grid-cols-2 gap-8"
                   >
                      {currentPosts.map((post) => (
                         <motion.article 
                           key={post._id}
                           variants={itemVariants}
                           whileHover={{ y: -8 }}
                           className="bg-white rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full group cursor-pointer"
                           onClick={() => setViewingBlog(post)}
                         >
                            {/* Image */}
                            <div className="h-48 overflow-hidden relative">
                               <img 
                                 src={post.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"} 
                                 alt={post.title} 
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                               />
                               <div className="absolute top-3 left-3">
                                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-[#015B97] text-[10px] font-bold uppercase rounded-full shadow-sm">
                                     {post.category || 'Tech'}
                                  </span>
                               </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                               <h2 className="text-lg font-bold text-slate-800 mb-3 leading-snug group-hover:text-[#015B97] transition-colors line-clamp-2">
                                  {post.title}
                               </h2>
                               <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow">
                                  {post.content}
                               </p>
                               
                               <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                  <div className="flex items-center gap-2">
                                     <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                                        {/* Placeholder Avatar */}
                                        <div className="w-full h-full bg-[#015B97] flex items-center justify-center text-white text-[10px] font-bold">
                                           {post.author?.email?.[0].toUpperCase() || 'K'}
                                        </div>
                                     </div>
                                     <span className="text-xs text-slate-500 font-medium">{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                                  </div>
                                  <span className="text-[#fb8c00] text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                     Read More <ArrowRight className="w-3 h-3" />
                                  </span>
                               </div>
                            </div>
                         </motion.article>
                      ))}
                   </motion.div>

                   {/* Pagination */}
                   {totalPages > 1 && (
                      <div className="flex justify-center mt-12 gap-2">
                         {Array.from({ length: totalPages }, (_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                                 currentPage === i + 1 
                                 ? 'bg-[#015B97] text-white shadow-lg' 
                                 : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                               {i + 1}
                            </button>
                         ))}
                      </div>
                   )}
                </div>

                {/* === SIDEBAR === */}
                <aside className="w-full lg:w-1/3 space-y-8">
                   
                   {/* Search Widget */}
                   <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-4">Search</h4>
                      <div className="relative">
                         <input 
                           type="text" 
                           placeholder="Type keyword..." 
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#015B97]"
                         />
                         <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      </div>
                   </div>

                   {/* Categories Widget */}
                   <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-4">Topics</h4>
                      <div className="flex flex-wrap gap-2">
                         {categories.map(cat => (
                            <button 
                              key={cat}
                              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                 selectedCategory === cat 
                                 ? 'bg-[#015B97] text-white' 
                                 : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                               {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                         ))}
                      </div>
                   </div>

                   {/* Admin / Analytics Widget */}
                   <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-[1.5rem] shadow-lg text-white relative overflow-hidden">
                      <div className="relative z-10">
                         <h4 className="font-bold mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#fb8c00]" /> Growth</h4>
                         <div className="h-32 w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                               <BarChart data={analyticsData.trendData}>
                                  <Bar dataKey="posts" fill="#fb8c00" radius={[2, 2, 0, 0]} />
                                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', background: '#1e293b', color: '#fff' }} />
                               </BarChart>
                            </ResponsiveContainer>
                         </div>
                         <button 
                           onClick={() => navigate('/admin/login')}
                           className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                         >
                            <PlusCircle className="w-4 h-4" /> Manage Posts
                         </button>
                      </div>
                      {/* Decor */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#015B97] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                   </div>

                   {/* Newsletter / CTA */}
                   <div className="bg-[#015B97] p-6 rounded-[1.5rem] shadow-lg text-center text-white relative overflow-hidden">
                      <div className="relative z-10">
                         <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <Share2 className="w-6 h-6 text-white" />
                         </div>
                         <h4 className="font-bold text-lg mb-2">Stay Updated</h4>
                         <p className="text-blue-100 text-sm mb-4">Join our community and get the latest internet tips.</p>
                         <button className="w-full py-3 bg-white text-[#015B97] rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                            Subscribe Now
                         </button>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                   </div>

                </aside>
             </div>
           </>
        )}
      </div>
    </div>
  );
};

export default BlogList;