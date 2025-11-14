import React, { useState, useEffect } from 'react';

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookieConsent');
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <div className="cookie-text">
          <h3>🍪 שימוש בעוגיות (Cookies)</h3>
          <p>
            אנחנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלך, לנתח את השימוש באתר ולספק תכנים מותאמים אישית.
            על ידי לחיצה על "אני מסכים/ה", אתה מאשר את השימוש בעוגיות בהתאם ל
            <a href="/privacy" className="cookie-link">מדיניות הפרטיות</a> שלנו.
          </p>
        </div>
        <div className="cookie-buttons">
          <button onClick={handleAccept} className="btn-accept">
            אני מסכים/ה
          </button>
          <button onClick={handleDecline} className="btn-decline">
            לא, תודה
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
