import React, { useState } from 'react';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginCard({ onOpenRegister, onOpenForgotPassword, onLoginSuccess }) {
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState('student@ecotrack.org');
  const [password, setPassword] = useState('ecotrack123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      if (onLoginSuccess) onLoginSuccess(res.user);
    } else {
      setErrorMsg(res.message || 'Login failed. Please check credentials.');
    }
  };

  const handleDemoClick = async (role) => {
    setErrorMsg('');
    setLoading(true);
    const res = await demoLogin(role);
    setLoading(false);
    if (res.success && onLoginSuccess) {
      onLoginSuccess(res.user);
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        width: '100%',
        maxWidth: '430px',
        padding: '36px 32px 30px',
        background: 'rgba(8, 24, 16, 0.76)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(74, 222, 128, 0.28)',
        borderRadius: '26px',
        boxShadow: '0 24px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(34, 197, 94, 0.18)',
        zIndex: 10
      }}
    >
      {/* Brand Header inside card */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '54px',
            height: '54px',
            margin: '0 auto 12px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(74, 222, 128, 0.12))',
            border: '1px solid rgba(74, 222, 128, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.35)'
          }}
        >
          <Leaf size={30} color="#4ade80" />
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.9rem',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '4px'
          }}
        >
          Eco<span style={{ color: '#4ade80' }}>Track</span>
        </h2>
        <p style={{ color: 'rgba(240, 253, 244, 0.75)', fontSize: '0.92rem' }}>
          Login to make a difference.
        </p>

        {/* 1-Click Demo Login Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '12px'
        }}>
          <button
            type="button"
            onClick={() => handleDemoClick('student')}
            style={{
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: 'var(--radius-full)',
              color: '#86efac',
              fontSize: '0.72rem',
              padding: '4px 10px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Demo Student
          </button>
          <button
            type="button"
            onClick={() => handleDemoClick('admin')}
            style={{
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: 'var(--radius-full)',
              color: '#86efac',
              fontSize: '0.72rem',
              padding: '4px 10px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Demo Admin
          </button>
          <button
            type="button"
            onClick={() => handleDemoClick('college_admin')}
            style={{
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: 'var(--radius-full)',
              color: '#86efac',
              fontSize: '0.72rem',
              padding: '4px 10px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Demo College Admin
          </button>
        </div>
      </div>

      {errorMsg && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '16px'
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Email Address Input */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(167, 243, 208, 0.6)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Mail size={18} />
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="input-field"
            style={{
              paddingLeft: '44px',
              paddingRight: '14px',
              height: '48px',
              borderRadius: '14px'
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(167, 243, 208, 0.6)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Lock size={18} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
            style={{
              paddingLeft: '44px',
              paddingRight: '44px',
              height: '48px',
              borderRadius: '14px'
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'rgba(167, 243, 208, 0.6)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Remember me & Forgot Password */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem'
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(240, 253, 244, 0.8)',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                accentColor: '#22c55e',
                width: '16px',
                height: '16px',
                cursor: 'pointer'
              }}
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={onOpenForgotPassword}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(167, 243, 208, 0.8)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => (e.target.style.color = '#4ade80')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(167, 243, 208, 0.8)')}
          >
            Forgot password?
          </button>
        </div>

        {/* Large Green Gradient Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary-gradient"
          style={{
            width: '100%',
            height: '48px',
            fontSize: '1.02rem',
            marginTop: '4px',
            opacity: loading ? 0.7 : 1
          }}
        >
          <span>{loading ? 'Signing In...' : 'Login'}</span>
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Or continue with divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          margin: '22px 0 18px',
          color: 'rgba(167, 243, 208, 0.45)',
          fontSize: '0.8rem',
          userSelect: 'none'
        }}
      >
        <span style={{ flex: 1, height: '1px', background: 'rgba(74, 222, 128, 0.2)' }} />
        <span>or continue with</span>
        <span style={{ flex: 1, height: '1px', background: 'rgba(74, 222, 128, 0.2)' }} />
      </div>

      {/* Social Login Buttons: Google, GitHub, Microsoft */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        {/* Google */}
        <button
          type="button"
          onClick={() => handleDemoClick('student')}
          title="Continue with Google"
          style={{
            height: '44px',
            background: 'rgba(12, 32, 22, 0.75)',
            border: '1px solid rgba(74, 222, 128, 0.25)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#4ade80')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.25)')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={() => handleDemoClick('student')}
          title="Continue with GitHub"
          style={{
            height: '44px',
            background: 'rgba(12, 32, 22, 0.75)',
            border: '1px solid rgba(74, 222, 128, 0.25)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#4ade80')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.25)')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </button>

        {/* Microsoft */}
        <button
          type="button"
          onClick={() => handleDemoClick('student')}
          title="Continue with Microsoft"
          style={{
            height: '44px',
            background: 'rgba(12, 32, 22, 0.75)',
            border: '1px solid rgba(74, 222, 128, 0.25)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#4ade80')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.25)')}
        >
          <svg width="18" height="18" viewBox="0 0 21 21">
            <path fill="#f25022" d="M1 1h9v9H1z"/>
            <path fill="#00a4ef" d="M1 11h9v9H1z"/>
            <path fill="#7fba00" d="M11 1h9v9h-9z"/>
            <path fill="#ffb900" d="M11 11h9v9h-9z"/>
          </svg>
        </button>
      </div>

      {/* Bottom Switch to Register */}
      <div style={{ textAlign: 'center', marginTop: '22px', fontSize: '0.88rem', color: 'rgba(240, 253, 244, 0.7)' }}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onOpenRegister}
          style={{
            background: 'none',
            border: 'none',
            color: '#4ade80',
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
