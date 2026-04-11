import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const SWIPE_BOOKS = [
  {
    id: 'atomic_habits',
    title: 'הרגלים אטומיים',
    author: "ג'יימס קליר",
    image: `${process.env.PUBLIC_URL}/images/books/atomic-habits.png`,
  },
  {
    id: 'rich_dad',
    title: 'אבא עשיר אבא עני',
    author: "רוברט ט' קיוסאקי",
    image: `${process.env.PUBLIC_URL}/images/books/rich-dad.png`,
  },
  {
    id: 'idiots',
    title: 'מוקף באידיוטים',
    author: 'תומס אריקסון',
    image: `${process.env.PUBLIC_URL}/images/books/idiots.png`,
  },
  {
    id: 'think_grow_rich',
    title: 'חשוב והתעשר',
    author: 'נפוליאון היל',
    image: `${process.env.PUBLIC_URL}/images/books/think-grow-rich.png`,
  },
  {
    id: 'alchemist',
    title: 'האלכימאי',
    author: 'פאולו קואלו',
    image: `${process.env.PUBLIC_URL}/images/books/alchemist.png`,
  },
];

const STEPS = [
  {
    id: 'age',
    question: 'מה הגיל שלך?',
    subtitle: '',
    type: 'single',
    options: [
      { id: '18-24', label: '18–24', icon: `${process.env.PUBLIC_URL}/images/age-18-24.svg`, iconSize: 120 },
      { id: '25-34', label: '25–34', icon: `${process.env.PUBLIC_URL}/images/age-25-34.svg` },
      { id: '35-44', label: '35–44', icon: `${process.env.PUBLIC_URL}/images/age-35-44.svg`, iconSize: 120 },
      { id: '45+',   label: '45+',   icon: `${process.env.PUBLIC_URL}/images/age-45plus.svg` },
    ],
  },
  {
    id: 'gender',
    question: 'מה המגדר שלך?',
    subtitle: '',
    type: 'single',
    layout: '1col',
    options: [
      { id: 'male',   label: 'זכר',  icon: `${process.env.PUBLIC_URL}/images/gender-male-new.svg`, iconSize: 60, iconStyle: { marginLeft: '4px' } },
      { id: 'female', label: 'נקבה', icon: `${process.env.PUBLIC_URL}/images/gender-male.svg` },
      { id: 'other',  label: 'אחר',  icon: `${process.env.PUBLIC_URL}/images/gender-other.png` },
    ],
  },
  {
    id: 'topics',
    question: 'איזה נושאים הכי מעניינים אותך?',
    subtitle: 'ניתן לבחור יותר מאחד',
    type: 'multi',
    options: [
      { id: 'habits',        label: 'הרגלים והתמדה',       emoji: '⚡' },
      { id: 'finance',       label: 'כסף והשקעות',          emoji: '💰' },
      { id: 'business',      label: 'עסקים ויזמות',         emoji: '🚀' },
      { id: 'mindset',       label: 'תודעה והתפתחות',       emoji: '🧠' },
      { id: 'communication', label: 'תקשורת והשפעה',        emoji: '🗣️' },
      { id: 'career',        label: 'קריירה וניהול עצמי',   emoji: '📈' },
      { id: 'leadership',    label: 'מנהיגות',               emoji: '🏆' },
      { id: 'relationships', label: 'מערכות יחסים',          emoji: '❤️' },
      { id: 'health',        label: 'בריאות וכושר',          emoji: '💪' },
    ],
  },
  {
    id: 'goals',
    question: 'מה 3 המטרות העיקריות שלך היום?',
    subtitle: 'ככל שהמטרה ברורה יותר ככה תוכנית הפעולה תהייה טובה יותר',
    type: 'multi',
    maxSelect: 3,
    options: [
      { id: 'career',        label: 'לקדם את הקריירה שלי',          emoji: '📈' },
      { id: 'health',        label: 'לשפר את הבריאות שלי',          emoji: '💪' },
      { id: 'money',         label: 'לחסוך יותר כסף',               emoji: '💰' },
      { id: 'relationships', label: 'לשפר מערכות יחסים',            emoji: '❤️' },
      { id: 'skills',        label: 'לפתח מיומנויות חדשות',         emoji: '🛠️' },
      { id: 'productivity',  label: 'להיות יותר ממוקד ופרודוקטיבי', emoji: '⚡' },
      { id: 'mindset',       label: 'לשנות את הגישה שלי לחיים',     emoji: '🌱' },
      { id: 'happiness',     label: 'להרגיש יותר מאושר ומסופק',     emoji: '😊' },
      { id: 'open_business', label: 'לפתוח עסק',                    emoji: '🏢' },
      { id: 'grow_business', label: 'לשפר עסק קיים',                emoji: '📊', extra: true },
      { id: 'discipline',    label: 'לשפר את המשמעת העצמית שלי',    emoji: '🎯', extra: true },
      { id: 'confidence',    label: 'לשפר את הביטחון העצמי',        emoji: '💎', extra: true },
      { id: 'procrastinate', label: 'להתגבר על דחיינות',            emoji: '⏳', extra: true },
      { id: 'sleep',         label: 'לישון טוב יותר',               emoji: '😴', extra: true },
      { id: 'creative',      label: 'להיות יצירתי יותר',            emoji: '🎨', extra: true },
    ],
  },
  {
    id: 'challenge',
    question: 'מה האתגר הגדול ביותר שלך בלמידה מספרים?',
    subtitle: 'ניתן לבחור יותר מאחד',
    type: 'multi',
    options: [
      { id: 'no_time', label: 'אין לי זמן לקרוא',          emoji: '⏰' },
      { id: 'forget',  label: 'אני שוכח מה שקראתי',         emoji: '🤯' },
      { id: 'start',   label: 'קשה לי להתחיל',             emoji: '😓' },
      { id: 'choose',  label: 'לא יודע אילו ספרים לבחור',   emoji: '🤔' },
      { id: 'apply',   label: 'קשה לי ליישם את מה שלמדתי',  emoji: '🚧' },
    ],
  },
  {
    id: 'format',
    question: 'איך הכי נוח לך ללמוד?',
    subtitle: '',
    type: 'single',
    options: [
      { id: 'read',        label: 'קריאה',          emoji: '📖' },
      { id: 'listen',      label: 'האזנה',          emoji: '🎧' },
      { id: 'practice',    label: 'תרגול מעשי',     emoji: '🎯' },
      { id: 'all',         label: 'הכל ביחד',       emoji: '✨' },
    ],
  },
  {
    id: 'time',
    question: 'כמה אתה מוכן להשקיע כדי להצליח?',
    subtitle: '',
    type: 'single',
    options: [
      { id: '5',  label: 'פחות מ-5 דקות', emoji: '⚡' },
      { id: '15', label: 'כ-15 דקות',     emoji: '☕' },
      { id: '30', label: 'כחצי שעה',      emoji: '📚' },
      { id: '60', label: 'שעה ויותר',     emoji: '🎯' },
    ],
  },
  // One step per book
  ...SWIPE_BOOKS.map(book => ({
    id: `book_${book.id}`,
    type: 'book',
    question: 'הספר הזה מעניין אותך?',
    subtitle: 'החלק ימינה אם מעניין, שמאלה אם לא',
    book,
  })),
  {
    id: 'auth',
    type: 'auth',
    question: 'כמעט סיימנו!',
    subtitle: 'צור חשבון והתחל את הניסיון החינמי שלך',
  },
];

