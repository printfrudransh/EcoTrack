import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityType: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  estimatedImpact: {
    co2eAvoidedKg: {
      type: Number,
      default: 0
    },
    waterSavedLiters: {
      type: Number,
      default: 0
    },
    energySavedKwh: {
      type: Number,
      default: 0
    },
    isEstimateOnly: {
      type: Boolean,
      default: true
    }
  },
  factorSnapshot: {
    factorSource: String,
    year: Number,
    region: String,
    assumptions: String
  },
  verificationStatus: {
    type: String,
    enum: ['auto_validated', 'pending_verification', 'verified', 'flagged_anomaly'],
    default: 'auto_validated'
  },
  collegePointsEligible: {
    type: Boolean,
    default: false
  },
  collegePointsAwarded: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
