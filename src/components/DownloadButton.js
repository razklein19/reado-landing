import React, { useState, useRef, useEffect } from 'react';
import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  getMobilePlatform,
  getStoreUrlForPlatform,
} from '../appLinks';

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="store-menu-icon" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="store-menu-icon" aria-hidden="true">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.892l2.302 2.302-10.937 6.333 8.635-8.635zm3.499-3.499l2.748 1.557a1 1 0 0 1 0 1.732l-2.927 1.658L15.501 12l2.497-2.793zM5.864 2.658L16.802 8.99l-2.302 2.302L5.864 2.658z" />
  </svg>
);

function DownloadButton({ onNavigate }) {
  const [platform] = useState(getMobilePlatform);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  // במובייל החנות הנכונה ידועה — לחיצה אחת מובילה ישר אליה
  if (platform) {
    return (
      <a
        href={getStoreUrlForPlatform(platform)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        onClick={onNavigate}
      >
        הורד עכשיו
      </a>
    );
  }

  const handleStoreClick = () => {
    setOpen(false);
    if (onNavigate) onNavigate();
  };

  return (
    <div className="store-menu" ref={wrapperRef}>
      <button
        type="button"
        className="btn store-menu-trigger"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        הורד עכשיו
        <span className={`store-menu-caret ${open ? 'is-open' : ''}`} aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="store-menu-popover" role="menu">
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="store-menu-item"
            role="menuitem"
            onClick={handleStoreClick}
          >
            <PlayIcon />
            <span className="store-menu-text">
              <span className="store-menu-prefix">הורד מחנות</span>
              <span className="store-menu-store">Google Play</span>
            </span>
          </a>

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="store-menu-item"
            role="menuitem"
            onClick={handleStoreClick}
          >
            <AppleIcon />
            <span className="store-menu-text">
              <span className="store-menu-prefix">הורד מחנות</span>
              <span className="store-menu-store">App Store</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}

export default DownloadButton;
