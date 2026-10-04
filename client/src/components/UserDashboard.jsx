import React, { useEffect, useState } from 'react';
import { 
  Leaf, Flame, Award, ArrowUpRight, Plus, Droplets, Zap, ShieldCheck, 
  Clock, CheckCircle2, ChevronRight, GraduationCap, AlertTriangle, Sparkles 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserDashboard({ onNavigate, onOpenFactorsModal }) {
  const { user, token } = useAuth();
  const [summary, setSummary] = useState({
    totalActivities: 0,
    estimatedImpact: {
      totalCo2eAvoidedKg: 0,
      totalWaterSavedLiters: 0,
      totalEnergySavedKwh: 0,
      label: 'Estimated Environmental Impact'
    }
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [token]);

  const loadDashboardData = async () => {
    try {
      const [sumRes, actRes, badgeRes] = await Promise.all([
        fetch('/api/activities/summary', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/activities?limit=5', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/stats/leaderboards')
      ]);

      if (sumRes.ok) {
        const sumData = await sumRes.json();
        setSummary(sumData);
      }
      if (actRes.ok) {
        const actData = await actRes.json();
        setRecentActivities(actData.activities || []);
      }
      if (badgeRes.ok) {
        const badgeData = await badgeRes.json();
        setBadges(badgeData.badges || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard info:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '36px 0 60px', maxWidth: '1240px', margin: '0 auto' }}>
      {/* Welcome Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '30px 36px',
          background: 'linear-gradient(135deg, rgba(8, 26, 17, 0.85) 0%, rgba(16, 44, 29, 0.7) 100%)',
          border: '1px solid rgba(74, 222, 128, 0.35)',
          borderRadius: '26px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(74, 222, 128, 0.4)',
              color: '#86efac',
              borderRadius: 'var(--radius-full)',
              padding: '4px 12px',
              fontSize: '0.78rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              {user?.collegeOrOrg || 'Campus Member'} • {user?.department || 'Student'}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Welcome back, <span className="text-gradient-green">{user?.name || 'Eco Champion'}</span>
          </h1>
          <p style={{ color: 'rgba(240, 253, 244, 0.8)', fontSize: '0.96rem', marginTop: '4px' }}>
            Your collective environmental choices are driving measurable sustainability across your campus.
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => onNavigate('activities')}
            className="btn-primary-gradient"
            style={{ padding: '12px 24px', fontSize: '0.95rem' }}
          >
            <Plus size={18} />
            Log Environmental Action
          </button>
          <button
            onClick={() => onNavigate('issues')}
            className="btn-glass"
            style={{ padding: '12px 20px', fontSize: '0.95rem' }}
          >
            <AlertTriangle size={18} color="#facc15" />
            Report Hazard
          </button>
        </div>
      </div>

      {/* Primary Impact Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        {/* Card 1: Estimated CO2e Avoided */}
        <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(74, 222, 128, 0.28)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#a7f3d0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Estimated Impact
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={20} color="#4ade80" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {summary.estimatedImpact?.totalCo2eAvoidedKg || '0.0'} <span style={{ fontSize: '1.05rem', color: '#4ade80' }}>kg CO₂e</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '8px' }}>
            Emissions avoided via eco-transit & recycling
          </div>
        </div>

        {/* Card 2: Water Saved */}
        <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(56, 189, 248, 0.28)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#bae6fd', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Estimated Water Saved
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Droplets size={20} color="#38bdf8" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {summary.estimatedImpact?.totalWaterSavedLiters || '0'} <span style={{ fontSize: '1.05rem', color: '#38bdf8' }}>Liters</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '8px' }}>
            Conserved through closed-loop reuse
          </div>
        </div>

        {/* Card 3: Energy Saved */}
        <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(250, 204, 21, 0.28)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fde047', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Energy Conserved
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(250, 204, 21, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} color="#facc15" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {summary.estimatedImpact?.totalEnergySavedKwh || '0'} <span style={{ fontSize: '1.05rem', color: '#facc15' }}>kWh</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '8px' }}>
            Grid power saved via shut-offs
          </div>
        </div>

        {/* Card 4: Daily Streak */}
        <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(249, 115, 22, 0.28)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fed7aa', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Streak
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(249, 115, 22, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={20} color="#f97316" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {user?.streakDays || 14} <span style={{ fontSize: '1.05rem', color: '#f97316' }}>Days 🔥</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '8px' }}>
            Consistent climate habit maintained
          </div>
        </div>

        {/* Card 5: College Activity Points */}
        <div
          onClick={() => onNavigate('college_points')}
          className="glass-panel"
          style={{ padding: '24px', border: '1px solid rgba(168, 85, 247, 0.35)', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e9d5ff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              College Activity Points
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} color="#c084fc" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {user?.collegeActivityPoints || 18} <span style={{ fontSize: '1.05rem', color: '#c084fc' }}>Pts</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#c084fc', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Institution accredited <ArrowUpRight size={13} />
          </div>
        </div>
      </div>

      {/* Main Content Split: Recent Activities vs Badges */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
        {/* Left: Recent Activity Feed */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                Recent Activities
              </h2>
              <p style={{ color: '#a7f3d0', fontSize: '0.82rem' }}>
                All figures represent Verified & Estimated Environmental Impact
              </p>
            </div>
            <button
              onClick={() => onNavigate('activities')}
              className="btn-ghost"
              style={{ fontSize: '0.85rem', color: '#4ade80' }}
            >
              View All History <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivities.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                No activities logged yet. Start recording your daily actions!
              </div>
            ) : (
              recentActivities.map((act) => (
                <div
                  key={act.id}
                  style={{
                    background: 'rgba(12, 32, 22, 0.65)',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(34, 197, 94, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Leaf size={20} color="#4ade80" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.96rem' }}>
                        {act.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#a7f3d0', marginTop: '2px' }}>
                        {act.quantity} {act.unit} • {new Date(act.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: '#4ade80', fontSize: '0.96rem' }}>
                      -{act.estimatedImpact?.co2eAvoidedKg} kg CO₂e
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontStyle: 'italic' }}>
                      Estimated impact
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={onOpenFactorsModal}
              style={{
                background: 'none',
                border: 'none',
                color: '#86efac',
                fontSize: '0.82rem',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              How does EcoTrack estimate environmental impact? View scientific methodology & sources →
            </button>
          </div>
        </div>

        {/* Right: Badges & Achievements */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                Badges & Honors
              </h2>
              <p style={{ color: '#a7f3d0', fontSize: '0.82rem' }}>
                Multi-metric participation badges
              </p>
            </div>
            <Award size={22} color="#facc15" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {badges.slice(0, 4).map((badge) => (
              <div
                key={badge.id}
                style={{
                  background: 'rgba(12, 32, 22, 0.65)',
                  border: '1px solid rgba(74, 222, 128, 0.2)',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(34, 197, 94, 0.2))',
                  border: '1px solid rgba(250, 204, 21, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sparkles size={20} color="#facc15" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>
                    {badge.title}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'rgba(240, 253, 244, 0.75)', marginTop: '2px' }}>
                    {badge.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 950px) {
          div[style*="gridTemplateColumns: '2fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
