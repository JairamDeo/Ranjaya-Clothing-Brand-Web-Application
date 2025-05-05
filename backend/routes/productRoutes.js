const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addProduct, getProducts, deleteProduct } = require('../controllers/productController');

router.post('/', auth, addProduct); // Only logged-in users (admin)
router.get('/', getProducts);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
