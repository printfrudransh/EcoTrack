import React, { useEffect, useState } from 'react';
import { Leaf, Plus, Info, AlertCircle, ShieldCheck, CheckCircle2, Filter, Calendar, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';

export default function ActivityTracker({ onOpenFactorsModal }) {
  const { user, token } = useAuth();
  const [factors, setFactors] = useState([]);
  const [selectedType, setSelectedType] = useState('cycling_commute');
  const [quantity, setQuantity] = useState('5');
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    fetchFactors();
    fetchActivities();
  }, [token]);

  const fetchFactors = async () => {
    try {
      const res = await fetch('/api/activities/factors');
      if (res.ok) {
        const data = await res.json();
        setFactors(data.factors || []);
      }
    } catch (e) {
      console.log('Error fetching factors:', e);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/activities', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setActivities(data.activities || []);
      }
    } catch (e) {
      console.log('Error loading activities:', e);
    }
  };

  const activeFactor = factors.find((f) => f.activityType === selectedType) || factors[0] || {
    unit: 'km',
    co2eAvoidedPerUnit: 0.171,
    waterSavedPerUnit: 0,
    energySavedPerUnit: 0.25,
    source: 'EPA / DEFRA',
    maxReasonableDailyQuantity: 50
  };

  const numQty = parseFloat(quantity) || 0;
  const estimatedCo2e = (activeFactor.co2eAvoidedPerUnit * numQty).toFixed(3);
  const estimatedWater = (activeFactor.waterSavedPerUnit * numQty).toFixed(1);
  const estimatedEnergy = (activeFactor.energySavedPerUnit * numQty).toFixed(1);
  const isOverReasonableLimit = numQty > activeFactor.maxReasonableDailyQuantity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (numQty <= 0) {
      setFeedback({ type: 'error', message: 'Please enter a valid quantity greater than zero.' });
      return;
    }

    if (isOverReasonableLimit) {
      setFeedback({
        type: 'error',
        message: `Anti-Cheating Triggered: ${numQty} ${activeFactor.unit} exceeds the reasonable daily cap of ${activeFactor.maxReasonableDailyQuantity} ${activeFactor.unit}. Please log realistic personal daily totals.`
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          activityType: selectedType,
          quantity: numQty,
          notes
        })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setFeedback({
          type: 'success',
          message: `Logged successfully! Estimated impact: -${estimatedCo2e} kg CO₂e avoided.`
        });
        setNotes('');
        setQuantity('5');
        fetchActivities();

        // Celebration confetti
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#4ade80', '#22c55e', '#86efac']
          });
        } catch (_) {}
      } else {
        setFeedback({ type: 'error', message: data.message || 'Failed to submit activity.' });
      }
    } catch (err) {
      setLoading(false);
      setFeedback({ type: 'error', message: 'Network error submitting activity.' });
    }
  };

  const filteredActivities = filterCategory === 'All' 
    ? activities 
    : activities.filter(a => a.category === filterCategory);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '36px 0 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
          <Leaf size={16} /> Environmental Action Tracker
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
          Record Verified Campus Action
        </h1>
        <p style={{ color: 'rgba(240, 253, 244, 0.8)', fontSize: '0.95rem' }}>
          Predefined lifecycle factors automatically calculate your estimated environmental impact.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '32px' }}>
        {/* Left Form Panel */}
        <div className="glass-panel" style={{ padding: '32px', background: 'rgba(8, 24, 16, 0.85)', borderRadius: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '18px' }}>
            Log New Activity
          </h2>

          {feedback && (
            <div style={{
              background: feedback.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
              border: `1px solid ${feedback.type === 'error' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(74, 222, 128, 0.4)'}`,
              color: feedback.type === 'error' ? '#fca5a5' : '#86efac',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              {feedback.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              <span>{feedback.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Activity Type Dropdown */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Activity Category & Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-field"
                style={{ height: '48px', cursor: 'pointer' }}
              >
                {factors.map((f) => (
                  <option key={f.activityType} value={f.activityType} style={{ background: '#091c13', color: '#ffffff' }}>
                    {f.title} ({f.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Input */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 600 }}>
                  Quantity ({activeFactor.unit})
                </label>
                <span style={{ fontSize: '0.75rem', color: isOverReasonableLimit ? '#f87171' : '#94a3b8' }}>
                  Anti-cheat cap: ≤ {activeFactor.maxReasonableDailyQuantity} {activeFactor.unit}/day
                </span>
              </div>
              <input
                type="number"
                step="any"
                min="0.1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input-field"
                style={{
                  height: '48px',
                  borderColor: isOverReasonableLimit ? '#ef4444' : undefined
                }}
              />
            </div>

            {/* Live Impact Calculation Preview Card */}
            <div style={{
              background: 'rgba(12, 34, 23, 0.75)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a7f3d0', fontWeight: 700 }}>
                  Estimated Environmental Impact
                </span>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>EPA / DEFRA Model</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4ade80' }}>
                    -{estimatedCo2e} <span style={{ fontSize: '0.8rem' }}>kg CO₂e</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Avoided emissions</div>
                </div>

                {parseFloat(estimatedWater) > 0 ? (
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>
                      +{estimatedWater} <span style={{ fontSize: '0.8rem' }}>Liters</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Water saved</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#facc15' }}>
                      {estimatedEnergy} <span style={{ fontSize: '0.8rem' }}>kWh</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Energy conserved</div>
                  </div>
                )}
              </div>

              <div style={{ fontSize: '0.72rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '8px' }}>
                Source: {activeFactor.source} ({activeFactor.year})
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Notes / Campus Location (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Commute to Block C lab"
                className="input-field"
                style={{ height: '44px' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading || isOverReasonableLimit}
              className="btn-primary-gradient"
              style={{ width: '100%', height: '48px', fontSize: '1rem', marginTop: '6px' }}
            >
              <Plus size={18} />
              {loading ? 'Validating...' : 'Log Verified Action'}
            </button>
          </form>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={onOpenFactorsModal}
              style={{
                background: 'none',
                border: 'none',
                color: '#86efac',
                fontSize: '0.78rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              View complete scientific factors & conversion references
            </button>
          </div>
        </div>

        {/* Right Activities History Table */}
        <div className="glass-panel" style={{ padding: '32px', background: 'rgba(8, 24, 16, 0.85)', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                Logged Actions History
              </h2>
              <p style={{ color: '#a7f3d0', fontSize: '0.82rem' }}>
                Tracked records with estimated environmental impact
              </p>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['All', 'Transportation', 'Waste & Recycling', 'Energy & Water', 'Restoration & Community'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: filterCategory === cat ? 'rgba(34, 197, 94, 0.25)' : 'rgba(12, 32, 22, 0.6)',
                    color: filterCategory === cat ? '#ffffff' : '#a7f3d0',
                    border: `1px solid ${filterCategory === cat ? '#4ade80' : 'rgba(74, 222, 128, 0.2)'}`
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '560px', overflowY: 'auto' }}>
            {filteredActivities.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                No activities match this category yet.
              </div>
            ) : (
              filteredActivities.map((act) => (
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
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>{act.title}</span>
                      {act.collegePointsEligible && (
                        <span style={{
                          background: 'rgba(168, 85, 247, 0.2)',
                          color: '#c084fc',
                          border: '1px solid rgba(168, 85, 247, 0.4)',
                          borderRadius: '6px',
                          padding: '1px 6px',
                          fontSize: '0.7rem',
                          fontWeight: 600
                        }}>
                          +{act.collegePointsAwarded} College Pts
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#a7f3d0', marginTop: '2px' }}>
                      Quantity: <strong>{act.quantity} {act.unit}</strong> • {new Date(act.date).toLocaleDateString()}
                    </div>

                    {act.notes && (
                      <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: '4px', fontStyle: 'italic' }}>
                        "{act.notes}"
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: '#4ade80', fontSize: '1rem' }}>
                      -{act.estimatedImpact?.co2eAvoidedKg} kg CO₂e
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Estimated impact
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 950px) {
          div[style*="gridTemplateColumns: '1.2fr 1.8fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
