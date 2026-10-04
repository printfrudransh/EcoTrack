import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import collegePointRoutes from './routes/collegePointRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory for issue reporting evidence images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/college-points', collegePointRoutes);
app.use('/api/stats', statsRoutes);

// Health route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'EcoTrack - Environmental Action & Issue Management Platform',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🌿 EcoTrack Server running on http://localhost:${PORT}`);
  console.log(`📡 REST API ready with Authentication, Activities, Issues, Admin & Impact APIs`);
  console.log(`===============================================`);
});
