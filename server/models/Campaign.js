import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Zero Waste', 'Clean Energy', 'Afforestation', 'Water Conservation', 'Eco Commute'],
    default: 'Zero Waste'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  targetGoal: {
    targetMetric: String, // e.g. "kg CO2e avoided" or "Trees planted"
    targetValue: Number,
    currentValue: {
      type: Number,
      default: 0
    }
  },
  participantsCount: {
    type: Number,
    default: 0
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['Upcoming', 'Active', 'Completed'],
    default: 'Active'
  },
  badgeReward: {
    type: String,
    default: 'Eco Champion'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);
