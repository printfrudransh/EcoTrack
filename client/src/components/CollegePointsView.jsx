import React, { useState, useEffect } from 'react';
import { GraduationCap, ShieldAlert, CheckCircle, FileCheck, Info, Award, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CollegePointsView() {
  const { user, token } = useAuth();
  const [rules, setRules] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollegePointsData();
  }, [token]);

  const loadCollegePointsData = async () => {
    try {
      const [rulesRes, sumRes] = await Promise.all([
        fetch('/api/college-points/rules', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/college-points/my-summary', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (rulesRes.ok) {
        const rData = await rulesRes.json();
        setRules(rData.rules || []);
      }
      if (sumRes.ok) {
        const sData = await sumRes.json();
        setSummary(sData);
      }
    } catch (e) {
      console.log('Error loading college point data:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '36px 0 60px' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '28px 36px',
          background: 'linear-gradient(135deg, rgba(8, 26, 17, 0.9) 0%, rgba(35, 17, 50, 0.6) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          borderRadius: '24px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
            <GraduationCap size={16} /> Academic Integration System
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
            College Activity Points
          </h1>
          <p style={{ color: 'rgba(240, 253, 244, 0.8)', fontSize: '0.92rem' }}>
            Map verified environmental initiatives to institutional extracurricular and mandatory activity criteria.
          </p>
        </div>

        {/* Current Student Total Points Pill */}
        <div style={{
          background: 'rgba(168, 85, 247, 0.2)',
          border: '1px solid rgba(168, 85, 247, 0.5)',
          borderRadius: '20px',
          padding: '16px 24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.76rem', color: '#e9d5ff', textTransform: 'uppercase', fontWeight: 700 }}>
            Certified Points Earned
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {summary?.totalCollegePointsEarned || user?.collegeActivityPoints || 18} <span style={{ fontSize: '1rem', color: '#c084fc' }}>Pts</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#d8b4fe', marginTop: '2px' }}>
            {summary?.eligibleActivitiesCount || 3} Faculty-Certified Actions
          </div>
        </div>
      </div>

      {/* Mandatory Regulatory Disclaimer Box */}
      <div
        style={{
          background: 'rgba(30, 20, 10, 0.85)',
          border: '1px solid rgba(245, 158, 11, 0.45)',
          borderRadius: '18px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start'
        }}
      >
        <ShieldAlert size={26} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>
            Official University & Regulatory Disclaimer
          </h4>
          <p style={{ color: '#fef3c7', fontSize: '0.86rem', lineHeight: 1.5 }}>
            EcoTrack serves as a digital environmental activity log and verified record keeper to support college evaluation. <strong>The platform does NOT claim to automatically award official VTU, AICTE, or university points.</strong> Official point accreditation and graduation credits are determined solely by your college administrator, faculty coordinator, and Dean of Student Welfare under university guidelines.
          </p>
        </div>
      </div>

      {/* Two Columns: Qualified Activity Rules & Student Log */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '30px' }}>
        {/* Left: Defined Qualified Activities Table */}
        <div className="glass-panel" style={{ padding: '28px', background: 'rgba(8, 24, 16, 0.88)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            Approved Institutional Qualification Rules
          </h2>
          <p style={{ color: '#a7f3d0', fontSize: '0.82rem', marginBottom: '20px' }}>
            Configured by {user?.collegeOrOrg || 'Your College Administrator'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {rules.map((rule) => (
              <div
                key={rule.id}
                style={{
                  background: 'rgba(12, 34, 23, 0.7)',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '1rem' }}>
                      {rule.title}
                    </span>
                    <span style={{
                      background: 'rgba(168, 85, 247, 0.2)',
                      color: '#d8b4fe',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 700
                    }}>
                      +{rule.pointsValue} Points
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#a7f3d0', marginTop: '4px' }}>
                    Minimum Requirement: <strong>{rule.minimumQuantity} unit(s)</strong>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: '6px', fontStyle: 'italic' }}>
                    Verification: {rule.officialVerificationRule}
                  </div>
                </div>

                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(168, 85, 247, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileCheck size={22} color="#c084fc" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: How to Claim Credit Guide */}
        <div className="glass-panel" style={{ padding: '28px', background: 'rgba(8, 24, 16, 0.88)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            Accreditation Steps
          </h2>
          <p style={{ color: '#a7f3d0', fontSize: '0.82rem', marginBottom: '20px' }}>
            How to transfer your verified EcoTrack logs to academic credits
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                step: '1',
                title: 'Log Approved Environmental Actions',
                desc: 'Record activities matching qualified criteria like sapling planting or campus cleanliness drives.'
              },
              {
                step: '2',
                title: 'Attach Geo-Evidence & Receipts',
                desc: 'Upload clear photographic evidence or attendance roster confirmations.'
              },
              {
                step: '3',
                title: 'Faculty / College Admin Verification',
                desc: 'Your designated department coordinator verifies the submission in the College Admin Portal.'
              },
              {
                step: '4',
                title: 'Official Credit Awarded',
                desc: 'College Activity Points are officially documented towards AICTE/VTU student activity requirements.'
              }
            ].map((st) => (
              <div key={st.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(168, 85, 247, 0.25)',
                  border: '1px solid #c084fc',
                  color: '#e9d5ff',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {st.step}
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700, marginBottom: '2px' }}>
                    {st.title}
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.78rem', lineHeight: 1.4 }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 950px) {
          div[style*="gridTemplateColumns: '1.4fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
