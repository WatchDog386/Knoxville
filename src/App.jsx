import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Context
import { LanguageProvider } from "./contexts/LanguageContext";

// Layout
import MainLayout from "./layouts/MainLayout";

// Lazy load all routes except Home (landing page — keep eager for fast first paint)
const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));
const Services = lazy(() => import("./routes/Services"));
const Faqs = lazy(() => import("./routes/faqs"));
const Contact = lazy(() => import("./routes/Contact"));
const Technicians = lazy(() => import("./routes/Technicians"));
const Articles = lazy(() => import("./routes/Articles"));
const ArticleDetail = lazy(() => import("./routes/ArticleDetail"));
const CoverageMap = lazy(() => import("./routes/CoverageMap"));
const BlogList = lazy(() => import("./routes/BlogList"));

// Standalone Components (not inside MainLayout)
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const ReceiptManager = lazy(() => import("./components/ReceiptManager"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

/* -------------------------------
   AUTH PROTECTION COMPONENT
--------------------------------*/
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

/* -------------------------------
   PAGE VIEW TRACKING
--------------------------------*/
const TrackPageViews = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-6TTHG2D146", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};

/* -------------------------------
   ROUTING
--------------------------------*/
function AppRoutes() {
  return (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Main Website Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="faq" element={<Faqs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="technicians" element={<Technicians />} />
        <Route path="technicians/:issue" element={<Technicians />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<ArticleDetail />} />
        <Route path="coverage" element={<CoverageMap />} />
        <Route path="blogs" element={<BlogList />} />
      </Route>

      {/* Standalone Pages */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/receipts"
        element={
          <ProtectedRoute>
            <ReceiptManager />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
  );
}

/* -------------------------------
   APP WRAPPER
--------------------------------*/
export default function App() {
  return (
    <HelmetProvider>
      <ParallaxProvider>
        <LanguageProvider>
          {/* Google Analytics */}
          <Helmet>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-6TTHG2D146"
            ></script>
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-6TTHG2D146');
              `}
            </script>
          </Helmet>

          <TrackPageViews />
          <AppRoutes />
        </LanguageProvider>
      </ParallaxProvider>
    </HelmetProvider>
  );
}