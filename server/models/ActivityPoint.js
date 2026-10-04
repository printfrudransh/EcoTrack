import mongoose from 'mongoose';

const ActivityPointRuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  activityType: {
    type: String,
    required: true
  },
  collegeOrOrg: {
    type: String,
    required: true
  },
  pointsValue: {
    type: Number,
    required: true
  },
  minimumQuantity: {
    type: Number,
    default: 1
  },
  requiresEvidence: {
    type: Boolean,
    default: true
  },
  officialVerificationRule: {
    type: String,
    default: 'Requires faculty coordinator approval and geo-tagged activity log.'
  },
  regulatoryDisclaimer: {
    type: String,
    default: 'Notice: Official accreditation is determined by your institution coordinator under university regulations.'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export default mongoose.models.ActivityPointRule || mongoose.model('ActivityPointRule', ActivityPointRuleSchema);
