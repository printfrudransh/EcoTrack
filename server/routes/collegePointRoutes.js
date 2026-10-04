import express from 'express';
import { store } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

const REGULATORY_DISCLAIMER =
  'IMPORTANT NOTICE: EcoTrack provides activity verification records to assist college evaluation. Official AICTE / VTU / University activity points are determined solely by your designated institutional faculty coordinator in accordance with academic regulations.';

// GET /api/college-points/rules - list college-defined point rules
router.get('/rules', authenticate, (req, res) => {
  return res.json({
    disclaimer: REGULATORY_DISCLAIMER,
    rules: store.collegePointRules
  });
});

// GET /api/college-points/my-summary - current student's points and verified activities
router.get('/my-summary', authenticate, (req, res) => {
  const user = store.users.find(u => u.id === req.user.id);
  const eligibleActivities = store.activities.filter(
    a => a.userId === req.user.id && a.collegePointsEligible
  );

  return res.json({
    disclaimer: REGULATORY_DISCLAIMER,
    userCollegeOrOrg: user ? user.collegeOrOrg : 'Institute',
    totalCollegePointsEarned: user ? (user.collegeActivityPoints || 0) : 0,
    eligibleActivitiesCount: eligibleActivities.length,
    activities: eligibleActivities
  });
});

// POST /api/college-points/rules - College admin creates or modifies qualification rule
router.post('/rules', authenticate, authorize('college_admin', 'admin'), (req, res) => {
  const { title, activityType, pointsValue, minimumQuantity, officialVerificationRule, collegeOrOrg } = req.body;

  if (!title || !activityType || pointsValue === undefined) {
    return res.status(400).json({ message: 'Title, activityType, and pointsValue are required.' });
  }

  const newRule = {
    id: `cpr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: title.trim(),
    activityType,
    collegeOrOrg: collegeOrOrg || req.user.collegeOrOrg || 'Partner Institution',
    pointsValue: Number(pointsValue),
    minimumQuantity: Number(minimumQuantity) || 1,
    requiresEvidence: true,
    officialVerificationRule: officialVerificationRule || 'Subject to faculty coordinator verification.',
    regulatoryDisclaimer: REGULATORY_DISCLAIMER,
    isActive: true
  };

  store.collegePointRules.push(newRule);

  return res.status(201).json({
    message: 'College Activity Point criteria configured successfully.',
    rule: newRule
  });
});

// POST /api/college-points/verify-activity - College admin manually verifies an activity for official credit
router.post('/verify-activity', authenticate, authorize('college_admin', 'admin'), (req, res) => {
  const { activityId, approved, pointsAwarded, reviewNotes } = req.body;

  const activity = store.activities.find(a => a.id === activityId);
  if (!activity) {
    return res.status(404).json({ message: 'Activity record not found.' });
  }

  if (approved) {
    activity.verificationStatus = 'verified';
    activity.collegePointsEligible = true;
    activity.collegePointsAwarded = Number(pointsAwarded) || activity.collegePointsAwarded || 2;
    activity.notes = reviewNotes ? `${activity.notes} [Faculty Note: ${reviewNotes}]` : activity.notes;

    // Update student's points tally
    const student = store.users.find(u => u.id === activity.userId);
    if (student) {
      student.collegeActivityPoints = (student.collegeActivityPoints || 0) + activity.collegePointsAwarded;
    }
  } else {
    activity.verificationStatus = 'flagged_anomaly';
  }

  return res.json({
    message: approved ? 'Activity certified for College Activity Points.' : 'Activity review updated.',
    activity
  });
});

export default router;
