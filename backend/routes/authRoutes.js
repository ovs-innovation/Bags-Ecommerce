const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
} = require('../middleware/validator');

const router = express.Router();

/**
 * Brute-force protection rate limiter for sensitive authentication endpoints
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});

// Public authentication routes
router.post('/register', authLimiter, validateRegister, authController.register);
router.post('/login', authLimiter, validateLogin, authController.login);

// Protected authentication & profile routes
router.get('/me', protect, authController.getMe);
router.put('/profile', protect, validateUpdateProfile, authController.updateProfile);
router.post('/logout', protect, authController.logout);

// Protected saved items (wishlist) routes
router.get('/saved', protect, authController.getSavedItems);
router.post('/saved/toggle', protect, authController.toggleSavedItem);
router.post('/saved/sync', protect, authController.syncSavedItems);

module.exports = router;
