import React, { useEffect, useState } from 'react';
import { X, BookOpen, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ScientificFactorsModal({ isOpen, onClose }) {
  const [factors, setFactors] = useState([]);
  const [disclaimer, setDisclaimer] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetch('/api/activities/factors')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.factors) {
            setFactors(data.factors);
            setDisclaimer(data.disclaimer);
          }
        })
        .catch((err) => console.log('Error loading factors:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(3, 10, 7, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '880px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(8, 24, 16, 0.95)',
          border: '1px solid rgba(74, 222, 128, 0.45)',
          borderRadius: '24px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid rgba(74, 222, 128, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(12, 32, 22, 0.8)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(74, 222, 128, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <BookOpen size={22} color="#4ade80" />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                Scientific Emission Factors & Methodology
              </h3>
              <p style={{ color: '#a7f3d0', fontSize: '0.82rem' }}>
                Transparent life-cycle analysis factors and anti-cheating verification standards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Disclaimer Banner */}
        <div
          style={{
            padding: '12px 28px',
            background: 'rgba(34, 197, 94, 0.12)',
            borderBottom: '1px solid rgba(74, 222, 128, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#86efac',
            fontSize: '0.84rem'
          }}
        >
          <AlertCircle size={18} color="#4ade80" flexShrink={0} />
          <span>
            <strong>Accuracy Protocol:</strong> EcoTrack calculates <em>"Estimated Environmental Impact"</em> derived from verified institutional lifecycle inventories. Activities without definitive conversion factors are logged as pure participation units rather than hypothetical carbon offsets.
          </span>
        </div>

        {/* Body Table */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(74, 222, 128, 0.3)', color: '#4ade80', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>Activity Type</th>
                  <th style={{ padding: '10px 12px' }}>Unit</th>
                  <th style={{ padding: '10px 12px' }}>Est. CO₂e Avoided</th>
                  <th style={{ padding: '10px 12px' }}>Water Saved</th>
                  <th style={{ padding: '10px 12px' }}>Max Daily Limit</th>
                  <th style={{ padding: '10px 12px' }}>Inventory Source</th>
                </tr>
              </thead>
              <tbody>
                {factors.map((f, idx) => (
                  <tr
                    key={f.activityType || idx}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      color: 'rgba(240, 253, 244, 0.9)'
                    }}
                  >
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600, color: '#ffffff' }}>{f.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{f.category}</div>
                    </td>
                    <td style={{ padding: '12px', color: '#a7f3d0' }}>per {f.unit}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#4ade80' }}>
                      {f.hasReliableFactor ? `${f.co2eAvoidedPerUnit} kg` : 'Participation Only'}
                    </td>
                    <td style={{ padding: '12px', color: '#86efac' }}>
                      {f.waterSavedPerUnit > 0 ? `${f.waterSavedPerUnit} L` : '—'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          background: 'rgba(34, 197, 94, 0.15)',
                          border: '1px solid rgba(74, 222, 128, 0.3)',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          color: '#86efac'
                        }}
                      >
                        ≤ {f.maxReasonableDailyQuantity} {f.unit}/day
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '0.75rem', color: '#cbd5e1' }}>
                      <div>{f.source} ({f.year})</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{f.assumptions}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid rgba(74, 222, 128, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(12, 32, 22, 0.6)'
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#4ade80" />
            Anti-cheating thresholds automatically flag abnormal submission spikes for campus supervisor review.
          </div>
          <button onClick={onClose} className="btn-primary-gradient" style={{ padding: '8px 22px', fontSize: '0.88rem' }}>
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
