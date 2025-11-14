import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import Topics from './components/Topics';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Accessibility from './components/Accessibility';
import CookieConsent from './components/CookieConsent';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import AccessibilityStatement from './components/AccessibilityStatement';

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ProblemSolution />
      <Topics />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}

function App() {
  return (
    <Router basename="/reado-landing">
      <div className="App">
        <div id="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/accessibility" element={<AccessibilityStatement />} />
          </Routes>
          <Footer />
        </div>
        <Accessibility />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
