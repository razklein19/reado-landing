import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'reado-accessibility';

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function getMainContent() {
  return document.getElementById('main-content');
}

function applySettings(settings) {
  document.documentElement.style.fontSize = `${settings.fontSize || 100}%`;

  // Cursor effects go on body (must affect entire page)
  const bodyMap = {
    largeCursorLight: 'large-cursor-light',
    largeCursorDark:  'large-cursor-dark',
  };

  // Visual effects go on #main-content so the accessibility button
  // (which sits outside #main-content) is never filtered/hidden
  const contentMap = {
    highContrast:   'high-contrast',
    darkMode:       'dark-mode',
    linkHighlight:  'highlight-links',
    dyslexiaFont:   'dyslexia-font',
    grayscale:      'grayscale',
    blackWhite:     'black-white',
    stopAnimations: 'stop-animations',
  };

  Object.entries(bodyMap).forEach(([key, cls]) => {
    document.body.classList.toggle(cls, !!settings[key]);
  });

  const mc = getMainContent();
  if (mc) {
    Object.entries(contentMap).forEach(([key, cls]) => {
      mc.classList.toggle(cls, !!settings[key]);
    });
  }
}

function Accessibility() {
  const [isOpen, setIsOpen] = useState(false);

  const saved = loadSettings();
  const [fontSize,        setFontSize]        = useState(saved.fontSize        || 100);
  const [highContrast,    setHighContrast]    = useState(!!saved.highContrast);
  const [darkMode,        setDarkMode]        = useState(!!saved.darkMode);
  const [linkHighlight,   setLinkHighlight]   = useState(!!saved.linkHighlight);
  const [dyslexiaFont,    setDyslexiaFont]    = useState(!!saved.dyslexiaFont);
  const [grayscale,       setGrayscale]       = useState(!!saved.grayscale);
  const [blackWhite,      setBlackWhite]      = useState(!!saved.blackWhite);
  const [largeCursorLight,setLargeCursorLight]= useState(!!saved.largeCursorLight);
  const [largeCursorDark, setLargeCursorDark] = useState(!!saved.largeCursorDark);
  const [stopAnimations,  setStopAnimations]  = useState(!!saved.stopAnimations);

  // Apply saved settings on mount
  useEffect(() => {
    applySettings(loadSettings());
  }, []);

  const update = (patch) => {
    const next = { ...loadSettings(), ...patch };
    saveSettings(next);
    applySettings(next);
  };

  const increaseFontSize = () => {
    if (fontSize < 150) { const s = fontSize + 10; setFontSize(s); update({ fontSize: s }); }
  };
  const decreaseFontSize = () => {
    if (fontSize > 80)  { const s = fontSize - 10; setFontSize(s); update({ fontSize: s }); }
  };

  const toggle = (key, value, setter) => {
    const next = !value;
    setter(next);
    update({ [key]: next });
  };

  const toggleLargeCursorLight = () => {
    const next = !largeCursorLight;
    setLargeCursorLight(next);
    if (next && largeCursorDark) { setLargeCursorDark(false); }
    update({ largeCursorLight: next, largeCursorDark: next ? false : largeCursorDark });
  };

  const toggleLargeCursorDark = () => {
    const next = !largeCursorDark;
    setLargeCursorDark(next);
    if (next && largeCursorLight) { setLargeCursorLight(false); }
    update({ largeCursorDark: next, largeCursorLight: next ? false : largeCursorLight });
  };

  const resetAllSettings = () => {
    saveSettings({});
    setFontSize(100); setHighContrast(false); setDarkMode(false);
    setLinkHighlight(false); setDyslexiaFont(false); setGrayscale(false);
    setBlackWhite(false); setLargeCursorLight(false); setLargeCursorDark(false);
    setStopAnimations(false);
    applySettings({});
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
              <div className="accessibility-grid">
                <button className={`accessibility-card ${grayscale     ? 'active' : ''}`} onClick={() => toggle('grayscale',     grayscale,     setGrayscale)}>
                  <span className="card-icon">🌓</span><span className="card-label">גווני אפור</span>
                </button>
                <button className={`accessibility-card ${darkMode      ? 'active' : ''}`} onClick={() => toggle('darkMode',      darkMode,      setDarkMode)}>
                  <span className="card-icon">🌙</span><span className="card-label">ניגודיות הפוכה</span>
                </button>
                <button className={`accessibility-card ${highContrast  ? 'active' : ''}`} onClick={() => toggle('highContrast',  highContrast,  setHighContrast)}>
                  <span className="card-icon">☀️</span><span className="card-label">ניגודיות גבוהה</span>
                </button>
                <button className={`accessibility-card ${linkHighlight ? 'active' : ''}`} onClick={() => toggle('linkHighlight', linkHighlight, setLinkHighlight)}>
                  <span className="card-icon">🔗</span><span className="card-label">הדגשת קישורים</span>
                </button>
                <button className={`accessibility-card ${blackWhite    ? 'active' : ''}`} onClick={() => toggle('blackWhite',    blackWhite,    setBlackWhite)}>
                  <span className="card-icon">🌗</span><span className="card-label">שחור לבן</span>
                </button>
                <button className={`accessibility-card ${dyslexiaFont  ? 'active' : ''}`} onClick={() => toggle('dyslexiaFont',  dyslexiaFont,  setDyslexiaFont)}>
                  <span className="card-icon">📖</span><span className="card-label">גופן קריא</span>
                </button>
              </div>

              <div className="slider-section">
                <h4 className="slider-title">התאמת גודל גופן</h4>
                <div className="slider-control">
                  <button onClick={decreaseFontSize} className="slider-btn">−</button>
                  <div className="slider-track">
                    <div className="slider-value">{fontSize}%</div>
                    <input
                      type="range" min="80" max="150" step="10" value={fontSize}
                      onChange={e => { const s = parseInt(e.target.value); setFontSize(s); update({ fontSize: s }); }}
                      className="slider-input"
                    />
                  </div>
                  <button onClick={increaseFontSize} className="slider-btn">+</button>
                </div>
                <div className="slider-labels">
                  <span>הקטנת טקסט</span><span>איפוס גודל</span><span>הגדלת טקסט</span>
                </div>
              </div>

              <div className="accessibility-grid">
                <button className={`accessibility-card ${largeCursorLight ? 'active' : ''}`} onClick={toggleLargeCursorLight}>
                  <span className="card-icon">🖱️</span><span className="card-label">סמן גדול בהיר</span>
                </button>
                <button className={`accessibility-card ${largeCursorDark  ? 'active' : ''}`} onClick={toggleLargeCursorDark}>
                  <span className="card-icon">🖱️</span><span className="card-label">סמן גדול כהה</span>
                </button>
                <button className={`accessibility-card ${stopAnimations   ? 'active' : ''}`} onClick={() => toggle('stopAnimations', stopAnimations, setStopAnimations)}>
                  <span className="card-icon">💫</span><span className="card-label">ביטול אנימציות</span>
                </button>
                <button className="accessibility-card" onClick={resetAllSettings}>
                  <span className="card-icon">🔄</span><span className="card-label">איפוס הגדרות</span>
                </button>
                <Link to="/accessibility" className="accessibility-card accessibility-link">
                  <span className="card-icon">📋</span><span className="card-label">הצהרת נגישות</span>
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