const TOTAL_STEPS = STEPS.length;
const SWIPE_THRESHOLD = 80;

function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

// ─── Single-book swipe card ───────────────────────────────────
// currentBook is on top; nextBook (if any) shows beneath it.
// Calls onVote(interested) once the fly-out animation completes.

function BookSwipe({ currentBook, nextBook, onVote }) {
  const [dragX, setDragX]         = useState(0);
  const [isDragging, setDragging] = useState(false);
  const [exitDir, setExitDir]     = useState(0); // 0=idle 1=right -1=left
  const cardRef = useRef(null);
  const startX  = useRef(0);

  const isExiting = exitDir !== 0;

  const vote = (yes) => {
    if (isExiting) return;
    setDragging(false);
    setExitDir(yes ? 1 : -1);
  };

  const handleTransitionEnd = (e) => {
    if (e.propertyName !== 'transform' || !isExiting) return;
    onVote(exitDir > 0);
  };

  const onPointerDown = (e) => {
    if (isExiting) return;
    startX.current = e.clientX;
    setDragging(true);
    cardRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!isDragging || isExiting) return;
    setDragX(e.clientX - startX.current);
  };
  const onPointerUp = () => {
    if (!isDragging) return;
    setDragging(false);
    if      (dragX >  SWIPE_THRESHOLD) vote(true);
    else if (dragX < -SWIPE_THRESHOLD) vote(false);
    else setDragX(0);
  };

  const rotation     = isExiting ? exitDir * 20 : dragX * 0.06;
  const dragProgress = Math.min(Math.abs(dragX) / SWIPE_THRESHOLD, 1);
  const belowScale   = 0.93 + 0.07 * (isExiting ? 1 : dragProgress);

  const topStyle = isExiting
    ? { transform: `translateX(${exitDir * 900}px) rotate(${exitDir * 20}deg)`,
        transition: 'transform 0.35s ease-in' }
    : { transform: `translateX(${dragX}px) rotate(${rotation}deg)` };

  const belowStyle = {
    transform:  `scale(${belowScale})`,
    transition: isExiting  ? 'transform 0.35s ease-out'
              : isDragging ? 'none'
              : 'transform 0.15s ease',
  };

  const yesOpacity = isExiting && exitDir > 0
    ? 1 : Math.min(Math.max( dragX / SWIPE_THRESHOLD, 0), 1);
  const noOpacity  = isExiting && exitDir < 0
    ? 1 : Math.min(Math.max(-dragX / SWIPE_THRESHOLD, 0), 1);

  return (
    <div className="swipe-scene">
      <div className="swipe-stack">
        {/* Next book — already in position beneath the top card */}
        {nextBook && (
          <div className="swipe-card swipe-card-below" style={belowStyle}>
            <img src={nextBook.image} alt={nextBook.title} className="swipe-book-cover" draggable={false} />
            <div className="swipe-book-info">
              <div className="swipe-book-title">{nextBook.title}</div>
              <div className="swipe-book-author">{nextBook.author}</div>
            </div>
          </div>
        )}

        {/* Current (top) card */}
        <div
          ref={cardRef}
          className={`swipe-card swipe-card-top${isDragging ? ' swipe-dragging' : ''}`}
          style={topStyle}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="swipe-overlay swipe-overlay-yes" style={{ opacity: yesOpacity }}>
            <span>מעניין! ❤️</span>
          </div>
          <div className="swipe-overlay swipe-overlay-no" style={{ opacity: noOpacity }}>
            <span>לא כרגע ✗</span>
          </div>
          <img src={currentBook.image} alt={currentBook.title} className="swipe-book-cover" draggable={false} />
          <div className="swipe-book-info">
            <div className="swipe-book-title">{currentBook.title}</div>
            <div className="swipe-book-author">{currentBook.author}</div>
          </div>
        </div>
      </div>

      {/* Buttons — ❤️ left, ✗ right */}
      <div className="swipe-buttons">
        <button className="swipe-btn swipe-btn-yes" onClick={() => vote(true)}>❤️</button>
        <button className="swipe-btn swipe-btn-no"  onClick={() => vote(false)}>✗</button>
      </div>
    </div>
  );
}

