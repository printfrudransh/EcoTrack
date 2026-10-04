import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle, Clock, XCircle, Eye, 
  MapPin, User, FileText, Check, Award, Filter, RefreshCw 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [issues, setIssues] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionStatus, setActionStatus] = useState('Under Review');
  const [activeTab, setActiveTab] = useState('issues'); // 'issues' or 'college_points'
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadData();
  }, [token]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [issueRes, actRes, statsRes] = await Promise.all([
        fetch('/api/issues', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/activities?all=true&limit=20', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/stats/overview')
      ]);

      if (issueRes.ok) {
        const iData = await issueRes.json();
        setIssues(iData.issues || []);
      }
      if (actRes.ok) {
        const aData = await actRes.json();
        setActivities(aData.activities || []);
      }
      if (statsRes.ok) {
        const sData = await statsRes.json();
        setStats(sData);
      }
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (issueId, newStatus) => {
    try {
      const res = await fetch(`/api/issues/${issueId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          adminNotes: adminNotes || `Status updated to ${newStatus} by ${user?.name}`
        })
      });

      if (res.ok) {
        setToast({ type: 'success', message: `Report marked as "${newStatus}"` });
        setSelectedIssue(null);
        setAdminNotes('');
        loadData();
      } else {
        setToast({ type: 'error', message: 'Failed to update issue status.' });
      }
    } catch (e) {
      setToast({ type: 'error', message: 'Network error updating issue.' });
    }
  };

  const handleVerifyCollegeActivity = async (activityId, approved, points = 2) => {
    try {
      const res = await fetch('/api/college-points/verify-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          activityId,
          approved,
          pointsAwarded: points,
          reviewNotes: approved ? 'Certified by Campus Sustainability Officer' : 'Flagged for inspection'
        })
      });

      if (res.ok) {
        setToast({
          type: 'success',
          message: approved ? `Activity approved! ${points} College Activity Points credited.` : 'Activity flagged.'
        });
        loadData();
      }
    } catch (e) {
      setToast({ type: 'error', message: 'Error reviewing activity.' });
    }
  };

  const pendingCount = issues.filter(i => i.status === 'Pending').length;
  const reviewCount = issues.filter(i => i.status === 'Under Review').length;
  const actionCount = issues.filter(i => i.status === 'Action Taken').length;
  const resolvedCount = issues.filter(i => i.status === 'Resolved').length;

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '36px 0 60px' }}>
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
            <ShieldCheck size={16} /> Institutional Administration Portal
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
            Campus Environmental Operations Hub
          </h1>
          <p style={{ color: 'rgba(240, 253, 244, 0.8)', fontSize: '0.92rem' }}>
            Review student environmental hazards, dispatch remediation teams, and certify College Activity Points.
          </p>
        </div>

        <button
          onClick={loadData}
          className="btn-glass"
          style={{ fontSize: '0.85rem' }}
        >
          <RefreshCw size={15} /> Refresh Feed
        </button>
      </div>

      {toast && (
        <div style={{
          background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
          border: `1px solid ${toast.type === 'error' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(74, 222, 128, 0.5)'}`,
          color: toast.type === 'error' ? '#fca5a5' : '#86efac',
          padding: '12px 20px',
          borderRadius: '12px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {/* Admin KPI Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '32px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: '#a7f3d0', textTransform: 'uppercase', fontWeight: 700 }}>Total Reports</span>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>{issues.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>From campus community</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(234, 179, 8, 0.35)' }}>
          <span style={{ fontSize: '0.78rem', color: '#facc15', textTransform: 'uppercase', fontWeight: 700 }}>Pending Review</span>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fde047', marginTop: '4px' }}>{pendingCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Requires immediate inspection</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
          <span style={{ fontSize: '0.78rem', color: '#c084fc', textTransform: 'uppercase', fontWeight: 700 }}>Action In Progress</span>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#e9d5ff', marginTop: '4px' }}>{actionCount + reviewCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Assigned to facilities</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(34, 197, 94, 0.35)' }}>
          <span style={{ fontSize: '0.78rem', color: '#4ade80', textTransform: 'uppercase', fontWeight: 700 }}>Resolved Hazards</span>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#4ade80', marginTop: '4px' }}>{resolvedCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Remediation completed</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(74, 222, 128, 0.2)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('issues')}
          style={{
            background: activeTab === 'issues' ? 'rgba(34, 197, 94, 0.25)' : 'transparent',
            border: `1px solid ${activeTab === 'issues' ? '#4ade80' : 'transparent'}`,
            color: activeTab === 'issues' ? '#ffffff' : '#a7f3d0',
            padding: '8px 20px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Environmental Issue Verification ({issues.length})
        </button>

        <button
          onClick={() => setActiveTab('college_points')}
          style={{
            background: activeTab === 'college_points' ? 'rgba(168, 85, 247, 0.25)' : 'transparent',
            border: `1px solid ${activeTab === 'college_points' ? '#c084fc' : 'transparent'}`,
            color: activeTab === 'college_points' ? '#ffffff' : '#e9d5ff',
            padding: '8px 20px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          College Activity Points Certification
        </button>
      </div>

      {/* Tab 1: Issues Management Section */}
      {activeTab === 'issues' && (
        <div className="glass-panel" style={{ padding: '28px', background: 'rgba(8, 24, 16, 0.88)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '18px' }}>
            Environmental Reports Roster
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(74, 222, 128, 0.3)', color: '#4ade80', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Evidence</th>
                  <th style={{ padding: '12px' }}>Issue & Location</th>
                  <th style={{ padding: '12px' }}>Reporter</th>
                  <th style={{ padding: '12px' }}>Severity</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr
                    key={issue.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      color: 'rgba(240, 253, 244, 0.9)'
                    }}
                  >
                    {/* Evidence Photo */}
                    <td style={{ padding: '12px' }}>
                      {issue.imageUrl ? (
                        <div
                          onClick={() => setSelectedIssue(issue)}
                          style={{ width: '56px', height: '56px', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(74, 222, 128, 0.3)' }}
                        >
                          <img src={issue.imageUrl} alt="Hazard photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ) : (
                        <div style={{ width: '56px', height: '56px', borderRadius: '10px', background: 'rgba(12, 32, 22, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <AlertTriangle size={20} color="#facc15" />
                        </div>
                      )}
                    </td>

                    {/* Issue Type & Location */}
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 700, color: '#ffffff' }}>{issue.title}</div>
                      <div style={{ fontSize: '0.78rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <MapPin size={12} color="#4ade80" /> {issue.location}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '3px', maxWidth: '380px' }}>
                        {issue.description}
                      </div>
                    </td>

                    {/* Reporter */}
                    <td style={{ padding: '12px' }}>
                      <div style={{ color: '#ffffff', fontWeight: 600 }}>{issue.reporterName}</div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{issue.reporterEmail}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>{new Date(issue.createdAt).toLocaleDateString()}</div>
                    </td>

                    {/* Severity */}
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: issue.severity === 'Critical' ? 'rgba(239, 68, 68, 0.2)' : issue.severity === 'High' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                        color: issue.severity === 'Critical' ? '#f87171' : issue.severity === 'High' ? '#fb923c' : '#facc15'
                      }}>
                        {issue.severity}
                      </span>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '12px' }}>
                      <span className={`badge-status badge-${issue.status.toLowerCase().replace(' ', '-')}`}>
                        {issue.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => setSelectedIssue(issue)}
                        className="btn-glass"
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      >
                        Inspect & Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: College Activity Points Certification Section */}
      {activeTab === 'college_points' && (
        <div className="glass-panel" style={{ padding: '28px', background: 'rgba(8, 24, 16, 0.88)' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Student Activity Verification Queue
            </h2>
            <p style={{ color: '#c084fc', fontSize: '0.82rem' }}>
              Verify student self-reported environmental actions for accredited College Activity Points (AICTE / VTU / Institution framework).
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Student</th>
                  <th style={{ padding: '12px' }}>Activity</th>
                  <th style={{ padding: '12px' }}>Quantity</th>
                  <th style={{ padding: '12px' }}>Est. Impact</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>College Points</th>
                  <th style={{ padding: '12px' }}>Certify Action</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act) => (
                  <tr
                    key={act.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      color: 'rgba(240, 253, 244, 0.9)'
                    }}
                  >
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600, color: '#ffffff' }}>{act.userName}</div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{new Date(act.date).toLocaleDateString()}</div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600, color: '#a7f3d0' }}>{act.title}</div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{act.notes || 'Routine campus action'}</div>
                    </td>

                    <td style={{ padding: '12px', fontWeight: 600, color: '#ffffff' }}>
                      {act.quantity} {act.unit}
                    </td>

                    <td style={{ padding: '12px', color: '#4ade80', fontWeight: 600 }}>
                      -{act.estimatedImpact?.co2eAvoidedKg} kg CO₂e
                    </td>

                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: act.verificationStatus === 'verified' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                        color: act.verificationStatus === 'verified' ? '#4ade80' : '#facc15'
                      }}>
                        {act.verificationStatus}
                      </span>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <span style={{ fontWeight: 700, color: '#c084fc' }}>
                        +{act.collegePointsAwarded || 2} Pts
                      </span>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleVerifyCollegeActivity(act.id, true, act.collegePointsAwarded || 2)}
                          style={{
                            background: 'rgba(34, 197, 94, 0.2)',
                            border: '1px solid rgba(74, 222, 128, 0.5)',
                            color: '#4ade80',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleVerifyCollegeActivity(act.id, false, 0)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#f87171',
                            borderRadius: '8px',
                            padding: '6px 10px',
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          Flag
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Issue Inspection and Status Progression */}
      {selectedIssue && (
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
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              background: '#091d14',
              border: '1px solid rgba(74, 222, 128, 0.5)',
              borderRadius: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.85rem', color: '#facc15', fontWeight: 700, textTransform: 'uppercase' }}>
                {selectedIssue.issueType} • {selectedIssue.severity} Severity
              </div>
              <button
                onClick={() => setSelectedIssue(null)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              {selectedIssue.title}
            </h3>

            <div style={{ fontSize: '0.85rem', color: '#a7f3d0', marginBottom: '16px' }}>
              Reported by <strong>{selectedIssue.reporterName}</strong> ({selectedIssue.reporterEmail}) at <strong>{selectedIssue.location}</strong>
            </div>

            {selectedIssue.imageUrl && (
              <div style={{ width: '100%', maxHeight: '340px', borderRadius: '16px', overflow: 'hidden', marginBottom: '18px', background: '#000' }}>
                <img
                  src={selectedIssue.imageUrl}
                  alt="Hazard evidence"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            )}

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
              {selectedIssue.description}
            </p>

            {/* Admin Action Controls */}
            <div style={{ background: 'rgba(12, 34, 23, 0.75)', border: '1px solid rgba(74, 222, 128, 0.25)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
              <label style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                Update Operational Status
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '14px' }}>
                {['Pending', 'Under Review', 'Action Taken', 'Resolved'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setActionStatus(st)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: actionStatus === st ? 'rgba(34, 197, 94, 0.3)' : 'rgba(8, 22, 15, 0.8)',
                      color: actionStatus === st ? '#ffffff' : '#a7f3d0',
                      border: `1px solid ${actionStatus === st ? '#4ade80' : 'rgba(74, 222, 128, 0.2)'}`
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <label style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                Remediation / Inspection Notes
              </label>
              <input
                type="text"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. Sanitation team notified, bins cleared and replaced."
                className="input-field"
                style={{ height: '44px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => handleUpdateStatus(selectedIssue.id, actionStatus)}
                className="btn-primary-gradient"
                style={{ flex: 1, height: '46px' }}
              >
                Confirm Status Update
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedIssue.id, 'Rejected')}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                  borderRadius: 'var(--radius-full)',
                  padding: '0 20px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reject Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
