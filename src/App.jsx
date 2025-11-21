import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Context
import { LanguageProvider } from "./contexts/LanguageContext";

// Layout
import MainLayout from "./layouts/MainLayout";

// Site Pages
import Home from "./routes/Home";
import About from "./routes/About";
import Services from "./routes/Services";
import Faqs from "./routes/faqs";
import Contact from "./routes/Contact";
import Technicians from "./routes/Technicians";
import Articles from "./routes/Articles";
import ArticleDetail from "./routes/ArticleDetail";
import CoverageMap from "./routes/CoverageMap";
import BlogList from "./routes/BlogList";

// Standalone Components (not inside MainLayout)
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ReceiptManager from "./components/ReceiptManager";

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

        {/* New Route */}
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