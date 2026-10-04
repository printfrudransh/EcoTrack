import mongoose from 'mongoose';

const IssueReportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issueType: {
    type: String,
    enum: [
      'Garbage Dumping',
      'Overflowing Bins',
      'Waste Mismanagement',
      'Water Pollution',
      'Open Waste Burning',
      'Damaged Trees',
      'Other Environmental Issue'
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true // e.g. "North Campus Cafeteria Rear, Block C"
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  imageUrl: {
    type: String,
    default: ''
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Action Taken', 'Resolved', 'Rejected'],
    default: 'Pending'
  },
  adminNotes: {
    type: String,
    default: ''
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolvedAt: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.models.IssueReport || mongoose.model('IssueReport', IssueReportSchema);
