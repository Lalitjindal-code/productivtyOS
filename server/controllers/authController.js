const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_in_production';
const JWT_EXPIRES_IN = '7d';

// Helper: strip sensitive fields before sending to client
const sanitizeUser = (user) => ({
  userId: user.userId,
  displayName: user.displayName,
  email: user.email,
  avatarUrl: user.avatarUrl,
  timezone: user.timezone,
  character: user.character,
  rpgStats: user.rpgStats,
  streak: user.streak,
  totalXP: user.totalXP,
  settings: user.settings,
  achievements: user.achievements,
  createdAt: user.createdAt,
});

// Generate a unique userId from email + timestamp
const generateUserId = (email) => {
  const base = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
  return `user_${base}_${Date.now()}`;
};

// ---- POST /api/auth/register ----
exports.register = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Email aur password required hain.' } });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Password minimum 6 characters ka hona chahiye.' } });
    }

    // Check duplicate email
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, error: { code: 'EMAIL_EXISTS', message: 'Ye email already registered hai.' } });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = generateUserId(email);

    const user = await User.create({
      userId,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      displayName: displayName?.trim() || 'Productivity Warrior',
    });

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error('[AuthController] Register error:', err.message);
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

// ---- POST /api/auth/login ----
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Email aur password required hain.' } });
    }

    // Find user with password (select: false needs explicit selection)
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email ya password galat hai.' } });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email ya password galat hai.' } });
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      success: true,
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error('[AuthController] Login error:', err.message);
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

// ---- GET /api/auth/me ----
exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User nahi mila.' } });
    }
    return res.json({ success: true, user: sanitizeUser(user) });
  } catch (err) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

// ---- POST /api/auth/logout ----
exports.logout = async (req, res) => {
  // JWT is stateless — client should delete the token
  // In future, can maintain a token blocklist in Redis
  return res.json({ success: true, message: 'Logged out successfully.' });
};
