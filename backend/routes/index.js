const express = require('express');
const healthRoutes = require('./healthRoutes');

const router = express.Router();

// Mount foundational routes
router.use('/health', healthRoutes);

// Additional domain routers will be mounted in upcoming phases:
// router.use('/auth', authRoutes);         // Phase 3
// router.use('/products', productRoutes);  // Phase 4
// router.use('/categories', categoryRoutes); // Phase 4
// router.use('/orders', orderRoutes);      // Phase 7
// router.use('/admin', adminRoutes);       // Phase 9+

module.exports = router;
