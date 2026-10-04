import express from 'express';
import { store } from '../data/store.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET /api/groups - list collective groups (Classes, Departments, Colleges, Hostels)
router.get('/', authenticate, (req, res) => {
  return res.json({
    groups: store.groups
  });
});

// POST /api/groups - create new group
router.post('/', authenticate, (req, res) => {
  const { name, type, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Group name is required.' });
  }

  const newGroup = {
    id: `grp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: name.trim(),
    type: type || 'Department',
    description: description ? description.trim() : '',
    membersCount: 1,
    collectiveImpact: {
      totalCo2eAvoidedKg: 0,
      totalActivities: 0,
      treesPlanted: 0
    }
  };

  store.groups.push(newGroup);

  return res.status(201).json({
    message: 'Group established successfully.',
    group: newGroup
  });
});

export default router;
