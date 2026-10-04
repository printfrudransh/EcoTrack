import React, { useState } from 'react';
import { 
  Leaf, AlertTriangle, Users, BarChart3, ArrowRight, ShieldCheck, 
  Sparkles, Mail, Building, Globe, CheckCircle2 
} from 'lucide-react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroBackground from './components/HeroBackground';
import LoginCard from './components/LoginCard';
import LoginModal from './components/LoginModal';
import StatsBar from './components/StatsBar';
import RegisterModal from './components/RegisterModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import ScientificFactorsModal from './components/ScientificFactorsModal';

import UserDashboard from './components/UserDashboard';
import ActivityTracker from './components/ActivityTracker';
import IssueReporter from './components/IssueReporter';
import AdminDashboard from './components/AdminDashboard';
import CampaignsView from './components/CampaignsView';
import CollegePointsView from './components/CollegePointsView';
import GroupsView from './components/GroupsView';
import ImpactAnalytics from './components/ImpactAnalytics';

export default function App() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');

  // Modals
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [factorsModalOpen, setFactorsModalOpen] = useState(false);

  const handleOpenAuth = (type) => {
    if (type === 'register') {
      setRegisterModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setActiveTab('dashboard');
  };

  const handleFeaturePillClick = (target) => {
    setActiveTab(target);
  };

  return (
    <div className={`app-root ${theme}-theme`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative' }}>
        {/* VIEW 1: HOME / HERO CINEMATIC SPLIT (Matches Reference Image) */}
        {activeTab === 'home' && (
          <section
            className="hero-section"
            style={{
              position: 'relative',
              minHeight: 'calc(100vh - 72px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '40px 32px 32px',
              overflow: 'hidden'
            }}
          >
            {/* Background Layer: Forest + Glowing Earth Centerpiece + Particles */}
            <HeroBackground onBadgeClick={handleFeaturePillClick} />

            {/* Split Content Container */}
            <div
              className="hero-content-grid"
              style={{
                maxWidth: '1360px',
                width: '100%',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1.25fr 1fr',
                alignItems: 'center',
                gap: '48px',
                zIndex: 5,
                position: 'relative',
                flex: 1
              }}
            >
              {/* LEFT SIDE: Hero Typography & 4 Feature Pills */}
              <div style={{ maxWidth: '620px' }}>
                {/* Eyebrow text */}
                <div
                  style={{
                    color: '#86efac',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                  OUR PLANET. OUR RESPONSIBILITY.
                </div>

                {/* Large Headline */}
                <h1
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '4.8rem',
                    fontWeight: 900,
                    lineHeight: 1.04,
                    color: '#ffffff',
                    letterSpacing: '-0.035em',
                    marginBottom: '24px'
                  }}
                >
                  Track Today.<br />
                  <span className="text-gradient-green">Greener</span><br />
                  Tomorrow.
                </h1>

                {/* Subtitle */}
                <p
                  style={{
                    color: 'rgba(240, 253, 244, 0.85)',
                    fontSize: '1.18rem',
                    lineHeight: 1.5,
                    marginBottom: '32px',
                    maxWidth: '520px'
                  }}
                >
                  Record your actions, report environmental issues, and create real impact together.
                </p>

                {/* 4 Feature Buttons/Cards */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    maxWidth: '340px'
                  }}
                >
                  {/* Pill 1: Track Activities */}
                  <button
                    onClick={() => handleFeaturePillClick('activities')}
                    className="glass-pill"
                    style={{
                      padding: '12px 20px',
                      cursor: 'pointer',
                      gap: '14px',
                      color: '#ffffff',
                      fontSize: '0.96rem',
                      fontWeight: 600,
                      width: '100%',
                      background: 'rgba(9, 26, 18, 0.78)',
                      border: '1px solid rgba(74, 222, 128, 0.3)'
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Leaf size={18} color="#4ade80" />
                    </div>
                    <span>Track Activities</span>
                  </button>

                  {/* Pill 2: Report Issues */}
                  <button
                    onClick={() => handleFeaturePillClick('issues')}
                    className="glass-pill"
                    style={{
                      padding: '12px 20px',
                      cursor: 'pointer',
                      gap: '14px',
                      color: '#ffffff',
                      fontSize: '0.96rem',
                      fontWeight: 600,
                      width: '100%',
                      background: 'rgba(9, 26, 18, 0.78)',
                      border: '1px solid rgba(74, 222, 128, 0.3)'
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(250, 204, 21, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AlertTriangle size={18} color="#facc15" />
                    </div>
                    <span>Report Issues</span>
                  </button>

                  {/* Pill 3: Join Campaigns */}
                  <button
                    onClick={() => handleFeaturePillClick('campaigns')}
                    className="glass-pill"
                    style={{
                      padding: '12px 20px',
                      cursor: 'pointer',
                      gap: '14px',
                      color: '#ffffff',
                      fontSize: '0.96rem',
                      fontWeight: 600,
                      width: '100%',
                      background: 'rgba(9, 26, 18, 0.78)',
                      border: '1px solid rgba(74, 222, 128, 0.3)'
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={18} color="#38bdf8" />
                    </div>
                    <span>Join Campaigns</span>
                  </button>

                  {/* Pill 4: See Impact */}
                  <button
                    onClick={() => handleFeaturePillClick('impact')}
                    className="glass-pill"
                    style={{
                      padding: '12px 20px',
                      cursor: 'pointer',
                      gap: '14px',
                      color: '#ffffff',
                      fontSize: '0.96rem',
                      fontWeight: 600,
                      width: '100%',
                      background: 'rgba(9, 26, 18, 0.78)',
                      border: '1px solid rgba(74, 222, 128, 0.3)'
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BarChart3 size={18} color="#c084fc" />
                    </div>
                    <span>See Impact</span>
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE: Open stage allowing Glowing Earth to shine prominently */}
              <div style={{ minHeight: '440px' }} />
            </div>

            {/* BOTTOM: Glassmorphism Statistics Bar */}
            <div style={{ marginTop: '40px' }}>
              <StatsBar onStatClick={handleFeaturePillClick} />
            </div>
          </section>
        )}

        {/* VIEW 2: USER DASHBOARD */}
        {activeTab === 'dashboard' && (
          <UserDashboard
            onNavigate={setActiveTab}
            onOpenFactorsModal={() => setFactorsModalOpen(true)}
          />
        )}

        {/* VIEW 3: ACTIVITY TRACKING */}
        {activeTab === 'activities' && (
          <ActivityTracker onOpenFactorsModal={() => setFactorsModalOpen(true)} />
        )}

        {/* VIEW 4: ISSUE REPORTING */}
        {activeTab === 'issues' && <IssueReporter />}

        {/* VIEW 5: ADMIN DASHBOARD */}
        {activeTab === 'admin' && <AdminDashboard />}

        {/* VIEW 6: CAMPAIGNS & CHALLENGES */}
        {activeTab === 'campaigns' && <CampaignsView />}

        {/* VIEW 7: COLLEGE ACTIVITY POINTS */}
        {activeTab === 'college_points' && <CollegePointsView />}

        {/* VIEW 8: GROUPS & MULTI-METRIC LEADERBOARD */}
        {activeTab === 'groups' && <GroupsView />}

        {/* VIEW 9: IMPACT ANALYTICS */}
        {activeTab === 'impact' && (
          <ImpactAnalytics onOpenFactorsModal={() => setFactorsModalOpen(true)} />
        )}

        {/* VIEW 10: FEATURES PAGE */}
        {activeTab === 'features' && (
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 70px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ color: '#4ade80', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Comprehensive Sustainability Suite
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>
                Built for Institutional Environmental Excellence
              </h1>
              <p style={{ color: 'rgba(240, 253, 244, 0.8)', fontSize: '1rem', maxWidth: '640px', margin: '10px auto 0' }}>
                EcoTrack bridges grassroots student engagement with verified facilities operations and university governance.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {[
                { title: 'Verified Emission Factors', icon: <Leaf size={24} color="#4ade80" />, desc: 'Predefined lifecycle factors calibrated from EPA & DEFRA inventories avoid arbitrary guestimates and ensure academic rigor.' },
                { title: 'Campus Hazard Reporting', icon: <AlertTriangle size={24} color="#facc15" />, desc: 'Photo-tagged issue reporting dispatches facilities teams for rapid waste management, leaks, and hazard remediation.' },
                { title: 'College Activity Points', icon: <Building size={24} color="#c084fc" />, desc: 'Institution administrator configurable verification rules for mandatory extracurricular credits (AICTE / VTU / Autonomous).' },
                { title: 'Anti-Cheating Intelligence', icon: <ShieldCheck size={24} color="#4ade80" />, desc: 'Automated reasonable-limit caps and anomaly detection stop unrealistic self-reported figures before verification.' },
                { title: 'Multi-Metric Recognition', icon: <Sparkles size={24} color="#fde047" />, desc: 'Encourage balanced community involvement through consistency streaks, biggest improvement, and verified actions.' },
                { title: 'Department Collaboration', icon: <Users size={24} color="#38bdf8" />, desc: 'Measure and compare department-level collective environmental progress across classes, hostels, and academic faculties.' }
              ].map((f, i) => (
                <div key={i} className="glass-panel" style={{ padding: '30px', background: 'rgba(8, 24, 16, 0.82)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                    {f.title}
                  </h3>
                  <p style={{ color: 'rgba(240, 253, 244, 0.72)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 11: CONTACT / INSTITUTIONAL PARTNERSHIP */}
        {activeTab === 'contact' && (
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px 70px' }}>
            <div className="glass-panel" style={{ padding: '40px', background: 'rgba(8, 24, 16, 0.88)' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Mail size={24} color="#4ade80" />
                </div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
                  Connect with EcoTrack
                </h1>
                <p style={{ color: 'rgba(240, 253, 244, 0.8)', fontSize: '0.92rem' }}>
                  Partner your college, university, or municipal organization with EcoTrack.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Institution Name</label>
                  <input type="text" placeholder="e.g. State Institute of Technology" className="input-field" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Campus Sustainability Coordinator Email</label>
                  <input type="email" placeholder="coordinator@university.edu" className="input-field" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Inquiry Details</label>
                  <textarea rows={4} placeholder="Describe your campus size, department clubs, and green initiatives..." className="input-field" />
                </div>
                <button
                  type="button"
                  onClick={() => alert('Thank you! Our institutional sustainability liaison will contact your campus within 24 hours.')}
                  className="btn-primary-gradient"
                  style={{ height: '48px', marginTop: '8px' }}
                >
                  Submit Institutional Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onOpenRegister={() => { setLoginModalOpen(false); setRegisterModalOpen(true); }}
        onOpenForgotPassword={() => { setLoginModalOpen(false); setForgotPasswordModalOpen(true); }}
        onLoginSuccess={handleLoginSuccess}
      />

      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onRegisterSuccess={() => setActiveTab('dashboard')}
        onSwitchToLogin={() => { setRegisterModalOpen(false); setLoginModalOpen(true); }}
      />

      <ForgotPasswordModal
        isOpen={forgotPasswordModalOpen}
        onClose={() => setForgotPasswordModalOpen(false)}
      />

      <ScientificFactorsModal
        isOpen={factorsModalOpen}
        onClose={() => setFactorsModalOpen(false)}
      />

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 1050px) {
          .hero-content-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-content-grid h1 {
            font-size: 2.8rem !important;
          }
          .hero-content-grid div[style*="maxWidth: '340px'"] {
            margin: 0 auto 24px !important;
          }
          .hero-content-grid div[style*="justifyContent: 'flex-end'"] {
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
