import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, UploadCloud, MapPin, CheckCircle, Clock, ShieldAlert, 
  Trash2, Droplet, Flame, Eye, Image as ImageIcon, Filter, Check 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function IssueReporter() {
  const { user, token } = useAuth();
  const [issues, setIssues] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedIssueModal, setSelectedIssueModal] = useState(null);

  // Form State
  const [issueType, setIssueType] = useState('Overflowing Bins');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formFeedback, setFormFeedback] = useState(null);

  const issueTypes = [
    'Garbage Dumping',
    'Overflowing Bins',
    'Waste Mismanagement',
    'Water Pollution',
    'Open Waste Burning',
    'Damaged Trees',
    'Other Environmental Issue'
  ];

  useEffect(() => {
    fetchIssues();
  }, [token, filterStatus]);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const url = filterStatus === 'all' ? '/api/issues' : `/api/issues?status=${filterStatus}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setIssues(data.issues || []);
      }
    } catch (e) {
      console.log('Error fetching issues:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormFeedback(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('issueType', issueType);
      formData.append('title', title || `${issueType} at ${location}`);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('severity', severity);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      setSubmitting(false);

      if (res.ok) {
        setFormFeedback({
          type: 'success',
          message: 'Environmental report submitted successfully! Campus facilities has been alerted.'
        });
        setTitle('');
        setDescription('');
        setLocation('');
        setSelectedFile(null);
        setPreviewUrl('');
        fetchIssues();
      } else {
        setFormFeedback({ type: 'error', message: data.message || 'Submission failed' });
      }
    } catch (err) {
      setSubmitting(false);
      setFormFeedback({ type: 'error', message: 'Network error submitting report.' });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="badge-status badge-pending"><Clock size={12} /> Pending</span>;
      case 'Under Review':
        return <span className="badge-status badge-review"><Eye size={12} /> Under Review</span>;
      case 'Action Taken':
        return <span className="badge-status badge-action"><AlertTriangle size={12} /> Action Taken</span>;
      case 'Resolved':
        return <span className="badge-status badge-resolved"><CheckCircle size={12} /> Resolved</span>;
      case 'Rejected':
        return <span className="badge-status badge-rejected">Rejected</span>;
      default:
        return <span className="badge-status">{status}</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '36px 0 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#facc15', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
          <AlertTriangle size={16} /> Campus Environmental Issue Hub
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
          Report Hazards & Waste Mismanagement
        </h1>
        <p style={{ color: 'rgba(240, 253, 244, 0.8)', fontSize: '0.95rem' }}>
          Document and track environmental hazards across campus grounds for prompt institutional resolution.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '32px' }}>
        {/* Left: Report Form */}
        <div className="glass-panel" style={{ padding: '32px', background: 'rgba(8, 24, 16, 0.85)', borderRadius: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '18px' }}>
            Submit Environmental Report
          </h2>

          {formFeedback && (
            <div style={{
              background: formFeedback.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
              border: `1px solid ${formFeedback.type === 'error' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(74, 222, 128, 0.4)'}`,
              color: formFeedback.type === 'error' ? '#fca5a5' : '#86efac',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '18px'
            }}>
              {formFeedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Issue Type */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Issue Classification
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="input-field"
                style={{ height: '48px', cursor: 'pointer' }}
              >
                {issueTypes.map((type) => (
                  <option key={type} value={type} style={{ background: '#091c13', color: '#ffffff' }}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Specific Location
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(167, 243, 208, 0.6)' }} />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. South Canteen Rear / Library Lawn East"
                  className="input-field"
                  style={{ paddingLeft: '44px', height: '48px' }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Detailed Description & Urgency
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the hazard, cause, and approximate scale..."
                className="input-field"
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Severity Radio Group */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Assessed Severity
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {['Low', 'Medium', 'High', 'Critical'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSeverity(lvl)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '10px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: severity === lvl ? 'rgba(250, 204, 21, 0.25)' : 'rgba(12, 32, 22, 0.7)',
                      color: severity === lvl ? '#fde047' : 'rgba(240, 253, 244, 0.7)',
                      border: `1px solid ${severity === lvl ? '#facc15' : 'rgba(74, 222, 128, 0.2)'}`
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Evidence Image Upload */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Upload Photographic Evidence (Recommended)
              </label>
              <div
                style={{
                  border: '2px dashed rgba(74, 222, 128, 0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  background: 'rgba(12, 32, 22, 0.5)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
                {previewUrl ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                    <img
                      src={previewUrl}
                      alt="Upload preview"
                      style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '10px' }}
                    />
                    <div style={{ textAlign: 'left', fontSize: '0.82rem' }}>
                      <div style={{ color: '#4ade80', fontWeight: 600 }}>{selectedFile?.name}</div>
                      <div style={{ color: '#94a3b8' }}>Click to change photo</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <UploadCloud size={28} color="#4ade80" style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>
                      Drop hazard photo here or click to browse
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '4px' }}>
                      JPG, PNG, WebP up to 5MB
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary-gradient"
              style={{
                width: '100%',
                height: '48px',
                marginTop: '6px',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #facc15 0%, #eab308 50%, #ca8a04 100%)',
                color: '#261b00'
              }}
            >
              <AlertTriangle size={18} />
              {submitting ? 'Submitting Report...' : 'Submit Environmental Report'}
            </button>
          </form>
        </div>

        {/* Right: Live Campus Issues Feed */}
        <div className="glass-panel" style={{ padding: '32px', background: 'rgba(8, 24, 16, 0.85)', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                Active Campus Reports
              </h2>
              <p style={{ color: '#a7f3d0', fontSize: '0.82rem' }}>
                Track remediation status and facility inspections
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['all', 'Pending', 'Under Review', 'Action Taken', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: filterStatus === st ? 'rgba(74, 222, 128, 0.25)' : 'rgba(12, 32, 22, 0.6)',
                    color: filterStatus === st ? '#ffffff' : '#a7f3d0',
                    border: `1px solid ${filterStatus === st ? '#4ade80' : 'rgba(74, 222, 128, 0.2)'}`
                  }}
                >
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '580px', overflowY: 'auto' }}>
            {issues.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                No reports matching filter criteria.
              </div>
            ) : (
              issues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssueModal(issue)}
                  style={{
                    background: 'rgba(12, 32, 22, 0.65)',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    gap: '16px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#4ade80')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.2)')}
                >
                  {/* Photo Thumbnail */}
                  {issue.imageUrl ? (
                    <div style={{ width: '85px', height: '85px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src={issue.imageUrl}
                        alt="Issue evidence"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      width: '85px',
                      height: '85px',
                      borderRadius: '12px',
                      background: 'rgba(34, 197, 94, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <AlertTriangle size={28} color="#facc15" />
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#facc15', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {issue.issueType}
                      </span>
                      {getStatusBadge(issue.status)}
                    </div>

                    <h4 style={{ color: '#ffffff', fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>
                      {issue.title}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#a7f3d0' }}>
                      <MapPin size={13} color="#4ade80" />
                      <span>{issue.location}</span>
                    </div>

                    <p style={{ color: 'rgba(240, 253, 244, 0.7)', fontSize: '0.78rem', marginTop: '6px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {issue.description}
                    </p>

                    {issue.adminNotes && (
                      <div style={{
                        marginTop: '8px',
                        background: 'rgba(34, 197, 94, 0.15)',
                        borderLeft: '3px solid #4ade80',
                        padding: '4px 8px',
                        fontSize: '0.72rem',
                        color: '#86efac'
                      }}>
                        <strong>Admin Update:</strong> {issue.adminNotes}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal for detailed inspection */}
      {selectedIssueModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(3, 10, 7, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '640px',
              padding: '28px',
              background: '#091c13',
              border: '1px solid rgba(74, 222, 128, 0.4)',
              borderRadius: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#facc15', textTransform: 'uppercase' }}>
                  {selectedIssueModal.issueType}
                </span>
                {getStatusBadge(selectedIssueModal.status)}
              </div>
              <button
                onClick={() => setSelectedIssueModal(null)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 800, marginBottom: '10px' }}>
              {selectedIssueModal.title}
            </h3>

            {selectedIssueModal.imageUrl && (
              <div style={{ width: '100%', maxHeight: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
                <img
                  src={selectedIssueModal.imageUrl}
                  alt="Hazard evidence full"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000000' }}
                />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: '#94a3b8' }}>Location:</span>
                <div style={{ color: '#ffffff', fontWeight: 600 }}>{selectedIssueModal.location}</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Reporter:</span>
                <div style={{ color: '#ffffff', fontWeight: 600 }}>{selectedIssueModal.reporterName}</div>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '16px' }}>
              {selectedIssueModal.description}
            </p>

            {selectedIssueModal.adminNotes && (
              <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '12px', fontSize: '0.82rem', color: '#86efac', marginBottom: '16px' }}>
                <strong>Campus Remediation Note:</strong> {selectedIssueModal.adminNotes}
              </div>
            )}

            <button
              onClick={() => setSelectedIssueModal(null)}
              className="btn-glass"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Close Details
            </button>
          </div>
        </div>
      )}

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
