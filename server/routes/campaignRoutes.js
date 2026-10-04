import express from 'express';
import { store } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// GET /api/campaigns - list active/upcoming campaigns
router.get('/', authenticate, (req, res) => {
  const campaignsWithUserStatus = store.campaigns.map(c => ({
    ...c,
    hasJoined: c.participants ? c.participants.includes(req.user.id) : (c.isJoined || false)
  }));
  return res.json({ campaigns: campaignsWithUserStatus });
});

// POST /api/campaigns/:id/join - join a campaign
router.post('/:id/join', authenticate, (req, res) => {
  const { id } = req.params;
  const campaign = store.campaigns.find(c => c.id === id);

  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found.' });
  }

  if (!campaign.participants) {
    campaign.participants = [];
  }

  if (!campaign.participants.includes(req.user.id)) {
    campaign.participants.push(req.user.id);
    campaign.participantsCount = (campaign.participantsCount || 0) + 1;
    campaign.isJoined = true;
  }

  return res.json({
    message: `You have successfully joined "${campaign.title}"!`,
    campaign: {
      ...campaign,
      hasJoined: true
    }
  });
});

// POST /api/campaigns - create new campaign (Admin & College Admin)
router.post('/', authenticate, authorize('admin', 'college_admin'), (req, res) => {
  const { title, tagline, description, category, startDate, endDate, targetMetric, targetValue, badgeReward } = req.body;

  if (!title || !description || !startDate || !endDate) {
    return res.status(400).json({ message: 'Title, description, startDate and endDate are required.' });
  }

  const newCampaign = {
    id: `cmp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: title.trim(),
    tagline: tagline ? tagline.trim() : '',
    description: description.trim(),
    category: category || 'Zero Waste',
    startDate: new Date(startDate).toISOString(),
    endDate: new Date(endDate).toISOString(),
    targetGoal: {
      targetMetric: targetMetric || 'kg CO2e avoided',
      targetValue: Number(targetValue) || 1000,
      currentValue: 0
    },
    participantsCount: 1,
    participants: [req.user.id],
    status: 'Active',
    badgeReward: badgeReward || 'Eco Champion',
    createdBy: req.user.id
  };

  store.campaigns.unshift(newCampaign);

  return res.status(201).json({
    message: 'Campaign published successfully.',
    campaign: newCampaign
  });
});

export default router;
