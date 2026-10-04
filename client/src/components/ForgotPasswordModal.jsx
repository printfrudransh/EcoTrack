import React, { useState } from 'react';
import { Mail, CheckCircle, X } from 'lucide-react';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(3, 10, 7, 0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '32px 28px',
          background: 'rgba(8, 24, 16, 0.94)',
          border: '1px solid rgba(74, 222, 128, 0.4)',
          borderRadius: '24px',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
          Reset Password
        </h3>
        <p style={{ color: 'rgba(240, 253, 244, 0.75)', fontSize: '0.88rem', marginBottom: '20px' }}>
          Enter your institutional email address to receive password recovery instructions.
        </p>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <CheckCircle size={44} color="#4ade80" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '6px' }}>Recovery Link Sent</h4>
            <p style={{ color: '#a7f3d0', fontSize: '0.85rem', marginBottom: '18px' }}>
              We've dispatched recovery credentials to <strong>{email}</strong>.
            </p>
            <button onClick={onClose} className="btn-primary-gradient" style={{ width: '100%' }}>
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(167, 243, 208, 0.6)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="input-field"
                style={{ paddingLeft: '44px' }}
              />
            </div>
            <button type="submit" className="btn-primary-gradient" style={{ width: '100%', height: '46px' }}>
              Send Recovery Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
