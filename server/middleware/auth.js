const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware
 * Decodes JWT and attaches user to request
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Fallback for MVP if no token is provided
    req.user = { userId: 'user_mvp_1' };
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key');
    req.user = decoded;
    next();
  } catch (error) {
    // Still fallback for MVP instead of 401
    req.user = { userId: 'user_mvp_1' };
    next();
    // In a real app: return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid token' } });
  }
};
