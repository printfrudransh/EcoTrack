import express from 'express';
import { store } from '../data/store.js';
import { PREDEFINED_FACTORS, getFactorByType, validateActivitySubmission } from '../data/predefinedFactors.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET /api/activities/factors - list scientific factor definitions
router.get('/factors', (req, res) => {
  return res.json({
    disclaimer: 'All metrics provide an Estimated Environmental Impact using recognized lifecycle inventories.',
    factors: PREDEFINED_FACTORS
  });
});

// GET /api/activities - user activities or all if admin
router.get('/', authenticate, (req, res) => {
  const { all, limit = 50 } = req.query;

  let list = [];
  if (all === 'true' && (req.user.role === 'admin' || req.user.role === 'college_admin')) {
    list = [...store.activities];
  } else {
    list = store.activities.filter(a => a.userId === req.user.id);
  }

  // Sort descending by date
  list.sort((a, b) => new Date(b.date) - new Date(a.date));

  return res.json({
    activities: list.slice(0, Number(limit))
  });
});

// POST /api/activities - record new activity with anti-cheating check
router.post('/', authenticate, (req, res) => {
  try {
    const { activityType, quantity, notes = '', date = new Date().toISOString() } = req.body;

    if (!activityType || quantity === undefined) {
      return res.status(400).json({ message: 'activityType and quantity are required.' });
    }

    const validation = validateActivitySubmission(activityType, quantity);
    if (!validation.valid) {
      return res.status(400).json({
        message: validation.message,
        isAnomaly: validation.isAnomaly || false
      });
    }

    const factor = validation.factor;
    const numQty = Number(quantity);

    // Calculate Estimated Environmental Impact
    const co2eAvoidedKg = Number((factor.co2eAvoidedPerUnit * numQty).toFixed(3));
    const waterSavedLiters = Number((factor.waterSavedPerUnit * numQty).toFixed(2));
    const energySavedKwh = Number((factor.energySavedPerUnit * numQty).toFixed(2));

    // Check college activity point eligibility
    const pointRule = store.collegePointRules.find(r => r.activityType === activityType && r.isActive);
    let collegePointsEligible = false;
    let collegePointsAwarded = 0;

    if (pointRule && numQty >= pointRule.minimumQuantity) {
      collegePointsEligible = true;
      collegePointsAwarded = pointRule.pointsValue;
    }

    // Anti-cheating status
    let verificationStatus = 'auto_validated';
    if (numQty > factor.maxReasonableDailyQuantity * 0.7) {
      verificationStatus = 'pending_verification'; // Flagged for higher tier review
    } else {
      verificationStatus = 'verified';
    }

    const newActivity = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: req.user.id,
      userName: req.user.name,
      activityType: factor.activityType,
      title: factor.title,
      category: factor.category,
      quantity: numQty,
      unit: factor.unit,
      estimatedImpact: {
        co2eAvoidedKg,
        waterSavedLiters,
        energySavedKwh,
        isEstimateOnly: true
      },
      factorSnapshot: {
        factorSource: factor.source,
        year: factor.year,
        region: factor.region,
        assumptions: factor.assumptions
      },
      verificationStatus,
      collegePointsEligible,
      collegePointsAwarded,
      notes: notes.trim(),
      date: new Date(date).toISOString()
    };

    store.activities.unshift(newActivity);

    // Update user points if verified
    const user = store.users.find(u => u.id === req.user.id);
    if (user && collegePointsAwarded > 0) {
      user.collegeActivityPoints = (user.collegeActivityPoints || 0) + collegePointsAwarded;
    }

    return res.status(201).json({
      message: 'Activity recorded successfully with Estimated Environmental Impact.',
      activity: newActivity
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    return res.status(500).json({ message: 'Internal server error while logging activity.' });
  }
});

// GET /api/activities/summary - aggregate personal impact
router.get('/summary', authenticate, (req, res) => {
  const userActivities = store.activities.filter(a => a.userId === req.user.id);

  const totalActivities = userActivities.length;
  const totalCo2eAvoidedKg = Number(
    userActivities.reduce((acc, curr) => acc + (curr.estimatedImpact?.co2eAvoidedKg || 0), 0).toFixed(2)
  );
  const totalWaterSavedLiters = Number(
    userActivities.reduce((acc, curr) => acc + (curr.estimatedImpact?.waterSavedLiters || 0), 0).toFixed(1)
  );
  const totalEnergySavedKwh = Number(
    userActivities.reduce((acc, curr) => acc + (curr.estimatedImpact?.energySavedKwh || 0), 0).toFixed(1)
  );

  const byCategory = {};
  userActivities.forEach(a => {
    byCategory[a.category] = (byCategory[a.category] || 0) + 1;
  });

  return res.json({
    totalActivities,
    estimatedImpact: {
      totalCo2eAvoidedKg,
      totalWaterSavedLiters,
      totalEnergySavedKwh,
      label: 'Estimated Environmental Impact'
    },
    byCategory
  });
});

export default router;
