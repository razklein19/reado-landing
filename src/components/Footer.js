import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>מוצר</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>מה זה Reado?</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>מחירים</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>שאלות תשובות</a></li>
              <li><a href="https://reado-il.com">התחל עכשיו</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>משפטי</h4>
            <ul>
              <li><Link to="/privacy">מדיניות פרטיות</Link></li>
              <li><Link to="/terms">תקנון שירות</Link></li>
              <li><Link to="/accessibility">הצהרת נגישות</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>צור קשר</h4>
            <div className="contact-info">
              <p>אימייל: <a href="mailto:reado.il.service@gmail.com">reado.il.service@gmail.com</a></p>
              <p>וואטצאפ: <a href="https://wa.me/972535272518">053-5272518</a></p>
            </div>
          </div>
          <div className="footer-column">
            <h4>עקוב אחרינו</h4>
            <ul>
              <li><a href="#">פייסבוק</a></li>
              <li><a href="https://www.instagram.com/reado.il?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">אינסטגרם</a></li>
              <li><a href="#">טיקטוק</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Reado. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
