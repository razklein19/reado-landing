import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import AccessibilityStatement from './components/AccessibilityStatement';
import Questionnaire from './components/Questionnaire';
import LoginModal from './components/LoginModal';

function HomePage() {
  const navigate = useNavigate();
  const openQuestionnaire = () => navigate('/questionnaire');

  return (
    <>
      <Hero onOpenQuestionnaire={openQuestionnaire} />
      <Features onOpenQuestionnaire={openQuestionnaire} />
      <ProblemSolution />
      <Topics onOpenQuestionnaire={openQuestionnaire} />
      <Testimonials />
      <FAQ />
      <CTA onOpenQuestionnaire={openQuestionnaire} />
    </>
  );
}

function AppInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const isQuestionnaire = location.pathname === '/questionnaire';

  if (isQuestionnaire) {
    return (
      <>
        <div id="main-content">
          <Questionnaire />
        </div>
        <Accessibility />
      </>
    );
  }

  return (
    <div className="App">
      <a href="#main-content" className="skip-to-content">דלג לתוכן ראשי</a>
      <div id="main-content" tabIndex={-1}>
        <Header
          onOpenQuestionnaire={() => navigate('/questionnaire')}
          onOpenLogin={() => setShowLogin(true)}
        />
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
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
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
