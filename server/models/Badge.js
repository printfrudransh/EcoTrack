import mongoose from 'mongoose';

const BadgeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'Award'
  },
  category: {
    type: String,
    enum: ['Streak', 'Transportation', 'Zero Waste', 'Issue Solver', 'Community', 'Special'],
    default: 'Community'
  },
  criteria: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Badge || mongoose.model('Badge', BadgeSchema);
