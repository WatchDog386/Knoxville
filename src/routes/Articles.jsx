import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { useLanguage } from "../contexts/LanguageContext";
import { articles } from "../data/articles";

// RISA Brand Colors
const RISA_BLUE = "#015B97";
const RISA_TEXT = "#565A5C";
const RISA_LIGHT_BG = "#f8f9fa";

// Font stack
const FONT_FAMILY = `'Proxima Nova', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const LoadingSkeleton = () => (
  <div className="text-center text-gray-500 py-10" style={{ color: RISA_TEXT }}>
    Loading articles...
  </div>
);

const ErrorFallback = ({ message }) => (
  <div className="text-center text-red-600 py-10">{message}</div>
);

const ArticleCard = React.memo(({ article }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="group overflow-hidden rounded-lg bg-white border border-gray-200 hover:shadow-md transition-shadow"
    style={{ fontFamily: FONT_FAMILY }}
  >
    <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3
          className="text-lg font-medium group-hover:text-[#015B97] transition-colors"
          style={{ color: RISA_TEXT }}
        >
          {article.title}
        </h3>
        <p className="text-sm mt-2" style={{ color: RISA_TEXT }}>
          {article.excerpt}
        </p>
      </div>
    </Link>
  </motion.article>
));

const FeaturedArticle = ({ article }) => {
  if (!article) return null;
  return (
    <motion.article
      className="overflow-hidden rounded-lg mb-12 bg-white border border-gray-200 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ fontFamily: FONT_FAMILY }}
    >
      <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: RISA_BLUE }}
          >
            {article.title}
          </h2>
          <p className="text-base" style={{ color: RISA_TEXT }}>
            {article.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
};

export default function Articles() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 300);

  const categories = useMemo(
    () => [
      { id: "all", label: t("categories.all") || "All" },
      { id: "technology", label: t("categories.technology") || "Technology" },
      { id: "community", label: t("categories.community") || "Community" },
      { id: "guides", label: t("categories.guides") || "Guides" },
    ],
    [t]
  );

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, debouncedSearch]);

  const featuredArticle = useMemo(
    () => articles.find((a) => a.isFeatured),
    []
  );

  return (
    <section
      className="relative min-h-screen py-16 px-4 md:px-6 lg:px-8 bg-white"
      style={{ fontFamily: FONT_FAMILY }}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          style={{ color: RISA_BLUE }}
        >
          {t("titles.knowledgeHub") || "Knowledge Hub"}
        </h1>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === cat.id
                  ? "bg-[#015B97] text-white"
                  : "bg-white text-[#565A5C] border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder={t("placeholders.searchArticles") || "Search articles..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-1"
            style={{
              fontFamily: FONT_FAMILY,
              color: RISA_TEXT,
              borderColor: RISA_BLUE,
              boxShadow: '0 0 0 3px rgba(1, 91, 151, 0.1)',
            }}
          />
        </div>

        {/* Featured */}
        <FeaturedArticle article={featuredArticle} />

        {/* Article Grid */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm" style={{ color: RISA_TEXT }}>
              {t("messages.noArticlesFound") || "No articles found."}
            </p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}