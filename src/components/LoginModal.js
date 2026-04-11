import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function LoginModal({ onClose }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const appUrl = process.env.REACT_APP_MAIN_APP_URL || 'https://reado-il.com';

  const redirectToApp = (session) => {
    if (session?.access_token && session?.refresh_token) {
      const params = new URLSearchParams({
        access_token:  session.access_token,
        refresh_token: session.refresh_token,
        token_type:    session.token_type || 'bearer',
        expires_in:    String(session.expires_in || 3600),
        type:          'login',
      });
      window.location.href = `${appUrl}#${params.toString()}`;
    } else {
      window.location.href = appUrl;
    }
  };

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError('אימייל או סיסמה שגויים');
      setLoading(false);
      return;
    }
    redirectToApp(data.session);
  };

  const handleGoogle = async () => {
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/login-callback',
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
    if (err) setError(err.message);
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>✕</button>
        <h2 className="login-modal-title">התחברות</h2>

        <button className="qp-google-btn" onClick={handleGoogle} disabled={loading}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="qp-google-icon" />
          המשך עם Google
        </button>

        <div className="qp-auth-divider"><span>או</span></div>

        <input
          type="email"
          className="qp-auth-input"
          placeholder="אימייל"
          value={email}
          onChange={e => setEmail(e.target.value)}
          dir="ltr"
        />
        <input
          type="password"
          className="qp-auth-input"
          placeholder="סיסמה"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          dir="ltr"
        />

        {error && <p className="qp-auth-error">{error}</p>}

        <button
          className="qp-auth-submit-btn"
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? 'מתחבר...' : 'התחברות'}
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
