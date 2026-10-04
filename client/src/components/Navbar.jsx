import React, { useState } from 'react';
import { Leaf, Sun, Moon, LogOut, User, Shield, GraduationCap, Menu, X, CheckCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab, theme, setTheme, onOpenAuth }) {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.body.className = `${nextTheme}-theme`;
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'impact', label: 'Impact' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'issues', label: 'Report Issue' },
    { id: 'college_points', label: 'College Points' }
  ];

  return (
    <header className="navbar-container" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: 'rgba(6, 17, 12, 0.75)',
      borderBottom: '1px solid rgba(34, 197, 94, 0.2)'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(74, 222, 128, 0.15))',
            border: '1px solid rgba(74, 222, 128, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(34, 197, 94, 0.35)'
          }}>
            <Leaf size={22} color="#4ade80" />
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.45rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff'
          }}>
            Eco<span style={{ color: '#4ade80' }}>Track</span>
          </span>
        </div>

        {/* Center Nav Links - Desktop */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === link.id ? '#4ade80' : 'rgba(240, 253, 244, 0.75)',
                fontWeight: activeTab === link.id ? 600 : 500,
                fontSize: '0.96rem',
                cursor: 'pointer',
                padding: '6px 10px',
                position: 'relative',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#4ade80')}
              onMouseLeave={(e) => (e.target.style.color = activeTab === link.id ? '#4ade80' : 'rgba(240, 253, 244, 0.75)')}
            >
              {link.label}
              {activeTab === link.id && (
                <span style={{
                  position: 'absolute',
                  bottom: -4,
                  left: '15%',
                  right: '15%',
                  height: '2px',
                  borderRadius: '2px',
                  background: '#4ade80',
                  boxShadow: '0 0 8px #4ade80'
                }} />
              )}
            </button>
          ))}

          {/* If user is admin/college_admin, show Admin Dashboard link */}
          {isAuthenticated && (user?.role === 'admin' || user?.role === 'college_admin') && (
            <button
              onClick={() => handleNavClick('admin')}
              style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(74, 222, 128, 0.4)',
                color: '#4ade80',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Shield size={14} />
              Admin Portal
            </button>
          )}

          {/* If logged in, show User Dashboard link */}
          {isAuthenticated && (
            <button
              onClick={() => handleNavClick('dashboard')}
              style={{
                background: activeTab === 'dashboard' ? 'rgba(74, 222, 128, 0.25)' : 'transparent',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                color: '#ffffff',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <User size={14} color="#4ade80" />
              My Dashboard
            </button>
          )}
        </nav>

        {/* Right Section Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(10, 26, 18, 0.8)',
              border: '1px solid rgba(74, 222, 128, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              boxShadow: '0 0 10px rgba(34, 197, 94, 0.15)',
              transition: 'all 0.2s ease'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Moon size={18} color="#4ade80" /> : <Sun size={18} color="#facc15" />}
          </button>

          {/* Quick Demo Switcher Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              style={{
                background: 'rgba(16, 38, 28, 0.75)',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                borderRadius: 'var(--radius-full)',
                padding: '8px 14px',
                color: '#a7f3d0',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              {isAuthenticated ? (
                <span>Role: <strong style={{ color: '#4ade80' }}>{user?.role?.replace('_', ' ')}</strong></span>
              ) : (
                <span>Switch Demo Role</span>
              )}
              <ChevronDown size={14} />
            </button>

            {demoDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                background: '#0a1d14',
                border: '1px solid rgba(74, 222, 128, 0.4)',
                borderRadius: '12px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
                padding: '8px',
                minWidth: '220px',
                zIndex: 200
              }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#6ee7b7', padding: '6px 10px', letterSpacing: '0.05em' }}>
                  Quick Role Switcher
                </div>
                <button
                  onClick={() => { demoLogin('student'); setDemoDropdownOpen(false); setActiveTab('dashboard'); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: user?.role === 'student' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem'
                  }}
                >
                  <User size={15} color="#4ade80" />
                  Student (Aarav)
                </button>
                <button
                  onClick={() => { demoLogin('admin'); setDemoDropdownOpen(false); setActiveTab('admin'); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: user?.role === 'admin' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem'
                  }}
                >
                  <Shield size={15} color="#4ade80" />
                  Platform Admin (Dr. Sarah)
                </button>
                <button
                  onClick={() => { demoLogin('college_admin'); setDemoDropdownOpen(false); setActiveTab('admin'); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: user?.role === 'college_admin' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem'
                  }}
                >
                  <GraduationCap size={15} color="#4ade80" />
                  College Admin (Prof. Rajesh)
                </button>
              </div>
            )}
          </div>

          {/* Auth Action */}
          {isAuthenticated ? (
            <button
              onClick={logout}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                borderRadius: 'var(--radius-full)',
                padding: '8px 16px',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LogOut size={14} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth('register')}
              className="btn-primary-gradient"
              style={{
                padding: '10px 22px',
                fontSize: '0.92rem'
              }}
            >
              Sign Up
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Open Navigation Menu"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(7, 18, 13, 0.98)',
          borderBottom: '1px solid rgba(34, 197, 94, 0.3)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: activeTab === link.id ? '#4ade80' : '#ffffff',
                fontSize: '1.05rem',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                cursor: 'pointer'
              }}
            >
              {link.label}
            </button>
          ))}
          {isAuthenticated && (
            <>
              <button
                onClick={() => handleNavClick('dashboard')}
                style={{
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: '#4ade80',
                  fontSize: '1.05rem',
                  padding: '10px 0',
                  cursor: 'pointer'
                }}
              >
                My Dashboard
              </button>
              {(user?.role === 'admin' || user?.role === 'college_admin') && (
                <button
                  onClick={() => handleNavClick('admin')}
                  style={{
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: '#4ade80',
                    fontSize: '1.05rem',
                    padding: '10px 0',
                    cursor: 'pointer'
                  }}
                >
                  Admin Portal
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Responsive CSS for Mobile */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