// ─── Processing Screen ────────────────────────────────────────

const PROCESSING_STEPS = [
  'מנתח את תחומי העניין שלך...',
  'בוחר ספרים מותאמים אישית...',
  'בונה את תוכנית הלמידה שלך...',
  'כמעט מוכן!',
];

function ProcessingScreen({ onDone }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [done, setDone]               = useState(false);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < PROCESSING_STEPS.length) {
        setCurrentLine(step);
      } else {
        clearInterval(interval);
        setDone(true);
        setTimeout(onDone, 700);
      }
    }, 900);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="qp-processing-page">
      <div className="qp-processing-card">
        <div className="qp-processing-spinner" />
        <div className="qp-processing-lines">
          {PROCESSING_STEPS.map((line, i) => (
            <div
              key={i}
              className={`qp-processing-line ${i <= currentLine ? 'qp-processing-line-visible' : ''} ${i < currentLine || done ? 'qp-processing-line-done' : ''}`}
            >
              <span className="qp-processing-check">{i < currentLine || done ? '✓' : '◦'}</span>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Questionnaire ───────────────────────────────────────

function Questionnaire() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers]         = useState({});
  const [authName, setAuthName]       = useState('');
  const [authEmail, setAuthEmail]     = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError]     = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [animating, setAnimating]     = useState(false);
  const [direction, setDirection]     = useState('forward');
  const [customGoalInput, setCustomGoalInput] = useState('');
  const [customGoals, setCustomGoals]         = useState([]);
  const [isProcessing, setIsProcessing]       = useState(false);
  const [showAllGoals, setShowAllGoals]       = useState(false);

  useEffect(() => {
    SWIPE_BOOKS.forEach(book => {
      const img = new Image();
      img.src = book.image;
    });
  }, []);

  const step        = STEPS[currentStep];
  const isAuthStep  = step.type === 'auth';
  const isBookStep  = step.type === 'book';

  // For book steps: get the next step's book (if any) for the stack visual
  const nextStep    = STEPS[currentStep + 1];
  const nextBook    = isBookStep && nextStep?.type === 'book' ? nextStep.book : null;

  const selected = (!isAuthStep && !isBookStep)
    ? (answers[step.id] || (step.type === 'multi' ? [] : null))
    : null;

  const hasSelection = isAuthStep ? false
                     : isBookStep ? false
                     : step.type === 'multi' ? selected.length > 0
                     : selected !== null;

  const isLast   = currentStep === TOTAL_STEPS - 1;
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const toggleOption = (optionId) => {
    if (step.type === 'multi') {
      setAnswers(prev => {
        const cur = prev[step.id] || [];
        if (cur.includes(optionId))
          return { ...prev, [step.id]: cur.filter(id => id !== optionId) };
        if (step.maxSelect && cur.length >= step.maxSelect) return prev;
        return { ...prev, [step.id]: [...cur, optionId] };
      });
    } else {
      setAnswers(prev => ({ ...prev, [step.id]: optionId }));
    }
  };

  const isSelected = (optionId) =>
    step.type === 'multi'
      ? (selected || []).includes(optionId)
      : selected === optionId;

  const addCustomGoal = () => {
    const val = customGoalInput.trim();
    if (!val) return;
    const id = `custom_${Date.now()}`;
    setCustomGoals(prev => [...prev, { id, label: val, emoji: '✏️' }]);
    setAnswers(prev => {
      const cur = prev['goals'] || [];
      if (step.maxSelect && cur.length >= step.maxSelect) return prev;
      return { ...prev, goals: [...cur, id] };
    });
    setCustomGoalInput('');
  };

  // Called by BookSwipe once the fly-out animation ends
  const isLastBookStep = isBookStep && (STEPS[currentStep + 1]?.type !== 'book');

  const handleBookVote = (interested) => {
    setAnswers(prev => ({
      ...prev,
      books: { ...(prev.books || {}), [step.book.id]: interested },
    }));
    if (isLastBookStep) {
      setIsProcessing(true);
    } else {
      setCurrentStep(s => s + 1);
    }
  };

  const saveOnboarding = async (userId, data = answers) => {
    const books = data.books || {};
    await supabase.from('user_onboarding').insert({
      user_id:              userId,
      age_group:            data.age        || null,
      gender:               data.gender     || null,
      topics:               Array.isArray(data.topics)    ? data.topics.join(',')    : null,
      main_goals:           Array.isArray(data.goals)     ? data.goals.join(',')     : null,
      main_challenge:       Array.isArray(data.challenge) ? data.challenge.join(',') : data.challenge || null,
      learning_style:       data.format     || null,
      time_investment:      data.time       || null,
      book_atomic_habits:          books.atomic_habits    ?? false,
      book_rich_dad_poor_dad:      books.rich_dad         ?? false,
      book_surrounded_by_idiots:   books.idiots           ?? false,
      book_think_grow_rich:        books.think_grow_rich  ?? false,
      book_alchemist:              books.alchemist        ?? false,
    });
  };

  // Handle Google OAuth redirect callback
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const pending = sessionStorage.getItem('pendingOnboarding');
      if (session && pending) {
        sessionStorage.removeItem('pendingOnboarding');
        try {
          const savedAnswers = JSON.parse(pending);
          await saveOnboarding(session.user.id, savedAnswers);
        } catch (_) {}
        redirectToApp(session);
      }
    };
    handleOAuthCallback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const appUrl = process.env.REACT_APP_MAIN_APP_URL || 'https://reado-il.com';

  const redirectToApp = (session) => {
    if (session?.access_token && session?.refresh_token) {
      const params = new URLSearchParams({
        access_token:  session.access_token,
        refresh_token: session.refresh_token,
        token_type:    session.token_type || 'bearer',
        expires_in:    String(session.expires_in || 3600),
        type:          'signup',
      });
      window.location.href = `${appUrl}#${params.toString()}`;
    } else {
      window.location.href = appUrl;
    }
  };

  const handleEmailSignUp = async () => {
    setAuthError('');
    setAuthLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email:    authEmail,
      password: authPassword,
      options:  { data: { name: authName.trim() } },
    });
    if (error) {
      const isExisting = error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('already exists') || error.status === 422;
      setAuthError(isExisting ? 'EXISTS' : error.message);
      setAuthLoading(false);
      return;
    }
    if (data.user) {
      await saveOnboarding(data.user.id);
    }
    setAuthLoading(false);
    redirectToApp(data.session);
  };

  const handleGoogleSignUp = async () => {
    sessionStorage.setItem('pendingOnboarding', JSON.stringify(answers));
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/questionnaire',
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
    if (error) setAuthError(error.message);
  };

  const goNext = () => {
    if (!hasSelection || animating) return;
    setDirection('forward');
    setAnimating(true);
    setTimeout(() => { setCurrentStep(s => s + 1); setAnimating(false); }, 220);
  };

  const goBack = () => {
    if (currentStep === 0 || animating) return;
    setDirection('back');
    setAnimating(true);
    setTimeout(() => { setCurrentStep(s => s - 1); setAnimating(false); }, 220);
  };

  if (isProcessing) {
    return <ProcessingScreen onDone={() => { setIsProcessing(false); setCurrentStep(s => s + 1); }} />;
  }

  return (
    <div className="qp-page">
      <header className="qp-topbar">
        <img
          src={`${process.env.PUBLIC_URL}/images/reado-logo.png`}
          alt="Reado"
          className="qp-logo"
          onClick={() => navigate('/')}
        />
        <div className="qp-progress-track">
          <div className="qp-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="qp-step-count">{currentStep + 1} / {TOTAL_STEPS}</span>
      </header>

      <main className="qp-main">
        <div className={`qp-card ${animating ? (direction === 'forward' ? 'qp-slide-out' : 'qp-slide-out-back') : ''}`}>

          {isBookStep ? (
            <>
              <h1 className="qp-question">{step.question}</h1>
              <p className="qp-subtitle">{step.subtitle}</p>
              {/* key forces a fresh mount for each book step */}
              <BookSwipe
                key={step.id}
                currentBook={step.book}
                nextBook={nextBook}
                onVote={handleBookVote}
              />
            </>
          ) : isAuthStep ? (
            <>
              <h1 className="qp-question">{step.question}</h1>
              {step.subtitle && <p className="qp-subtitle">{step.subtitle}</p>}
              <div className="qp-auth-form">
                <button className="qp-google-btn" onClick={handleGoogleSignUp} disabled={authLoading}>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="qp-google-icon" />
                  המשך עם Google
                </button>
                <div className="qp-auth-divider"><span>או</span></div>
                <input
                  type="text"
                  className="qp-auth-input"
                  placeholder="שם מלא"
                  value={authName}
                  onChange={e => setAuthName(e.target.value)}
                  dir="rtl"
                />
                <input
                  type="email"
                  className="qp-auth-input"
                  placeholder="אימייל"
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  dir="ltr"
                />
                <input
                  type="password"
                  className="qp-auth-input"
                  placeholder="סיסמה (לפחות 6 תווים)"
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleEmailSignUp()}
                  dir="ltr"
                />
                {authError && (
                  authError === 'EXISTS'
                    ? <p className="qp-auth-error">
                        משתמש עם אימייל זה כבר קיים.{' '}
                        <a href={`${appUrl}/auth`} className="qp-auth-error-link">לחץ כאן להתחברות</a>
                      </p>
                    : <p className="qp-auth-error">{authError}</p>
                )}
                <button
                  className="qp-auth-submit-btn"
                  onClick={handleEmailSignUp}
                  disabled={authLoading || !authName.trim() || !authEmail || authPassword.length < 6}
                >
                  {authLoading ? 'רושם...' : 'צור חשבון והתחל בחינם 🚀'}
                </button>
                <p className="qp-auth-note">לא נשלח לך ספאם. אי פעם.</p>
              </div>
            </>
          ) : (
            <>
              <h1 className="qp-question">{step.question}</h1>
              {step.subtitle && <p className="qp-subtitle">{step.subtitle}</p>}
              {step.id === 'goals' && (
                <div className="qp-custom-input-row">
                  <input
                    type="text"
                    className="qp-custom-input"
                    placeholder="כתוב מטרה משלך..."
                    value={customGoalInput}
                    onChange={e => setCustomGoalInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCustomGoal()}
                    dir="rtl"
                  />
                  <button className="qp-custom-add-btn" onClick={addCustomGoal}>הוסף</button>
                </div>
              )}
              <div className={`qp-options ${step.layout === '1col' ? 'qp-options-1col' : [...(step.id === 'goals' ? customGoals : []), ...step.options].length <= 4 ? 'qp-options-2col' : 'qp-options-3col'}`}>
                {[...(step.id === 'goals' ? customGoals : []), ...step.options].filter(option =>
                  step.id === 'goals' ? (!option.extra || showAllGoals || isSelected(option.id)) : true
                ).map(option => {
                  const atMax = step.maxSelect
                    && (selected || []).length >= step.maxSelect
                    && !isSelected(option.id);
                  const isCustom = step.id === 'goals' && customGoals.some(g => g.id === option.id);
                  return (
                    <button
                      key={option.id}
                      className={`qp-option ${isSelected(option.id) ? 'qp-option-selected' : ''} ${atMax ? 'qp-option-dimmed' : ''}`}
                      onClick={() => toggleOption(option.id)}
                    >
                      {isCustom && (
                        <span
                          className="qp-option-delete"
                          onClick={e => {
                            e.stopPropagation();
                            setCustomGoals(prev => prev.filter(g => g.id !== option.id));
                            setAnswers(prev => ({ ...prev, goals: (prev.goals || []).filter(id => id !== option.id) }));
                          }}
                        >✕</span>
                      )}
                      {option.icon
                        ? <img src={option.icon} alt={option.label} className="qp-option-icon" style={{ ...(option.iconSize ? { width: option.iconSize, height: option.iconSize } : {}), ...(option.iconStyle || {}) }} />
                        : <span className="qp-option-emoji">{option.emoji}</span>
                      }
                      <span className={`qp-option-label${option.icon ? ' qp-option-label-bottom' : ''}`}>{option.label}</span>
                    </button>
                  );
                })}
              </div>
              {step.id === 'goals' && !showAllGoals && (
                <button className="qp-show-more-btn" onClick={() => setShowAllGoals(true)}>
                  + עוד אפשרויות
                </button>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="qp-footer">
        <div className="qp-footer-inner">
          {currentStep > 0
            ? <button className="qp-back-btn" onClick={goBack}>→ חזור</button>
            : <div />
          }
          {!isBookStep && !isAuthStep && (
            <button
              className={`qp-next-btn ${!hasSelection ? 'qp-next-btn-disabled' : ''}`}
              onClick={goNext}
              disabled={!hasSelection}
            >
              המשך
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default Questionnaire;
