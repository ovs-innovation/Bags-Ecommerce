const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

/**
 * Middleware to protect routes and verify Bearer JWT token
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.',
    });
  }

  try {
    // Verify token cryptographically
    const decoded = verifyToken(token);

    // Fetch user from DB to ensure account is active and exists
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.',
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please sign in again.',
        code: 'TOKEN_EXPIRED',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid or malformed authentication token.',
      code: 'INVALID_TOKEN',
    });
  }
};

/**
 * Role-Based Access Control (RBAC) middleware
 * Restricts route to specific user roles (e.g., 'admin')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user ? req.user.role : 'unauthorized'}' is not permitted to access this resource.`,
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
