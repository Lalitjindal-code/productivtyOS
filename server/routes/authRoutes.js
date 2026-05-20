const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Strict rate limit for auth endpoints (prevent brute-force)
const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'Bahut zyada attempts. 15 minute baad try karein.' } },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/auth/register
router.post('/register', authLimit, authController.register);

// POST /api/auth/login
router.post('/login', authLimit, authController.login);

// GET /api/auth/me  (requires valid token)
router.get('/me', auth, authController.getMe);

// POST /api/auth/logout
router.post('/logout', auth, authController.logout);

module.exports = router;
