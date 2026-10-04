import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Class', 'Department', 'College', 'Organization', 'Eco Club'],
    default: 'Department'
  },
  description: {
    type: String,
    default: ''
  },
  membersCount: {
    type: Number,
    default: 1
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  collectiveImpact: {
    totalCo2eAvoidedKg: {
      type: Number,
      default: 0
    },
    totalActivities: {
      type: Number,
      default: 0
    },
    treesPlanted: {
      type: Number,
      default: 0
    }
  }
}, { timestamps: true });

export default mongoose.models.Group || mongoose.model('Group', GroupSchema);
