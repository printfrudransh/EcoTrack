import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'college_admin'],
    default: 'student'
  },
  collegeOrOrg: {
    type: String,
    default: 'EcoTech University'
  },
  department: {
    type: String,
    default: 'Environmental Sciences'
  },
  avatar: {
    type: String,
    default: ''
  },
  streakDays: {
    type: Number,
    default: 1
  },
  lastActiveDate: {
    type: Date,
    default: Date.now
  },
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }],
  collegeActivityPoints: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
