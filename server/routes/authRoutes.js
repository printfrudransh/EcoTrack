import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { store } from '../data/store.js';
import { JWT_SECRET, authenticate } from '../middleware/auth.js';

const router = express.Router();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'student', collegeOrOrg = 'Greenfield Institute of Technology', department = 'General Studies' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    const existingUser = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: ['student', 'admin', 'college_admin'].includes(role) ? role : 'student',
      collegeOrOrg: collegeOrOrg.trim(),
      department: department.trim(),
      streakDays: 1,
      lastActiveDate: new Date().toISOString(),
      collegeActivityPoints: 0,
      badges: ['badge_1'],
      createdAt: new Date().toISOString()
    };

    store.users.push(newUser);

    const token = generateToken(newUser);
    const { password: _, ...userSafe } = newUser;

    return res.status(201).json({
      message: 'Account created successfully.',
      token,
      user: userSafe
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Update streak if active today
    const now = new Date();
    const lastActive = new Date(user.lastActiveDate);
    const diffHours = (now - lastActive) / (1000 * 60 * 60);
    if (diffHours >= 24 && diffHours <= 48) {
      user.streakDays += 1;
    } else if (diffHours > 48) {
      user.streakDays = 1;
    }
    user.lastActiveDate = now.toISOString();

    const token = generateToken(user);
    const { password: _, ...userSafe } = user;

    return res.json({
      message: 'Login successful.',
      token,
      user: userSafe
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login.' });
  }
});

// POST /api/auth/demo-login - Quick Switcher for Testing Student / Admin / College Admin
router.post('/demo-login', (req, res) => {
  const { role = 'student' } = req.body;
  const user = store.users.find(u => u.role === role) || store.users[0];
  const token = generateToken(user);
  const { password: _, ...userSafe } = user;

  return res.json({
    message: `Logged in as demo ${role}.`,
    token,
    user: userSafe
  });
});

// GET /api/auth/me
router.get('/me', authenticate, (req, res) => {
  const user = store.users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  const { password: _, ...userSafe } = user;
  return res.json({ user: userSafe });
});

export default router;
