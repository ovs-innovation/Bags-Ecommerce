const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
} = require('../controllers/productController');

const router = express.Router();

// Read all & Seed
router.get('/', getProducts);
router.get('/seed', seedProducts);
router.post('/seed', seedProducts);

// Read single
router.get('/:identifier', getProductById);

// Create, Update, Delete
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
