import React from 'react';
import { X } from 'lucide-react';
import LoginCard from './LoginCard';

export default function LoginModal({ isOpen, onClose, onOpenRegister, onOpenForgotPassword, onLoginSuccess }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(2, 10, 6, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
        >
          <X size={18} />
        </button>

        <LoginCard
          onOpenRegister={() => {
            onClose();
            if (onOpenRegister) onOpenRegister();
          }}
          onOpenForgotPassword={() => {
            onClose();
            if (onOpenForgotPassword) onOpenForgotPassword();
          }}
          onLoginSuccess={(user) => {
            onClose();
            if (onLoginSuccess) onLoginSuccess(user);
          }}
        />
      </div>
    </div>
  );
}
