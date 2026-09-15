const express = require('express');
const mongoose = require('mongoose');
const { BRAND_CONFIG } = require('../config/constants');

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Check system health, database connection, and API status
 * @access  Public
 */
router.get('/', (req, res) => {
  const dbStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const dbState = mongoose.connection.readyState;

  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      brand: BRAND_CONFIG.brandName,
      tagline: BRAND_CONFIG.tagline,
      environment: process.env.NODE_ENV || 'development',
      database: dbStateMap[dbState] || 'unknown',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    },
  });
});

module.exports = router;
