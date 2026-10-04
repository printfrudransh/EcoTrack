import jwt from 'jsonwebtoken';
import { store } from '../data/store.js';

const JWT_SECRET = process.env.JWT_SECRET || 'ecotrack_super_secure_jwt_secret_2026';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = store.users.find(u => u.id === decoded.id || u.email === decoded.email);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      collegeOrOrg: user.collegeOrOrg,
      department: user.department,
      streakDays: user.streakDays,
      collegeActivityPoints: user.collegeActivityPoints
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: Access requires one of [${allowedRoles.join(', ')}] roles.`
      });
    }
    next();
  };
}

export { JWT_SECRET };
