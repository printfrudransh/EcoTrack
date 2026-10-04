import mongoose from 'mongoose';

const EnvironmentalImpactFactorSchema = new mongoose.Schema({
  activityType: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Transportation', 'Waste & Recycling', 'Energy & Water', 'Restoration & Community'],
    required: true
  },
  unit: {
    type: String,
    required: true // e.g., 'km', 'kg', 'kWh', 'items', 'trees', 'hours'
  },
  co2eAvoidedPerUnit: {
    type: Number, // in kg CO2e per unit
    required: true
  },
  waterSavedPerUnit: {
    type: Number, // in Liters
    default: 0
  },
  source: {
    type: String,
    required: true // e.g., "EPA GHG Equivalencies / DEFRA Conversion Factors"
  },
  year: {
    type: Number,
    default: 2024
  },
  region: {
    type: String,
    default: 'Global / Regional Average'
  },
  assumptions: {
    type: String,
    default: 'Assumes average urban passenger car displaced (170g CO2e/km), grid electric mix 2024.'
  },
  hasReliableFactor: {
    type: Boolean,
    default: true
  },
  maxReasonableDailyQuantity: {
    type: Number, // Anti-cheating reasonable daily cap
    required: true
  },
  icon: {
    type: String,
    default: 'Leaf'
  }
}, { timestamps: true });

export default mongoose.models.EnvironmentalImpactFactor || mongoose.model('EnvironmentalImpactFactor', EnvironmentalImpactFactorSchema);
