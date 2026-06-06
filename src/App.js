import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import Topics from './components/Topics';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Accessibility from './components/Accessibility';
import CookieConsent from './components/CookieConsent';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import DeleteAccount from './components/DeleteAccount';
import AccessibilityStatement from './components/AccessibilityStatement';

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ProblemSolution />
      <Topics />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

function AppInner() {
  const location = useLocation();
  // Anchor for skip-to-content focus depends on which route is active —
  // the marketing page wraps Header + sections, legal/static pages render bare.
  const isHome = location.pathname === '/';

  return (
    <div className="App">
      <a href="#main-content" className="skip-to-content">דלג לתוכן ראשי</a>
      <div id="main-content" tabIndex={-1}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/accessibility" element={<AccessibilityStatement />} />
        </Routes>
        <Footer />
      </div>
      <Accessibility />
      <CookieConsent />
      {/* isHome is used by some downstream styles via body class if needed */}
      {!isHome && null}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
