import React, { useState } from 'react';
import { Leaf, X, User, Mail, Lock, Building2, BookOpen, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterModal({ isOpen, onClose, onRegisterSuccess, onSwitchToLogin }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    collegeOrOrg: 'Greenfield Institute of Technology',
    department: 'Computer Science & Eng.'
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await register(formData);
    setLoading(false);

    if (res.success) {
      if (onRegisterSuccess) onRegisterSuccess(res.user);
      onClose();
    } else {
      setErrorMsg(res.message || 'Registration failed.');
    }
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
          maxWidth: '520px',
          padding: '36px 32px',
          background: 'rgba(8, 24, 16, 0.92)',
          border: '1px solid rgba(74, 222, 128, 0.4)',
          borderRadius: '26px',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 10px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(74, 222, 128, 0.15))',
              border: '1px solid rgba(74, 222, 128, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Leaf size={26} color="#4ade80" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
            Join <span style={{ color: '#4ade80' }}>EcoTrack</span>
          </h2>
          <p style={{ color: 'rgba(240, 253, 244, 0.75)', fontSize: '0.9rem' }}>
            Empower your campus community with verified climate action.
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '16px'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Full Name */}
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(167, 243, 208, 0.6)' }} />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="input-field"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {/* Email */}
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(167, 243, 208, 0.6)' }} />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Campus / Organization Email"
              className="input-field"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(167, 243, 208, 0.6)' }} />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              className="input-field"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {/* Account Role Selector */}
          <div>
            <label style={{ fontSize: '0.8rem', color: '#a7f3d0', display: 'block', marginBottom: '6px' }}>
              Account Role
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'student', label: 'Student / User' },
                { id: 'college_admin', label: 'College Admin' },
                { id: 'admin', label: 'Platform Admin' }
              ].map((r) => (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setFormData({ ...formData, role: r.id })}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '10px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: formData.role === r.id ? 'rgba(34, 197, 94, 0.3)' : 'rgba(12, 32, 22, 0.8)',
                    color: formData.role === r.id ? '#ffffff' : 'rgba(240, 253, 244, 0.7)',
                    border: `1px solid ${formData.role === r.id ? '#4ade80' : 'rgba(74, 222, 128, 0.2)'}`
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* College / Institution */}
          <div style={{ position: 'relative' }}>
            <Building2 size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(167, 243, 208, 0.6)' }} />
            <input
              type="text"
              name="collegeOrOrg"
              value={formData.collegeOrOrg}
              onChange={handleChange}
              placeholder="College / Organization Name"
              className="input-field"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {/* Department */}
          <div style={{ position: 'relative' }}>
            <BookOpen size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(167, 243, 208, 0.6)' }} />
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department / Branch"
              className="input-field"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary-gradient"
            style={{ width: '100%', height: '48px', marginTop: '6px', fontSize: '1rem' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.86rem', color: 'rgba(240, 253, 244, 0.7)' }}>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => { onClose(); onSwitchToLogin && onSwitchToLogin(); }}
            style={{ background: 'none', border: 'none', color: '#4ade80', fontWeight: 700, cursor: 'pointer' }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
