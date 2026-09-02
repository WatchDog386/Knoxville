import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin 
} from "lucide-react";
import { articles } from "../data/articles";
import { useLanguage } from "../contexts/LanguageContext";
import ErrorFallback from "../components/ErrorFallback";

// --- Sub-Components ---

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-400 animate-pulse">Loading content...</p>
    </div>
  </div>
);

const ShareButton = ({ icon: Icon, url, color, label }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`p-3 rounded-full text-white ${color} shadow-lg hover:shadow-cyan-500/20 transition-all`}
    aria-label={label}
  >
    <Icon size={20} />
  </motion.a>
);

// --- Main Component ---

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingTime, setReadingTime] = useState(0);

  // 1. Fetch Article Logic
  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        // Simulate slight network delay for smoother transition if needed
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const foundArticle = articles.find((item) => item.slug === slug);
        if (!foundArticle) throw new Error("Article not found");
        
        setArticle(foundArticle);
        
        // Calculate Reading Time (approx 200 words per minute)
        const words = foundArticle.content?.split(/\s+/).length || 0;
        setReadingTime(Math.ceil(words / 200));
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0); // Reset scroll on new article
  }, [slug]);

  // 2. Get Related Articles (Memoized)
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter(a => a.slug !== article.slug) // Exclude current
      .slice(0, 3); // Take top 3
  }, [article]);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorFallback message={error} />;

  // Share URLs
  const currentUrl = window.location.href;
  const shareText = encodeURIComponent(`Check out this article: ${article.title}`);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-cyan-500/30">
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* SEO Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          image: article.image,
          datePublished: article.date,
          author: { "@type": "Person", name: article.author },
          articleBody: article.content
        })}
      </script>

      {/* --- Header / Hero Section --- */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${article.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/80 to-gray-950" />
        </div>

        {/* Navigation & Title Container */}
        <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-12 z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/articles")}
            className="absolute top-8 left-6 md:left-0 flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors group"
          >
            <div className="p-2 bg-black/30 backdrop-blur-sm rounded-full group-hover:bg-black/50">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium">{t("actions.back_to_articles") || "Back"}</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Meta Badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-cyan-400 mb-4 font-medium tracking-wide uppercase">
              {article.category && (
                <span className="bg-cyan-900/30 border border-cyan-500/30 px-3 py-1 rounded-full">
                  {article.category}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{readingTime} min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <div className="bg-gray-800 p-1.5 rounded-full">
                  <User size={16} className="text-gray-400" />
                </div>
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Sidebar (Socials) - Hidden on mobile, sticky on desktop */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-4 items-center">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2 writing-mode-vertical">Share</p>
            <ShareButton 
              icon={Twitter} 
              color="bg-sky-500" 
              label="Share on Twitter"
              url={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`} 
            />
            <ShareButton 
              icon={Facebook} 
              color="bg-blue-600" 
              label="Share on Facebook"
              url={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            />
            <ShareButton 
              icon={Linkedin} 
              color="bg-blue-700" 
              label="Share on LinkedIn"
              url={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
            />
          </div>
        </aside>

        {/* Article Body */}
        <main className="lg:col-span-8">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            {/* Using whitespace-pre-line to respect line breaks from data. 
               Ideally, this would be a Markdown renderer (like react-markdown) 
               but we stick to standard text for compatibility.
            */}
            <div className="text-gray-300 leading-loose whitespace-pre-line text-lg">
              {article.content}
            </div>
          </motion.article>

          {/* Mobile Share Section */}
          <div className="lg:hidden mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Share2 size={20} /> Share this article
            </h3>
            <div className="flex gap-4">
               <ShareButton icon={Twitter} color="bg-sky-500" url={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`} />
               <ShareButton icon={Facebook} color="bg-blue-600" url={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} />
               <ShareButton icon={Linkedin} color="bg-blue-700" url={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`} />
            </div>
          </div>
        </main>

        {/* Right Sidebar (TOC or Empty for balance) - optional, left empty for focus */}
        <div className="hidden lg:block lg:col-span-3"></div>

      </div>

      {/* --- Related Articles Section --- */}
      {relatedArticles.length > 0 && (
        <div className="bg-gray-900 border-t border-gray-800 py-16 mt-12">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-8 pl-4 border-l-4 border-cyan-500">
              Read Next
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((item) => (
                <motion.div
                  key={item.slug}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                  onClick={() => navigate(`/articles/${item.slug}`)}
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-cyan-400 font-bold mb-2 uppercase">{item.category || "Article"}</p>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                      {item.content.substring(0, 100)}...
                    </p>
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                      <User size={12} />
                      <span>{item.author}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default React.memo(ArticleDetail);