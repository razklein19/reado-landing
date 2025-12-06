import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Pricing() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className={`pricing fade-in-up ${isVisible ? 'visible' : ''}`} id="pricing" ref={ref}>
      <div className="container">
        <h2>תוכניות מנוי</h2>
        <p className="pricing-subtitle">בחר את התוכנית המתאימה לך</p>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="popular-badge">
              <img src={`${process.env.PUBLIC_URL}/images/star.png`} alt="" className="badge-icon" />
              הכי פופולרי
            </div>
            <h3>חודשי</h3>
            <div className="price">
              <span className="amount">₪47</span>
              <span className="period">/חודש</span>
            </div>
            <ul className="pricing-features">
              <li>✓ 7 ימי ניסיון חינם</li>
              <li>✓ גישה מלאה לכל הספרים</li>
              <li>✓ קריאה והאזנה</li>
              <li>✓ תרגולים אינטראקטיביים</li>
              <li>✓ תוכנית פעולה אישית</li>
              <li>✓ ללא התחייבות</li>
            </ul>
            <a href="https://reado-il.com" className="btn">התחל ניסיון חינם</a>
          </div>

          <div className="pricing-card featured">
            <div className="popular-badge">
              <img src={`${process.env.PUBLIC_URL}/images/flame.png`} alt="" className="badge-icon" />
              הכי משתלם
            </div>
            <h3>שנתי</h3>
            <div className="price">
              <span className="amount">₪423</span>
              <span className="period">/שנה</span>
            </div>
            <p className="save-text">חסוך 25% - 3 חודשים מתנה</p>
            <ul className="pricing-features">
              <li>✓ 7 ימי ניסיון חינם</li>
              <li>✓ גישה מלאה לכל הספרים</li>
              <li>✓ קריאה והאזנה</li>
              <li>✓ תרגולים אינטראקטיביים</li>
              <li>✓ תוכנית פעולה אישית</li>
              <li>✓ ללא התחייבות</li>
            </ul>
            <a href="https://reado-il.com" className="btn">התחל ניסיון חינם</a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Pricing;
