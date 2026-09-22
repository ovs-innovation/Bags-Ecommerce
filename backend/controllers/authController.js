const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { USER_ROLES } = require('../config/constants');

/**
 * @desc    Register a new customer account
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please sign in.',
      });
    }

    // Always enforce customer role upon registration to prevent privilege escalation
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: phone ? phone.trim() : '',
      role: USER_ROLES.CUSTOMER,
      lastLogin: new Date(),
    });

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully. Welcome to Avyastore.in.',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & return JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    // Query user explicitly including password field
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    // Generic error message to prevent user enumeration
    const invalidCredentialsMessage = 'Invalid email or password.';

    if (!user) {
      return res.status(401).json({
        success: false,
        message: invalidCredentialsMessage,
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please reach out to customer care.',
      });
    }

    // Verify password securely using bcrypt
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: invalidCredentialsMessage,
      });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Signed in successfully.',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get currently logged in user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    // req.user is attached by protect middleware
    const user = req.user;

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile & optional password
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();

    // If changing password, verify current password first
    if (newPassword) {
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'The current password you entered is incorrect.',
        });
      }
      user.password = newPassword;
    }

    await user.save();

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Sign out user (client handles token discard)
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Signed out successfully.',
  });
};

/**
 * @desc    Get user's saved item IDs
 * @route   GET /api/auth/saved
 * @access  Private
 */
const getSavedItems = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(200).json({
      success: true,
      data: {
        savedItems: user.savedItems || [],
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle saved item (add if absent, remove if present)
 * @route   POST /api/auth/saved/toggle
 * @access  Private
 */
const toggleSavedItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required.',
      });
    }

    const user = await User.findById(req.user._id);
    const exists = user.savedItems.includes(itemId);

    if (exists) {
      user.savedItems = user.savedItems.filter((id) => id !== itemId);
    } else {
      user.savedItems.push(itemId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      data: {
        saved: !exists,
        savedItems: user.savedItems,
      },
      message: exists ? 'Removed from saved collection.' : 'Added to saved collection.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Sync local guest saved items with authenticated user account
 * @route   POST /api/auth/saved/sync
 * @access  Private
 */
const syncSavedItems = async (req, res, next) => {
  try {
    const { itemIds } = req.body;
    if (!Array.isArray(itemIds)) {
      return res.status(400).json({
        success: false,
        message: 'itemIds array is required.',
      });
    }

    const user = await User.findById(req.user._id);
    const merged = Array.from(new Set([...user.savedItems, ...itemIds]));
    user.savedItems = merged;
    await user.save();

    return res.status(200).json({
      success: true,
      data: {
        savedItems: user.savedItems,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  logout,
  getSavedItems,
  toggleSavedItem,
  syncSavedItems,
};
