import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { store } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Multer storage for uploaded issue photos
const uploadDir = path.resolve('server/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '.jpg';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `issue-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are accepted!'), false);
    }
  }
});

// GET /api/issues - get issues list
router.get('/', authenticate, (req, res) => {
  const { status, type, view } = req.query;

  let results = [...store.issueReports];

  // If student and not explicitly requesting public campus feed, they see their reports first
  if (req.user.role === 'student' && view === 'my') {
    results = results.filter(r => r.reporterId === req.user.id);
  }

  if (status && status !== 'all') {
    results = results.filter(r => r.status.toLowerCase() === status.toLowerCase());
  }

  if (type && type !== 'all') {
    results = results.filter(r => r.issueType === type);
  }

  results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.json({ issues: results });
});

// POST /api/issues - submit new issue report
router.post('/', authenticate, upload.single('image'), (req, res) => {
  try {
    const { issueType, title, description, location, severity = 'Medium' } = req.body;

    if (!issueType || !description || !location) {
      return res.status(400).json({ message: 'issueType, description, and location are required.' });
    }

    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    } else {
      // Default placeholder based on issue type if user didn't attach photo
      const sampleMap = {
        'Overflowing Bins': '/assets/issue-sample-1.jpg',
        'Water Pollution': '/assets/issue-sample-2.jpg',
        'Garbage Dumping': '/assets/issue-sample-3.jpg',
        'Damaged Trees': '/assets/issue-sample-4.jpg'
      };
      imageUrl = sampleMap[issueType] || '/assets/issue-sample-1.jpg';
    }

    const newReport = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      reporterId: req.user.id,
      reporterName: req.user.name,
      reporterEmail: req.user.email,
      issueType,
      title: title ? title.trim() : `${issueType} at ${location}`,
      description: description.trim(),
      location: location.trim(),
      severity,
      status: 'Pending',
      imageUrl,
      adminNotes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.issueReports.unshift(newReport);

    return res.status(201).json({
      message: 'Environmental report filed successfully. Our campus sustainability team will review it.',
      issue: newReport
    });
  } catch (error) {
    console.error('Error submitting issue:', error);
    return res.status(500).json({ message: 'Internal server error submitting report.' });
  }
});

// PATCH /api/issues/:id/status - Admin status update & action notes
router.patch('/:id/status', authenticate, authorize('admin', 'college_admin'), (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const validStatuses = ['Pending', 'Under Review', 'Action Taken', 'Resolved', 'Rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  const issue = store.issueReports.find(r => r.id === id);
  if (!issue) {
    return res.status(404).json({ message: 'Issue report not found.' });
  }

  issue.status = status;
  if (adminNotes !== undefined) {
    issue.adminNotes = adminNotes;
  }
  issue.updatedAt = new Date().toISOString();
  if (status === 'Resolved') {
    issue.resolvedAt = new Date().toISOString();
  }

  return res.json({
    message: `Issue status updated to ${status}.`,
    issue
  });
});

export default router;
