import mongoose from 'mongoose';

const ChallengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  durationDays: {
    type: Number,
    default: 7
  },
  targetGoal: {
    type: String,
    required: true
  },
  rewardBadge: {
    type: String,
    default: 'Green Striker'
  },
  participantsCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema);
