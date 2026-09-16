const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'kosha_super_secret_jwt_key_2026_dev_only';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate a cryptographically signed JWT token for an authenticated user
 * @param {Object} user - User document or object containing _id, role, email
 * @returns {string} Signed JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};

/**
 * Verify a JWT token
 * @param {string} token - Raw JWT token
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
