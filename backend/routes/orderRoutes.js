const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} = require('../controllers/orderController');

router.post('/', auth, placeOrder);
router.get('/my-orders', auth, getMyOrders);
router.get('/all', auth, getAllOrders); // Admin only
router.put('/:id/status', auth, updateOrderStatus); // Admin only

module.exports = router;
