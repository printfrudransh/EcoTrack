import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, ShieldAlert, Droplets, Zap, Leaf, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ImpactAnalytics({ onOpenFactorsModal }) {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats/overview')
      .then((res) => res.json())
      .then((d) => setStats(d))
      .catch((e) => console.log(e));
  }, []);

  const categoryBreakdown = [
    { name: 'Eco-Commute (Cycling/Transit)', pct: 45, co2e: '8,290 kg', color: '#4ade80' },
    { name: 'Solid Waste & Recycling', pct: 28, co2e: '5,160 kg', color: '#22c55e' },
    { name: 'Grid Energy Conservation', pct: 15, co2e: '2,770 kg', color: '#facc15' },
    { name: 'Campus Tree Planting & Care', pct: 12, co2e: '2,210 kg', color: '#10b981' }
  ];

  const monthlyTrend = [
    { month: 'May', co2e: 1200, height: 35 },
    { month: 'Jun', co2e: 1850, height: 50 },
    { month: 'Jul', co2e: 2400, height: 65 },
    { month: 'Aug', co2e: 2950, height: 78 },
    { month: 'Sep', co2e: 3600, height: 90 },
    { month: 'Oct (Current)', co2e: 4200, height: 100 }
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
          <BarChart3 size={16} /> Environmental Intelligence
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
          Platform Impact Analytics
        </h1>
        <p style={{ color: 'rgba(240, 253, 244, 0.8)', fontSize: '0.92rem' }}>
          Audited lifecycle metrics quantifying community-wide greenhouse gas abatement and campus remediation.
        </p>
      </div>

      {/* Primary KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.8rem', color: '#a7f3d0', textTransform: 'uppercase', fontWeight: 700 }}>
            Estimated CO₂e Abated
          </span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            {stats?.platformImpact?.estimatedCo2eAvoidedKg?.toLocaleString() || '18,480'} <span style={{ fontSize: '1rem', color: '#4ade80' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
            Equivalent to ~42,000 miles of petrol driving avoided
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.8rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 700 }}>
            Estimated Water Conserved
          </span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            {stats?.platformImpact?.estimatedWaterSavedLiters?.toLocaleString() || '65,050'} <span style={{ fontSize: '1rem', color: '#38bdf8' }}>L</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
            Preserved through closed-loop reuse
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.8rem', color: '#facc15', textTransform: 'uppercase', fontWeight: 700 }}>
            Campus Issues Resolved
          </span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            {stats?.heroStats?.issuesResolved || '500+'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
            94.2% hazard inspection turnaround
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.8rem', color: '#c084fc', textTransform: 'uppercase', fontWeight: 700 }}>
            Active Campus Members
          </span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            {stats?.heroStats?.activeUsers || '2K+'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
            Across 14 departments and colleges
          </div>
        </div>
      </div>

      {/* Visual Charts Split: Trend vs Category Share */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px', marginBottom: '32px' }}>
        {/* Monthly Emissions Abated Bar Chart */}
        <div className="glass-panel" style={{ padding: '28px', background: 'rgba(8, 24, 16, 0.88)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                Cumulative Monthly Avoided CO₂e (kg)
              </h3>
              <p style={{ color: '#a7f3d0', fontSize: '0.78rem' }}>
                Estimated environmental trend across past 6 academic months
              </p>
            </div>
            <TrendingUp size={22} color="#4ade80" />
          </div>

          {/* Bar Chart Representation */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '220px', padding: '10px 0 0', borderBottom: '1px solid rgba(74, 222, 128, 0.2)' }}>
            {monthlyTrend.map((m) => (
              <div key={m.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 700 }}>
                  {m.co2e} kg
                </div>
                <div
                  style={{
                    width: '36px',
                    height: `${m.height}%`,
                    background: 'linear-gradient(180deg, #4ade80 0%, #22c55e 60%, rgba(34, 197, 94, 0.2) 100%)',
                    borderRadius: '8px 8px 0 0',
                    boxShadow: '0 0 12px rgba(74, 222, 128, 0.35)',
                    transition: 'height 0.4s ease'
                  }}
                />
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '4px' }}>
                  {m.month}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Contribution Distribution */}
        <div className="glass-panel" style={{ padding: '28px', background: 'rgba(8, 24, 16, 0.88)' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Impact by Domain
            </h3>
            <p style={{ color: '#a7f3d0', fontSize: '0.78rem' }}>
              Proportional distribution of community climate savings
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {categoryBreakdown.map((cat) => (
              <div key={cat.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>{cat.name}</span>
                  <span style={{ color: cat.color, fontWeight: 700 }}>{cat.pct}% ({cat.co2e})</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(6, 17, 12, 0.8)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${cat.pct}%`,
                      height: '100%',
                      background: cat.color,
                      borderRadius: '9999px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Methodology & Footnote */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onOpenFactorsModal}
          style={{
            background: 'none',
            border: 'none',
            color: '#86efac',
            fontSize: '0.85rem',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          Review scientific emission factor inventory, assumptions, and validation methodology →
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: '1.4fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
