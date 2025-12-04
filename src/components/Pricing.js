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
            <div className="popular-badge">עד סוף שנה</div>
            <h3>חודשי</h3>
            <div className="price">
              <span className="amount">₪27</span>
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
            <div className="popular-badge">עד סוף שנה</div>
            <h3>שנתי</h3>
            <div className="price">
              <span className="amount">₪243</span>
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

          <div className="pricing-card">
            <h3>מחיר החל מ-1.1.2026</h3>
            <div className="price">
              <span className="amount">₪47</span>
              <span className="period">/חודש</span>
            </div>
            <div className="price">
              <span className="amount">₪423</span>
              <span className="period">/שנה</span>
            </div>
            <p className="after-launch-text">התחל עכשיו במחיר מופחת, ושמור על המחיר גם אחרי עליית המחירים.</p>
            <a href="https://reado-il.com" className="btn">התחל 7 ימי ניסיון</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
