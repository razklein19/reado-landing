import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header({ onOpenQuestionnaire, onOpenLogin }) {
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
          <div className="header-auth-btns mobile-cta">
            <button className="btn" onClick={onOpenQuestionnaire}>הרשמה</button>
            <button className="btn-login" onClick={onOpenLogin}>התחברות</button>
          </div>
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
            <div className="header-auth-btns">
              <button className="btn-login" onClick={onOpenLogin}>התחברות</button>
              <button className="btn" onClick={onOpenQuestionnaire}>הרשמה</button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
