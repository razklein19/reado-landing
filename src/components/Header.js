import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);

    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="header">
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      <div className="container">
        <nav>
          <Link to="/" className="logo">
            <img src={`${process.env.PUBLIC_URL}/images/reado-logo.png`} alt="Reado" className="logo-img" />
          </Link>
          <a href="https://reado-il.com" className="btn mobile-cta">התחל ניסיון חינם</a>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="תפריט"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <button onClick={() => handleNavClick('pricing')} className="nav-link-btn">מחירים</button>
            <button onClick={() => handleNavClick('faq')} className="nav-link-btn">שאלות נפוצות</button>
            <button onClick={() => handleNavClick('features')} className="nav-link-btn">מה זה Reado?</button>
            <a href="https://reado-il.com" className="btn">התחל ניסיון חינם</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
