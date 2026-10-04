import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, ShieldCheck, Flame, Award, Building, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function GroupsView() {
  const { token } = useAuth();
  const [groups, setGroups] = useState([]);
  const [leaderboards, setLeaderboards] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('mostActive');

  useEffect(() => {
    fetch('/api/groups', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((d) => setGroups(d.groups || []))
      .catch((e) => console.log(e));

    fetch('/api/stats/leaderboards')
      .then((res) => res.json())
      .then((d) => setLeaderboards(d))
      .catch((e) => console.log(e));
  }, [token]);

  const metricTabs = [
    { id: 'mostActive', label: 'Most Active', icon: <Sparkles size={14} /> },
    { id: 'biggestImprovement', label: 'Biggest Improvement', icon: <TrendingUp size={14} /> },
    { id: 'mostVerifiedActivities', label: 'Most Verified Actions', icon: <ShieldCheck size={14} /> },
    { id: 'consistencyStreak', label: 'Consistency Streaks', icon: <Flame size={14} /> },
    { id: 'communityParticipation', label: 'Community Participation', icon: <Users size={14} /> }
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '36px 0 60px' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '28px 36px',
          background: 'linear-gradient(135deg, rgba(8, 26, 17, 0.9) 0%, rgba(16, 44, 29, 0.75) 100%)',
          border: '1px solid rgba(74, 222, 128, 0.35)',
          borderRadius: '24px',
          marginBottom: '32px'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
          <Building size={16} /> Campus Organizations & Guilds
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
          Collective Department & Group Progress
        </h1>
        <p style={{ color: 'rgba(240, 253, 244, 0.8)', fontSize: '0.92rem' }}>
          Track shared sustainability outcomes across academic departments, student housing, and eco clubs.
        </p>
      </div>

      {/* Collective Groups Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px', marginBottom: '40px' }}>
        {groups.map((group) => (
          <div
            key={group.id}
            className="glass-panel"
            style={{
              padding: '24px',
              background: 'rgba(8, 24, 16, 0.82)',
              border: '1px solid rgba(74, 222, 128, 0.28)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <span style={{
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#86efac',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.74rem',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                {group.type}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Users size={14} /> {group.membersCount} Members
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              {group.name}
            </h3>

            <p style={{ color: 'rgba(240, 253, 244, 0.72)', fontSize: '0.8rem', lineHeight: 1.4, marginBottom: '16px' }}>
              {group.description}
            </p>

            <div style={{
              background: 'rgba(12, 34, 23, 0.75)',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px'
            }}>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#4ade80' }}>
                  {group.collectiveImpact?.totalCo2eAvoidedKg} <span style={{ fontSize: '0.7rem' }}>kg CO₂e</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Est. Avoided</div>
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#facc15' }}>
                  {group.collectiveImpact?.totalActivities}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Logged Actions</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-Metric Recognition & Leaderboard Section */}
      <div className="glass-panel" style={{ padding: '32px', background: 'rgba(8, 24, 16, 0.88)' }}>
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#facc15', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
            <Award size={15} /> Balanced Gamification Architecture
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
            Multi-Metric Community Recognition
          </h2>
          <p style={{ color: '#a7f3d0', fontSize: '0.84rem' }}>
            Honoring diverse forms of participation rather than a single toxic high-score ladder.
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {metricTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedMetric(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: selectedMetric === tab.id ? 'rgba(34, 197, 94, 0.25)' : 'rgba(12, 32, 22, 0.65)',
                color: selectedMetric === tab.id ? '#ffffff' : '#a7f3d0',
                border: `1px solid ${selectedMetric === tab.id ? '#4ade80' : 'rgba(74, 222, 128, 0.2)'}`
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Winners Roster */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {leaderboards?.categories?.[selectedMetric]?.map((entry, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(12, 34, 23, 0.7)',
                border: '1px solid rgba(74, 222, 128, 0.25)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(34, 197, 94, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem'
              }}>
                {entry.avatar || '🌱'}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.98rem' }}>
                  {entry.name}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#a7f3d0' }}>
                  {entry.dept || entry.type}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#4ade80', fontWeight: 600, marginTop: '3px' }}>
                  {entry.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
