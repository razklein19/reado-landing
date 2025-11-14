import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Accessibility() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [linkHighlight, setLinkHighlight] = useState(false);
  const [pauseAnimations, setPauseAnimations] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [blackWhite, setBlackWhite] = useState(false);
  const [largeCursorLight, setLargeCursorLight] = useState(false);
  const [largeCursorDark, setLargeCursorDark] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);

  const increaseFontSize = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) {
      const newSize = fontSize - 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  };

  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.toggle('high-contrast');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.toggle('dark-mode');
  };

  const toggleLinkHighlight = () => {
    setLinkHighlight(!linkHighlight);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.toggle('highlight-links');
  };

  const togglePauseAnimations = () => {
    setPauseAnimations(!pauseAnimations);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.toggle('pause-animations');
  };

  const toggleDyslexiaFont = () => {
    setDyslexiaFont(!dyslexiaFont);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.toggle('dyslexia-font');
  };

  const toggleKeyboardFocus = () => {
    setKeyboardFocus(!keyboardFocus);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.toggle('keyboard-focus');
  };

  const toggleGrayscale = () => {
    setGrayscale(!grayscale);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.toggle('grayscale');
  };

  const toggleBlackWhite = () => {
    setBlackWhite(!blackWhite);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.toggle('black-white');
  };

  const toggleLargeCursorLight = () => {
    setLargeCursorLight(!largeCursorLight);
    if (largeCursorDark) {
      setLargeCursorDark(false);
      document.body.classList.remove('large-cursor-dark');
    }
    document.body.classList.toggle('large-cursor-light');
  };

  const toggleLargeCursorDark = () => {
    setLargeCursorDark(!largeCursorDark);
    if (largeCursorLight) {
      setLargeCursorLight(false);
      document.body.classList.remove('large-cursor-light');
    }
    document.body.classList.toggle('large-cursor-dark');
  };

  const toggleStopAnimations = () => {
    setStopAnimations(!stopAnimations);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.toggle('stop-animations');
  };

  const resetAllSettings = () => {
    // Reset font size
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';

    // Reset all states
    setHighContrast(false);
    setDarkMode(false);
    setLinkHighlight(false);
    setPauseAnimations(false);
    setDyslexiaFont(false);
    setKeyboardFocus(false);
    setGrayscale(false);
    setBlackWhite(false);
    setLargeCursorLight(false);
    setLargeCursorDark(false);
    setStopAnimations(false);

    // Remove all classes
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.remove('high-contrast', 'dark-mode', 'highlight-links',
        'pause-animations', 'dyslexia-font', 'keyboard-focus', 'grayscale',
        'black-white', 'stop-animations');
    }
    document.body.classList.remove('large-cursor-light', 'large-cursor-dark');
  };

  return (
    <>
      <button
        className="accessibility-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="נגישות"
      >
        <img src={`${process.env.PUBLIC_URL}/images/accessibility-icon.png`} alt="נגישות" className="accessibility-icon" />
      </button>

      {isOpen && (
        <>
          <div className="accessibility-overlay" onClick={() => setIsOpen(false)}></div>
          <div className="accessibility-menu">
            <div className="accessibility-header">
              <h3>כלי נגישות</h3>
              <button onClick={() => setIsOpen(false)} className="close-btn">×</button>
            </div>

          <div className="accessibility-options">
            {/* Mode Cards Grid */}
            <div className="accessibility-grid">
              <button
                className={`accessibility-card ${grayscale ? 'active' : ''}`}
                onClick={toggleGrayscale}
              >
                <span className="card-icon">🌓</span>
                <span className="card-label">גווני אפור</span>
              </button>

              <button
                className={`accessibility-card ${darkMode ? 'active' : ''}`}
                onClick={toggleDarkMode}
              >
                <span className="card-icon">🌙</span>
                <span className="card-label">ניגודיות הפוכה</span>
              </button>

              <button
                className={`accessibility-card ${highContrast ? 'active' : ''}`}
                onClick={toggleHighContrast}
              >
                <span className="card-icon">☀️</span>
                <span className="card-label">ניגודיות גבוהה</span>
              </button>

              <button
                className={`accessibility-card ${linkHighlight ? 'active' : ''}`}
                onClick={toggleLinkHighlight}
              >
                <span className="card-icon">🔗</span>
                <span className="card-label">הדגשת קישורים</span>
              </button>

              <button
                className={`accessibility-card ${blackWhite ? 'active' : ''}`}
                onClick={toggleBlackWhite}
              >
                <span className="card-icon">🌗</span>
                <span className="card-label">שחור לבן</span>
              </button>

              <button
                className={`accessibility-card ${dyslexiaFont ? 'active' : ''}`}
                onClick={toggleDyslexiaFont}
              >
                <span className="card-icon">📖</span>
                <span className="card-label">גופן קריא</span>
              </button>
            </div>

            {/* Font Size Slider */}
            <div className="slider-section">
              <h4 className="slider-title">התאמת גודל גופן</h4>
              <div className="slider-control">
                <button onClick={decreaseFontSize} className="slider-btn">−</button>
                <div className="slider-track">
                  <div className="slider-value">{fontSize}%</div>
                  <input
                    type="range"
                    min="80"
                    max="150"
                    step="10"
                    value={fontSize}
                    onChange={(e) => {
                      const newSize = parseInt(e.target.value);
                      setFontSize(newSize);
                      document.documentElement.style.fontSize = `${newSize}%`;
                    }}
                    className="slider-input"
                  />
                </div>
                <button onClick={increaseFontSize} className="slider-btn">+</button>
              </div>
              <div className="slider-labels">
                <span>הקטנת טקסט</span>
                <span>איפוס גודל</span>
                <span>הגדלת טקסט</span>
              </div>
            </div>

            {/* Additional Options Grid */}
            <div className="accessibility-grid">
              <button
                className={`accessibility-card ${largeCursorLight ? 'active' : ''}`}
                onClick={toggleLargeCursorLight}
              >
                <span className="card-icon">🖱️</span>
                <span className="card-label">סמן גדול בהיר</span>
              </button>

              <button
                className={`accessibility-card ${largeCursorDark ? 'active' : ''}`}
                onClick={toggleLargeCursorDark}
              >
                <span className="card-icon">🖱️</span>
                <span className="card-label">סמן גדול כהה</span>
              </button>

              <button
                className={`accessibility-card ${stopAnimations ? 'active' : ''}`}
                onClick={toggleStopAnimations}
              >
                <span className="card-icon">💫</span>
                <span className="card-label">ביטול אנימציות</span>
              </button>

              <button className="accessibility-card" onClick={resetAllSettings}>
                <span className="card-icon">🔄</span>
                <span className="card-label">איפוס הגדרות</span>
              </button>

              <Link to="/accessibility" className="accessibility-card accessibility-link">
                <span className="card-icon">📋</span>
                <span className="card-label">הצהרת נגישות</span>
              </Link>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}

export default Accessibility;
