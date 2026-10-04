import React, { useState, useEffect } from 'react';
import { Users, Calendar, Award, CheckCircle, ArrowRight, Plus, Target, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export default function CampaignsView() {
  const { user, token } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // New Campaign Form
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Zero Waste');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-31');
  const [targetMetric, setTargetMetric] = useState('kg plastic diverted');
  const [targetValue, setTargetValue] = useState('500');

  useEffect(() => {
    fetchCampaigns();
  }, [token]);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/campaigns', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (e) {
      console.log('Error fetching campaigns:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (id, campaignTitle) => {
    try {
      const res = await fetch(`/api/campaigns/${id}/join`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setFeedback(`You have joined "${campaignTitle}"! Complete activities to hit the community target.`);
        fetchCampaigns();
        try {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
        } catch (_) {}
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          tagline,
          description,
          category,
          startDate,
          endDate,
          targetMetric,
          targetValue
        })
      });

      if (res.ok) {
        setShowCreateModal(false);
        setTitle('');
        setTagline('');
        setDescription('');
        fetchCampaigns();
      }
    } catch (e) {
      console.error(e);
    }
  };

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
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
            <Users size={16} /> Campus Collective Action
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
            Sustainability Campaigns & Challenges
          </h1>
          <p style={{ color: 'rgba(240, 253, 244, 0.8)', fontSize: '0.92rem' }}>
            Unite with student clubs, faculty, and departments for high-impact seasonal sustainability sprints.
          </p>
        </div>

        {(user?.role === 'admin' || user?.role === 'college_admin') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary-gradient"
            style={{ fontSize: '0.92rem' }}
          >
            <Plus size={18} /> Launch New Campaign
          </button>
        )}
      </div>

      {feedback && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.2)',
          border: '1px solid rgba(74, 222, 128, 0.4)',
          color: '#86efac',
          padding: '12px 20px',
          borderRadius: '14px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {/* Campaigns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '26px' }}>
        {campaigns.map((camp) => {
          const progressPercent = Math.min(
            100,
            Math.round(((camp.targetGoal?.currentValue || 0) / (camp.targetGoal?.targetValue || 1)) * 100)
          );

          return (
            <div
              key={camp.id}
              className="glass-panel"
              style={{
                padding: '28px',
                background: 'rgba(8, 24, 16, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    background: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(74, 222, 128, 0.35)',
                    color: '#86efac',
                    borderRadius: 'var(--radius-full)',
                    padding: '3px 10px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    {camp.category}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} color="#4ade80" /> Ends {new Date(camp.endDate).toLocaleDateString()}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                  {camp.title}
                </h3>

                {camp.tagline && (
                  <p style={{ color: '#a7f3d0', fontSize: '0.85rem', fontWeight: 500, marginBottom: '10px' }}>
                    {camp.tagline}
                  </p>
                )}

                <p style={{ color: 'rgba(240, 253, 244, 0.72)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '18px' }}>
                  {camp.description}
                </p>

                {/* Target Progress Bar */}
                <div style={{ background: 'rgba(12, 34, 23, 0.8)', border: '1px solid rgba(74, 222, 128, 0.25)', borderRadius: '16px', padding: '14px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>Community Target</span>
                    <span style={{ color: '#4ade80', fontWeight: 700 }}>
                      {camp.targetGoal?.currentValue} / {camp.targetGoal?.targetValue} {camp.targetGoal?.targetMetric} ({progressPercent}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(6, 17, 12, 0.9)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                        boxShadow: '0 0 10px #4ade80'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontSize: '0.82rem' }}>
                  <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={15} color="#4ade80" /> <strong>{camp.participantsCount || 0}</strong> participants
                  </span>
                  <span style={{ color: '#facc15', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Award size={15} /> Badge: <strong>{camp.badgeReward}</strong>
                  </span>
                </div>

                {camp.hasJoined ? (
                  <button
                    disabled
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(34, 197, 94, 0.18)',
                      border: '1px solid rgba(74, 222, 128, 0.4)',
                      color: '#4ade80',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <CheckCircle size={18} /> Participating in Campaign
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoin(camp.id, camp.title)}
                    className="btn-primary-gradient"
                    style={{ width: '100%', height: '46px', fontSize: '0.92rem' }}
                  >
                    <span>Join Campaign</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Create Campaign Modal */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(3, 10, 7, 0.9)',
            backdropFilter: 'blur(16px)',
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
              maxWidth: '560px',
              padding: '32px',
              background: '#091c13',
              border: '1px solid rgba(74, 222, 128, 0.45)',
              borderRadius: '24px'
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
              Launch Institutional Campaign
            </h3>

            <form onSubmit={handleCreateCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Campaign Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Campus Solar Kilowatt Challenge"
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Short motto or target"
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Goals and participation rules..."
                  className="input-field"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Target Metric</label>
                  <input
                    type="text"
                    value={targetMetric}
                    onChange={(e) => setTargetMetric(e.target.value)}
                    placeholder="e.g. kg CO2e avoided"
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Goal Value</label>
                  <input
                    type="number"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-primary-gradient" style={{ flex: 1 }}>
                  Publish Campaign
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-glass"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
