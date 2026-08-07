import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getStoreUrl } from '../appLinks';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const storeUrl = getStoreUrl();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
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
            <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="btn">
              הורד עכשיו
            </a>
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
            <button onClick={() => handleNavClick('faq')} className="nav-link-btn">שאלות נפוצות</button>
            <button onClick={() => handleNavClick('features')} className="nav-link-btn">מה זה Reado?</button>
            <div className="header-auth-btns">
              <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="btn">
                הורד עכשיו
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
