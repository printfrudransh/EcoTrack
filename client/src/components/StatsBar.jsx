import React, { useEffect, useState } from 'react';
import { Leaf, Users, Trees, BarChart2 } from 'lucide-react';

export default function StatsBar({ onStatClick }) {
  const [stats, setStats] = useState({
    activitiesTracked: '10K+',
    activeUsers: '2K+',
    issuesResolved: '500+',
    ongoingCampaigns: '30+'
  });

  useEffect(() => {
    fetch('/api/stats/overview')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.heroStats) {
          setStats(data.heroStats);
        }
      })
      .catch((err) => console.log('Stats fetched with defaults:', err));
  }, []);

  const items = [
    {
      id: 'activities',
      icon: <Leaf size={24} color="#4ade80" />,
      value: '10K+',
      label: 'Actions Tracked',
      target: 'activities'
    },
    {
      id: 'issues',
      icon: <Trees size={24} color="#4ade80" />,
      value: '2.5K+',
      label: 'Issues Reported',
      target: 'issues'
    },
    {
      id: 'campaigns',
      icon: <Users size={24} color="#4ade80" />,
      value: '520+',
      label: 'Campaigns',
      target: 'campaigns'
    },
    {
      id: 'co2',
      icon: <BarChart2 size={24} color="#4ade80" />,
      value: '74t',
      label: 'CO₂ Saved',
      target: 'impact'
    }
  ];

  return (
    <div
      className="stats-bar-wrapper"
      style={{
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        zIndex: 10,
        position: 'relative'
      }}
    >
      <div
        className="glass-panel"
        style={{
          background: 'rgba(8, 24, 16, 0.78)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(34, 197, 94, 0.15)',
          padding: '16px 28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onStatClick && onStatClick(item.target)}
            className="stat-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '14px',
              borderRight: index < items.length - 1 ? '1px solid rgba(74, 222, 128, 0.15)' : 'none',
              transition: 'background 0.2s ease, transform 0.2s ease'
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(74, 222, 128, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {item.icon}
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.1
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: '0.82rem',
                  color: 'rgba(240, 253, 244, 0.75)',
                  fontWeight: 500,
                  marginTop: '2px'
                }}
              >
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .stat-item:hover {
          background: rgba(34, 197, 94, 0.12);
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .stats-bar-wrapper .glass-panel {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stat-item {
            border-right: none !important;
          }
        }
        @media (max-width: 560px) {
          .stats-bar-wrapper .glass-panel {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
